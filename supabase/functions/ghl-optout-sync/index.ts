import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "https://esm.sh/zod@3.23.8";

const GHL_SHARED_SECRET = Deno.env.get("GHL_SHARED_SECRET") || "";

const BodySchema = z.object({
  phone: z.string().min(6).max(20),
  reason: z.string().max(200).optional(),
  occurred_at: z.string().optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const provided =
    req.headers.get("x-ghl-secret") ||
    req.headers.get("x-shared-secret") ||
    (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");

  if (!GHL_SHARED_SECRET || provided !== GHL_SHARED_SECRET) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { phone, reason, occurred_at } = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Normalize to E.164 (assume US if 10 digits)
    const digits = phone.replace(/\D/g, "");
    const e164 = phone.startsWith("+")
      ? `+${digits}`
      : digits.length === 10
        ? `+1${digits}`
        : `+${digits}`;

    const { data: existing } = await supabase
      .from("intake_suppressions")
      .select("id")
      .eq("phone_e164", e164)
      .maybeSingle();

    if (!existing) {
      await supabase.from("intake_suppressions").insert({
        phone_e164: e164,
        reason: reason || "ghl_optout",
        occurred_at: occurred_at || new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify({ ok: true, phone_e164: e164 }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ghl-optout-sync error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});