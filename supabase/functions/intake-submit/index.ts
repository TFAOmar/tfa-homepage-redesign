import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const ConsentSchema = z.object({
  tcpa: z.boolean().optional(),
  verbal: z.boolean().optional(),
  verbal_script: z.string().optional(),
  referrer_inclusion: z.boolean().optional(),
  senior_trust: z.boolean().optional(),
  version: z.string().min(1),
});

const BodySchema = z.object({
  source: z.enum(["consumer", "concierge"]),
  status: z.string().optional(),
  partial: z.boolean().optional(),
  services: z.array(z.string()).default([]),
  primary_service: z.string().nullish(),
  answers: z.record(z.unknown()).default({}),
  first_name: z.string().max(80).optional(),
  last_name: z.string().max(80).optional(),
  phone_e164: z.string().max(20).optional(),
  email: z.string().email().max(200).nullable().optional(),
  zip: z.string().max(10).optional(),
  timezone: z.string().max(80).optional(),
  language: z.enum(["en", "es"]).default("en"),
  best_time: z.string().max(40).optional(),
  referrer_id: z.string().uuid().nullable().optional(),
  referrer_in_thread: z.boolean().optional(),
  speaking_with: z.string().max(40).optional(),
  temperature: z.enum(["hot", "warm", "nurture"]).optional(),
  routing_team_key: z.string().max(20).nullable().optional(),
  routing_overridden: z.boolean().optional(),
  staff_notes: z.string().max(4000).optional(),
  appointment_status: z.string().max(30).nullable().optional(),
  appointment_at: z.string().nullable().optional(),
  preferred_contact_at: z.string().nullable().optional(),
  hold_automation: z.boolean().optional(),
  consent: ConsentSchema.optional(),
  page_url: z.string().max(500).optional(),
  user_agent: z.string().max(500).optional(),
});

// naive in-memory rate limit (per-instance)
const HITS = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const win = 60_000;
  const max = 8;
  const rec = HITS.get(ip);
  if (!rec || rec.reset < now) {
    HITS.set(ip, { count: 1, reset: now + win });
    return false;
  }
  rec.count++;
  return rec.count > max;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (rateLimited(ip)) {
      return new Response(JSON.stringify({ error: "rate_limited" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const b = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // suppression check
    if (b.phone_e164) {
      const { data: sup } = await supabase
        .from("intake_suppressions")
        .select("id")
        .eq("phone_e164", b.phone_e164)
        .maybeSingle();
      if (sup) {
        // still record lead but mark sms skipped
      }
    }

    // Route: pick default team = primary_service
    const routingTeamKey =
      b.routing_team_key || (b.services.length > 1 ? "multi" : b.primary_service || b.services[0] || null);

    const status = b.partial ? "abandoned" : b.status || "new";

    // De-dupe abandoned → replace previous abandoned with same phone
    if (b.partial && b.phone_e164) {
      await supabase
        .from("intake_leads")
        .delete()
        .eq("phone_normalized", b.phone_e164.replace(/\D/g, ""))
        .eq("status", "abandoned");
    }

    const { data: lead, error: insErr } = await supabase
      .from("intake_leads")
      .insert({
        source: b.source,
        status,
        services: b.services,
        primary_service: b.primary_service ?? null,
        answers: b.answers,
        first_name: b.first_name,
        last_name: b.last_name,
        phone_e164: b.phone_e164,
        email: b.email,
        zip: b.zip,
        timezone: b.timezone,
        language: b.language,
        best_time: b.best_time,
        referrer_id: b.referrer_id ?? null,
        referrer_in_thread: !!b.referrer_in_thread,
        speaking_with: b.speaking_with,
        temperature: b.temperature,
        routing_team_key: routingTeamKey,
        routing_overridden: !!b.routing_overridden,
        staff_notes: b.staff_notes,
        appointment_status: b.appointment_status ?? null,
        appointment_at: b.appointment_at ?? null,
        preferred_contact_at: b.preferred_contact_at ?? null,
        hold_automation: !!b.hold_automation,
        sms_status: "n/a",
      })
      .select("id, resume_token")
      .single();

    if (insErr) throw insErr;

    // Log consent
    if (b.consent && !b.partial) {
      const logs: any[] = [];
      const base = {
        lead_id: lead.id,
        language: b.language,
        ip,
        user_agent: b.user_agent ?? null,
        page_url: b.page_url ?? null,
        consent_text_version: b.consent.version,
      };
      if (b.consent.tcpa) {
        logs.push({
          ...base,
          consent_type: "tcpa_web",
          consent_text_snapshot: "TCPA web consent (see stored version)",
        });
      }
      if (b.consent.verbal) {
        logs.push({
          ...base,
          consent_type: "tcpa_verbal",
          consent_text_snapshot: b.consent.verbal_script || "verbal",
        });
      }
      if (b.consent.referrer_inclusion) {
        logs.push({
          ...base,
          consent_type: "referrer_inclusion",
          consent_text_snapshot: "Referrer inclusion agreed",
        });
      }
      if (b.consent.senior_trust) {
        logs.push({
          ...base,
          consent_type: "ca_senior_trust_disclosure",
          consent_text_snapshot: "CA Ins. Code Art. 6.3 disclosed at intake",
        });
      }
      if (logs.length > 0) {
        await supabase.from("intake_consent_log").insert(logs);
      }
    }

    // Messaging, quiet-hours, routing sends, and opt-outs are handled by GoHighLevel.
    // A DB trigger on intake_leads INSERT forwards this lead to the forward-to-ghl edge function.
    return new Response(JSON.stringify({ lead_id: lead.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("intake-submit error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});