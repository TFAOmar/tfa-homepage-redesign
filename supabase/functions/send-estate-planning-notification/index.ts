import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { generateEstatePlanningPdf } from "../_shared/estatePlanningPdf.ts";
import { resolveAdvisorRecipient } from "../_shared/advisorRouting.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const esc = (v: unknown): string =>
  String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const rateMap = new Map<string, number[]>();
const limited = (k: string) => {
  const now = Date.now();
  const arr = (rateMap.get(k) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX) { rateMap.set(k, arr); return true; }
  arr.push(now); rateMap.set(k, arr); return false;
};

const schema = z.object({
  applicantName: z.string().trim().min(1).max(200),
  applicantEmail: z.string().trim().email().max(255),
  applicantPhone: z.string().trim().min(1).max(40),
  spouseName: z.string().trim().max(200).nullable().optional(),
  formData: z.record(z.unknown()),
  advisorEmail: z.string().trim().email().max(255).optional(),
  advisorName: z.string().trim().max(200).optional(),
  advisorSlug: z.string().trim().max(120).optional(),
  sourceUrl: z.string().trim().max(2000).optional(),
});

const handler = async (req: Request): Promise<Response> => {
  console.log("Estate planning notification function invoked");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (limited(`ip:${ip}`)) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const parsedReq = schema.safeParse(await req.json());
    if (!parsedReq.success) {
      return new Response(
        JSON.stringify({ error: parsedReq.error.flatten().fieldErrors }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    const requestData = parsedReq.data;
    console.log("Request data received:", {
      applicantName: requestData.applicantName,
      applicantEmail: requestData.applicantEmail,
      hasFormData: !!requestData.formData,
    });

    const {
      applicantName,
      applicantEmail,
      applicantPhone,
      spouseName,
      formData,
      advisorEmail,
      advisorName = "TFA Advisor",
      advisorSlug,
      sourceUrl,
    } = requestData;

    // Validate required fields
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save to database
    console.log("Saving application to database...");
    const { data: savedApp, error: dbError } = await supabase
      .from("estate_planning_applications")
      .insert({
        applicant_name: applicantName,
        applicant_email: applicantEmail,
        applicant_phone: applicantPhone,
        spouse_name: spouseName,
        form_data: formData,
        advisor_name: advisorName,
        advisor_email: advisorEmail,
        source_url: sourceUrl,
        status: "submitted",
        current_step: 8,
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to save application: ${dbError.message}`);
    }

    console.log("Application saved with ID:", savedApp.id);

    // Extract form data for email summary
    const step1 = formData.step1 as Record<string, unknown> || {};
    const step2 = formData.step2 as Record<string, unknown> || {};
    const step3 = formData.step3 as Record<string, unknown> || {};
    const step4 = formData.step4 as Record<string, unknown> || {};
    const step5 = formData.step5 as Record<string, unknown> || {};
    const step6 = formData.step6 as Record<string, unknown> || {};
    const step7 = formData.step7 as Record<string, unknown> || {};
    const step8 = formData.step8 as Record<string, unknown> || {};

    // Build beneficiaries summary
    const beneficiaries = step4.beneficiaries as Array<Record<string, unknown>> || [];
    const beneficiariesSummary = beneficiaries
      .map((b) => `${b.firstName} ${b.lastName} (${b.percentage}%)`)
      .join(", ") || "None specified";

    // Build children summary
    const children = step2.children as Array<Record<string, unknown>> || [];
    const childrenSummary = children.length > 0
      ? children.map((c) => `${c.firstName} ${c.lastName}`).join(", ")
      : "None";

    // Build real estate summary
    const realEstate = step7.realEstateProperties as Array<Record<string, unknown>> || [];
    const realEstateSummary = realEstate.length > 0
      ? realEstate.map((p) => `${p.address}, ${p.city} ${p.state}`).join("; ")
      : "None";

    // Build financial accounts summary
    const accounts = step7.financialAccounts as Array<Record<string, unknown>> || [];
    const accountsSummary = accounts.length > 0
      ? accounts.map((a) => `${a.institution} (${a.accountType})`).join("; ")
      : "None";

    // Build attorney-in-fact summary
    const agentName = step5.agentFirstName 
      ? `${step5.agentFirstName} ${step5.agentLastName}`
      : "Not specified";

    // Healthcare preferences
    const lifeSupportPref = step6.lifeSupportPreference || "Not specified";
    const organDonor = step6.organDonor ? "Yes" : "No";

    // Build email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a365d; color: white; padding: 20px; text-align: center; }
          .section { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; }
          .section h3 { margin-top: 0; color: #1a365d; border-bottom: 2px solid #d4af37; padding-bottom: 8px; }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 8px 0; vertical-align: top; }
          .td-label { width: 40%; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">New Estate Planning Intake</h1>
            <p style="margin:10px 0 0;">Application ID: ${savedApp.id.substring(0, 8).toUpperCase()}</p>
          </div>

          <div class="section">
            <h3>👤 Client Information</h3>
            <table>
              <tr>
                <td class="td-label"><span class="label">Trustor 1:</span></td>
                <td><span class="value">${esc(step1.trustor1FirstName) || ''} ${esc(step1.trustor1MiddleName) || ''} ${esc(step1.trustor1LastName) || ''}</span></td>
              </tr>
              <tr>
                <td class="td-label"><span class="label">Email:</span></td>
                <td><span class="value">${esc(applicantEmail)}</span></td>
              </tr>
              <tr>
                <td class="td-label"><span class="label">Phone:</span></td>
                <td><span class="value">${esc(applicantPhone)}</span></td>
              </tr>
              ${spouseName ? `
              <tr>
                <td class="td-label"><span class="label">Trustor 2:</span></td>
                <td><span class="value">${esc(spouseName)}</span></td>
              </tr>
              ` : ''}
              <tr>
                <td class="td-label"><span class="label">Address:</span></td>
                <td><span class="value">${esc(step1.address) || ''}, ${esc(step1.city) || ''}, ${esc(step1.state) || ''} ${esc(step1.zipCode) || ''}</span></td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h3>👨‍👩‍👧‍👦 Family & Heirs</h3>
            <table>
              <tr>
                <td class="td-label"><span class="label">Children:</span></td>
                <td><span class="value">${esc(childrenSummary)}</span></td>
              </tr>
              <tr>
                <td class="td-label"><span class="label">Total Children:</span></td>
                <td><span class="value">${children.length}</span></td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h3>💝 Beneficiaries</h3>
            <p><span class="value">${esc(beneficiariesSummary)}</span></p>
          </div>

          <div class="section">
            <h3>⚖️ Legal Powers</h3>
            <table>
              <tr>
                <td class="td-label"><span class="label">Attorney-in-Fact:</span></td>
                <td><span class="value">${esc(agentName)}</span></td>
              </tr>
              <tr>
                <td class="td-label"><span class="label">Management Style:</span></td>
                <td><span class="value">${esc(step3.managementStyle) || 'Not specified'}</span></td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h3>🏥 Healthcare Directives</h3>
            <table>
              <tr>
                <td class="td-label"><span class="label">Life Support:</span></td>
                <td><span class="value">${esc(lifeSupportPref)}</span></td>
              </tr>
              <tr>
                <td class="td-label"><span class="label">Organ Donor:</span></td>
                <td><span class="value">${esc(organDonor)}</span></td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h3>🏠 Assets</h3>
            <table>
              <tr>
                <td class="td-label"><span class="label">Real Estate (${realEstate.length}):</span></td>
                <td><span class="value">${esc(realEstateSummary)}</span></td>
              </tr>
              <tr>
                <td class="td-label"><span class="label">Financial Accounts (${accounts.length}):</span></td>
                <td><span class="value">${esc(accountsSummary)}</span></td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h3>✍️ Signature</h3>
            <table>
              <tr>
                <td class="td-label"><span class="label">Electronic Signature:</span></td>
                <td><span class="value">${esc(step8.electronicSignature) || 'N/A'}</span></td>
              </tr>
              <tr>
                <td class="td-label"><span class="label">Date Signed:</span></td>
                <td><span class="value">${esc(step8.signatureDate) || new Date().toLocaleDateString()}</span></td>
              </tr>
            </table>
          </div>

          <div class="footer">
            <p>This estate planning intake was submitted through the TFA Estate Guru portal.</p>
            <p>Submitted: ${new Date().toLocaleString()}</p>
            <p>To view the full application details, please log in to the admin dashboard.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to advisor with CC to clients inbox
    console.log("Sending email notification to:", advisorEmail, "CC: clients@tfainsuranceadvisors.com");
    const { error: emailError } = await resend.emails.send({
      from: "TFA Estate Planning <noreply@tfainsuranceadvisors.com>",
      to: [advisorEmail],
      cc: ["clients@tfainsuranceadvisors.com"],
      subject: `New Estate Planning Intake - ${applicantName} (Advisor: ${advisorName})`,
      html: emailHtml,
    });

    if (emailError) {
      console.error("Email error:", emailError);
      // Don't throw - application was saved, just log the email failure
    } else {
      console.log("Email sent successfully");
    }

    return new Response(
      JSON.stringify({
        success: true,
        applicationId: savedApp.id,
        message: "Application submitted successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in send-estate-planning-notification:", errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
