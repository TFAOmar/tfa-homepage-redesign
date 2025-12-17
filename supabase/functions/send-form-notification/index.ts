import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 requests per minute per IP
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries periodically
const cleanupRateLimitStore = () => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
};

// Check rate limit for an IP
const checkRateLimit = (ip: string): { allowed: boolean; remaining: number; resetIn: number } => {
  cleanupRateLimitStore();
  
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    // New window
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }
  
  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count, resetIn: record.resetTime - now };
};

// Allowed form types for validation
const ALLOWED_FORM_TYPES = [
  "contact",
  "contact-inquiry",
  "business-insurance",
  "business-insurance-recinos",
  "agent-application",
  "careers-inquiry",
  "franchise-application",
  "living-trust",
  "advisor-onboarding",
  "consultation",
  "schedule-inquiry",
  "kai-zen-inquiry",
  "income-planning",
  "investment-management",
  "tax-planning",
  "healthcare-planning",
  "annuities",
  "401k-rollover",
  "insurance",
  "group-retirement",
] as const;

// Form type specific confirmation email config
interface ConfirmationEmailConfig {
  subject: string;
  bodyIntro: string;
  nextSteps: string[];
  signOff: string;
}

const getConfirmationEmailConfig = (formType: string, advisorName?: string): ConfirmationEmailConfig => {
  const advisorFirstName = advisorName?.split(" ")[0] || "An advisor";
  
  const configs: Record<string, ConfirmationEmailConfig> = {
    "contact-inquiry": {
      subject: "We've Received Your Message",
      bodyIntro: advisorName 
        ? `Your message to ${advisorFirstName} has been received.`
        : "Your message has been received.",
      nextSteps: [
        `${advisorFirstName} will review your information`,
        "You can expect to hear back within 1-2 business days",
        "If you have urgent questions, call us at (888) 350-5396"
      ],
      signOff: advisorName || "The Financial Architects Team"
    },
    "schedule-inquiry": {
      subject: "Your Consultation Request Has Been Received",
      bodyIntro: advisorName 
        ? `Your consultation request with ${advisorFirstName} has been received.`
        : "Your consultation request has been received.",
      nextSteps: [
        `${advisorFirstName} will review your availability`,
        "You can expect a scheduling confirmation within 1 business day",
        "If you have urgent questions, call us at (888) 350-5396"
      ],
      signOff: advisorName || "The Financial Architects Team"
    },
    "living-trust": {
      subject: "Your Living Trust Consultation Request",
      bodyIntro: "Thank you for your interest in protecting your family's future with a Living Trust.",
      nextSteps: [
        "Vanessa will review your questionnaire",
        "You'll receive a call within 24-48 hours to schedule your free consultation",
        "Prepare any questions you have about estate planning"
      ],
      signOff: "Vanessa Sanchez"
    },
    "kai-zen-inquiry": {
      subject: "Your Kai-Zen Strategy Interest Has Been Received",
      bodyIntro: "Thank you for your interest in the Kai-Zen leveraged retirement strategy.",
      nextSteps: [
        advisorName 
          ? `${advisorFirstName} will review your qualification profile`
          : "A Kai-Zen specialist will review your qualification profile",
        "You'll be contacted within 24 hours to discuss your options",
        "No commitment required - this is a complimentary analysis"
      ],
      signOff: advisorName || "The Kai-Zen Team"
    },
    "business-insurance": {
      subject: "Your Business Insurance Quote Request",
      bodyIntro: "Thank you for requesting a business insurance quote.",
      nextSteps: [
        "Our commercial insurance specialists will review your business details",
        "You'll receive a personalized quote within 24-48 hours",
        "Have your current policy documents ready for comparison"
      ],
      signOff: "The Recinos Team"
    },
    "business-insurance-recinos": {
      subject: "Your Business Insurance Quote Request",
      bodyIntro: "Thank you for requesting a business insurance quote from Rolando and Savannah.",
      nextSteps: [
        "Rolando and Savannah will review your business details",
        "You'll be contacted within 24 hours with quote options",
        "Have your current policy documents ready for comparison"
      ],
      signOff: "Rolando & Savannah Recinos"
    },
    "careers-inquiry": {
      subject: "Thank You for Your Interest in Joining TFA",
      bodyIntro: "Thank you for your interest in a career with The Financial Architects.",
      nextSteps: [
        "Our recruitment team will review your inquiry",
        "You can expect to hear back within 24-48 hours",
        "In the meantime, learn more about our culture at tfainsuranceadvisors.com"
      ],
      signOff: "The TFA Recruitment Team"
    },
    "agent-application": {
      subject: "Your Agent Application Has Been Received",
      bodyIntro: "Thank you for applying to become a licensed agent with The Financial Architects.",
      nextSteps: [
        "Our recruitment team will review your application",
        "Qualified candidates will be contacted within 48 hours",
        "We'll discuss licensing, training, and next steps"
      ],
      signOff: "The TFA Recruitment Team"
    },
    "franchise-application": {
      subject: "Your Franchise Application Has Been Received",
      bodyIntro: "Thank you for your interest in owning a TFA franchise.",
      nextSteps: [
        "Our franchise development team will review your application",
        "Qualified candidates will be contacted within 48 hours for a discovery call",
        "We'll discuss territory availability, investment details, and the FDD"
      ],
      signOff: "The TFA Franchise Development Team"
    },
    "advisor-onboarding": {
      subject: "Your Advisor Profile Application Has Been Received",
      bodyIntro: "Thank you for applying to join The Financial Architects team.",
      nextSteps: [
        "Our team will review your profile and credentials",
        "You can expect to hear back within 48-72 hours",
        "If approved, your profile will be published to our advisor directory"
      ],
      signOff: "The TFA Team"
    },
    "income-planning": {
      subject: "Your Income Planning Consultation Request",
      bodyIntro: "Thank you for your interest in creating a reliable income strategy for retirement.",
      nextSteps: [
        "A TFA income planning specialist will review your information",
        "You can expect to be contacted within 24 hours",
        "No commitment required - this is a complimentary consultation"
      ],
      signOff: "The Financial Architects Team"
    },
    "investment-management": {
      subject: "Your Investment Management Consultation Request",
      bodyIntro: "Thank you for your interest in professional investment management.",
      nextSteps: [
        "A TFA investment specialist will review your information",
        "You can expect to be contacted within 24 hours",
        "No commitment required - this is a complimentary consultation"
      ],
      signOff: "The Financial Architects Team"
    },
    "tax-planning": {
      subject: "Your Tax Planning Consultation Request",
      bodyIntro: "Thank you for your interest in tax-efficient financial strategies.",
      nextSteps: [
        "A TFA tax planning specialist will review your information",
        "You can expect to be contacted within 24 hours",
        "No commitment required - this is a complimentary consultation"
      ],
      signOff: "The Financial Architects Team"
    },
    "healthcare-planning": {
      subject: "Your Healthcare Planning Consultation Request",
      bodyIntro: "Thank you for your interest in planning for healthcare costs in retirement.",
      nextSteps: [
        "A TFA healthcare planning specialist will review your information",
        "You can expect to be contacted within 24 hours",
        "No commitment required - this is a complimentary consultation"
      ],
      signOff: "The Financial Architects Team"
    },
    "annuities": {
      subject: "Your Annuity Consultation Request",
      bodyIntro: "Thank you for your interest in guaranteed income solutions.",
      nextSteps: [
        "A TFA annuity specialist will review your information",
        "You can expect to be contacted within 24 hours",
        "No commitment required - this is a complimentary consultation"
      ],
      signOff: "The Financial Architects Team"
    },
    "401k-rollover": {
      subject: "Your 401(k) Rollover Consultation Request",
      bodyIntro: "Thank you for your interest in rolling over your retirement savings.",
      nextSteps: [
        "A TFA rollover specialist will review your information",
        "You can expect to be contacted within 24 hours",
        "No commitment required - this is a complimentary consultation"
      ],
      signOff: "The Financial Architects Team"
    },
    "insurance": {
      subject: "Your Insurance Consultation Request",
      bodyIntro: "Thank you for your interest in protecting your family's financial future.",
      nextSteps: [
        "A TFA insurance specialist will review your information",
        "You can expect to be contacted within 24 hours",
        "No commitment required - this is a complimentary consultation"
      ],
      signOff: "The Financial Architects Team"
    },
    "group-retirement": {
      subject: "Your Group Retirement Plan Consultation Request",
      bodyIntro: "Thank you for your interest in retirement benefits for your employees.",
      nextSteps: [
        "A TFA group retirement specialist will review your business information",
        "You can expect to be contacted within 24 hours",
        "No commitment required - this is a complimentary consultation"
      ],
      signOff: "The Financial Architects Team"
    }
  };

  return configs[formType] || {
    subject: "We've Received Your Request",
    bodyIntro: "Thank you for reaching out to The Financial Architects.",
    nextSteps: [
      "An advisor will review your information",
      "You can expect to hear back within 1-2 business days",
      "If you have urgent questions, call us at (888) 350-5396"
    ],
    signOff: "The Financial Architects Team"
  };
};

// Generate prospect confirmation email HTML
const getProspectConfirmationEmail = (
  firstName: string, 
  formType: string,
  advisorName?: string
): string => {
  const config = getConfirmationEmailConfig(formType, advisorName);
  const nextStepsHtml = config.nextSteps.map(step => `<li>${step}</li>`).join("");
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0A0F1F 0%, #131A2A 100%); color: #E4B548; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px; }
          .cta-button { display: inline-block; background: #E4B548; color: #0A0F1F; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">The Financial Architects</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">We've Received Your Request</p>
          </div>
          <div class="content">
            <h2 style="color: #0A0F1F; margin-top: 0;">Hi ${firstName},</h2>
            <p>Thank you for reaching out! ${config.bodyIntro}</p>
            <p><strong>What happens next?</strong></p>
            <ul>
              ${nextStepsHtml}
            </ul>
            <p>We look forward to helping you achieve your financial goals.</p>
            <p style="margin-top: 30px;">
              Warm regards,<br>
              <strong>${config.signOff}</strong><br>
              The Financial Architects
            </p>
          </div>
          <div class="footer">
            <p>The Financial Architects | (888) 350-5396</p>
            <p>13890 Peyton Dr, Chino Hills, CA 91709</p>
            <p>© ${new Date().getFullYear()} The Financial Architects. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Zod schema for request validation
const requestSchema = z.object({
  formType: z.string().min(1).max(50).refine(
    (val) => ALLOWED_FORM_TYPES.includes(val as typeof ALLOWED_FORM_TYPES[number]),
    { message: "Invalid form type" }
  ),
  formData: z.record(z.unknown()),
  recipientEmail: z.string().email().max(255).optional(),
  additionalRecipients: z.array(z.string().email().max(255)).max(5).optional(),
});

type FormNotificationRequest = z.infer<typeof requestSchema>;

// HTML escape function to prevent XSS in email content
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const formatFormData = (formData: Record<string, unknown>): string => {
  return Object.entries(formData)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      const formattedKey = escapeHtml(key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim());
      const formattedValue = escapeHtml(Array.isArray(value) ? value.join(", ") : String(value));
      return `<tr><td style="padding: 8px; border: 1px solid #e5e5e5; font-weight: 600; background: #f9f9f9;">${formattedKey}</td><td style="padding: 8px; border: 1px solid #e5e5e5;">${formattedValue}</td></tr>`;
    })
    .join("");
};

const getFormSubject = (formType: string, formData: Record<string, unknown>): string => {
  const firstName = formData.firstName as string || "";
  const lastName = formData.lastName as string || "";
  const fullName = formData.fullName as string || formData.name as string || "";
  const businessName = formData.businessName as string || "";
  const advisorName = formData.advisorName as string || "";
  
  const name = fullName || `${firstName} ${lastName}`.trim() || "Unknown";
  
  const subjects: Record<string, string> = {
    contact: `New Contact Inquiry from ${name}`,
    "contact-inquiry": `New Contact Message for ${advisorName || "Advisor"} from ${name}`,
    "business-insurance": `New Business Insurance Request from ${businessName || name}`,
    "business-insurance-recinos": `New Business Insurance Request (Recinos) from ${businessName || name}`,
    "agent-application": `New Agent Application from ${name}`,
    "careers-inquiry": `New Career Inquiry from ${name}`,
    "franchise-application": `New Franchise Application from ${name}`,
    "living-trust": `New Living Trust Consultation Request from ${name}`,
    "advisor-onboarding": `New Advisor Onboarding Submission from ${name}`,
    "consultation": `New Consultation Request from ${name}`,
    "schedule-inquiry": `New Scheduling Request for ${advisorName || "Advisor"} from ${name}`,
    "kai-zen-inquiry": `New Kai-Zen Strategy Inquiry from ${name}`,
  };
  
  return subjects[formType] || `New Form Submission: ${formType}`;
};

const extractCommonFields = (formData: Record<string, unknown>) => {
  const firstName = formData.firstName as string || "";
  const lastName = formData.lastName as string || "";
  const fullName = formData.fullName as string || formData.name as string || "";
  
  return {
    email: (formData.email as string) || null,
    name: fullName || `${firstName} ${lastName}`.trim() || null,
    phone: (formData.phone as string) || null,
    source: (formData.source as string) || null,
    partner: (formData.partner as string) || null,
    advisor: (formData.advisor as string) || null,
  };
};

// Extract client IP from request headers
const getClientIP = (req: Request): string => {
  // Check common proxy headers
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }
  
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }
  
  const cfConnectingIP = req.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }
  
  // Fallback to a hash of other identifying info if no IP available
  return "unknown";
};

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const clientIP = getClientIP(req);
  
  // Check rate limit
  const rateLimit = checkRateLimit(clientIP);
  
  // Add rate limit headers to all responses
  const rateLimitHeaders = {
    "X-RateLimit-Limit": String(MAX_REQUESTS_PER_WINDOW),
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetIn / 1000)),
  };

  if (!rateLimit.allowed) {
    console.log(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Too many requests. Please try again later.",
        retryAfter: Math.ceil(rateLimit.resetIn / 1000)
      }),
      {
        status: 429,
        headers: { 
          "Content-Type": "application/json", 
          "Retry-After": String(Math.ceil(rateLimit.resetIn / 1000)),
          ...rateLimitHeaders,
          ...corsHeaders 
        },
      }
    );
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase configuration is missing");
    }

    // Parse and validate request body
    const rawBody = await req.json();
    const parseResult = requestSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      console.error("Validation error:", parseResult.error.flatten());
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid request data",
          details: parseResult.error.flatten().fieldErrors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...rateLimitHeaders, ...corsHeaders },
        }
      );
    }

    const { formType, formData, recipientEmail, additionalRecipients } = parseResult.data;

    console.log(`Processing ${formType} form submission from IP ${clientIP}:`, JSON.stringify(formData));

    // Create Supabase client with service role for database insert
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Extract common fields for easier querying
    const { email, name, phone, source, partner, advisor } = extractCommonFields(formData);

    // Store submission in database
    const { data: submissionData, error: dbError } = await supabase
      .from("form_submissions")
      .insert({
        form_type: formType,
        form_data: formData,
        email,
        name,
        phone,
        source,
        partner,
        advisor,
        status: "new",
        email_sent: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database insert error:", dbError);
      // Continue with email even if DB insert fails
    } else {
      console.log("Form submission stored with ID:", submissionData?.id);
    }

    // Build recipients list - always include main leads email
    const toEmail = recipientEmail || "leads@tfainsuranceadvisors.com";
    const recipients = [toEmail];
    if (additionalRecipients && additionalRecipients.length > 0) {
      recipients.push(...additionalRecipients);
    }
    console.log(`Sending email to recipients: ${recipients.join(", ")}`);
    
    const subject = getFormSubject(formType, formData);
    const formRows = formatFormData(formData);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0A0F1F 0%, #131A2A 100%); color: #E4B548; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">The Financial Architects</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">New Form Submission</p>
            </div>
            <div class="content">
              <h2 style="color: #0A0F1F; margin-top: 0;">${subject}</h2>
              <p>A new ${formType.replace(/-/g, " ")} form has been submitted with the following details:</p>
              ${submissionData?.id ? `<p style="font-size: 12px; color: #666;">Submission ID: ${submissionData.id}</p>` : ""}
              <table>
                ${formRows}
              </table>
            </div>
            <div class="footer">
              <p>This email was automatically generated from tfainsuranceadvisors.com</p>
              <p>© ${new Date().getFullYear()} The Financial Architects. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TFA Leads <leads@tfainsuranceadvisors.com>",
        to: recipients,
        subject: subject,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Email sent successfully:", data);

    // Update submission to mark email as sent
    if (submissionData?.id) {
      await supabase
        .from("form_submissions")
        .update({ email_sent: true })
        .eq("id", submissionData.id);
    }

    // Send confirmation email to prospect for supported form types
    const confirmationFormTypes = [
      "contact-inquiry", 
      "schedule-inquiry",
      "living-trust",
      "kai-zen-inquiry",
      "business-insurance",
      "business-insurance-recinos",
      "careers-inquiry",
      "agent-application",
      "franchise-application",
      "advisor-onboarding",
      "income-planning",
      "investment-management",
      "tax-planning",
      "healthcare-planning",
      "annuities",
      "401k-rollover",
      "insurance",
      "group-retirement"
    ];
    
    // Extract prospect info - handle different field naming conventions
    const prospectEmail = (formData.email as string) || null;
    const prospectFirstName = (formData.firstName as string) 
      || (formData.fullName as string)?.split(" ")[0]
      || (formData.contactName as string)?.split(" ")[0]
      || (formData.name as string)?.split(" ")[0]
      || null;
    const prospectAdvisorName = (formData.advisorName as string) 
      || (formData.advisor as string)
      || null;

    if (confirmationFormTypes.includes(formType) && prospectEmail && prospectFirstName) {
      console.log(`Sending confirmation email to prospect: ${prospectEmail} for form type: ${formType}`);
      
      const config = getConfirmationEmailConfig(formType, prospectAdvisorName || undefined);
      const confirmationHtml = getProspectConfirmationEmail(prospectFirstName, formType, prospectAdvisorName || undefined);
      
      const confirmationRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "The Financial Architects <noreply@tfainsuranceadvisors.com>",
          to: [prospectEmail],
          subject: config.subject,
          html: confirmationHtml,
        }),
      });

      if (!confirmationRes.ok) {
        const confirmationError = await confirmationRes.json();
        console.error("Failed to send confirmation email to prospect:", confirmationError);
        // Don't throw - main email was sent successfully
      } else {
        console.log("Confirmation email sent to prospect successfully");
      }
    }

    return new Response(JSON.stringify({ success: true, data, submissionId: submissionData?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...rateLimitHeaders, ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-form-notification function:", errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...rateLimitHeaders, ...corsHeaders },
      }
    );
  }
});
