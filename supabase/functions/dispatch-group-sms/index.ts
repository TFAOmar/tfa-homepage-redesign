import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

// Direct Twilio auth (Conversations lives at conversations.twilio.com,
// which is not covered by the connector gateway's Accounts-prefixed base URL).
const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID") || "";
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN") || "";
const TWILIO_FROM_NUMBER = Deno.env.get("TWILIO_FROM_NUMBER") || "";
const TWILIO_CONVERSATIONS_SERVICE_SID = Deno.env.get("TWILIO_CONVERSATIONS_SERVICE_SID") || "";

function basicAuth(): string {
  return "Basic " + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
}

function render(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

// Quiet hours: 08:05–20:55 local time
function isQuietHoursNow(tz: string): { quiet: boolean; nextRunISO?: string } {
  try {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const parts = fmt.formatToParts(now);
    const hh = parseInt(parts.find((p) => p.type === "hour")!.value, 10);
    const mm = parseInt(parts.find((p) => p.type === "minute")!.value, 10);
    const minutes = hh * 60 + mm;
    const start = 8 * 60 + 5;
    const end = 20 * 60 + 55;
    if (minutes >= start && minutes <= end) return { quiet: false };
    // schedule next 08:05 local — best-effort: add hours until we land in window
    const next = new Date(now.getTime());
    // step 15 min until we hit window
    for (let i = 0; i < 24 * 4; i++) {
      next.setTime(next.getTime() + 15 * 60 * 1000);
      const p = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(next);
      const h = parseInt(p.find((x) => x.type === "hour")!.value, 10);
      const m = parseInt(p.find((x) => x.type === "minute")!.value, 10);
      const mins = h * 60 + m;
      if (mins >= start && mins <= end) break;
    }
    return { quiet: true, nextRunISO: next.toISOString() };
  } catch {
    return { quiet: false };
  }
}

async function logEvent(supabase: any, row: Record<string, unknown>) {
  try {
    await supabase.from("intake_sms_events").insert({ occurred_at: new Date().toISOString(), ...row });
  } catch (e) {
    console.error("logEvent failed", e);
  }
}

async function sendSingleSMS(to: string, body: string): Promise<{ ok: boolean; sid?: string; error?: string }> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
    return { ok: false, error: "twilio_not_configured" };
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: basicAuth(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: to, From: TWILIO_FROM_NUMBER, Body: body }),
  });
  const txt = await res.text();
  if (!res.ok) return { ok: false, error: `[${res.status}] ${txt}` };
  try {
    const j = JSON.parse(txt);
    return { ok: true, sid: j.sid };
  } catch {
    return { ok: true };
  }
}

async function createConversationWithParticipants(args: {
  friendlyName: string;
  participants: Array<{ address?: string; identity?: string; proxyAddress?: string }>;
}): Promise<{ ok: boolean; sid?: string; error?: string }> {
  if (!TWILIO_CONVERSATIONS_SERVICE_SID) return { ok: false, error: "conversations_service_not_configured" };
  const base = `https://conversations.twilio.com/v1/Services/${TWILIO_CONVERSATIONS_SERVICE_SID}`;
  // 1) create conversation
  const cRes = await fetch(`${base}/Conversations`, {
    method: "POST",
    headers: { Authorization: basicAuth(), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ FriendlyName: args.friendlyName }),
  });
  const cTxt = await cRes.text();
  if (!cRes.ok) return { ok: false, error: `conv_create [${cRes.status}] ${cTxt}` };
  const conv = JSON.parse(cTxt);
  const sid = conv.sid as string;

  // 2) add participants sequentially
  for (const p of args.participants) {
    const params = new URLSearchParams();
    if (p.address) params.set("MessagingBinding.Address", p.address);
    if (p.proxyAddress) params.set("MessagingBinding.ProxyAddress", p.proxyAddress);
    if (p.identity) params.set("Identity", p.identity);
    const pRes = await fetch(`${base}/Conversations/${sid}/Participants`, {
      method: "POST",
      headers: { Authorization: basicAuth(), "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    if (!pRes.ok) {
      const pTxt = await pRes.text();
      return { ok: false, sid, error: `participant [${pRes.status}] ${pTxt}` };
    } else {
      await pRes.text();
    }
  }
  return { ok: true, sid };
}

async function postConversationMessage(sid: string, author: string, body: string): Promise<{ ok: boolean; error?: string }> {
  const url = `https://conversations.twilio.com/v1/Services/${TWILIO_CONVERSATIONS_SERVICE_SID}/Conversations/${sid}/Messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: basicAuth(), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ Author: author, Body: body }),
  });
  const t = await res.text();
  if (!res.ok) return { ok: false, error: `[${res.status}] ${t}` };
  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const { lead_id } = await req.json();
    if (!lead_id) {
      return new Response(JSON.stringify({ error: "lead_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: lead, error: leadErr } = await supabase
      .from("intake_leads")
      .select("*")
      .eq("id", lead_id)
      .single();
    if (leadErr || !lead) throw leadErr || new Error("lead_not_found");

    // Idempotency
    if (lead.intro_sent_at) {
      return new Response(JSON.stringify({ status: "already_sent" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Route
    const services: string[] = lead.services || [];
    let teamKey = lead.routing_team_key as string | null;
    if (!lead.routing_overridden) {
      if (services.length > 1) teamKey = "multi";
      else {
        const s = (lead.primary_service || services[0] || "").toLowerCase();
        if (s.includes("trust")) teamKey = "trust";
        else if (s.includes("life")) teamKey = "life";
        else if (s.includes("retire")) teamKey = "retirement";
        else teamKey = "multi";
      }
    }

    // Assign member atomically
    const { data: assignRows, error: assignErr } = await supabase.rpc("intake_assign_member", {
      p_team_key: teamKey,
      p_language: lead.language || "en",
    });
    if (assignErr) throw assignErr;
    const assign = Array.isArray(assignRows) && assignRows[0];
    if (!assign) {
      await supabase
        .from("intake_leads")
        .update({ sms_status: "no_member_available", routing_reason: `no member for ${teamKey}` })
        .eq("id", lead_id);
      return new Response(JSON.stringify({ status: "no_member_available", team_key: teamKey }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Quiet hours
    const tz = lead.timezone || "America/Los_Angeles";
    const qh = isQuietHoursNow(tz);
    if (qh.quiet) {
      await supabase
        .from("intake_leads")
        .update({
          sms_status: "queued_quiet_hours",
          intro_scheduled_for: qh.nextRunISO,
          assigned_member_id: assign.member_id,
          routing_team_key: teamKey,
          routing_reason: `assigned ${assign.member_name}${assign.was_language_preferred ? "" : " (lang fallback)"}`,
        })
        .eq("id", lead_id);
      return new Response(JSON.stringify({ status: "queued_quiet_hours", scheduled_for: qh.nextRunISO }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Suppression check
    const phonesToCheck = [lead.phone_e164].filter(Boolean) as string[];
    let referrer: any = null;
    if (lead.referrer_id) {
      const { data: r } = await supabase.from("intake_referrers").select("*").eq("id", lead.referrer_id).maybeSingle();
      referrer = r;
      if (r?.phone_e164) phonesToCheck.push(r.phone_e164);
    }
    let suppressed = new Set<string>();
    if (phonesToCheck.length > 0) {
      const { data: sup } = await supabase
        .from("intake_suppressions")
        .select("phone_e164")
        .in("phone_e164", phonesToCheck);
      suppressed = new Set((sup || []).map((s: any) => s.phone_e164));
    }
    if (lead.phone_e164 && suppressed.has(lead.phone_e164)) {
      await supabase
        .from("intake_leads")
        .update({ sms_status: "suppressed", assigned_member_id: assign.member_id, routing_team_key: teamKey })
        .eq("id", lead_id);
      return new Response(JSON.stringify({ status: "suppressed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Load team + template
    const { data: team } = await supabase.from("intake_teams").select("*").eq("key", teamKey).maybeSingle();
    const lang = lead.language || "en";
    const { data: tpl } = await supabase
      .from("intake_sms_templates")
      .select("body")
      .eq("team_key", teamKey)
      .eq("language", lang)
      .eq("kind", "intro")
      .maybeSingle();
    const schedulingUrl = (lang === "es" ? team?.scheduling_url_es : team?.scheduling_url) || assign.scheduling_link || "";

    const vars = {
      first_name: lead.first_name || "there",
      referrer_name: referrer?.display_name || "TFA",
      member_name: assign.member_name || "our team",
      scheduling_url: schedulingUrl,
    };
    const introBody = tpl?.body ? render(tpl.body, vars) : `Hi ${vars.first_name}, ${vars.member_name} from TFA — ${schedulingUrl}. Reply STOP to opt out.`;

    // Include referrer only if opted in
    const includeReferrer =
      !!lead.referrer_in_thread &&
      referrer?.sms_notify_optin === true &&
      referrer?.phone_e164 &&
      !suppressed.has(referrer.phone_e164);

    const projectedAddress = team?.twilio_projected_address || TWILIO_FROM_NUMBER;

    // Try Conversations first
    let convResult: { ok: boolean; sid?: string; error?: string } = { ok: false, error: "not_attempted" };
    if (TWILIO_CONVERSATIONS_SERVICE_SID && projectedAddress) {
      const participants: Array<{ address?: string; identity?: string; proxyAddress?: string }> = [
        { address: lead.phone_e164, proxyAddress: projectedAddress },
        { identity: `team:${teamKey}:${assign.member_id}` },
      ];
      if (includeReferrer) participants.push({ address: referrer.phone_e164, proxyAddress: projectedAddress });
      convResult = await createConversationWithParticipants({
        friendlyName: `Lead ${lead_id.slice(0, 8)} · ${teamKey}`,
        participants,
      });
      if (convResult.ok && convResult.sid) {
        const post = await postConversationMessage(convResult.sid, projectedAddress, introBody);
        if (!post.ok) convResult = { ok: false, sid: convResult.sid, error: post.error };
      }
    }

    let fallback = false;
    if (!convResult.ok) {
      fallback = true;
      await logEvent(supabase, {
        lead_id,
        event_type: "conversations_failed",
        severity: "warn",
        raw: { error: convResult.error },
      });
      // Fallback: two independent SMS
      const clientSend = await sendSingleSMS(lead.phone_e164, introBody);
      await logEvent(supabase, {
        lead_id,
        direction: "outbound",
        author: projectedAddress,
        body: introBody,
        event_type: clientSend.ok ? "fallback_sent_client" : "fallback_error_client",
        severity: clientSend.ok ? "info" : "error",
        raw: clientSend,
      });
      if (includeReferrer) {
        const { data: refTpl } = await supabase
          .from("intake_sms_templates")
          .select("body")
          .eq("team_key", teamKey)
          .eq("language", lang)
          .eq("kind", "referrer_declined")
          .maybeSingle();
        const refBody = render(refTpl?.body || "A viewer you referred just connected with our team — we're on it. — TFA", vars);
        const refSend = await sendSingleSMS(referrer.phone_e164, refBody);
        await logEvent(supabase, {
          lead_id,
          direction: "outbound",
          author: projectedAddress,
          body: refBody,
          event_type: refSend.ok ? "fallback_sent_referrer" : "fallback_error_referrer",
          severity: refSend.ok ? "info" : "error",
          raw: refSend,
        });
      }
    } else {
      await logEvent(supabase, {
        lead_id,
        conversation_sid: convResult.sid,
        direction: "outbound",
        author: projectedAddress,
        body: introBody,
        event_type: "conversation_intro_sent",
        severity: "info",
      });
    }

    await supabase
      .from("intake_leads")
      .update({
        sms_status: convResult.ok ? "sent" : fallback ? "sent_fallback" : "error",
        assigned_member_id: assign.member_id,
        routing_team_key: teamKey,
        routing_reason: `assigned ${assign.member_name}${assign.was_language_preferred ? "" : " (lang fallback)"}`,
        conversation_sid: convResult.sid ?? null,
        intro_sent_at: new Date().toISOString(),
        intro_fallback: fallback,
      })
      .eq("id", lead_id);

    return new Response(
      JSON.stringify({
        status: convResult.ok ? "sent" : fallback ? "sent_fallback" : "error",
        conversation_sid: convResult.sid,
        fallback,
        error: convResult.error,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("dispatch-group-sms error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});