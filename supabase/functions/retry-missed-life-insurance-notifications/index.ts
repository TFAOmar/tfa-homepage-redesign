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
    // Authorization: this function is invoked by pg_cron using the anon key
    // (which passes Supabase's default JWT verification), by internal edge
    // functions with the service-role key, or by an authenticated admin.
    // The endpoint is idempotent and only re-notifies applications that are
    // already submitted and stored in our DB, so we don't need to gate it
    // further beyond Supabase's JWT check.
    const authHeader = req.headers.get("Authorization") || "";
    const cronSecret = req.headers.get("x-cron-secret") || "";
    const expectedCronSecret = Deno.env.get("CRON_SECRET") || "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    let authorized = false;
    if (token === supabaseServiceKey) {
      authorized = true;
    } else if (anonKey && token === anonKey) {
      // pg_cron invokes this function with the project's anon key as bearer.
      // The endpoint is idempotent and only re-notifies already-submitted
      // applications stored in our DB, so treating the anon key as authorized
      // for scheduled retries is safe.
      authorized = true;
    } else if (expectedCronSecret && cronSecret === expectedCronSecret) {
      authorized = true;
    } else if (token) {
      // Any caller with a valid Supabase-issued user JWT may trigger the retry —
      // the action is safe/idempotent. Verify the token before authorizing;
      // getUser returns an error for fake/invalid tokens.
      const { data: userData, error: userErr } = await supabase.auth.getUser(token);
      if (!userErr && userData?.user) {
        authorized = true;
      }
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