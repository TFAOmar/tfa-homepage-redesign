import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const PIPEDRIVE_API_TOKEN = Deno.env.get("PIPEDRIVE_API_TOKEN");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const TEAM_EMAIL = "leads@tfainsuranceadvisors.com";

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
  interest_category: z.string().max(100).optional(), // For Pipedrive lead labels
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

// Fetch all lead labels from Pipedrive
const fetchLeadLabels = async (): Promise<Map<string, string>> => {
  const result = await pipedriveApi("/leadLabels");
  const labelMap = new Map<string, string>();
  
  if (result.success && Array.isArray(result.data)) {
    for (const label of result.data as { name: string; id: string }[]) {
      // Store label name (lowercase) → label id mapping
      labelMap.set(label.name.toLowerCase(), label.id);
    }
    console.log(`[Pipedrive] Fetched ${labelMap.size} lead labels`);
  } else {
    console.warn("[Pipedrive] Failed to fetch lead labels:", result.error);
  }
  
  return labelMap;
};

// Determine label names from form context (supports multiple for Book Consultation)
const determineLabelNames = (formData: FormSubmitData): string[] => {
  const labels: string[] = [];
  
  // Book Consultation - handle multiple interest categories (comma-separated)
  if (formData.form_name === "Book Consultation" && formData.interest_category) {
    const interestLabels: Record<string, string> = {
      retirement: "Retirement Planning",
      insurance: "Life Insurance",
      investment: "Investment Management",
      tax: "Tax Strategy",
      estate: "Estate Planning",
      business: "Business Insurance",
    };
    
    // Split comma-separated categories and map each to a label
    const categories = formData.interest_category.split(",");
    for (const category of categories) {
      const label = interestLabels[category.trim()];
      if (label) {
        labels.push(label);
      }
    }
    return labels;
  }
  
  // Form-specific labels (single label)
  const formLabelMap: Record<string, string> = {
    // Kai-Zen forms
    "Kai-Zen Inquiry": "Kai-Zen",
    "Kai-Zen Inquiry - Mariah": "Kai-Zen",
    
    // Estate Planning forms
    "Estate Planning Inquiry": "Estate Planning",
    "Living Trust Inquiry - Vanessa": "Estate Planning",
    
    // Health & Medicare forms
    "Medicare Inquiry - Tamara": "Medicare",
    "Health Insurance Inquiry": "Health Insurance",
    "American Way Health Inquiry": "Health Insurance",
    
    // Business forms
    "Business Insurance Inquiry": "Business Insurance",
    "Recinos Business Insurance Inquiry": "Business Insurance",
    
    // General contact forms
    "Contact Form": "General Inquiry",
    "Service Consultation": "General Inquiry",
    "Schedule Request": "General Inquiry",
    "Advisor Contact": "General Inquiry",
    
    // Careers forms
    "Careers Inquiry": "Careers",
    "Agent Application": "Careers",
    "Franchise Application": "Franchise",
    
    // Advisor onboarding
    "Advisor Onboarding": "Advisor Onboarding",
    
    // Service-specific forms (from ServiceConsultationForm)
    "Life Insurance": "Life Insurance",
    "Annuities": "Retirement Planning",
    "Retirement Planning": "Retirement Planning",
    "401(k) Rollovers": "Retirement Planning",
    "Tax Planning": "Tax Strategy",
    "Estate Planning": "Estate Planning",
    "Investment Management": "Investment Management",
    "Healthcare Planning": "Health Insurance",
    "Business Insurance": "Business Insurance",
    "Group Retirement Plans": "Retirement Planning",
  };
  
  const formLabel = formLabelMap[formData.form_name];
  if (formLabel) {
    labels.push(formLabel);
  }
  
  return labels;
};

// Create lead in Pipedrive Leads Inbox
const createLead = async (
  formData: FormSubmitData,
  personId: number,
  orgId: number | null,
  ownerId: number,
  labelIds?: string[]
): Promise<string | null> => {
  const title = `[${formData.form_name}] - ${formData.first_name} ${formData.last_name}${formData.state ? ` - ${formData.state}` : ""}`;
  
  const leadData: Record<string, unknown> = {
    title,
    person_id: personId,
    owner_id: ownerId,
  };
  
  if (orgId) leadData.organization_id = orgId;
  if (labelIds && labelIds.length > 0) leadData.label_ids = labelIds;
  
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

// ============ EMAIL TEMPLATES ============

const getFormDisplayName = (formName: string): string => {
  const displayNames: Record<string, string> = {
    "book-consultation": "Consultation Request",
    "contact": "Contact Form",
    "kai-zen-inquiry": "Kai-Zen Inquiry",
    "kai-zen-mariah": "Kai-Zen Inquiry (Mariah)",
    "living-trust-vanessa": "Living Trust Inquiry",
    "medicare-tamara": "Medicare Inquiry",
    "schedule-advisor": "Advisor Scheduling Request",
    "contact-advisor": "Advisor Contact Request",
    "service-consultation": "Service Consultation",
    "estate-planning": "Estate Planning Inquiry",
    "american-way-health": "American Way Health Inquiry",
    "business-insurance-recinos": "Business Insurance Inquiry",
    "agent-application": "Agent Application",
    "franchise-application": "Franchise Application",
    "careers-inquiry": "Career Inquiry",
    "advisor-onboarding": "Advisor Onboarding",
  };
  return displayNames[formName] || formName;
};

const generateTeamNotificationHtml = (
  formData: FormSubmitData,
  submissionId: string,
  advisorName?: string
): string => {
  const formRows = [
    { label: "Name", value: `${formData.first_name} ${formData.last_name}` },
    { label: "Email", value: formData.email },
    formData.phone && { label: "Phone", value: formData.phone },
    formData.state && { label: "State", value: formData.state },
    formData.preferred_language && { label: "Language", value: formData.preferred_language },
    formData.company_name && { label: "Company", value: formData.company_name },
    formData.notes && { label: "Message/Notes", value: formData.notes },
    advisorName && { label: "Assigned Advisor", value: advisorName },
    formData.source_url && { label: "Source URL", value: formData.source_url },
  ].filter(Boolean) as { label: string; value: string }[];

  const utmRows = [
    formData.utm_source && { label: "UTM Source", value: formData.utm_source },
    formData.utm_medium && { label: "UTM Medium", value: formData.utm_medium },
    formData.utm_campaign && { label: "UTM Campaign", value: formData.utm_campaign },
    formData.utm_content && { label: "UTM Content", value: formData.utm_content },
    formData.utm_term && { label: "UTM Term", value: formData.utm_term },
  ].filter(Boolean) as { label: string; value: string }[];

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
          <td style="padding: 40px 30px; background: linear-gradient(135deg, #1a365d 0%, #2d4a77 100%);">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
              New ${getFormDisplayName(formData.form_name)}
            </h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 14px;">
              Submission ID: ${submissionId}
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <h2 style="color: #1a365d; font-size: 18px; margin: 0 0 20px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
              Contact Information
            </h2>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              ${formRows.map(row => `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #718096; font-size: 14px; width: 35%; vertical-align: top;">
                    ${row.label}
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1a202c; font-size: 14px; vertical-align: top;">
                    ${row.value}
                  </td>
                </tr>
              `).join('')}
            </table>
            
            ${utmRows.length > 0 ? `
              <h2 style="color: #1a365d; font-size: 18px; margin: 30px 0 20px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                Attribution Data
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${utmRows.map(row => `
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 13px; width: 35%;">
                      ${row.label}
                    </td>
                    <td style="padding: 8px 0; color: #1a202c; font-size: 13px;">
                      ${row.value}
                    </td>
                  </tr>
                `).join('')}
              </table>
            ` : ''}
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 30px; background-color: #f7fafc; text-align: center;">
            <p style="color: #718096; font-size: 12px; margin: 0;">
              This notification was sent from the TFA Insurance Advisors website.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// Send emails function
const sendEmails = async (
  resend: InstanceType<typeof Resend>,
  formData: FormSubmitData,
  submissionId: string,
  advisorEmail?: string,
  advisorName?: string
): Promise<{ teamSent: boolean; advisorSent: boolean; errors: string[] }> => {
  const errors: string[] = [];
  let teamSent = false;
  let advisorSent = false;

  const teamHtml = generateTeamNotificationHtml(formData, submissionId, advisorName);
  const subject = `New ${getFormDisplayName(formData.form_name)} - ${formData.first_name} ${formData.last_name}`;

  // 1. Send to team email
  try {
    const teamResult = await resend.emails.send({
      from: "TFA Insurance Advisors <notifications@tfainsuranceadvisors.com>",
      to: [TEAM_EMAIL],
      subject,
      html: teamHtml,
    });
    if (teamResult.error) {
      console.error("[Email Error - Team]", teamResult.error);
      errors.push(`Team email: ${teamResult.error.message}`);
    } else {
      teamSent = true;
      console.log("[Email Sent - Team]", TEAM_EMAIL);
    }
  } catch (e) {
    console.error("[Email Exception - Team]", e);
    errors.push(`Team email exception: ${e instanceof Error ? e.message : "Unknown error"}`);
  }

  // 2. Send to advisor if this is an advisor-specific form
  if (advisorEmail) {
    try {
      const advisorResult = await resend.emails.send({
        from: "TFA Insurance Advisors <notifications@tfainsuranceadvisors.com>",
        to: [advisorEmail],
        subject: `[Your Lead] ${subject}`,
        html: teamHtml,
      });
      if (advisorResult.error) {
        console.error("[Email Error - Advisor]", advisorResult.error);
        errors.push(`Advisor email: ${advisorResult.error.message}`);
      } else {
        advisorSent = true;
        console.log("[Email Sent - Advisor]", advisorEmail);
      }
    } catch (e) {
      console.error("[Email Exception - Advisor]", e);
      errors.push(`Advisor email exception: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }

  return { teamSent, advisorSent, errors };
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
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[Config Error] Missing required Supabase environment variables");
    return new Response(
      JSON.stringify({ ok: false, error: "Server configuration error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Initialize Resend (optional - emails will be skipped if not configured)
  const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
  if (!resend) {
    console.warn("[Config Warning] RESEND_API_KEY not configured - emails will be skipped");
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
      .select("id, pipedrive_lead_id, pipedrive_person_id, email_sent")
      .eq("email", formData.email)
      .eq("form_type", formData.form_name)
      .gte("created_at", tenMinutesAgo)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (recentSubmission?.id) {
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
    
    // Resolve advisor - check if this is an advisor-specific form
    let advisor: { id: string; name: string; email: string; slug: string; pipedrive_user_id: number | null } | null = null;
    let isAdvisorSpecificForm = false;
    
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
      
      if (advisorData) {
        advisor = advisorData;
        isAdvisorSpecificForm = true;
        console.log(`[Advisor Form] Matched advisor: ${advisor.name} (${advisor.email})`);
      }
    }
    
    // Determine routing for Pipedrive (only for non-advisor forms)
    let routingResult: "advisor_match" | "default_manny" | "advisor_direct" = "default_manny";
    let ownerId: number | null = null;
    let routedToName = "Manny Soto";
    
    if (isAdvisorSpecificForm) {
      routingResult = "advisor_direct";
      routedToName = advisor?.name || "Advisor";
      // Skip Pipedrive for advisor-specific forms
    } else {
      // Get Manny Soto default user ID from system_settings for Pipedrive
      const { data: settings } = await supabase
        .from("system_settings")
        .select("key, value")
        .eq("key", "manny_pipedrive_user_id")
        .maybeSingle();
      
      ownerId = parseInt(settings?.value as string || "0");
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
        advisor_slug: formData.advisor_slug || advisor?.slug,
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
    
    // ============ EMAIL NOTIFICATIONS ============
    let emailResult = { teamSent: false, advisorSent: false, errors: [] as string[] };
    
    if (resend) {
      emailResult = await sendEmails(
        resend,
        formData,
        submissionId,
        advisor?.email,
        advisor?.name
      );
    }
    
    // ============ PIPEDRIVE (only for non-advisor forms) ============
    let personId: number | null = null;
    let orgId: number | null = null;
    let leadId: string | null = null;
    let pipedriveError: string | null = null;
    
    if (!isAdvisorSpecificForm && PIPEDRIVE_API_TOKEN && ownerId && ownerId > 0) {
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
        
        // 3. Fetch lead labels and determine which to apply
        const labelMap = await fetchLeadLabels();
        const labelNames = determineLabelNames(formData);
        const labelIds: string[] = [];
        
        for (const labelName of labelNames) {
          const labelId = labelMap.get(labelName.toLowerCase());
          if (labelId) {
            labelIds.push(labelId);
            console.log(`[Pipedrive] Applying label: ${labelName} (${labelId})`);
          } else {
            console.warn(`[Pipedrive] Label not found in Pipedrive: ${labelName}`);
          }
        }
        
        // 4. Create Lead in Leads Inbox with all matching labels
        leadId = await createLead(formData, personId, orgId, ownerId, labelIds);
        
        if (!leadId) {
          throw new Error("Failed to create lead in Pipedrive");
        }
        
        // 5. Add note with attribution
        await addNote(formData, leadId, personId);
        
        console.log(`[Pipedrive] Lead created: ${leadId} for ${formData.email}${labelNames.length > 0 ? ` with labels: ${labelNames.join(", ")}` : ""}`);
        
        
      } catch (error) {
        console.error("[Pipedrive Error]", error);
        pipedriveError = error instanceof Error ? error.message : "Pipedrive API error";
      }
    } else if (!isAdvisorSpecificForm && !PIPEDRIVE_API_TOKEN) {
      console.warn("[Config Warning] PIPEDRIVE_API_TOKEN not configured - skipping Pipedrive");
    } else if (isAdvisorSpecificForm) {
      console.log(`[Pipedrive Skipped] Advisor-specific form for ${advisor?.name}`);
    }
    
    // Update submission with results
    const finalStatus = pipedriveError ? "failed" : "created";
    await supabase
      .from("form_submissions")
      .update({
        pipedrive_person_id: personId,
        pipedrive_org_id: orgId,
        pipedrive_lead_id: leadId,
        status: finalStatus,
        error_message: pipedriveError || (emailResult.errors.length > 0 ? emailResult.errors.join("; ") : null),
        email_sent: emailResult.teamSent,
      })
      .eq("id", submissionId);
    
    console.log(`[Success] Form: ${formData.form_name}, Email: ${formData.email}, Routed: ${routedToName}, Emails: team=${emailResult.teamSent} advisor=${emailResult.advisorSent}, Pipedrive: ${isAdvisorSpecificForm ? "skipped" : (leadId ? "created" : "failed")}`);
    
    return new Response(
      JSON.stringify({
        ok: true,
        routed_to: routedToName,
        routing_result: routingResult,
        pipedrive_ids: isAdvisorSpecificForm ? null : {
          person_id: personId,
          org_id: orgId,
          lead_id: leadId,
        },
        submission_id: submissionId,
        emails: {
          team_sent: emailResult.teamSent,
          advisor_sent: emailResult.advisorSent,
        },
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
