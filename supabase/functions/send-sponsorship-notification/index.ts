import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SponsorshipNotificationRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  sponsorshipPackage: string;
  industry: string;
}

const packageLabels: Record<string, string> = {
  title: "Title Sponsor — $4,000",
  supporting: "Supporting Sponsor — $2,000",
  community: "Community Sponsor — $500"
};

const handler = async (req: Request): Promise<Response> => {
  console.log("send-sponsorship-notification function invoked");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: SponsorshipNotificationRequest = await req.json();
    console.log("Processing sponsorship notification for:", data.companyName);

    const packageLabel = packageLabels[data.sponsorshipPackage] || data.sponsorshipPackage;

    // Send internal notification to leads email
    const internalEmailResponse = await resend.emails.send({
      from: "TFA Sponsorships <noreply@tfainsuranceadvisors.com>",
      to: ["leads@tfainsuranceadvisors.com"],
      subject: `🎉 New Sponsorship Application: ${data.companyName} (${packageLabel})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0A0F1F 0%, #1a1f3c 100%); padding: 30px; text-align: center;">
            <h1 style="color: #E4B548; margin: 0; font-size: 24px;">New Sponsorship Application</h1>
            <p style="color: #ffffff; margin: 10px 0 0;">TFA 2026 Kick Off</p>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5;">
            <h2 style="color: #0A0F1F; margin-top: 0; border-bottom: 2px solid #E4B548; padding-bottom: 10px;">
              ${packageLabel}
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.companyName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Contact</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.contactName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${data.email}" style="color: #0066cc;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <a href="tel:${data.phone}" style="color: #0066cc;">${data.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666;">Industry</td>
                <td style="padding: 10px 0;">${data.industry}</td>
              </tr>
            </table>
            
            <div style="margin-top: 25px; padding: 20px; background: #f8f8f8; border-radius: 8px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Action Required:</strong> Reach out to this sponsor within 24 hours to confirm availability and finalize their sponsorship.
              </p>
            </div>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #888;">
            <p style="margin: 0;">This notification was sent from the TFA 2026 Kick Off Sponsorship page.</p>
          </div>
        </div>
      `,
    });

    console.log("Internal notification sent:", internalEmailResponse);

    // Send confirmation email to sponsor
    const sponsorEmailResponse = await resend.emails.send({
      from: "TFA Events <noreply@tfainsuranceadvisors.com>",
      to: [data.email],
      subject: `Thank you for your sponsorship interest - TFA 2026 Kick Off`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0A0F1F 0%, #1a1f3c 100%); padding: 40px; text-align: center;">
            <h1 style="color: #E4B548; margin: 0; font-size: 28px;">Thank You, ${data.contactName}!</h1>
            <p style="color: #ffffff; margin: 15px 0 0; font-size: 16px;">We've received your sponsorship application</p>
          </div>
          
          <div style="background: #ffffff; padding: 40px; border: 1px solid #e5e5e5;">
            <h2 style="color: #0A0F1F; margin-top: 0;">What happens next?</h2>
            
            <div style="margin: 25px 0;">
              <div style="display: flex; margin-bottom: 20px;">
                <div style="min-width: 40px; height: 40px; background: #E4B548; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0A0F1F; font-weight: bold; margin-right: 15px;">1</div>
                <div>
                  <strong style="color: #0A0F1F;">Review</strong>
                  <p style="color: #666; margin: 5px 0 0;">Our team is reviewing your application for the ${packageLabel}.</p>
                </div>
              </div>
              
              <div style="display: flex; margin-bottom: 20px;">
                <div style="min-width: 40px; height: 40px; background: #E4B548; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0A0F1F; font-weight: bold; margin-right: 15px;">2</div>
                <div>
                  <strong style="color: #0A0F1F;">Confirmation</strong>
                  <p style="color: #666; margin: 5px 0 0;">We'll reach out within 1 business day to confirm availability.</p>
                </div>
              </div>
              
              <div style="display: flex;">
                <div style="min-width: 40px; height: 40px; background: #E4B548; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0A0F1F; font-weight: bold; margin-right: 15px;">3</div>
                <div>
                  <strong style="color: #0A0F1F;">Finalize</strong>
                  <p style="color: #666; margin: 5px 0 0;">We'll send payment instructions and booth details.</p>
                </div>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #E4B548;">
              <p style="margin: 0; color: #0A0F1F; font-weight: bold;">Your Application Summary</p>
              <p style="margin: 10px 0 0; color: #666;">
                <strong>Company:</strong> ${data.companyName}<br>
                <strong>Package:</strong> ${packageLabel}<br>
                <strong>Industry:</strong> ${data.industry}
              </p>
            </div>
            
            <p style="margin-top: 30px; color: #666;">
              Questions? Reply to this email or contact us at <a href="mailto:info@tfainsuranceadvisors.com" style="color: #E4B548;">info@tfainsuranceadvisors.com</a>
            </p>
          </div>
          
          <div style="background: #0A0F1F; padding: 25px; text-align: center;">
            <p style="color: #E4B548; margin: 0; font-weight: bold;">The Financial Architects</p>
            <p style="color: #888; margin: 10px 0 0; font-size: 12px;">
              Building Financial Legacies Together
            </p>
          </div>
        </div>
      `,
    });

    console.log("Sponsor confirmation sent:", sponsorEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        internalEmail: internalEmailResponse,
        sponsorEmail: sponsorEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-sponsorship-notification:", error);
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
