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
      throw new Error(`Failed to send notification email: ${errorData}`);
    }

    const result = await emailResponse.json();
    console.log("Registration notification email sent successfully:", result);

    // Send confirmation email to the registering agent
    const confirmationHtml = `
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
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">Welcome to the Team!</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px;">
            <h2 style="color: #0B1F3B; margin: 0 0 20px 0; font-size: 22px;">
              Welcome, ${data.firstName}! 🎉
            </h2>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for registering with Estate Guru! We're excited to have you on board.
            </p>
            
            <div style="background-color: #e8f5e9; border-left: 4px solid #22c55e; padding: 15px 20px; margin-bottom: 25px;">
              <p style="color: #166534; font-size: 14px; margin: 0; font-weight: 600;">
                ✓ Your registration has been received!
              </p>
              <p style="color: #166534; font-size: 14px; margin: 8px 0 0 0;">
                You can expect your login credentials within 24-48 hours.
              </p>
            </div>
            
            <h3 style="color: #0B1F3B; margin: 30px 0 15px 0; font-size: 18px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
              Contact Directory
            </h3>
            
            <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
              If you have any questions, please don't hesitate to reach out to the appropriate contact below:
            </p>
            
            <!-- Nancy Hall Section -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
              <h4 style="color: #0B1F3B; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
                Nancy Hall | Director of Account Management
              </h4>
              <p style="color: #555; font-size: 14px; margin: 0 0 10px 0;">
                📧 <a href="mailto:nancy@estateguru.com" style="color: #0B1F3B;">nancy@estateguru.com</a><br>
                📞 <a href="tel:7273302867" style="color: #0B1F3B;">(727) 330-2867</a><br>
                📅 <a href="https://meetings.hubspot.com/nancy-hall" style="color: #D4AF37;">Schedule a Meeting</a>
              </p>
              <p style="color: #666; font-size: 13px; margin: 10px 0 0 0; font-style: italic;">
                Contact Nancy for:
              </p>
              <ul style="color: #555; font-size: 13px; margin: 5px 0 0 0; padding-left: 20px;">
                <li>Adding additional Estate Guru products and services</li>
                <li>Specific questions about a client's estate plan</li>
                <li>Estate Guru training, pricing, materials, and client-facing marketing materials</li>
              </ul>
            </div>
            
            <!-- Customer Support Section -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
              <h4 style="color: #0B1F3B; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
                Customer Support
              </h4>
              <p style="color: #555; font-size: 14px; margin: 0 0 10px 0;">
                📧 <a href="mailto:support@estateguru.com" style="color: #0B1F3B;">support@estateguru.com</a><br>
                📞 <a href="tel:3852406400" style="color: #0B1F3B;">(385) 240-6400 x1</a>
              </p>
              <p style="color: #666; font-size: 13px; margin: 10px 0 0 0; font-style: italic;">
                Contact Support for:
              </p>
              <ul style="color: #555; font-size: 13px; margin: 5px 0 0 0; padding-left: 20px;">
                <li>Log in help for you or your client</li>
                <li>Questions around deed orders</li>
                <li>Uploading client signature pages</li>
                <li>Questions around shipping</li>
              </ul>
            </div>
            
            <!-- Heather Amey Section -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
              <h4 style="color: #0B1F3B; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
                Heather Amey | Director of Onboarding
              </h4>
              <p style="color: #555; font-size: 14px; margin: 0 0 10px 0;">
                📞 <a href="tel:2084288093" style="color: #0B1F3B;">(208) 428-8093</a><br>
                📅 <a href="https://cx0c-04.na1.hs-sales-engage.com/Ctc/LY+23284/cX0C-04/JkM2-6qcW6N1vHY6lZ3kVN1c826z6HB9SW36F_SV4qFVVSVKhV0b7XpxspW8dsnCQ7s742TW90mXSX5YNdHPW2_Bbkg52yZPdW8sQS921Cxx3YN6YGwpvVhBSvW5MpxvH8Zv2swW7LJjxZ1hq3BpN2HRn-v7GKH0W5GMGcx9gP75DN4D0B_Lk2JYPW1GMf-W8Lz_h3W8PMKJ68ZNRsJN1XzFSWbGJ-KN2NhJV87Wxp3W8pvMlm3nkW1yN8Sc_T3hWHdqW5rmN436vcWS4W4HxxZn2dLtFHW2Wm0x76qqtQXf4V8ZP804" style="color: #D4AF37;">Book an Appointment</a><br>
                📅 <a href="https://meetings.hubspot.com/heather-amey/estate-guru-plus-" style="color: #D4AF37;">Estate Planning Appointment</a>
              </p>
              <p style="color: #666; font-size: 13px; margin: 10px 0 0 0; font-style: italic;">
                Contact Heather for onboarding assistance and getting started.
              </p>
            </div>
            
            <!-- Next Steps -->
            <div style="background-color: #fff8e6; border-left: 4px solid #D4AF37; padding: 15px 20px; margin-bottom: 25px;">
              <h4 style="color: #0B1F3B; margin: 0 0 10px 0; font-size: 14px; font-weight: 600;">Next Steps:</h4>
              <ol style="color: #555; font-size: 14px; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 5px;">Watch for your login credentials (within 24-48 hours)</li>
                <li style="margin-bottom: 5px;">Book an onboarding appointment with Heather</li>
                <li>Reach out to Nancy for training materials</li>
              </ol>
            </div>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
              We look forward to working with you!
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 20px 40px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              This email was sent by Estate Guru.<br>
              You're receiving this because you registered at estateguru.com
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Estate Guru <noreply@tfainsuranceadvisors.com>",
        to: [data.email],
        subject: "Welcome to Estate Guru - Registration Received!",
        html: confirmationHtml,
      }),
    });

    if (!confirmationResponse.ok) {
      const errorData = await confirmationResponse.text();
      console.error("Confirmation email error:", errorData);
      // Don't throw - notification was sent, just log the confirmation failure
    } else {
      const confirmResult = await confirmationResponse.json();
      console.log("Confirmation email sent successfully:", confirmResult);
    }

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
