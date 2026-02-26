import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface PrequalificationRequest {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  formData: Record<string, unknown>;
  advisorId?: string;
  advisorEmail?: string;
  advisorName?: string;
  sourceUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Prequalification notification function invoked");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: PrequalificationRequest = await req.json();
    console.log("Request data:", {
      applicantName: requestData.applicantName,
      advisorName: requestData.advisorName,
    });

    const {
      applicantName,
      applicantEmail,
      applicantPhone,
      formData,
      advisorEmail = "info@tfainsuranceadvisors.com",
      advisorName = "TFA Advisor",
      sourceUrl,
    } = requestData;

    if (!applicantName || !applicantEmail || !formData) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const step1 = (formData.step1 as Record<string, unknown>) || {};
    const step2 = (formData.step2 as Record<string, unknown>) || {};
    const step3 = (formData.step3 as Record<string, unknown>) || {};

    const medicalConditions = (step2.medicalConditions as string[]) || [];
    const conditionsSummary = medicalConditions.length > 0 ? medicalConditions.join(", ") : "None reported";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a365d; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .section { margin: 16px 0; padding: 16px; background: #f8f9fa; border-radius: 8px; }
          .section h3 { margin-top: 0; color: #1a365d; border-bottom: 2px solid #d4af37; padding-bottom: 8px; }
          .label { font-weight: bold; color: #666; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 6px 0; vertical-align: top; }
          .td-label { width: 45%; }
          .footer { margin-top: 20px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          .flag { background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 12px; margin: 12px 0; }
          .flag-red { background: #f8d7da; border: 1px solid #f5c6cb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">New Life Insurance Pre-Qualification</h1>
            <p style="margin:8px 0 0;">Advisor: ${advisorName}</p>
          </div>

          <div class="section">
            <h3>👤 Personal Information</h3>
            <table>
              <tr><td class="td-label"><span class="label">Name:</span></td><td>${applicantName}</td></tr>
              <tr><td class="td-label"><span class="label">Date of Birth:</span></td><td>${step1.dateOfBirth || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Gender:</span></td><td>${step1.gender || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Phone:</span></td><td>${applicantPhone}</td></tr>
              <tr><td class="td-label"><span class="label">Email:</span></td><td>${applicantEmail}</td></tr>
              <tr><td class="td-label"><span class="label">State:</span></td><td>${step1.stateOfResidence || "N/A"}</td></tr>
            </table>
          </div>

          <div class="section">
            <h3>🏥 Health & Lifestyle</h3>
            <table>
              <tr><td class="td-label"><span class="label">Height:</span></td><td>${step2.heightFeet || ""}' ${step2.heightInches || ""}"</td></tr>
              <tr><td class="td-label"><span class="label">Weight:</span></td><td>${step2.weight || "N/A"} lbs</td></tr>
              <tr><td class="td-label"><span class="label">Tobacco Use:</span></td><td>${step2.tobaccoUse || "N/A"}</td></tr>
              ${step2.tobaccoFrequency ? `<tr><td class="td-label"><span class="label">Tobacco Details:</span></td><td>${step2.tobaccoFrequency}</td></tr>` : ""}
              <tr><td class="td-label"><span class="label">Medical Conditions:</span></td><td>${conditionsSummary}</td></tr>
              <tr><td class="td-label"><span class="label">Medications:</span></td><td>${step2.takingMedications || "N/A"}</td></tr>
              ${step2.medicationDetails ? `<tr><td class="td-label"><span class="label">Medication Details:</span></td><td>${step2.medicationDetails}</td></tr>` : ""}
              <tr><td class="td-label"><span class="label">Hospitalized (5yr):</span></td><td>${step2.hospitalizedPast5Years || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Family History:</span></td><td>${step2.familyHistoryHeartCancer || "N/A"}</td></tr>
            </table>
          </div>

          ${medicalConditions.length > 0 || step2.tobaccoUse === "Yes" || step2.hospitalizedPast5Years === "Yes" ? `
          <div class="flag${medicalConditions.length > 2 ? " flag-red" : ""}">
            <strong>⚠️ Review Notes:</strong>
            <ul style="margin:8px 0 0;padding-left:20px;">
              ${step2.tobaccoUse === "Yes" ? "<li>Active tobacco/nicotine user</li>" : ""}
              ${step2.hospitalizedPast5Years === "Yes" ? "<li>Hospitalized or surgery in past 5 years</li>" : ""}
              ${medicalConditions.length > 0 ? `<li>${medicalConditions.length} medical condition(s) reported</li>` : ""}
              ${step2.familyHistoryHeartCancer === "Yes" ? "<li>Family history of heart disease/cancer before 60</li>" : ""}
            </ul>
          </div>
          ` : ""}

          <div class="section">
            <h3>📋 Coverage Needs</h3>
            <table>
              <tr><td class="td-label"><span class="label">Coverage Amount:</span></td><td>${step3.coverageAmount || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Coverage Type:</span></td><td>${step3.coverageType || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Monthly Budget:</span></td><td>${step3.monthlyBudget || "N/A"}</td></tr>
              <tr><td class="td-label"><span class="label">Existing Insurance:</span></td><td>${step3.hasExistingInsurance || "N/A"}</td></tr>
              ${step3.existingCarrier ? `<tr><td class="td-label"><span class="label">Current Carrier:</span></td><td>${step3.existingCarrier}</td></tr>` : ""}
              ${step3.existingAmount ? `<tr><td class="td-label"><span class="label">Current Amount:</span></td><td>${step3.existingAmount}</td></tr>` : ""}
              <tr><td class="td-label"><span class="label">Purpose:</span></td><td>${step3.purposeOfCoverage || "N/A"}</td></tr>
            </table>
          </div>

          <div class="footer">
            <p>Submitted: ${new Date().toLocaleString()}</p>
            ${sourceUrl ? `<p>Source: ${sourceUrl}</p>` : ""}
            <p>This pre-qualification was submitted through the TFA website.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send confirmation email to applicant
    try {
      await resend.emails.send({
        from: "TFA Life Insurance <noreply@tfainsuranceadvisors.com>",
        to: [applicantEmail],
        subject: `Pre-Qualification Received - ${advisorName} will be in touch`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:20px;">
            <h2 style="color:#1a365d;">Thank You, ${applicantName.split(" ")[0]}!</h2>
            <p>We've received your life insurance pre-qualification questionnaire. ${advisorName} will review your information and reach out within 1-2 business days to discuss your options.</p>
            <p>If you have any immediate questions, feel free to call us at <a href="tel:+18883505396">(888) 350-5396</a>.</p>
            <p style="color:#666;font-size:12px;margin-top:20px;">© ${new Date().getFullYear()} TFA Group. All rights reserved.</p>
          </div>
        `,
      });
      console.log("Confirmation email sent to applicant");
    } catch (confirmErr) {
      console.error("Confirmation email error (non-blocking):", confirmErr);
    }

    // Send notification to advisor + admin
    console.log("Sending notification to:", advisorEmail, "CC: clients@tfainsuranceadvisors.com");
    const { error: emailError } = await resend.emails.send({
      from: "TFA Life Insurance <noreply@tfainsuranceadvisors.com>",
      to: [advisorEmail],
      cc: ["clients@tfainsuranceadvisors.com"],
      subject: `New Pre-Qualification - ${applicantName} (Advisor: ${advisorName})`,
      html: emailHtml,
    });

    if (emailError) {
      console.error("Email error:", emailError);
    } else {
      console.log("Notification email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Pre-qualification submitted" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
