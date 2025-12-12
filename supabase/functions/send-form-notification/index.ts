import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FormNotificationRequest {
  formType: string;
  formData: Record<string, unknown>;
  recipientEmail?: string;
  additionalRecipients?: string[];
}

// HTML escape function to prevent XSS in email content
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const formatFormData = (formData: Record<string, unknown>): string => {
  return Object.entries(formData)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      const formattedKey = escapeHtml(key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim());
      const formattedValue = escapeHtml(Array.isArray(value) ? value.join(", ") : String(value));
      return `<tr><td style="padding: 8px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">${formattedKey}</td><td style="padding: 8px; border: 1px solid #e5e5e5;">${formattedValue}</td></tr>`;
    })
    .join("");
};

const getFormSubject = (formType: string, formData: Record<string, unknown>): string => {
  const firstName = formData.firstName as string || "";
  const lastName = formData.lastName as string || "";
  const fullName = formData.fullName as string || formData.name as string || "";
  const businessName = formData.businessName as string || "";
  
  const name = fullName || `${firstName} ${lastName}`.trim() || "Unknown";
  
  const subjects: Record<string, string> = {
    contact: `New Contact Inquiry from ${name}`,
    "business-insurance": `New Business Insurance Request from ${businessName || name}`,
    "agent-application": `New Agent Application from ${name}`,
    "careers-inquiry": `New Career Inquiry from ${name}`,
    "franchise-application": `New Franchise Application from ${name}`,
    "living-trust": `New Living Trust Consultation Request from ${name}`,
    "advisor-onboarding": `New Advisor Onboarding Submission from ${name}`,
  };
  
  return subjects[formType] || `New Form Submission: ${formType}`;
};

const extractCommonFields = (formData: Record<string, unknown>) => {
  const firstName = formData.firstName as string || "";
  const lastName = formData.lastName as string || "";
  const fullName = formData.fullName as string || formData.name as string || "";
  
  return {
    email: (formData.email as string) || null,
    name: fullName || `${firstName} ${lastName}`.trim() || null,
    phone: (formData.phone as string) || null,
    source: (formData.source as string) || null,
    partner: (formData.partner as string) || null,
    advisor: (formData.advisor as string) || null,
  };
};

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase configuration is missing");
    }

    const { formType, formData, recipientEmail, additionalRecipients }: FormNotificationRequest = await req.json();

    console.log(`Processing ${formType} form submission:`, JSON.stringify(formData));

    // Create Supabase client with service role for database insert
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Extract common fields for easier querying
    const { email, name, phone, source, partner, advisor } = extractCommonFields(formData);

    // Store submission in database
    const { data: submissionData, error: dbError } = await supabase
      .from("form_submissions")
      .insert({
        form_type: formType,
        form_data: formData,
        email,
        name,
        phone,
        source,
        partner,
        advisor,
        status: "new",
        email_sent: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database insert error:", dbError);
      // Continue with email even if DB insert fails
    } else {
      console.log("Form submission stored with ID:", submissionData?.id);
    }

    // Build recipients list - always include main leads email
    const toEmail = recipientEmail || "leads@tfainsuranceadvisors.com";
    const recipients = [toEmail];
    if (additionalRecipients && additionalRecipients.length > 0) {
      recipients.push(...additionalRecipients);
    }
    console.log(`Sending email to recipients: ${recipients.join(", ")}`);
    
    const subject = getFormSubject(formType, formData);
    const formRows = formatFormData(formData);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0A0F1F 0%, #131A2A 100%); color: #E4B548; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">The Financial Architects</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">New Form Submission</p>
            </div>
            <div class="content">
              <h2 style="color: #0A0F1F; margin-top: 0;">${subject}</h2>
              <p>A new ${formType.replace(/-/g, " ")} form has been submitted with the following details:</p>
              ${submissionData?.id ? `<p style="font-size: 12px; color: #666;">Submission ID: ${submissionData.id}</p>` : ""}
              <table>
                ${formRows}
              </table>
            </div>
            <div class="footer">
              <p>This email was automatically generated from tfainsuranceadvisors.com</p>
              <p>© ${new Date().getFullYear()} The Financial Architects. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TFA Leads <leads@tfainsuranceadvisors.com>",
        to: recipients,
        subject: subject,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Email sent successfully:", data);

    // Update submission to mark email as sent
    if (submissionData?.id) {
      await supabase
        .from("form_submissions")
        .update({ email_sent: true })
        .eq("id", submissionData.id);
    }

    return new Response(JSON.stringify({ success: true, data, submissionId: submissionData?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-form-notification function:", errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
