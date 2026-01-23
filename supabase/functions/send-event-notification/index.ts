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
  eventName: string;
  location: string;
  startTime: string;
  endTime: string;
  primaryImageUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      agentName,
      agentEmail,
      eventName,
      location,
      startTime,
      endTime,
      primaryImageUrl,
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

    // Send notification to admin
    const adminEmailResponse = await resend.emails.send({
      from: "TFA Events <notifications@tfainsuranceadvisors.com>",
      to: ["events@tfainsuranceadvisors.com"],
      subject: `New Event Submission: ${eventName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">
            New Event Submission
          </h1>
          
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2d3748; margin-top: 0;">${eventName}</h2>
            
            <p><strong>Submitted by:</strong> ${agentName} (${agentEmail})</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Start:</strong> ${formatDateTime(startDate)}</p>
            <p><strong>End:</strong> ${formatDateTime(endDate)}</p>
          </div>
          
          ${primaryImageUrl ? `
            <div style="margin: 20px 0;">
              <p><strong>Primary Image:</strong></p>
              <img src="${primaryImageUrl}" alt="Event Image" style="max-width: 100%; border-radius: 8px;" />
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 15px; background: #edf2f7; border-radius: 8px;">
            <p style="margin: 0; color: #4a5568;">
              <strong>Next Steps:</strong> Review this submission in the Supabase dashboard and add to the Event Calendar App if approved.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation to agent
    const agentEmailResponse = await resend.emails.send({
      from: "TFA Events <notifications@tfainsuranceadvisors.com>",
      to: [agentEmail],
      subject: `Event Submission Received: ${eventName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">
            Thank You, ${agentName}!
          </h1>
          
          <p>We've received your event submission for:</p>
          
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2d3748; margin-top: 0;">${eventName}</h2>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>When:</strong> ${formatDateTime(startDate)}</p>
          </div>
          
          <p>Our team will review your submission and add it to the calendar once approved. You'll receive a confirmation once it's live.</p>
          
          <p style="color: #718096; margin-top: 30px; font-size: 14px;">
            If you have any questions, please contact us at events@tfainsuranceadvisors.com
          </p>
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
