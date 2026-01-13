import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  statesLicensed: string[];
  npn?: string;
  currentlyWithTFA: string;
  referredBy?: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const data: RegistrationData = await req.json();
    console.log("Received Estate Guru registration:", data);

    const fullName = `${data.firstName} ${data.lastName}`;
    const statesFormatted = data.statesLicensed.join(", ");
    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0B1F3B 0%, #0F2847 100%); padding: 30px 40px; text-align: center;">
            <h1 style="color: #D4AF37; margin: 0; font-size: 28px; font-weight: bold;">Estate Guru</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">New Agent Registration</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px;">
            <h2 style="color: #0B1F3B; margin: 0 0 20px 0; font-size: 22px;">
              🎉 New Registration Submitted
            </h2>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              A new agent has registered for Estate Guru and is ready for onboarding.
            </p>
            
            <!-- Agent Details -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
              <h3 style="color: #0B1F3B; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
                Agent Details
              </h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px; width: 140px;">Name:</td>
                  <td style="padding: 8px 0; color: #0B1F3B; font-size: 14px; font-weight: 600;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Email:</td>
                  <td style="padding: 8px 0; color: #0B1F3B; font-size: 14px;">
                    <a href="mailto:${data.email}" style="color: #0B1F3B;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone:</td>
                  <td style="padding: 8px 0; color: #0B1F3B; font-size: 14px;">
                    <a href="tel:${data.phone}" style="color: #0B1F3B;">${data.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">States Licensed:</td>
                  <td style="padding: 8px 0; color: #0B1F3B; font-size: 14px;">${statesFormatted}</td>
                </tr>
                ${data.npn ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">NPN:</td>
                  <td style="padding: 8px 0; color: #0B1F3B; font-size: 14px;">${data.npn}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Currently with TFA:</td>
                  <td style="padding: 8px 0; color: #0B1F3B; font-size: 14px;">
                    <span style="background-color: ${data.currentlyWithTFA === 'yes' ? '#22c55e' : '#eab308'}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                      ${data.currentlyWithTFA === 'yes' ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
                ${data.referredBy ? `
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Referred By:</td>
                  <td style="padding: 8px 0; color: #0B1F3B; font-size: 14px;">${data.referredBy}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            ${data.notes ? `
            <!-- Additional Notes -->
            <div style="background-color: #fff8e6; border-left: 4px solid #D4AF37; padding: 15px 20px; margin-bottom: 25px;">
              <h4 style="color: #0B1F3B; margin: 0 0 10px 0; font-size: 14px; font-weight: 600;">Additional Notes:</h4>
              <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0;">${data.notes}</p>
            </div>
            ` : ''}
            
            <!-- Timestamp -->
            <p style="color: #888; font-size: 12px; margin: 20px 0 0 0; text-align: center;">
              Submitted on ${submittedAt} (Pacific Time)
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 20px 40px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              This notification was sent by the Estate Guru Registration System.<br>
              Please begin onboarding this agent within 24-48 hours.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Estate Guru <noreply@tfainsuranceadvisors.com>",
        to: [
          "heather@estateguru.com",
          "nancy@estateguru.com"
        ],
        subject: `New Estate Guru Registration: ${fullName}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const result = await emailResponse.json();
    console.log("Registration notification email sent successfully:", result);

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-estate-guru-registration:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
