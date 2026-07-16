import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RECIPIENTS = ["minhwin80@gmail.com", "leads@tfainsuranceadvisors.com"];
const FROM = "TFA Leads <noreply@tfainsuranceadvisors.com>";

const escapeHtml = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// In-memory rate limit: 5 sends / min per IP+lead_id
const rate = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
function rateLimited(key: string) {
  const now = Date.now();
  const bucket = rate.get(key);
  if (!bucket || bucket.reset < now) {
    rate.set(key, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const leadId = typeof body?.lead_id === "string" ? body.lead_id : "";
    if (!/^[0-9a-f-]{36}$/i.test(leadId)) {
      return new Response(JSON.stringify({ error: "invalid lead_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(`${ip}:${leadId}`)) {
      return new Response(JSON.stringify({ error: "rate limited" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: lead, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .maybeSingle();

    if (error || !lead) {
      return new Response(JSON.stringify({ error: "not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const label = lead.funnel === "protect" ? "Mortgage Protection" : "Living Trust";
    const nameStr = `${lead.first_name ?? ""} ${lead.last_name ?? ""}`.trim();
    const subject = `New ${label} lead${nameStr ? ` — ${nameStr}` : ""}`;

    const rows = Object.entries(lead.payload ?? {})
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${escapeHtml(
            k,
          )}</td><td style="padding:4px 0">${escapeHtml(
            typeof v === "object" ? JSON.stringify(v) : v,
          )}</td></tr>`,
      )
      .join("");

    const html = `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:640px;margin:0 auto">
        <div style="background:#1E3A5F;color:#fff;padding:20px 24px;border-radius:8px 8px 0 0">
          <h2 style="margin:0;font-size:18px">${escapeHtml(subject)}</h2>
          <p style="margin:4px 0 0;color:#C9A84C;font-size:13px">The Financial Architects — Referral Lead</p>
        </div>
        <div style="border:1px solid #eee;border-top:0;padding:20px 24px;border-radius:0 0 8px 8px">
          <p style="margin:0 0 12px">
            <strong>Email:</strong> ${escapeHtml(lead.email)}<br>
            <strong>Phone:</strong> ${escapeHtml(lead.phone)}<br>
            <strong>State:</strong> ${escapeHtml(lead.state)}<br>
            <strong>Referral source:</strong> ${escapeHtml(lead.referral_source)}${
              lead.utm_campaign ? ` / ${escapeHtml(lead.utm_campaign)}` : ""
            }<br>
            <strong>Status:</strong> ${
              lead.is_complete ? "Complete" : `Incomplete — stopped at step ${lead.last_step ?? 0}`
            }
          </p>
          <table style="font-size:14px;border-top:1px solid #eee;padding-top:12px;width:100%">${rows}</table>
          <p style="font-size:12px;color:#888;margin-top:16px">
            Submitted ${new Date(lead.created_at).toLocaleString("en-US", {
              timeZone: "America/Los_Angeles",
            })} PT
          </p>
        </div>
      </div>
    `;

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ error: "email not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: RECIPIENTS,
        reply_to: lead.email ?? undefined,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resend failed:", res.status, text);
      return new Response(JSON.stringify({ error: "send failed", details: text }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("notify-lead error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
