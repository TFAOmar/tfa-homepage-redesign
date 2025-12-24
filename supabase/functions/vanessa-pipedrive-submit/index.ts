import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PipedriveSubmitRequest {
  submission_type: "contact" | "living_trust_questionnaire" | "living_trust_landing";
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  notes?: string;
  tags?: string[];
  // For living trust questionnaire - full form data
  applicant_name?: string;
  applicant_email?: string;
  applicant_phone?: string;
  spouse_name?: string;
  form_data?: Record<string, unknown>;
  // For landing page
  marital_status?: string;
  owns_property?: string;
  estate_value?: string;
  preferred_contact?: string;
  best_time?: string;
  // Tracking
  source_url?: string;
}

const PIPEDRIVE_API_BASE = "https://api.pipedrive.com/v1";

async function searchPersonByEmail(apiToken: string, email: string): Promise<number | null> {
  try {
    const response = await fetch(
      `${PIPEDRIVE_API_BASE}/persons/search?term=${encodeURIComponent(email)}&fields=email&exact_match=true&api_token=${apiToken}`
    );
    const data = await response.json();
    
    if (data.success && data.data?.items?.length > 0) {
      return data.data.items[0].item.id;
    }
    return null;
  } catch (error) {
    console.error("Error searching for person:", error);
    return null;
  }
}

async function searchPersonByPhone(apiToken: string, phone: string): Promise<number | null> {
  try {
    // Clean phone number
    const cleanPhone = phone.replace(/\D/g, "");
    const response = await fetch(
      `${PIPEDRIVE_API_BASE}/persons/search?term=${encodeURIComponent(cleanPhone)}&fields=phone&api_token=${apiToken}`
    );
    const data = await response.json();
    
    if (data.success && data.data?.items?.length > 0) {
      return data.data.items[0].item.id;
    }
    return null;
  } catch (error) {
    console.error("Error searching for person by phone:", error);
    return null;
  }
}

async function createPerson(apiToken: string, personData: {
  name: string;
  email?: string;
  phone?: string;
}): Promise<number | null> {
  try {
    const response = await fetch(`${PIPEDRIVE_API_BASE}/persons?api_token=${apiToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: personData.name,
        email: personData.email ? [{ value: personData.email, primary: true, label: "work" }] : undefined,
        phone: personData.phone ? [{ value: personData.phone, primary: true, label: "work" }] : undefined,
      }),
    });
    const data = await response.json();
    
    if (data.success) {
      console.log("Created person with ID:", data.data.id);
      return data.data.id;
    }
    console.error("Failed to create person:", data);
    return null;
  } catch (error) {
    console.error("Error creating person:", error);
    return null;
  }
}

async function updatePerson(apiToken: string, personId: number, personData: {
  name?: string;
  email?: string;
  phone?: string;
}): Promise<boolean> {
  try {
    const updatePayload: Record<string, unknown> = {};
    if (personData.name) updatePayload.name = personData.name;
    if (personData.email) updatePayload.email = [{ value: personData.email, primary: true, label: "work" }];
    if (personData.phone) updatePayload.phone = [{ value: personData.phone, primary: true, label: "work" }];

    const response = await fetch(`${PIPEDRIVE_API_BASE}/persons/${personId}?api_token=${apiToken}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatePayload),
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error updating person:", error);
    return false;
  }
}

async function createLead(apiToken: string, leadData: {
  title: string;
  person_id?: number;
  note?: string;
  labels?: string[];
}): Promise<number | null> {
  try {
    const response = await fetch(`${PIPEDRIVE_API_BASE}/leads?api_token=${apiToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: leadData.title,
        person_id: leadData.person_id,
        label_ids: leadData.labels,
      }),
    });
    const data = await response.json();
    
    if (data.success) {
      const leadId = data.data.id;
      console.log("Created lead with ID:", leadId);
      
      // Add note if provided
      if (leadData.note && leadId) {
        await addNoteToLead(apiToken, leadId, leadData.note);
      }
      
      return leadId;
    }
    console.error("Failed to create lead:", data);
    return null;
  } catch (error) {
    console.error("Error creating lead:", error);
    return null;
  }
}

async function addNoteToLead(apiToken: string, leadId: string, content: string): Promise<boolean> {
  try {
    const response = await fetch(`${PIPEDRIVE_API_BASE}/notes?api_token=${apiToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        lead_id: leadId,
      }),
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error adding note to lead:", error);
    return false;
  }
}

async function createDeal(apiToken: string, dealData: {
  title: string;
  person_id: number;
}): Promise<number | null> {
  try {
    const response = await fetch(`${PIPEDRIVE_API_BASE}/deals?api_token=${apiToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: dealData.title,
        person_id: dealData.person_id,
      }),
    });
    const data = await response.json();
    
    if (data.success) {
      console.log("Created deal with ID:", data.data.id);
      return data.data.id;
    }
    console.error("Failed to create deal:", data);
    return null;
  } catch (error) {
    console.error("Error creating deal:", error);
    return null;
  }
}

async function addNoteToDeal(apiToken: string, dealId: number, content: string): Promise<boolean> {
  try {
    const response = await fetch(`${PIPEDRIVE_API_BASE}/notes?api_token=${apiToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        deal_id: dealId,
      }),
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error adding note to deal:", error);
    return false;
  }
}

function formatFormDataForNote(formData: Record<string, unknown>): string {
  const lines: string[] = ["=== Estate Planning Questionnaire Details ===\n"];
  
  // Step 1: Client Identity
  const step1 = formData.step1 as Record<string, unknown> | undefined;
  if (step1) {
    lines.push("📋 CLIENT IDENTITY");
    lines.push(`Trustor 1: ${step1.trustor1FirstName || ""} ${step1.trustor1LastName || ""}`);
    if (step1.trustor1DOB) lines.push(`  DOB: ${step1.trustor1DOB}`);
    if (step1.trustor1SSN) lines.push(`  SSN: ${step1.trustor1SSN}`);
    if (step1.trustor1Email) lines.push(`  Email: ${step1.trustor1Email}`);
    if (step1.trustor1Phone) lines.push(`  Phone: ${step1.trustor1Phone}`);
    if (step1.trustor1Address) lines.push(`  Address: ${step1.trustor1Address}, ${step1.trustor1City || ""} ${step1.trustor1State || ""} ${step1.trustor1Zip || ""}`);
    
    if (step1.hasTrustor2) {
      lines.push(`\nTrustor 2: ${step1.trustor2FirstName || ""} ${step1.trustor2LastName || ""}`);
      if (step1.trustor2DOB) lines.push(`  DOB: ${step1.trustor2DOB}`);
      if (step1.trustor2SSN) lines.push(`  SSN: ${step1.trustor2SSN}`);
      if (step1.trustor2Email) lines.push(`  Email: ${step1.trustor2Email}`);
      if (step1.trustor2Phone) lines.push(`  Phone: ${step1.trustor2Phone}`);
    }
    lines.push("");
  }

  // Step 2: Family & Heirs
  const step2 = formData.step2 as Record<string, unknown> | undefined;
  if (step2) {
    lines.push("👨‍👩‍👧‍👦 FAMILY & HEIRS");
    lines.push(`Marital Status: ${step2.maritalStatus || "N/A"}`);
    if (step2.hasChildren && Array.isArray(step2.children)) {
      lines.push(`Children: ${(step2.children as Array<Record<string, unknown>>).length}`);
      (step2.children as Array<Record<string, unknown>>).forEach((child, i) => {
        lines.push(`  Child ${i + 1}: ${child.fullName || "N/A"} (DOB: ${child.dateOfBirth || "N/A"})`);
      });
    }
    lines.push("");
  }

  // Step 3: Successor Trustees
  const step3 = formData.step3 as Record<string, unknown> | undefined;
  if (step3 && Array.isArray(step3.successorTrustees)) {
    lines.push("🏛️ SUCCESSOR TRUSTEES");
    (step3.successorTrustees as Array<Record<string, unknown>>).forEach((trustee, i) => {
      lines.push(`  ${i + 1}. ${trustee.fullName || "N/A"} - ${trustee.relationship || "N/A"}`);
    });
    lines.push("");
  }

  // Step 4: Beneficiaries
  const step4 = formData.step4 as Record<string, unknown> | undefined;
  if (step4 && Array.isArray(step4.beneficiaries)) {
    lines.push("🎁 BENEFICIARIES");
    (step4.beneficiaries as Array<Record<string, unknown>>).forEach((beneficiary, i) => {
      lines.push(`  ${i + 1}. ${beneficiary.fullName || "N/A"} - ${beneficiary.percentage || 0}%`);
    });
    lines.push("");
  }

  // Step 5: Attorney in Fact
  const step5 = formData.step5 as Record<string, unknown> | undefined;
  if (step5) {
    lines.push("⚖️ ATTORNEY IN FACT");
    if (step5.primaryAttorney) {
      const primary = step5.primaryAttorney as Record<string, unknown>;
      lines.push(`  Primary: ${primary.fullName || "N/A"}`);
    }
    lines.push("");
  }

  // Step 6: Healthcare
  const step6 = formData.step6 as Record<string, unknown> | undefined;
  if (step6) {
    lines.push("🏥 HEALTHCARE DIRECTIVES");
    if (step6.healthcareAgent) {
      const agent = step6.healthcareAgent as Record<string, unknown>;
      lines.push(`  Healthcare Agent: ${agent.fullName || "N/A"}`);
    }
    lines.push("");
  }

  // Step 7: Assets
  const step7 = formData.step7 as Record<string, unknown> | undefined;
  if (step7) {
    lines.push("💰 ASSETS");
    if (Array.isArray(step7.realProperties) && step7.realProperties.length > 0) {
      lines.push(`  Real Properties: ${step7.realProperties.length}`);
    }
    if (Array.isArray(step7.bankAccounts) && step7.bankAccounts.length > 0) {
      lines.push(`  Bank Accounts: ${step7.bankAccounts.length}`);
    }
    if (Array.isArray(step7.investmentAccounts) && step7.investmentAccounts.length > 0) {
      lines.push(`  Investment Accounts: ${step7.investmentAccounts.length}`);
    }
    if (Array.isArray(step7.lifeInsurancePolicies) && step7.lifeInsurancePolicies.length > 0) {
      lines.push(`  Life Insurance Policies: ${step7.lifeInsurancePolicies.length}`);
    }
    lines.push("");
  }

  // Step 8: Additional Notes
  const step8 = formData.step8 as Record<string, unknown> | undefined;
  if (step8) {
    lines.push("📝 ADDITIONAL INFORMATION");
    if (step8.additionalNotes) lines.push(`  Notes: ${step8.additionalNotes}`);
    if (step8.referralSource) lines.push(`  Referral Source: ${step8.referralSource}`);
    lines.push("");
  }

  return lines.join("\n");
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiToken = Deno.env.get("VANESSA_PIPEDRIVE_API_TOKEN");
    if (!apiToken) {
      throw new Error("VANESSA_PIPEDRIVE_API_TOKEN not configured");
    }

    const requestData: PipedriveSubmitRequest = await req.json();
    console.log("Received submission:", requestData.submission_type);

    const { submission_type } = requestData;
    let personId: number | null = null;

    // Determine name and contact info based on submission type
    let name: string;
    let email: string | undefined;
    let phone: string | undefined;

    if (submission_type === "living_trust_questionnaire") {
      name = requestData.applicant_name || "Unknown";
      email = requestData.applicant_email;
      phone = requestData.applicant_phone;
    } else {
      name = `${requestData.first_name || ""} ${requestData.last_name || ""}`.trim() || "Unknown";
      email = requestData.email;
      phone = requestData.phone;
    }

    // Search for existing person by email first, then phone
    if (email) {
      personId = await searchPersonByEmail(apiToken, email);
      if (personId) console.log("Found existing person by email:", personId);
    }
    
    if (!personId && phone) {
      personId = await searchPersonByPhone(apiToken, phone);
      if (personId) console.log("Found existing person by phone:", personId);
    }

    // Handle based on submission type
    if (submission_type === "living_trust_questionnaire") {
      // For questionnaire: Create Deal (with contact lookup/creation)
      
      // Only create person if not found
      if (!personId) {
        personId = await createPerson(apiToken, { name, email, phone });
      }

      if (!personId) {
        throw new Error("Failed to find or create person for deal");
      }

      // Create deal
      const dealTitle = `Living Trust - ${name}`;
      const dealId = await createDeal(apiToken, {
        title: dealTitle,
        person_id: personId,
      });

      if (dealId && requestData.form_data) {
        // Add detailed note with all form data
        const noteContent = formatFormDataForNote(requestData.form_data);
        await addNoteToDeal(apiToken, dealId, noteContent);
        
        // Add spouse info if present
        if (requestData.spouse_name) {
          await addNoteToDeal(apiToken, dealId, `Spouse: ${requestData.spouse_name}`);
        }
      }

      console.log("Successfully created deal for living trust questionnaire");
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          type: "deal",
          person_id: personId,
          deal_id: dealId,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );

    } else {
      // For contact forms and landing page: Create Lead
      
      // Upsert person (create if not exists, update if exists)
      if (personId) {
        await updatePerson(apiToken, personId, { name, email, phone });
      } else {
        personId = await createPerson(apiToken, { name, email, phone });
      }

      // Build note content
      let noteContent = "";
      if (submission_type === "living_trust_landing") {
        noteContent = [
          "=== Living Trust Landing Page Submission ===",
          `Source: The Brandon Drew Group`,
          "",
          `Marital Status: ${requestData.marital_status || "N/A"}`,
          `Owns Property: ${requestData.owns_property || "N/A"}`,
          `Estate Value: ${requestData.estate_value || "N/A"}`,
          `Preferred Contact: ${requestData.preferred_contact || "N/A"}`,
          `Best Time to Reach: ${requestData.best_time || "N/A"}`,
          requestData.notes ? `\nNotes: ${requestData.notes}` : "",
          requestData.source_url ? `\nSource URL: ${requestData.source_url}` : "",
        ].filter(Boolean).join("\n");
      } else {
        // Contact form
        noteContent = [
          "=== Advisor Contact Form ===",
          `Advisor: Vanessa Sanchez`,
          "",
          requestData.notes ? `Message: ${requestData.notes}` : "",
          requestData.source_url ? `Source URL: ${requestData.source_url}` : "",
        ].filter(Boolean).join("\n");
      }

      // Determine lead title
      const leadTitle = submission_type === "living_trust_landing"
        ? `Living Trust Inquiry - ${name} (Brandon Drew Group)`
        : `Contact Inquiry - ${name}`;

      // Create lead
      const leadId = await createLead(apiToken, {
        title: leadTitle,
        person_id: personId || undefined,
        note: noteContent,
      });

      console.log("Successfully created lead for", submission_type);

      // Send email notification to Vanessa
      try {
        const emailSubject = submission_type === "living_trust_landing"
          ? `New Living Trust Inquiry - ${name} (Brandon Drew Group)`
          : `New Contact Inquiry - ${name}`;

        const emailHtml = submission_type === "living_trust_landing"
          ? `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a365d;">New Living Trust Inquiry</h2>
              <p style="color: #666;">A new prospect has submitted the Living Trust inquiry form from The Brandon Drew Group landing page.</p>
              
              <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2d3748; margin-top: 0;">Contact Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email || "Not provided"}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              </div>
              
              <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2d3748; margin-top: 0;">Inquiry Details</h3>
                <p><strong>Marital Status:</strong> ${requestData.marital_status || "N/A"}</p>
                <p><strong>Owns Property:</strong> ${requestData.owns_property || "N/A"}</p>
                <p><strong>Estate Value:</strong> ${requestData.estate_value || "N/A"}</p>
                <p><strong>Preferred Contact Method:</strong> ${requestData.preferred_contact || "N/A"}</p>
                <p><strong>Best Time to Reach:</strong> ${requestData.best_time || "N/A"}</p>
                ${requestData.notes ? `<p><strong>Additional Notes:</strong> ${requestData.notes}</p>` : ""}
              </div>
              
              ${requestData.source_url ? `<p style="color: #718096; font-size: 12px;">Source: ${requestData.source_url}</p>` : ""}
              <p style="color: #718096; font-size: 12px;">Submitted: ${new Date().toLocaleString()}</p>
            </div>
          `
          : `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a365d;">New Contact Inquiry</h2>
              <p style="color: #666;">Someone has reached out to you through your advisor profile contact form.</p>
              
              <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2d3748; margin-top: 0;">Contact Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email || "Not provided"}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              </div>
              
              ${requestData.notes ? `
              <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2d3748; margin-top: 0;">Message</h3>
                <p>${requestData.notes}</p>
              </div>
              ` : ""}
              
              ${requestData.source_url ? `<p style="color: #718096; font-size: 12px;">Source: ${requestData.source_url}</p>` : ""}
              <p style="color: #718096; font-size: 12px;">Submitted: ${new Date().toLocaleString()}</p>
            </div>
          `;

        await resend.emails.send({
          from: "TFA Insurance Advisors <noreply@tfainsuranceadvisors.com>",
          to: ["vsanchez@tfainsuranceadvisors.com"],
          subject: emailSubject,
          html: emailHtml,
        });
        console.log("Email notification sent to Vanessa");
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the request if email fails
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          type: "lead",
          person_id: personId,
          lead_id: leadId,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

  } catch (error) {
    console.error("Error in vanessa-pipedrive-submit:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
