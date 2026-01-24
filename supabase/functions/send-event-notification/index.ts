import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EventNotificationRequest {
  agentName: string;
  agentEmail: string;
  agentPhone?: string;
  eventName: string;
  description: string;
  shortDescription: string;
  location: string;
  startTime: string;
  endTime: string;
  primaryImageUrl: string;
  thumbnailUrl?: string;
  enableRsvp: boolean;
  rsvpEmail?: string;
  maxAttendees?: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      agentName,
      agentEmail,
      agentPhone,
      eventName,
      description,
      shortDescription,
      location,
      startTime,
      endTime,
      primaryImageUrl,
      thumbnailUrl,
      enableRsvp,
      rsvpEmail,
      maxAttendees,
    }: EventNotificationRequest = await req.json();

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    
    const formatDateTime = (date: Date) => {
      return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    };

    const logoUrl = "https://tfawealthplanning.lovable.app/email/tfa-logo.png";

    // Send notification to admin
    const adminEmailResponse = await resend.emails.send({
      from: "TFA Events <noreply@tfainsuranceadvisors.com>",
      to: ["events@tfainsuranceadvisors.com"],
      subject: `New Event Submission: ${eventName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff;">
          <!-- Header with Logo -->
          <div style="background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%); padding: 30px; text-align: center;">
            <img src="${logoUrl}" alt="TFA Insurance Advisors" style="height: 50px; margin-bottom: 15px;" />
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Event Submission</h1>
          </div>
          
          <!-- Event Overview -->
          <div style="padding: 30px;">
            <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #c9a227;">
              <h2 style="color: #1a365d; margin: 0 0 20px 0; font-size: 22px;">${eventName}</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; width: 140px; vertical-align: top;">Submitted by:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">
                    ${agentName}<br />
                    <a href="mailto:${agentEmail}" style="color: #2563eb; text-decoration: none;">${agentEmail}</a>
                    ${agentPhone ? `<br />${agentPhone}` : ''}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; vertical-align: top;">📍 Location:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${location}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; vertical-align: top;">🗓️ Start:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${formatDateTime(startDate)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; vertical-align: top;">🏁 End:</td>
                  <td style="padding: 8px 0; color: #1e293b;">${formatDateTime(endDate)}</td>
                </tr>
              </table>
            </div>

            <!-- Short Description -->
            <div style="margin-bottom: 24px;">
              <h3 style="color: #1a365d; margin: 0 0 12px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Short Description</h3>
              <p style="color: #475569; margin: 0; line-height: 1.6; background: #f1f5f9; padding: 16px; border-radius: 8px;">${shortDescription}</p>
            </div>

            <!-- Full Description -->
            <div style="margin-bottom: 24px;">
              <h3 style="color: #1a365d; margin: 0 0 12px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Full Description</h3>
              <div style="color: #475569; line-height: 1.7; background: #ffffff; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
                ${description.replace(/\n/g, '<br />')}
              </div>
            </div>

            <!-- Images Section -->
            <div style="margin-bottom: 24px;">
              <h3 style="color: #1a365d; margin: 0 0 12px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Event Images</h3>
              <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                ${primaryImageUrl ? `
                  <div style="flex: 1; min-width: 280px;">
                    <p style="color: #64748b; margin: 0 0 8px 0; font-size: 14px;">Primary Image:</p>
                    <img src="${primaryImageUrl}" alt="Event Primary Image" style="width: 100%; max-width: 400px; border-radius: 8px; border: 1px solid #e2e8f0;" />
                  </div>
                ` : ''}
                ${thumbnailUrl ? `
                  <div style="flex: 0 0 auto;">
                    <p style="color: #64748b; margin: 0 0 8px 0; font-size: 14px;">Thumbnail:</p>
                    <img src="${thumbnailUrl}" alt="Event Thumbnail" style="width: 150px; border-radius: 8px; border: 1px solid #e2e8f0;" />
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- RSVP Settings -->
            <div style="margin-bottom: 24px;">
              <h3 style="color: #1a365d; margin: 0 0 12px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">RSVP Settings</h3>
              <div style="background: ${enableRsvp ? '#f0fdf4' : '#fef2f2'}; padding: 16px; border-radius: 8px; border: 1px solid ${enableRsvp ? '#bbf7d0' : '#fecaca'};">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; width: 140px;">RSVP Enabled:</td>
                    <td style="padding: 4px 0; color: ${enableRsvp ? '#16a34a' : '#dc2626'}; font-weight: 600;">${enableRsvp ? '✓ Yes' : '✗ No'}</td>
                  </tr>
                  ${enableRsvp && rsvpEmail ? `
                    <tr>
                      <td style="padding: 4px 0; color: #64748b;">RSVP Email:</td>
                      <td style="padding: 4px 0; color: #1e293b;"><a href="mailto:${rsvpEmail}" style="color: #2563eb;">${rsvpEmail}</a></td>
                    </tr>
                  ` : ''}
                  ${enableRsvp ? `
                    <tr>
                      <td style="padding: 4px 0; color: #64748b;">Max Attendees:</td>
                      <td style="padding: 4px 0; color: #1e293b;">${maxAttendees ? maxAttendees : 'No limit'}</td>
                    </tr>
                  ` : ''}
                </table>
              </div>
            </div>

            <!-- Next Steps -->
            <div style="background: #1a365d; padding: 20px; border-radius: 8px; color: #ffffff;">
              <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #c9a227;">📋 Next Steps</h3>
              <p style="margin: 0; color: #e2e8f0; line-height: 1.6;">
                Review this submission in the Supabase dashboard. If approved, add the event to the Event Calendar App.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
              This email was sent from TFA Events Submission System
            </p>
          </div>
        </div>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation to agent
    const agentEmailResponse = await resend.emails.send({
      from: "TFA Events <noreply@tfainsuranceadvisors.com>",
      to: [agentEmail],
      subject: `Event Submission Received: ${eventName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <!-- Header with Logo -->
          <div style="background: linear-gradient(135deg, #1a365d 0%, #2d4a7c 100%); padding: 30px; text-align: center;">
            <img src="${logoUrl}" alt="TFA Insurance Advisors" style="height: 50px; margin-bottom: 15px;" />
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">Thank You, ${agentName}!</h1>
          </div>
          
          <div style="padding: 30px;">
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              We've received your event submission and our team will review it shortly.
            </p>
            
            <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border-left: 4px solid #c9a227;">
              <h2 style="color: #1a365d; margin: 0 0 16px 0; font-size: 20px;">${eventName}</h2>
              <p style="color: #64748b; margin: 0 0 8px 0;">📍 ${location}</p>
              <p style="color: #64748b; margin: 0;">🗓️ ${formatDateTime(startDate)}</p>
            </div>
            
            ${primaryImageUrl ? `
              <div style="margin-top: 24px;">
                <img src="${primaryImageUrl}" alt="Your Event" style="width: 100%; max-width: 400px; border-radius: 8px; border: 1px solid #e2e8f0;" />
              </div>
            ` : ''}
            
            <p style="color: #475569; margin: 24px 0; line-height: 1.6;">
              Once approved, your event will be added to the TFA Events Calendar. You'll receive a confirmation email when it's live.
            </p>
            
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">
              If you have any questions, please contact us at <a href="mailto:events@tfainsuranceadvisors.com" style="color: #2563eb;">events@tfainsuranceadvisors.com</a>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} TFA Insurance Advisors
            </p>
          </div>
        </div>
      `,
    });

    console.log("Agent confirmation sent:", agentEmailResponse);

    return new Response(
      JSON.stringify({ success: true, adminEmail: adminEmailResponse, agentEmail: agentEmailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-event-notification:", error);
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
