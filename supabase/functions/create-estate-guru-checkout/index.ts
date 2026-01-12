import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-ESTATE-GURU-CHECKOUT] ${step}${detailsStr}`);
};

// Price IDs from Stripe
const MONTHLY_PRICE_ID = "price_1RTAGIQXKdxGcmw3YCH8YJjV";
const ANNUAL_PRICE_ID = "price_1RTAGuQXKdxGcmw3kkIIFZqC";
const TFA200_COUPON_ID = "Rdca79Wp";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const { priceId, isPromo, email } = await req.json();
    logStep("Request body parsed", { priceId, isPromo, email: email ? "provided" : "not provided" });

    // Validate price ID
    if (priceId !== MONTHLY_PRICE_ID && priceId !== ANNUAL_PRICE_ID) {
      throw new Error("Invalid price ID");
    }

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
      mode: "subscription",
      success_url: `${origin}/estate-guru/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/estate-guru`,
    };

    // Apply TFA200 coupon for promo plan
    if (isPromo && priceId === ANNUAL_PRICE_ID) {
      sessionConfig.discounts = [{ coupon: TFA200_COUPON_ID }];
      logStep("Applying TFA200 coupon");
    }

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
