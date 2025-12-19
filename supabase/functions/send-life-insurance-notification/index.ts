import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  applicationId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  advisorName?: string;
  advisorEmail?: string;
  formData: {
    step1?: {
      firstName?: string;
      lastName?: string;
      dateOfBirth?: string;
      gender?: string;
      ssn?: string;
    };
    step2?: {
      email?: string;
      mobilePhone?: string;
      address?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      employer?: string;
      occupation?: string;
    };
    step5?: {
      planName?: string;
      faceAmount?: number;
      termDuration?: string;
    };
    [key: string]: unknown;
  };
}

const ADMIN_EMAIL = "leads@tfainsuranceadvisors.com";
const FROM_EMAIL = "The Financial Architects <noreply@tfainsuranceadvisors.com>";

const formatCurrency = (amount?: number): string => {
  if (!amount) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

const getPlanLabel = (planValue?: string): string => {
  const planLabels: Record<string, string> = {
    "term-life": "Term Life Insurance",
    "whole-life": "Whole Life Insurance",
    "universal-life": "Universal Life Insurance",
    "indexed-universal-life": "Indexed Universal Life (IUL)",
  };
  return planValue ? planLabels[planValue] || planValue : "N/A";
};

const generateAdminEmail = (data: NotificationRequest): string => {
  const { applicationId, applicantName, applicantPhone, advisorName, advisorEmail, formData } = data;
  const step1 = formData.step1 || {};
  const step2 = formData.step2 || {};
  const step5 = formData.step5 || {};

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Life Insurance Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #1e3a5f; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Life Insurance Application</h1>
      <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">The Financial Architects</p>
    </div>
    
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin-bottom: 25px; border-radius: 0 4px 4px 0;">
        <p style="margin: 0; color: #166534; font-weight: 600;">Application ID: ${applicationId}</p>
      </div>

      <h2 style="color: #1e3a5f; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">Applicant Information</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 40%;">Full Name:</td>
          <td style="padding: 8px 0; color: #111827; font-weight: 500;">${applicantName || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Date of Birth:</td>
          <td style="padding: 8px 0; color: #111827;">${step1.dateOfBirth || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Gender:</td>
          <td style="padding: 8px 0; color: #111827;">${step1.gender || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Email:</td>
          <td style="padding: 8px 0; color: #111827;"><a href="mailto:${step2.email}" style="color: #2563eb;">${step2.email || "N/A"}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Phone:</td>
          <td style="padding: 8px 0; color: #111827;"><a href="tel:${applicantPhone}" style="color: #2563eb;">${applicantPhone || "N/A"}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Address:</td>
          <td style="padding: 8px 0; color: #111827;">${step2.address ? `${step2.address}, ${step2.city}, ${step2.state} ${step2.zipCode}` : "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Occupation:</td>
          <td style="padding: 8px 0; color: #111827;">${step2.occupation || "N/A"}</td>
        </tr>
      </table>

      <h2 style="color: #1e3a5f; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">Policy Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 40%;">Plan Type:</td>
          <td style="padding: 8px 0; color: #111827; font-weight: 500;">${getPlanLabel(step5.planName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Face Amount:</td>
          <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 16px;">${formatCurrency(step5.faceAmount)}</td>
        </tr>
        ${step5.termDuration ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Term Duration:</td>
          <td style="padding: 8px 0; color: #111827;">${step5.termDuration}</td>
        </tr>
        ` : ""}
      </table>

      ${advisorName ? `
      <h2 style="color: #1e3a5f; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">Assigned Advisor</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 40%;">Advisor Name:</td>
          <td style="padding: 8px 0; color: #111827; font-weight: 500;">${advisorName}</td>
        </tr>
        ${advisorEmail ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Advisor Email:</td>
          <td style="padding: 8px 0; color: #111827;"><a href="mailto:${advisorEmail}" style="color: #2563eb;">${advisorEmail}</a></td>
        </tr>
        ` : ""}
      </table>
      ` : ""}

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <a href="https://supabase.com/dashboard/project/cstkeblqqyjwlrbppucu/editor" style="display: inline-block; background-color: #1e3a5f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">View in Dashboard</a>
      </div>
    </div>
    
    <p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
      © ${new Date().getFullYear()} The Financial Architects. All rights reserved.
    </p>
  </div>
</body>
</html>
  `;
};

const generateApplicantEmail = (data: NotificationRequest): string => {
  const { applicationId, applicantName, advisorName, advisorEmail } = data;
  const firstName = applicantName.split(" ")[0] || "Valued Customer";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #1e3a5f; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Application Received!</h1>
      <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">The Financial Architects</p>
    </div>
    
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <p style="color: #111827; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Dear ${firstName},
      </p>
      
      <p style="color: #111827; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Thank you for submitting your life insurance application with The Financial Architects. We have successfully received your application and our team is reviewing it.
      </p>

      <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 25px 0; border-radius: 0 4px 4px 0;">
        <p style="margin: 0; color: #0c4a6e; font-weight: 600;">Your Reference Number:</p>
        <p style="margin: 5px 0 0 0; color: #0c4a6e; font-family: monospace; font-size: 14px;">${applicationId}</p>
      </div>

      <h2 style="color: #1e3a5f; font-size: 18px; margin: 25px 0 15px 0;">What Happens Next?</h2>
      <ol style="color: #374151; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0 0 25px 0;">
        <li style="margin-bottom: 8px;"><strong>Application Review:</strong> Our underwriting team will review your application within 2-3 business days.</li>
        <li style="margin-bottom: 8px;"><strong>Additional Information:</strong> If we need any additional details, we'll reach out to you directly.</li>
        <li style="margin-bottom: 8px;"><strong>Medical Underwriting:</strong> Depending on your coverage amount, a medical exam may be scheduled.</li>
        <li style="margin-bottom: 8px;"><strong>Policy Issuance:</strong> Once approved, your policy documents will be prepared for delivery.</li>
      </ol>

      ${advisorName ? `
      <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #7c3aed; font-size: 16px; margin: 0 0 10px 0;">Your Assigned Advisor</h3>
        <p style="color: #374151; margin: 0;"><strong>${advisorName}</strong></p>
        ${advisorEmail ? `<p style="margin: 5px 0 0 0;"><a href="mailto:${advisorEmail}" style="color: #7c3aed;">${advisorEmail}</a></p>` : ""}
        <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">Feel free to reach out to your advisor with any questions.</p>
      </div>
      ` : ""}

      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #1e3a5f; font-size: 16px; margin: 0 0 10px 0;">Need Assistance?</h3>
        <p style="color: #374151; font-size: 14px; margin: 0;">
          If you have any questions about your application, please don't hesitate to contact us:
        </p>
        <p style="margin: 10px 0 0 0;">
          <a href="mailto:leads@tfainsuranceadvisors.com" style="color: #2563eb;">leads@tfainsuranceadvisors.com</a>
        </p>
      </div>

      <p style="color: #111827; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
        Thank you for choosing The Financial Architects. We're committed to helping you protect what matters most.
      </p>

      <p style="color: #111827; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
        Warm regards,<br>
        <strong>The Financial Architects Team</strong>
      </p>
    </div>
    
    <p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
      © ${new Date().getFullYear()} The Financial Architects. All rights reserved.<br>
      This email was sent regarding your life insurance application.
    </p>
  </div>
</body>
</html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("send-life-insurance-notification function invoked");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: NotificationRequest = await req.json();
    console.log("Received notification request for application:", data.applicationId);

    const emailResults: { recipient: string; success: boolean; error?: string }[] = [];

    // 1. Send notification to admin team
    try {
      console.log("Sending admin notification to:", ADMIN_EMAIL);
      const adminResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `New Life Insurance Application - ${data.applicantName}`,
        html: generateAdminEmail(data),
      });
      console.log("Admin email sent successfully:", adminResult);
      emailResults.push({ recipient: "admin", success: true });
    } catch (error: unknown) {
      console.error("Failed to send admin email:", error);
      emailResults.push({ recipient: "admin", success: false, error: String(error) });
    }

    // 2. Send notification to advisor (if assigned)
    if (data.advisorEmail) {
      try {
        console.log("Sending advisor notification to:", data.advisorEmail);
        const advisorResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: [data.advisorEmail],
          subject: `New Life Insurance Application - ${data.applicantName}`,
          html: generateAdminEmail(data),
        });
        console.log("Advisor email sent successfully:", advisorResult);
        emailResults.push({ recipient: "advisor", success: true });
      } catch (error: unknown) {
        console.error("Failed to send advisor email:", error);
        emailResults.push({ recipient: "advisor", success: false, error: String(error) });
      }
    }

    // 3. Send confirmation to applicant
    if (data.applicantEmail) {
      try {
        console.log("Sending confirmation to applicant:", data.applicantEmail);
        const applicantResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: [data.applicantEmail],
          subject: "Your Life Insurance Application Has Been Received",
          html: generateApplicantEmail(data),
        });
        console.log("Applicant email sent successfully:", applicantResult);
        emailResults.push({ recipient: "applicant", success: true });
      } catch (error: unknown) {
        console.error("Failed to send applicant email:", error);
        emailResults.push({ recipient: "applicant", success: false, error: String(error) });
      }
    }

    console.log("Email notification results:", emailResults);

    return new Response(
      JSON.stringify({ success: true, results: emailResults }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-life-insurance-notification function:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
