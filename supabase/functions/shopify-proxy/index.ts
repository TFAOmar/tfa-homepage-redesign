import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://tfainsuranceadvisors.com",
  "https://www.tfainsuranceadvisors.com",
  "https://tfawealthplanning.com",
  "https://www.tfawealthplanning.com",
  "http://localhost:5173",
  "http://localhost:8080",
];

const getCorsHeaders = (origin: string | null): Record<string, string> => {
  // Check if origin matches allowed patterns (including Lovable preview domains)
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) ||
    origin.endsWith('.lovableproject.com')
  );
  
  const allowedOrigin = isAllowed ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
};

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'lovable-project-onufb.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

// Rate limiting: track requests per IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 60; // requests per minute
const RATE_LIMIT_WINDOW = 60000; // 1 minute in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(t => now - t < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return true;
  }
  
  rateLimitMap.set(ip, [...recentRequests, now]);
  return false;
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, requests] of rateLimitMap.entries()) {
    const recent = requests.filter(t => now - t < RATE_LIMIT_WINDOW);
    if (recent.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recent);
    }
  }
}, 60000);

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
               req.headers.get("x-real-ip") || 
               "unknown";

    // Check rate limit
    if (isRateLimited(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { 
          status: 429, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Parse request body
    const body = await req.json();
    const { query, variables } = body;

    // Validate input
    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid request: query is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Limit query size to prevent abuse
    if (query.length > 10000) {
      return new Response(
        JSON.stringify({ error: "Query too large" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get token from secrets
    const SHOPIFY_STOREFRONT_TOKEN = Deno.env.get("SHOPIFY_STOREFRONT_ACCESS_TOKEN");
    
    if (!SHOPIFY_STOREFRONT_TOKEN) {
      console.error("SHOPIFY_STOREFRONT_ACCESS_TOKEN not configured");
      return new Response(
        JSON.stringify({ error: "Shopify integration not configured" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Proxying Shopify request from IP: ${ip}`);

    // Forward to Shopify
    const shopifyResponse = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await shopifyResponse.json();

    // Log any errors for debugging
    if (data.errors) {
      console.error("Shopify API errors:", JSON.stringify(data.errors));
    }

    return new Response(JSON.stringify(data), {
      status: shopifyResponse.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Shopify proxy error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { ...getCorsHeaders(null), "Content-Type": "application/json" } 
      }
    );
  }
});
