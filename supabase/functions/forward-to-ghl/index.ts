import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GHL_WEBHOOK_URL = Deno.env.get("GHL_WEBHOOK_URL") || "";
const GHL_SHARED_SECRET = Deno.env.get("GHL_SHARED_SECRET") || "";
const SCHEMA_VERSION = "2026-07.ghl.v1";

const yn = (v: unknown): "yes" | "no" => (v === true || v === "yes" || v === "true" ? "yes" : "no");
const s = (v: unknown): string => (v === null || v === undefined ? "" : String(v));
const joinCsv = (v: unknown): string => (Array.isArray(v) ? v.join(",") : s(v));

function seniorTrust(services: string[], ageBand: string): "yes" | "no" {
  if (!services?.some((x) => x?.toLowerCase().includes("trust"))) return "no";
  const band = (ageBand || "").toLowerCase();
  if (band === "65+" || band === "65_plus" || band.includes("65")) return "yes";
  return "no";
}

async function forwardOnce(payload: Record<string, unknown>): Promise<{ ok: boolean; status: number; body: string }> {
  try {
    const res = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const txt = await res.text();
    return { ok: res.ok, status: res.status, body: txt };
  } catch (e) {
    return { ok: false, status: 0, body: (e as Error).message };
  }
}

async function forwardWithRetries(payload: Record<string, unknown>) {
  const delays = [1000, 4000, 15000];
  let attempts = 0;
  let last: { ok: boolean; status: number; body: string } = { ok: false, status: 0, body: "not_attempted" };
  for (let i = 0; i <= delays.length; i++) {
    attempts++;
    last = await forwardOnce(payload);
    if (last.ok) return { attempts, last };
    if (i < delays.length) await new Promise((r) => setTimeout(r, delays[i]));
  }
  return { attempts, last };
}

function buildPayload(lead: any, consent: any | null): Record<string, unknown> {
  const answers = (lead.answers ?? {}) as Record<string, unknown>;
  const services: string[] = Array.isArray(lead.services) ? lead.services : [];
  const ageBand = s(answers.ageBand ?? answers.age_range ?? answers.age);
  const leadStatus = lead.status === "abandoned" ? "abandoned" : "submitted";

  const consentType =
    leadStatus === "abandoned"
      ? "none"
      : consent?.consent_type === "tcpa_verbal"
        ? "tcpa_verbal"
        : consent?.consent_type === "tcpa_web"
          ? "tcpa_web"
          : "none";

  return {
    secret: GHL_SHARED_SECRET,
    event_type: "tfa_lead_submitted",
    schema_version: SCHEMA_VERSION,
    supabase_lead_id: s(lead.id),
    submitted_at: s(lead.created_at ?? new Date().toISOString()),
    source: s(lead.source || "consumer"),
    lead_status: leadStatus,

    first_name: s(lead.first_name),
    last_name: s(lead.last_name),
    phone: s(lead.phone_e164),
    email: s(lead.email),
    zip: s(lead.zip),
    country: "US",
    timezone: s(lead.timezone),
    language: s(lead.language || "en"),
    best_time: s(lead.best_time),

    services: joinCsv(services),
    services_count: s(services.length),
    primary_service: s(lead.primary_service),
    solve_first: s(answers.solve_first),
    routing_override: yn(lead.routing_overridden),

    age_range: ageBand,
    senior_trust_flag: seniorTrust(services, ageBand),
    family_status: s(answers.family_status),
    dependents: s(answers.dependents),
    homeowner: s(answers.homeowner),
    work_situation: s(answers.work_situation),
    trust_real_estate: s(answers.trust_real_estate),
    existing_estate_docs: s(answers.existing_estate_docs),
    estate_composition: s(answers.estate_composition),
    prompting_event: s(answers.prompting_event),
    nicotine: s(answers.nicotine),
    health_selfrating: s(answers.health_selfrating),
    life_purpose: s(answers.life_purpose),
    coverage_band: s(answers.coverage_band),
    term_length: s(answers.term_length),
    existing_life_coverage: s(answers.existing_life_coverage),
    retirement_window: s(answers.retirement_window),
    old_401ks: s(answers.old_401ks),
    savings_band: s(answers.savings_band),
    biggest_worry: s(answers.biggest_worry),
    monthly_saving: s(answers.monthly_saving),

    referrer_slug: s(answers.referrer_slug),
    referrer_name: s(answers.referrer_name),
    referrer_phone: s(answers.referrer_phone),
    referrer_sms_optin: yn(answers.referrer_sms_optin),
    referrer_in_thread: yn(lead.referrer_in_thread),

    consent_tcpa: leadStatus === "submitted" && consent ? "yes" : "no",
    consent_type: consentType,
    consent_text_version: s(consent?.consent_text_version),
    consent_snapshot: s(consent?.consent_text_snapshot),
    consent_at: s(consent?.occurred_at),
    consent_ip: s(consent?.ip),
    consent_user_agent: s(consent?.user_agent),
    consent_page_url: s(consent?.page_url),

    speaking_with: s(lead.speaking_with),
    temperature: s(lead.temperature),
    staff_notes: s(lead.staff_notes),
    verbal_consent_agent: s(consent?.agent_user_id),
    hold_automation: yn(lead.hold_automation),

    income_band: s(answers.income),
    current_premiums: s(answers.premiums),
    spouse_first_name: s(answers.spouseFirst ?? answers.spouse_first_name),
    employer: s(answers.employer),
    dob_exact: s(answers.dob),
    preferred_contact_at: s(lead.preferred_contact_at),

    answers_json: JSON.stringify(answers ?? {}),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (!GHL_WEBHOOK_URL) {
    return new Response(JSON.stringify({ error: "GHL_WEBHOOK_URL not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const body = await req.json().catch(() => ({}));
    const leadId: string | undefined = body.lead_id || body.record?.id;
    if (!leadId) {
      return new Response(JSON.stringify({ error: "lead_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: lead, error: leadErr } = await supabase
      .from("intake_leads")
      .select("*")
      .eq("id", leadId)
      .single();
    if (leadErr || !lead) throw leadErr || new Error("lead_not_found");

    const { data: consentRows } = await supabase
      .from("intake_consent_log")
      .select("*")
      .eq("lead_id", leadId)
      .order("occurred_at", { ascending: false })
      .limit(1);
    const consent = consentRows?.[0] ?? null;

    const payload = buildPayload(lead, consent);
    const { attempts, last } = await forwardWithRetries(payload);

    if (last.ok) {
      await supabase
        .from("intake_leads")
        .update({
          ghl_forward_status: "sent",
          ghl_forward_attempts: (lead.ghl_forward_attempts ?? 0) + attempts,
          ghl_forwarded_at: new Date().toISOString(),
          ghl_last_error: null,
        })
        .eq("id", leadId);
      return new Response(JSON.stringify({ status: "sent", attempts }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabase
      .from("intake_leads")
      .update({
        ghl_forward_status: "failed",
        ghl_forward_attempts: (lead.ghl_forward_attempts ?? 0) + attempts,
        ghl_last_error: `[${last.status}] ${last.body}`.slice(0, 1000),
      })
      .eq("id", leadId);

    return new Response(
      JSON.stringify({ status: "failed", attempts, http_status: last.status, error: last.body }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("forward-to-ghl error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});