import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const PIPEDRIVE_API_TOKEN = Deno.env.get("PIPEDRIVE_API_TOKEN");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const cleanupRateLimitStore = () => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
};

const checkRateLimit = (ip: string): { allowed: boolean; remaining: number; resetIn: number } => {
  cleanupRateLimitStore();
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }
  
  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count, resetIn: record.resetTime - now };
};

// Zod schema for input validation
const formSubmitSchema = z.object({
  form_name: z.string().min(1).max(100),
  source_url: z.string().url().max(500).optional(),
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(30).optional(),
  preferred_language: z.string().max(50).optional(),
  state: z.string().max(50).optional(),
  company_name: z.string().max(200).optional(),
  notes: z.string().max(5000).optional(),
  advisor_id: z.string().uuid().optional(),
  advisor_slug: z.string().max(100).optional(),
  advisor_email: z.string().email().max(255).optional(),
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  honeypot: z.string().optional(), // Bot trap - should be empty
});

type FormSubmitData = z.infer<typeof formSubmitSchema>;

// Pipedrive API helper
const pipedriveApi = async (
  endpoint: string, 
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: Record<string, unknown>
): Promise<{ success: boolean; data?: unknown; error?: string }> => {
  try {
    const url = `https://api.pipedrive.com/v1${endpoint}${endpoint.includes("?") ? "&" : "?"}api_token=${PIPEDRIVE_API_TOKEN}`;
    
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    
    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok || !data.success) {
      console.error(`[Pipedrive API Error] ${endpoint}:`, data);
      return { success: false, error: data.error || "Pipedrive API error" };
    }
    
    return { success: true, data: data.data };
  } catch (error) {
    console.error(`[Pipedrive API Exception] ${endpoint}:`, error);
    return { success: false, error: error instanceof Error ? error.message : "Network error" };
  }
};

// Search for person by email or phone
const searchPerson = async (email: string, phone?: string): Promise<number | null> => {
  // Search by email first
  const emailSearch = await pipedriveApi(`/persons/search?term=${encodeURIComponent(email)}&fields=email&exact_match=true`);
  if (emailSearch.success && emailSearch.data && Array.isArray(emailSearch.data) && emailSearch.data.length > 0) {
    const items = (emailSearch.data as { items: { item: { id: number } }[] }[]);
    if (items[0]?.items?.[0]?.item?.id) {
      return items[0].items[0].item.id;
    }
  }
  
  // Search by phone if email not found
  if (phone) {
    const phoneSearch = await pipedriveApi(`/persons/search?term=${encodeURIComponent(phone)}&fields=phone&exact_match=true`);
    if (phoneSearch.success && phoneSearch.data && Array.isArray(phoneSearch.data) && phoneSearch.data.length > 0) {
      const items = (phoneSearch.data as { items: { item: { id: number } }[] }[]);
      if (items[0]?.items?.[0]?.item?.id) {
        return items[0].items[0].item.id;
      }
    }
  }
  
  return null;
};

// Upsert person in Pipedrive
const upsertPerson = async (
  formData: FormSubmitData,
  ownerId: number
): Promise<{ personId: number | null; wasCreated: boolean }> => {
  const existingPersonId = await searchPerson(formData.email, formData.phone);
  
  const personData: Record<string, unknown> = {
    name: `${formData.first_name} ${formData.last_name}`.trim(),
    email: formData.email,
    owner_id: ownerId,
  };
  
  if (formData.phone) personData.phone = formData.phone;
  
  if (existingPersonId) {
    // Update existing person
    const result = await pipedriveApi(`/persons/${existingPersonId}`, "PUT", personData);
    return { personId: result.success ? existingPersonId : null, wasCreated: false };
  } else {
    // Create new person
    const result = await pipedriveApi("/persons", "POST", personData);
    const newId = (result.data as { id?: number })?.id;
    return { personId: newId || null, wasCreated: true };
  }
};

// Search/create organization
const upsertOrganization = async (
  companyName: string,
  ownerId: number
): Promise<number | null> => {
  // Search existing
  const search = await pipedriveApi(`/organizations/search?term=${encodeURIComponent(companyName)}&exact_match=true`);
  if (search.success && search.data && Array.isArray(search.data) && search.data.length > 0) {
    const items = (search.data as { items: { item: { id: number } }[] }[]);
    if (items[0]?.items?.[0]?.item?.id) {
      return items[0].items[0].item.id;
    }
  }
  
  // Create new
  const result = await pipedriveApi("/organizations", "POST", {
    name: companyName,
    owner_id: ownerId,
  });
  
  return (result.data as { id?: number })?.id || null;
};

// Create lead in Pipedrive Leads Inbox
const createLead = async (
  formData: FormSubmitData,
  personId: number,
  orgId: number | null,
  ownerId: number
): Promise<string | null> => {
  const title = `[${formData.form_name}] - ${formData.first_name} ${formData.last_name}${formData.state ? ` - ${formData.state}` : ""}`;
  
  const leadData: Record<string, unknown> = {
    title,
    person_id: personId,
    owner_id: ownerId,
  };
  
  if (orgId) leadData.organization_id = orgId;
  
  const result = await pipedriveApi("/leads", "POST", leadData);
  return (result.data as { id?: string })?.id || null;
};

// Add note to lead
const addNote = async (
  formData: FormSubmitData,
  leadId: string | null,
  personId: number
): Promise<boolean> => {
  const utmInfo = [
    formData.utm_source && `Source: ${formData.utm_source}`,
    formData.utm_medium && `Medium: ${formData.utm_medium}`,
    formData.utm_campaign && `Campaign: ${formData.utm_campaign}`,
    formData.utm_content && `Content: ${formData.utm_content}`,
    formData.utm_term && `Term: ${formData.utm_term}`,
  ].filter(Boolean).join("\n");
  
  const noteContent = [
    `📋 Form: ${formData.form_name}`,
    formData.source_url && `🔗 Source URL: ${formData.source_url}`,
    `📅 Submitted: ${new Date().toISOString()}`,
    formData.preferred_language && `🌐 Language: ${formData.preferred_language}`,
    formData.state && `📍 State: ${formData.state}`,
    formData.notes && `\n📝 Notes:\n${formData.notes}`,
    utmInfo && `\n📊 Attribution:\n${utmInfo}`,
    formData.tags?.length && `\n🏷️ Tags: ${formData.tags.join(", ")}`,
  ].filter(Boolean).join("\n");
  
  const noteData: Record<string, unknown> = {
    content: noteContent,
    person_id: personId,
  };
  
  if (leadId) noteData.lead_id = leadId;
  
  const result = await pipedriveApi("/notes", "POST", noteData);
  return result.success;
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ ok: false, error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  
  // Check required env vars
  if (!PIPEDRIVE_API_TOKEN || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[Config Error] Missing required environment variables");
    return new Response(
      JSON.stringify({ ok: false, error: "Server configuration error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  
  // Rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("cf-connecting-ip") || 
                   "unknown";
  
  const rateLimit = checkRateLimit(clientIP);
  if (!rateLimit.allowed) {
    console.warn(`[Rate Limited] IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ ok: false, error: "Too many requests. Please try again later." }),
      { 
        status: 429, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil(rateLimit.resetIn / 1000))
        } 
      }
    );
  }
  
  try {
    const body = await req.json();
    
    // Validate input
    const parseResult = formSubmitSchema.safeParse(body);
    if (!parseResult.success) {
      console.warn("[Validation Error]", parseResult.error.flatten());
      return new Response(
        JSON.stringify({ ok: false, error: "Invalid form data", details: parseResult.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const formData = parseResult.data;
    
    // Bot detection - honeypot field
    if (formData.honeypot && formData.honeypot.length > 0) {
      console.warn(`[Bot Detected] Honeypot filled by IP: ${clientIP}`);
      // Return success to not alert bots
      return new Response(
        JSON.stringify({ ok: true, routed_to: "Manny Soto", pipedrive_ids: {} }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Idempotency check - same email + form_name within 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { data: recentSubmission } = await supabase
      .from("form_submissions")
      .select("id, pipedrive_lead_id, pipedrive_person_id")
      .eq("email", formData.email)
      .eq("form_type", formData.form_name)
      .gte("created_at", tenMinutesAgo)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (recentSubmission?.pipedrive_person_id) {
      console.log(`[Idempotency] Duplicate detected for ${formData.email}, returning existing`);
      return new Response(
        JSON.stringify({
          ok: true,
          routed_to: "Existing submission",
          pipedrive_ids: {
            person_id: recentSubmission.pipedrive_person_id,
            lead_id: recentSubmission.pipedrive_lead_id,
          },
          submission_id: recentSubmission.id,
          duplicate: true,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Resolve advisor routing - only need pipedrive_user_id now
    let advisor = null;
    let routingResult: "advisor_match" | "default_manny" = "default_manny";
    
    if (formData.advisor_id || formData.advisor_slug || formData.advisor_email) {
      let query = supabase
        .from("dynamic_advisors")
        .select("id, name, email, slug, pipedrive_user_id")
        .eq("status", "published");
      
      if (formData.advisor_id) {
        query = query.eq("id", formData.advisor_id);
      } else if (formData.advisor_slug) {
        query = query.eq("slug", formData.advisor_slug);
      } else if (formData.advisor_email) {
        query = query.eq("email", formData.advisor_email);
      }
      
      const { data: advisorData } = await query.limit(1).maybeSingle();
      
      if (advisorData?.pipedrive_user_id) {
        advisor = advisorData;
        routingResult = "advisor_match";
      }
    }
    
    // Get Manny Soto default user ID from system_settings
    const { data: settings } = await supabase
      .from("system_settings")
      .select("key, value")
      .eq("key", "manny_pipedrive_user_id")
      .maybeSingle();
    
    const mannyUserId = parseInt(settings?.value as string || "0");
    
    // Determine final owner
    const ownerId = advisor?.pipedrive_user_id || mannyUserId;
    const routedToName = advisor?.name || "Manny Soto";
    
    if (ownerId === 0) {
      console.error("[Config Error] Pipedrive owner ID not configured");
      return new Response(
        JSON.stringify({ ok: false, error: "CRM integration not configured. Please contact support." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Create submission record first (in-progress state)
    const { data: submission, error: insertError } = await supabase
      .from("form_submissions")
      .insert({
        form_type: formData.form_name,
        source: formData.source_url || null,
        source_url: formData.source_url,
        first_name: formData.first_name,
        last_name: formData.last_name,
        name: `${formData.first_name} ${formData.last_name}`.trim(),
        email: formData.email,
        phone: formData.phone,
        preferred_language: formData.preferred_language,
        state_location: formData.state,
        utm_source: formData.utm_source,
        utm_medium: formData.utm_medium,
        utm_campaign: formData.utm_campaign,
        utm_content: formData.utm_content,
        utm_term: formData.utm_term,
        advisor_slug: formData.advisor_slug,
        advisor: advisor?.name || null,
        routing_result: routingResult,
        pipedrive_owner_id: ownerId,
        notes: formData.notes,
        status: "processing",
        form_data: formData,
      })
      .select("id")
      .single();
    
    if (insertError) {
      console.error("[DB Insert Error]", insertError);
      return new Response(
        JSON.stringify({ ok: false, error: "Failed to save form submission" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const submissionId = submission.id;
    
    // Pipedrive operations
    let personId: number | null = null;
    let orgId: number | null = null;
    let leadId: string | null = null;
    let errorMessage: string | null = null;
    
    try {
      // 1. Upsert Person
      const personResult = await upsertPerson(formData, ownerId);
      personId = personResult.personId;
      
      if (!personId) {
        throw new Error("Failed to create/update person in Pipedrive");
      }
      
      // 2. Upsert Organization (if company provided)
      if (formData.company_name) {
        orgId = await upsertOrganization(formData.company_name, ownerId);
      }
      
      // 3. Create Lead in Leads Inbox
      leadId = await createLead(formData, personId, orgId, ownerId);
      
      if (!leadId) {
        throw new Error("Failed to create lead in Pipedrive");
      }
      
      // 4. Add note with attribution
      await addNote(formData, leadId, personId);
      
    } catch (pipedriveError) {
      console.error("[Pipedrive Error]", pipedriveError);
      errorMessage = pipedriveError instanceof Error ? pipedriveError.message : "Pipedrive API error";
    }
    
    // Update submission with Pipedrive IDs
    const finalStatus = errorMessage ? "failed" : "created";
    await supabase
      .from("form_submissions")
      .update({
        pipedrive_person_id: personId,
        pipedrive_org_id: orgId,
        pipedrive_lead_id: leadId,
        status: finalStatus,
        error_message: errorMessage,
      })
      .eq("id", submissionId);
    
    if (errorMessage) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Partial failure - form saved but CRM sync failed",
          submission_id: submissionId,
          pipedrive_ids: { person_id: personId },
        }),
        { status: 207, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`[Success] Form submitted: ${formData.form_name} by ${formData.email}, routed to ${routedToName}`);
    
    return new Response(
      JSON.stringify({
        ok: true,
        routed_to: routedToName,
        routing_result: routingResult,
        pipedrive_ids: {
          person_id: personId,
          org_id: orgId,
          lead_id: leadId,
        },
        submission_id: submissionId,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("[Unhandled Error]", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
