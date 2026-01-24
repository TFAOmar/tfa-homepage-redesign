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
  eventsInterested?: string[];
  message?: string;
  isGeneralInquiry?: boolean;
}

const packageLabels: Record<string, string> = {
  title: "Title Sponsor — $4,000/event",
  supporting: "Supporting Sponsor — $2,000/event",
  community: "Community Sponsor — $500/event",
  undecided: "Package TBD — Needs consultation"
};

const eventLabels: Record<string, { name: string; timing: string; attendees: string }> = {
  'kickoff': { name: 'Kick Off', timing: 'January', attendees: '200+' },
  'crash-courses': { name: 'Crash Courses', timing: 'Spring', attendees: '75+' },
  'leadership-summit': { name: 'Leadership Summit', timing: 'Summer', attendees: '100+' },
  'summer-sizzler': { name: 'Summer Sizzler', timing: 'Mid-Year', attendees: '150+' },
  'christmas-party': { name: 'Christmas Party', timing: 'December', attendees: '200+' }
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
    const isGeneral = data.isGeneralInquiry ?? false;
    const eventsInterested = data.eventsInterested || [];

    // Build events list HTML for emails
    const eventsListHtml = eventsInterested.length > 0
      ? eventsInterested.map(eventId => {
          const event = eventLabels[eventId];
          return event 
            ? `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">${event.name} <span style="color: #666;">(${event.timing})</span> — <span style="color: #E4B548;">${event.attendees} attendees</span></li>`
            : `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">${eventId}</li>`;
        }).join('')
      : '<li style="padding: 8px 0; color: #666;">No specific events selected</li>';

    // Internal notification subject
    const internalSubject = isGeneral
      ? `🎉 New General Sponsorship Inquiry: ${data.companyName}`
      : `🎉 New Sponsorship Application: ${data.companyName} (${packageLabel})`;

    // Send internal notification to leads email
    const internalEmailResponse = await resend.emails.send({
      from: "TFA Sponsorships <noreply@tfainsuranceadvisors.com>",
      to: ["leads@tfainsuranceadvisors.com"],
      subject: internalSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0A0F1F 0%, #1a1f3c 100%); padding: 30px; text-align: center;">
            <h1 style="color: #E4B548; margin: 0; font-size: 24px;">New Sponsorship ${isGeneral ? 'Inquiry' : 'Application'}</h1>
            <p style="color: #ffffff; margin: 10px 0 0;">${isGeneral ? 'General Event Sponsorship' : 'TFA 2026 Kick Off'}</p>
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
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Industry</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.industry}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #666;">Inquiry Type</td>
                <td style="padding: 10px 0;">${isGeneral ? 'General Inquiry (Multiple Events)' : 'Specific Event'}</td>
              </tr>
            </table>

            ${eventsInterested.length > 0 ? `
            <div style="margin-top: 25px;">
              <h3 style="color: #0A0F1F; margin-bottom: 10px;">Events Interested In:</h3>
              <ul style="list-style: none; padding: 0; margin: 0; background: #f8f8f8; border-radius: 8px; padding: 15px;">
                ${eventsListHtml}
              </ul>
            </div>
            ` : ''}

            ${data.message ? `
            <div style="margin-top: 25px;">
              <h3 style="color: #0A0F1F; margin-bottom: 10px;">Additional Message:</h3>
              <p style="background: #f8f8f8; padding: 15px; border-radius: 8px; color: #333; margin: 0;">${data.message}</p>
            </div>
            ` : ''}
            
            <div style="margin-top: 25px; padding: 20px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #E4B548;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>Action Required:</strong> Reach out to this sponsor within 24 hours to confirm availability and finalize their sponsorship.
              </p>
            </div>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #888;">
            <p style="margin: 0;">This notification was sent from the ${isGeneral ? 'TFA General Sponsorship' : 'TFA 2026 Kick Off Sponsorship'} page.</p>
          </div>
        </div>
      `,
    });

    console.log("Internal notification sent:", internalEmailResponse);

    // Sponsor confirmation email subject
    const sponsorSubject = isGeneral
      ? `Your TFA Sponsorship Inquiry Has Been Received`
      : `Thank you for your sponsorship interest - TFA 2026 Kick Off`;

    // Send confirmation email to sponsor
    const sponsorEmailResponse = await resend.emails.send({
      from: "TFA Events <noreply@tfainsuranceadvisors.com>",
      to: [data.email],
      subject: sponsorSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0A0F1F 0%, #1a1f3c 100%); padding: 40px; text-align: center;">
            <h1 style="color: #E4B548; margin: 0; font-size: 28px;">Thank You, ${data.contactName}!</h1>
            <p style="color: #ffffff; margin: 15px 0 0; font-size: 16px;">We've received your sponsorship inquiry</p>
          </div>
          
          <div style="background: #ffffff; padding: 40px; border: 1px solid #e5e5e5;">
            ${eventsInterested.length > 0 ? `
            <div style="margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 12px;">
              <h3 style="color: #0A0F1F; margin: 0 0 15px 0; font-size: 16px;">Events You're Interested In:</h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${eventsInterested.map(eventId => {
                  const event = eventLabels[eventId];
                  return event 
                    ? `<li style="padding: 10px 15px; background: #ffffff; border-radius: 8px; margin-bottom: 8px; border: 1px solid #e5e5e5;">
                        <strong style="color: #0A0F1F;">${event.name}</strong>
                        <span style="color: #666; font-size: 14px;"> (${event.timing})</span>
                        <span style="color: #E4B548; font-size: 13px; display: block; margin-top: 4px;">${event.attendees} attendees</span>
                      </li>`
                    : '';
                }).join('')}
              </ul>
            </div>
            ` : ''}

            <h2 style="color: #0A0F1F; margin-top: 0;">What to Expect</h2>
            
            <div style="margin: 25px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 15px; background: #f8f9fa; border-radius: 8px 8px 0 0; border-bottom: 2px solid #fff;">
                    <div style="display: flex; align-items: center;">
                      <div style="min-width: 32px; height: 32px; background: #E4B548; border-radius: 50%; text-align: center; line-height: 32px; color: #0A0F1F; font-weight: bold; margin-right: 12px;">1</div>
                      <div>
                        <strong style="color: #0A0F1F;">Within 5 minutes</strong>
                        <p style="color: #666; margin: 4px 0 0; font-size: 14px;">This confirmation email arrives in your inbox</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background: #f8f9fa; border-bottom: 2px solid #fff;">
                    <div style="display: flex; align-items: center;">
                      <div style="min-width: 32px; height: 32px; background: #E4B548; border-radius: 50%; text-align: center; line-height: 32px; color: #0A0F1F; font-weight: bold; margin-right: 12px;">2</div>
                      <div>
                        <strong style="color: #0A0F1F;">Within 24 hours</strong>
                        <p style="color: #666; margin: 4px 0 0; font-size: 14px;">A call from our sponsorship team to discuss your goals</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background: #f8f9fa; border-bottom: 2px solid #fff;">
                    <div style="display: flex; align-items: center;">
                      <div style="min-width: 32px; height: 32px; background: #E4B548; border-radius: 50%; text-align: center; line-height: 32px; color: #0A0F1F; font-weight: bold; margin-right: 12px;">3</div>
                      <div>
                        <strong style="color: #0A0F1F;">Within 2-3 days</strong>
                        <p style="color: #666; margin: 4px 0 0; font-size: 14px;">Package finalization and secure payment</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
                    <div style="display: flex; align-items: center;">
                      <div style="min-width: 32px; height: 32px; background: #E4B548; border-radius: 50%; text-align: center; line-height: 32px; color: #0A0F1F; font-weight: bold; margin-right: 12px;">4</div>
                      <div>
                        <strong style="color: #0A0F1F;">2 weeks before event</strong>
                        <p style="color: #666; margin: 4px 0 0; font-size: 14px;">Sponsor welcome kit and booth details</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #E4B548;">
              <p style="margin: 0; color: #0A0F1F; font-weight: bold;">Your Inquiry Summary</p>
              <p style="margin: 10px 0 0; color: #666;">
                <strong>Company:</strong> ${data.companyName}<br>
                <strong>Package Interest:</strong> ${packageLabel}<br>
                <strong>Industry:</strong> ${data.industry}
              </p>
            </div>
            
            <p style="margin-top: 30px; color: #666;">
              Questions? Reply to this email or contact us at <a href="mailto:leads@tfainsuranceadvisors.com" style="color: #E4B548;">leads@tfainsuranceadvisors.com</a>
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
