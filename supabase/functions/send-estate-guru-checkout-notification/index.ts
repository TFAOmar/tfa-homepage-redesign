import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[ESTATE-GURU-CHECKOUT-NOTIFICATION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const { sessionId } = await req.json();
    if (!sessionId) {
      throw new Error("sessionId is required");
    }
    logStep("Session ID received", { sessionId });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Fetch checkout session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer", "line_items"],
    });
    logStep("Stripe session retrieved", {
      status: session.status,
      customerEmail: session.customer_details?.email,
      paymentStatus: session.payment_status,
    });

    // Only send notification if payment was successful
    if (session.payment_status !== "paid") {
      logStep("Payment not completed, skipping notification", { paymentStatus: session.payment_status });
      return new Response(JSON.stringify({ success: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const customerEmail = session.customer_details?.email || "Unknown";
    const customerName = session.customer_details?.name || "Unknown";
    const amountTotal = session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : "Unknown";
    const planName = session.line_items?.data?.[0]?.description || "Estate Guru Subscription";
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
          <div style="background: linear-gradient(135deg, #0B1F3B 0%, #1a3a5c 100%); padding: 30px; text-align: center;">
            <h1 style="color: #D4AF37; margin: 0; font-size: 24px;">💰 New Estate Guru Payment</h1>
            <p style="color: #ffffff; margin: 8px 0 0; font-size: 14px;">A new agent has completed checkout</p>
          </div>

          <div style="padding: 30px;">
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 0; color: #166534; font-weight: bold; font-size: 16px;">✅ Payment Confirmed</p>
              <p style="margin: 8px 0 0; color: #166534; font-size: 14px;">Registration form has NOT been submitted yet.</p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">Customer Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0B1F3B; font-weight: bold;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Customer Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0B1F3B; font-weight: bold;">${customerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Plan</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0B1F3B; font-weight: bold;">${planName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Amount Paid</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #D4AF37; font-weight: bold; font-size: 18px;">${amountTotal}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Payment Time</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0B1F3B;">${submittedAt}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;">Stripe Session</td>
                <td style="padding: 10px 0; color: #0B1F3B; font-size: 12px; word-break: break-all;">${sessionId}</td>
              </tr>
            </table>

            <div style="background-color: #FEF3C7; border: 1px solid #F59E0B; border-radius: 8px; padding: 16px; margin-top: 20px;">
              <p style="margin: 0; color: #92400E; font-weight: bold;">⏳ Action Required</p>
              <p style="margin: 8px 0 0; color: #92400E; font-size: 14px;">This agent has paid but may not have completed the registration form yet. If you don't receive a separate registration notification within 24 hours, please follow up with the agent at <strong>${customerEmail}</strong>.</p>
            </div>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #9ca3af; font-size: 12px;">The Financial Architects — Estate Guru Checkout Notification</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Estate Guru Notifications <noreply@tfainsuranceadvisors.com>",
        to: [
          "livingtrusts@tfainsuranceadvisors.com",
          "heather@estateguru.com",
          "nancy@estateguru.com",
        ],
        subject: `💰 New Estate Guru Payment — ${customerName} (${customerEmail})`,
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();
    logStep("Resend response", { status: resendResponse.status, data: resendData });

    if (!resendResponse.ok) {
      throw new Error(`Resend API error: ${JSON.stringify(resendData)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
