import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-SPONSORSHIP-CHECKOUT] ${step}${detailsStr}`);
};

// Stripe Price IDs for sponsorship packages
const PRICE_IDS: Record<string, string> = {
  title: "price_1SpGtfI5s9xwrb3euIehzfMf",
  supporting: "price_1SpGu0I5s9xwrb3eDsO9hzTM",
  community: "price_1SpGuCI5s9xwrb3edJhusi2O",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const { sponsorshipPackage, email, companyName, leadId } = await req.json();
    logStep("Request body parsed", { sponsorshipPackage, email: email ? "provided" : "not provided", companyName, leadId });

    // Validate package
    const priceId = PRICE_IDS[sponsorshipPackage];
    if (!priceId) {
      throw new Error(`Invalid sponsorship package: ${sponsorshipPackage}`);
    }
    logStep("Price ID resolved", { priceId });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer exists (by email) to reuse
    let customerId: string | undefined;
    if (email) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing customer", { customerId });
      }
    }

    const origin = req.headers.get("origin") || "https://tfainsuranceadvisors.com";

    // Build checkout session config
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      customer_email: customerId ? undefined : email || undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${origin}/events/tfa-2026-kickoff-sponsorship/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/events/tfa-2026-kickoff-sponsorship`,
      metadata: {
        sponsorship_package: sponsorshipPackage,
        company_name: companyName || "",
        lead_id: leadId || "",
      },
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);
    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
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
