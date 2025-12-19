import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const requestSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  resumeUrl: z.string().url("Invalid resume URL"),
  resumeToken: z.string().min(1, "Resume token is required"),
});

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate request body with Zod
    const validationResult = requestSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || "Invalid request data";
      console.error("Validation error:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { email, resumeUrl, resumeToken } = validationResult.data;

    console.log("Sending resume link email to:", email);
    console.log("Resume URL:", resumeUrl);

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Continue Your Application</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 40px 20px;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8a 100%); padding: 40px 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">The Financial Architects</h1>
                    <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Life Insurance Application</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px; color: #1e3a5f; font-size: 24px; font-weight: 600;">Continue Your Application</h2>
                    <p style="margin: 0 0 25px; color: #52525b; font-size: 16px; line-height: 1.6;">
                      You're almost there! We've saved your progress on your life insurance application. Click the button below to pick up where you left off.
                    </p>
                    
                    <!-- CTA Button -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="text-align: center; padding: 20px 0;">
                          <a href="${resumeUrl}" style="display: inline-block; background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8a 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3);">
                            Resume Application →
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 25px 0 0; color: #71717a; font-size: 14px; line-height: 1.6;">
                      If the button doesn't work, copy and paste this link into your browser:
                    </p>
                    <p style="margin: 10px 0 0; word-break: break-all;">
                      <a href="${resumeUrl}" style="color: #2d5a8a; font-size: 12px;">${resumeUrl}</a>
                    </p>
                  </td>
                </tr>
                
                <!-- Security Notice -->
                <tr>
                  <td style="padding: 0 40px 30px;">
                    <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
                      <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.5;">
                        <strong>Security Note:</strong> This link is unique to your application. Do not share it with others.
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f4f4f5; padding: 30px 40px; text-align: center;">
                    <p style="margin: 0 0 10px; color: #71717a; font-size: 12px;">
                      © ${new Date().getFullYear()} The Financial Architects. All rights reserved.
                    </p>
                    <p style="margin: 0; color: #a1a1aa; font-size: 11px;">
                      This is an automated message. Please do not reply to this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "The Financial Architects <onboarding@resend.dev>",
        to: [email],
        subject: "Continue Your Life Insurance Application",
        html: emailHtml,
      }),
    });

    const responseData = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", responseData);
      throw new Error(responseData.message || "Failed to send email");
    }

    console.log("Email sent successfully:", responseData);

    return new Response(JSON.stringify({ success: true, data: responseData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-application-resume-link function:", errorMessage);
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
