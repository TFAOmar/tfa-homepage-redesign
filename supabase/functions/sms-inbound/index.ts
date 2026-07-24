import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN") || "";
const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID") || "";
const TWILIO_CONVERSATIONS_SERVICE_SID = Deno.env.get("TWILIO_CONVERSATIONS_SERVICE_SID") || "";
const TWILIO_FROM_NUMBER = Deno.env.get("TWILIO_FROM_NUMBER") || "";

const STOP_WORDS = /\b(STOP|END|QUIT|CANCEL|UNSUBSCRIBE|REVOKE|OPT\s*OUT|ALTO|CANCELAR)\b/i;
const NEGATIVE_HINTS = /(stop texting|leave me alone|not interested|no me llamen|no quiero|dejame|déjame en paz|don'?t contact)/i;

function basicAuth() {
  return "Basic " + btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
}

async function sendSingleSMS(to: string, body: string) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER || !to) return;
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
    method: "POST",
    headers: { Authorization: basicAuth(), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ To: to, From: TWILIO_FROM_NUMBER, Body: body }),
  });
}

async function removeParticipant(conversationSid: string, participantSid: string) {
  if (!TWILIO_CONVERSATIONS_SERVICE_SID) return;
  await fetch(
    `https://conversations.twilio.com/v1/Services/${TWILIO_CONVERSATIONS_SERVICE_SID}/Conversations/${conversationSid}/Participants/${participantSid}`,
    { method: "DELETE", headers: { Authorization: basicAuth() } },
  );
}

async function closeConversation(conversationSid: string) {
  if (!TWILIO_CONVERSATIONS_SERVICE_SID) return;
  await fetch(
    `https://conversations.twilio.com/v1/Services/${TWILIO_CONVERSATIONS_SERVICE_SID}/Conversations/${conversationSid}`,
    {
      method: "POST",
      headers: { Authorization: basicAuth(), "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ State: "closed" }),
    },
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const contentType = req.headers.get("content-type") || "";
    let payload: Record<string, string> = {};
    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else {
      const form = await req.formData();
      for (const [k, v] of form.entries()) payload[k] = String(v);
    }

    // Twilio Conversations webhook fields
    const conversationSid = payload.ConversationSid || payload.conversation_sid || null;
    const body = payload.Body || payload.body || "";
    const author = payload.Author || payload.author || "";
    const participantSid = payload.ParticipantSid || payload.participant_sid || "";
    const messageSid = payload.MessageSid || payload.message_sid || "";

    // Find lead by conversation_sid (may be null for legacy Messages webhooks)
    let lead: any = null;
    if (conversationSid) {
      const { data } = await supabase
        .from("intake_leads")
        .select("*")
        .eq("conversation_sid", conversationSid)
        .maybeSingle();
      lead = data;
    }

    // Log every message
    await supabase.from("intake_sms_events").insert({
      lead_id: lead?.id ?? null,
      conversation_sid: conversationSid,
      direction: "inbound",
      author,
      body,
      event_type: payload.EventType || "message.added",
      severity: "info",
      raw: payload as any,
      occurred_at: new Date().toISOString(),
    });

    if (!body) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const isStop = STOP_WORDS.test(body.trim());
    const isNegative = !isStop && NEGATIVE_HINTS.test(body);

    if (isNegative) {
      await supabase
        .from("intake_sms_events")
        .update({ needs_review: true, severity: "warn" })
        .eq("conversation_sid", conversationSid)
        .eq("body", body)
        .order("occurred_at", { ascending: false })
        .limit(1);
    }

    if (isStop && lead) {
      const isEs = /ALTO|CANCELAR/i.test(body);
      const lang = isEs ? "es" : "en";
      const isClient = author && lead.phone_e164 && author.replace(/\D/g, "").endsWith(lead.phone_e164.replace(/\D/g, "").slice(-10));
      // Suppress the sender
      const senderPhone = author.startsWith("+") ? author : null;
      if (senderPhone) {
        await supabase
          .from("intake_suppressions")
          .insert({ phone_e164: senderPhone, reason: `stop_word:${body.trim().slice(0, 40)}`, occurred_at: new Date().toISOString() });
      }

      // Fetch opt-out template
      const { data: tpl } = await supabase
        .from("intake_sms_templates")
        .select("body")
        .eq("team_key", "all")
        .eq("language", lang)
        .eq("kind", "opt_out_confirm")
        .maybeSingle();
      const confirm = tpl?.body || (isEs ? "Has cancelado los mensajes." : "You are opted out.");

      if (isClient) {
        await closeConversation(conversationSid!);
        await supabase.from("intake_leads").update({ sms_status: "opted_out" }).eq("id", lead.id);
        await sendSingleSMS(senderPhone!, confirm);
      } else {
        if (participantSid) await removeParticipant(conversationSid!, participantSid);
        await supabase.from("intake_leads").update({ referrer_in_thread: false }).eq("id", lead.id);
        await sendSingleSMS(senderPhone!, confirm);
      }

      // Alert staff
      try {
        await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/notify-lead`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({ lead_id: lead.id, alert: `SMS opt-out (${isClient ? "client" : "referrer"})` }),
        });
      } catch {
        /* best effort */
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("sms-inbound error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});