import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limit: 30/min per IP+lead_id
const rate = new Map<string, { count: number; reset: number }>();
function rateLimited(key: string) {
  const now = Date.now();
  const bucket = rate.get(key);
  if (!bucket || bucket.reset < now) {
    rate.set(key, { count: 1, reset: now + 60_000 });
    return false;
  }
  bucket.count += 1;
  return bucket.count > 30;
}

const MAX_PAYLOAD_BYTES = 64 * 1024;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const raw = await req.text();
    if (raw.length > MAX_PAYLOAD_BYTES) {
      return new Response(JSON.stringify({ error: "payload too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const body = JSON.parse(raw || "{}");
    const leadId = typeof body?.lead_id === "string" ? body.lead_id : "";
    const resumeToken = typeof body?.resume_token === "string" ? body.resume_token : "";
    const lastStep = Number.isInteger(body?.last_step) ? body.last_step : 0;
    const payload = body?.payload && typeof body.payload === "object" ? body.payload : {};
    const isComplete = body?.is_complete === true;

    if (!/^[0-9a-f-]{36}$/i.test(leadId)) {
      return new Response(JSON.stringify({ error: "invalid lead_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resumeToken || resumeToken.length < 8 || resumeToken.length > 128) {
      return new Response(JSON.stringify({ error: "invalid resume_token" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (lastStep < 0 || lastStep > 20) {
      return new Response(JSON.stringify({ error: "invalid last_step" }), {
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

    // Verify caller possesses the resume_token for this lead.
    const { data: existing, error: fetchErr } = await supabase
      .from("leads")
      .select("resume_token")
      .eq("id", leadId)
      .maybeSingle();
    if (fetchErr || !existing) {
      return new Response(JSON.stringify({ error: "not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (String(existing.resume_token) !== resumeToken) {
      return new Response(JSON.stringify({ error: "forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const updates: Record<string, unknown> = {
      payload,
      last_step: lastStep,
    };
    if (isComplete) updates.is_complete = true;

    // Merge contact fields if provided (safe: server-side, unauthenticated but keyed on lead_id)
    for (const k of ["first_name", "last_name", "email", "phone", "state"]) {
      if (typeof body[k] === "string" && body[k].length <= 255) updates[k] = body[k];
    }

    const { error } = await supabase.from("leads").update(updates).eq("id", leadId);
    if (error) throw error;

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("save-lead-progress error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
