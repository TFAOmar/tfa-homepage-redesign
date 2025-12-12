import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FormNotificationRequest {
  formType: string;
  formData: Record<string, unknown>;
  recipientEmail?: string;
}

const formatFormData = (formData: Record<string, unknown>): string => {
  return Object.entries(formData)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      const formattedValue = Array.isArray(value) ? value.join(", ") : String(value);
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

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { formType, formData, recipientEmail }: FormNotificationRequest = await req.json();

    console.log(`Processing ${formType} form submission:`, JSON.stringify(formData));

    // Default recipient - TFA main email
    const toEmail = recipientEmail || "info@tfainsuranceadvisors.com";
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
        from: "TFA Website <onboarding@resend.dev>",
        to: [toEmail],
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

    return new Response(JSON.stringify({ success: true, data }), {
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
