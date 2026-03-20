import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-SPONSORSHIP-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    const { tierId, email, companyName, leadId, sponsorshipPackage } = await req.json();
    const resolvedTierId = tierId || sponsorshipPackage;
    logStep("Request body parsed", { tierId: resolvedTierId, email: email ? "provided" : "not provided", companyName, leadId });

    // Fetch stripe_price_id from sponsorship_tiers table
    const { data: tierData, error: tierError } = await supabaseClient
      .from("sponsorship_tiers")
      .select("stripe_price_id, name, price")
      .eq("tier_id", resolvedTierId)
      .single();

    if (tierError || !tierData?.stripe_price_id) {
      throw new Error(`Invalid or unconfigured sponsorship tier: ${resolvedTierId}`);
    }

    logStep("Tier resolved", { priceId: tierData.stripe_price_id, name: tierData.name, price: tierData.price });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer exists
    let customerId: string | undefined;
    if (email) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing customer", { customerId });
      }
    }

    const origin = req.headers.get("origin") || "https://tfainsuranceadvisors.com";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email || undefined,
      line_items: [{ price: tierData.stripe_price_id, quantity: 1 }],
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${origin}/events/sponsorship/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/events/sponsorship`,
      metadata: {
        sponsorship_package: resolvedTierId,
        company_name: companyName || "",
        lead_id: leadId || "",
      },
    });

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
