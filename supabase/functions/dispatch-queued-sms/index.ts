import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  // Cron-only auth
  const cronSecret = Deno.env.get("CRON_SECRET");
  const auth = req.headers.get("authorization") || req.headers.get("x-cron-secret") || "";
  if (!cronSecret || !(auth === `Bearer ${cronSecret}` || auth === cronSecret)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: due } = await supabase
    .from("intake_leads")
    .select("id")
    .eq("sms_status", "queued_quiet_hours")
    .lte("intro_scheduled_for", new Date().toISOString())
    .limit(50);

  const projectUrl = Deno.env.get("SUPABASE_URL")!;
  let dispatched = 0;
  for (const row of due || []) {
    try {
      const res = await fetch(`${projectUrl}/functions/v1/dispatch-group-sms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-source": "cron",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
        body: JSON.stringify({ lead_id: row.id }),
      });
      await res.text();
      dispatched++;
    } catch (e) {
      console.error("dispatch failed", e);
    }
  }

  return new Response(JSON.stringify({ dispatched }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});