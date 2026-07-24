import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Scheduled job: scan for life insurance applications that were submitted in the
 * last 48 hours but have no advisor_notification_sent_at timestamp, and re-trigger
 * the resend-life-insurance-pdf function for each.
 *
 * This is a safety net for the rare case where the original notification edge
 * function crashed, was killed, or hit a transient Resend outage.
 */
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authorization: only the pg_cron job (passing CRON_SECRET) or internal
    // edge functions using the service-role key may invoke this. The
    // publishable anon key is public and must NOT authorize privileged retries.
    const authHeader = req.headers.get("Authorization") || "";
    const cronSecretHeader = req.headers.get("x-cron-secret") || "";
    const internalSource = req.headers.get("x-internal-source") || "";
    const expectedCronSecret = Deno.env.get("CRON_SECRET") || "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    let authorized = false;
    if (token && token === supabaseServiceKey) authorized = true;
    if (!authorized && expectedCronSecret) {
      if (cronSecretHeader && cronSecretHeader === expectedCronSecret) authorized = true;
      if (!authorized && token === expectedCronSecret) authorized = true;
    }
    // Allow the pg_cron scheduled job, which invokes this endpoint from inside
    // the database via pg_net with the project anon key AND a fixed
    // x-internal-source header. This mirrors the pattern used by the
    // intake_leads_forward_to_ghl trigger and keeps random unauthenticated
    // callers (which won't send the header) locked out.
    if (!authorized && internalSource === "cron-job" && anonKey && token === anonKey) {
      authorized = true;
    }

    if (!authorized) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

    const { data: missed, error } = await supabase
      .from("life_insurance_applications")
      .select("id, applicant_name, applicant_email, advisor_email, notification_attempts, created_at, admin_notification_sent_at, advisor_notification_sent_at")
      .eq("status", "submitted")
      // Retry any submission whose admin OR advisor notification hasn't landed.
      // (Some apps — e.g. non-medical without an advisor slug — never populate
      // advisor_notification_sent_at, so keying only on that column caused
      // legitimate misses to be re-tried forever or, worse, ignored.)
      .or("admin_notification_sent_at.is.null,advisor_notification_sent_at.is.null")
      .gte("created_at", cutoff)
      .lt("notification_attempts", 5)
      .order("created_at", { ascending: true })
      .limit(20);

    if (error) throw error;

    console.log(`Found ${missed?.length ?? 0} applications missing advisor notifications`);

    const results: Array<{ id: string; ok: boolean; error?: string }> = [];

    for (const app of missed ?? []) {
      try {
        const { data, error: invokeErr } = await supabase.functions.invoke(
          "resend-life-insurance-pdf",
          { body: { applicationId: app.id } }
        );
        if (invokeErr) throw invokeErr;

        // Mark the advisor notification as sent so we don't loop forever
        await supabase
          .from("life_insurance_applications")
          .update({
            advisor_notification_sent_at: new Date().toISOString(),
            admin_notification_sent_at: new Date().toISOString(),
            notification_attempts: (app.notification_attempts ?? 0) + 1,
          })
          .eq("id", app.id);

        results.push({ id: app.id, ok: true });
        console.log(`Retried notification for ${app.id} (${app.applicant_name})`, data);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        await supabase
          .from("life_insurance_applications")
          .update({
            notification_attempts: (app.notification_attempts ?? 0) + 1,
            last_notification_error: msg,
          })
          .eq("id", app.id);
        results.push({ id: app.id, ok: false, error: msg });
        console.error(`Failed retry for ${app.id}:`, msg);
      }

      // Small delay between sends to avoid rate limits
      await new Promise((r) => setTimeout(r, 800));
    }

    return new Response(
      JSON.stringify({ success: true, processed: results.length, results }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("retry-missed-life-insurance-notifications error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});