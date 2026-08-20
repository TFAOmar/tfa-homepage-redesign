// Admin-only: regenerate the PDF for a stored living trust questionnaire
// submission and resend it to the advisor's approved business email.
// Never runs automatically — every call is admin-authenticated and audited.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { generateEstatePlanningPdf } from "../_shared/estatePlanningPdf.ts";
import { resolveAdvisorRecipient } from "../_shared/advisorRouting.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const esc = (v: unknown): string =>
  String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

const schema = z.object({ submissionId: z.string().uuid() });

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // --- Admin auth
  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "unauthorized" }, 401);
  const { data: userData } = await supabase.auth.getUser(token);
  const user = userData?.user;
  if (!user) return json({ error: "unauthorized" }, 401);
  const { data: isAdmin } = await supabase.rpc("has_role", {
    _user_id: user.id,
    _role: "admin",
  });
  if (isAdmin !== true) return json({ error: "forbidden" }, 403);

  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);

  const { data: app, error: appErr } = await supabase
    .from("estate_planning_applications")
    .select("*")
    .eq("id", parsed.data.submissionId)
    .maybeSingle();
  if (appErr || !app) return json({ error: "submission_not_found" }, 404);

  const slugFromUrl = (app.source_url as string | null)?.match(/\/advisors\/([^/?#]+)/)?.[1];
  const resolvedSlug = (app.advisor_id as string | null) || slugFromUrl || null;
  const routing = await resolveAdvisorRecipient(supabase, resolvedSlug, app.advisor_email);
  const recipient = routing.recipient;

  const submittedAtLabel = new Date(app.submitted_at ?? app.created_at).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "short",
  });

  let pdfBase64: string | null = null;
  let pdfStatus = "generated";
  let pdfError: string | null = null;
  try {
    pdfBase64 = generateEstatePlanningPdf(
      {
        submissionId: app.id,
        submittedAt: submittedAtLabel,
        advisorName: app.advisor_name ?? "TFA Advisor",
        advisorSlug: resolvedSlug ?? "",
        advisorEmail: recipient,
        applicantName: app.applicant_name ?? "Unknown",
        applicantEmail: app.applicant_email ?? "",
        applicantPhone: app.applicant_phone ?? "",
        spouseName: app.spouse_name,
        sourceUrl: app.source_url,
      },
      (app.form_data ?? {}) as Record<string, unknown>,
    );
  } catch (e) {
    pdfStatus = "failed";
    pdfError = e instanceof Error ? e.message : String(e);
    console.error("PDF generation failed:", pdfError);
  }

  if (!pdfBase64) {
    await supabase.from("notification_audit_log").insert({
      submission_id: app.id,
      advisor_slug: resolvedSlug,
      advisor_name: app.advisor_name,
      requested_email: app.advisor_email,
      resolved_recipient: recipient,
      to_recipients: [],
      pdf_status: pdfStatus,
      delivery_status: "failed",
      is_resend: true,
      triggered_by: user.id,
      error_details: `pdf: ${pdfError}`,
    });
    return json({ error: "pdf_generation_failed", details: pdfError }, 500);
  }

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#0f172a;">
      <h2 style="color:#1E3A5F;">Living Trust Questionnaire (resent)</h2>
      <p>Attached is the complete questionnaire submitted by
        <strong>${esc(app.applicant_name)}</strong>.</p>
      <p style="color:#64748b;font-size:14px;">
        Submission ID: ${esc(app.id)}<br/>
        Submitted: ${esc(submittedAtLabel)}<br/>
        Advisor: ${esc(app.advisor_name)}${resolvedSlug ? ` (${esc(resolvedSlug)})` : ""}<br/>
        Client email: ${esc(app.applicant_email)}<br/>
        Client phone: ${esc(app.applicant_phone)}
      </p>
      <p style="color:#94a3b8;font-size:12px;">Sent manually from the TFA admin dashboard. Confidential — client information.</p>
    </div>`;

  const { data: emailData, error: emailError } = await resend.emails.send({
    from: "TFA Estate Planning <noreply@tfainsuranceadvisors.com>",
    to: [recipient],
    subject: `Living Trust Questionnaire (resent) - ${app.applicant_name}`,
    html,
    attachments: [
      {
        filename: `TFA_Living_Trust_Questionnaire_${String(app.id).slice(0, 8).toUpperCase()}.pdf`,
        content: pdfBase64,
      },
    ],
  });

  await supabase.from("notification_audit_log").insert({
    submission_id: app.id,
    advisor_slug: resolvedSlug,
    advisor_name: app.advisor_name,
    requested_email: app.advisor_email,
    resolved_recipient: recipient,
    to_recipients: [recipient],
    cc_recipients: [],
    bcc_recipients: [],
    provider_message_id: emailData?.id ?? null,
    pdf_status: pdfStatus,
    delivery_status: emailError ? "failed" : "sent",
    is_resend: true,
    triggered_by: user.id,
    error_details: emailError ? JSON.stringify(emailError) : null,
  });

  if (emailError) return json({ error: "send_failed", details: emailError }, 502);
  return json({ success: true, recipient, messageId: emailData?.id, pdfStatus });
});
