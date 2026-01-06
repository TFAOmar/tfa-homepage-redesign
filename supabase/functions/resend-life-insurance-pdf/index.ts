import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import jsPDF from "https://esm.sh/jspdf@2.5.1?bundle";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "leads@tfainsuranceadvisors.com";
const FROM_EMAIL = "The Financial Architects <noreply@tfainsuranceadvisors.com>";

// PDF Color Constants
const TFA_NAVY = [30, 58, 95];
const TFA_GOLD = [212, 175, 55];
const TEXT_DARK = [17, 24, 39];
const TEXT_GRAY = [107, 114, 128];

const formatCurrency = (amount?: number): string => {
  if (!amount) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

const maskSSN = (ssn?: string): string => {
  if (!ssn) return "N/A";
  const cleaned = ssn.replace(/\D/g, "");
  if (cleaned.length >= 4) {
    return `***-**-${cleaned.slice(-4)}`;
  }
  return "***-**-****";
};

const formatSSN = (ssn?: string): string => {
  if (!ssn) return "N/A";
  const cleaned = ssn.replace(/\D/g, "");
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
  }
  return ssn;
};

const maskAccountNumber = (accountNum?: string): string => {
  if (!accountNum) return "N/A";
  const cleaned = accountNum.replace(/\D/g, "");
  if (cleaned.length >= 4) {
    return `****${cleaned.slice(-4)}`;
  }
  return "****";
};

const getPlanLabel = (planValue?: string): string => {
  const planLabels: Record<string, string> = {
    "term-life": "Term Life Insurance",
    "whole-life": "Whole Life Insurance",
    "universal-life": "Universal Life Insurance",
    "indexed-universal-life": "Indexed Universal Life (IUL)",
  };
  return planValue ? planLabels[planValue] || planValue : "N/A";
};

const getPaymentFrequencyLabel = (freq?: string): string => {
  const labels: Record<string, string> = {
    monthly: "Monthly",
    quarterly: "Quarterly",
    "semi-annual": "Semi-Annual",
    annual: "Annual",
  };
  return freq ? labels[freq] || freq : "N/A";
};

const getPaymentMethodLabel = (method?: string): string => {
  const labels: Record<string, string> = {
    eft: "Electronic Funds Transfer (EFT)",
    check: "Check / Direct Bill",
    "direct-bill": "Direct Bill / Check",
  };
  return method ? labels[method] || method : "N/A";
};

const getSourceOfFundsLabel = (source?: string): string => {
  const labels: Record<string, string> = {
    income: "Employment Income",
    savings: "Savings",
    loan: "Loan",
    gift: "Gift",
    other: "Other",
    employment: "Employment Income",
    investments: "Investments",
    retirement: "Retirement Funds",
    inheritance: "Inheritance",
  };
  return source ? labels[source] || source : "N/A";
};

const getCitizenshipLabel = (status?: string): string => {
  if (!status) return "N/A";
  const labels: Record<string, string> = {
    usa: "U.S. Citizen",
    other: "Non-U.S. Citizen",
  };
  return labels[status] || status;
};

const formatPdfValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") {
    if (value >= 1000) return formatCurrency(value);
    return String(value);
  }
  if (Array.isArray(value)) return value.join(", ") || "N/A";
  return String(value);
};

const formatPdfDate = (date?: string): string => {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return date;
  }
};

const addPdfHeader = (doc: jsPDF, pageWidth: number, margin: number): number => {
  doc.setFillColor(TFA_NAVY[0], TFA_NAVY[1], TFA_NAVY[2]);
  doc.rect(0, 0, pageWidth, 45, "F");

  doc.setTextColor(TFA_GOLD[0], TFA_GOLD[1], TFA_GOLD[2]);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("THE FINANCIAL ARCHITECTS", margin, 20);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Life Insurance Application", margin, 32);

  doc.setFontSize(10);
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Generated: ${dateStr}`, pageWidth - margin, 32, { align: "right" });

  return 55;
};

const addPdfSectionHeader = (
  doc: jsPDF,
  title: string,
  yPos: number,
  margin: number,
  pageWidth: number
): number => {
  doc.setFillColor(TFA_NAVY[0], TFA_NAVY[1], TFA_NAVY[2]);
  doc.rect(margin, yPos, pageWidth - margin * 2, 10, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(title, margin + 4, yPos + 7);

  return yPos + 15;
};

const checkPdfPageBreak = (
  doc: jsPDF,
  yPos: number,
  margin: number,
  pageWidth: number,
  neededSpace: number = 40
): number => {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (yPos + neededSpace > pageHeight - 30) {
    doc.addPage();
    return addPdfHeader(doc, pageWidth, margin);
  }
  return yPos;
};

const addPdfField = (
  doc: jsPDF,
  label: string,
  value: string,
  yPos: number,
  margin: number,
  pageWidth: number
): number => {
  const labelWidth = 70;
  const valueWidth = pageWidth - margin * 2 - labelWidth - 5;

  const lines = doc.splitTextToSize(value, valueWidth);
  const neededSpace = Math.max(lines.length * 5, 7) + 5;
  
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, neededSpace);

  doc.setTextColor(TEXT_GRAY[0], TEXT_GRAY[1], TEXT_GRAY[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`${label}:`, margin, yPos);

  doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
  doc.setFont("helvetica", "bold");
  doc.text(lines, margin + labelWidth, yPos);

  return yPos + Math.max(lines.length * 5, 7);
};

const addPdfFooter = (doc: jsPDF, pageWidth: number): void => {
  const pageCount = doc.getNumberOfPages();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    doc.setDrawColor(TFA_NAVY[0], TFA_NAVY[1], TFA_NAVY[2]);
    doc.setLineWidth(0.5);
    doc.line(15, pageHeight - 20, pageWidth - 15, pageHeight - 20);

    doc.setTextColor(TEXT_GRAY[0], TEXT_GRAY[1], TEXT_GRAY[2]);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("The Financial Architects | www.tfainsuranceadvisors.com | CONFIDENTIAL", 15, pageHeight - 12);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 15, pageHeight - 12, { align: "right" });
  }
};

interface ApplicationData {
  id: string;
  applicant_name: string | null;
  applicant_email: string | null;
  applicant_phone: string | null;
  advisor_id: string | null;
  advisor_name: string | null;
  advisor_email: string | null;
  form_data: Record<string, unknown>;
}

interface Beneficiary {
  fullName?: string;
  relationship?: string;
  sharePercentage?: number;
  designation?: string;
}

interface ExistingPolicy {
  companyName?: string;
  policyNumber?: string;
  amountOfCoverage?: number;
  isBeingReplaced?: boolean;
}

const generateApplicationPdf = (app: ApplicationData): string => {
  console.log("Generating PDF for application:", app.id);
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;

  const formData = app.form_data || {};
  const step1 = (formData.step1 || {}) as Record<string, unknown>;
  const step2 = (formData.step2 || {}) as Record<string, unknown>;
  const step3 = (formData.step3 || {}) as Record<string, unknown>;
  const step4 = (formData.step4 || {}) as Record<string, unknown>;
  const step5 = (formData.step5 || {}) as Record<string, unknown>;
  const step6 = (formData.step6 || {}) as Record<string, unknown>;
  const step7 = (formData.step7 || {}) as Record<string, unknown>;
  const step8 = (formData.step8 || {}) as Record<string, unknown>;
  const step9 = (formData.step9 || {}) as Record<string, unknown>;

  let yPos = addPdfHeader(doc, pageWidth, margin);

  // Application ID box
  doc.setFillColor(240, 253, 244);
  doc.rect(margin, yPos, pageWidth - margin * 2, 12, "F");
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Application ID: ${app.id}`, margin + 4, yPos + 8);
  yPos += 18;

  // STEP 1: Proposed Insured
  yPos = addPdfSectionHeader(doc, "STEP 1: PROPOSED INSURED", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Full Name", app.applicant_name || "N/A", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Date of Birth", formatPdfDate(step1.dateOfBirth as string), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Gender", formatPdfValue(step1.gender), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "SSN", formatSSN(step1.ssn as string), yPos, margin, pageWidth);
  
  const birthPlace = step1.birthplaceCountry 
    ? `${step1.birthplaceState ? step1.birthplaceState + ", " : ""}${step1.birthplaceCountry}` 
    : "N/A";
  yPos = addPdfField(doc, "Place of Birth", birthPlace, yPos, margin, pageWidth);

  // Home Address
  const homeAddress = [step1.homeStreet, step1.homeCity, step1.homeState, step1.homeZip]
    .filter(Boolean).join(", ") || "N/A";
  yPos = addPdfField(doc, "Home Address", homeAddress, yPos, margin, pageWidth);

  if (step1.mailingAddressDifferent) {
    const mailingAddress = [step1.mailingStreet, step1.mailingCity, step1.mailingState, step1.mailingZip]
      .filter(Boolean).join(", ") || "N/A";
    yPos = addPdfField(doc, "Mailing Address", mailingAddress, yPos, margin, pageWidth);
  }

  yPos = addPdfField(doc, "Citizenship", getCitizenshipLabel(step1.citizenshipStatus as string), yPos, margin, pageWidth);
  if (step1.citizenshipStatus === "other") {
    yPos = addPdfField(doc, "Country of Citizenship", formatPdfValue(step1.countryOfCitizenship), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Date of Entry", formatPdfDate(step1.dateOfEntry as string), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Visa Type", formatPdfValue(step1.visaType), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Visa Expiration", formatPdfDate(step1.visaExpirationDate as string), yPos, margin, pageWidth);
  }

  yPos = addPdfField(doc, "Driver's License", formatPdfValue(step1.driversLicenseNumber), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "DL State", formatPdfValue(step1.driversLicenseState), yPos, margin, pageWidth);
  yPos += 5;

  // STEP 2: Contact & Employment
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth);
  yPos = addPdfSectionHeader(doc, "STEP 2: CONTACT & EMPLOYMENT", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Mobile Phone", formatPdfValue(step2.mobilePhone), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Home Phone", formatPdfValue(step2.homePhone), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Work Phone", formatPdfValue(step2.workPhone), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Email", formatPdfValue(step2.email), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Employer", formatPdfValue(step2.employerName), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Occupation", formatPdfValue(step2.occupation), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Industry", formatPdfValue(step2.industry), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Years Employed", formatPdfValue(step2.yearsEmployed), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Annual Income", formatCurrency(step2.annualEarnedIncome as number), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Household Income", formatCurrency(step2.householdIncome as number), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Net Worth", formatCurrency(step2.netWorth as number), yPos, margin, pageWidth);
  yPos += 5;

  // STEP 3: Ownership
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth);
  yPos = addPdfSectionHeader(doc, "STEP 3: OWNERSHIP", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Insured Is Owner", step3.insuredIsOwner === false ? "No" : "Yes", yPos, margin, pageWidth);
  if (step3.insuredIsOwner === false) {
    yPos = addPdfField(doc, "Owner Type", formatPdfValue(step3.ownerType), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Owner Name", formatPdfValue(step3.ownerName), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Owner SSN/TIN", formatSSN(step3.ownerSSN as string), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Owner Relationship", formatPdfValue(step3.ownerRelationshipToInsured), yPos, margin, pageWidth);
    const ownerAddress = [step3.ownerStreet, step3.ownerCity, step3.ownerState, step3.ownerZip]
      .filter(Boolean).join(", ") || "N/A";
    yPos = addPdfField(doc, "Owner Address", ownerAddress, yPos, margin, pageWidth);
  }
  yPos += 5;

  // STEP 4: Beneficiaries
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth);
  yPos = addPdfSectionHeader(doc, "STEP 4: BENEFICIARIES", yPos, margin, pageWidth);
  const beneficiaries = (step4.beneficiaries || []) as Beneficiary[];
  if (beneficiaries.length > 0) {
    beneficiaries.forEach((ben, idx) => {
      yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth);
      yPos = addPdfField(doc, `Beneficiary ${idx + 1}`, ben.fullName || "N/A", yPos, margin, pageWidth);
      yPos = addPdfField(doc, "  Designation", ben.designation === "primary" ? "Primary" : "Contingent", yPos, margin, pageWidth);
      yPos = addPdfField(doc, "  Relationship", formatPdfValue(ben.relationship), yPos, margin, pageWidth);
      yPos = addPdfField(doc, "  Share %", `${ben.sharePercentage || 0}%`, yPos, margin, pageWidth);
    });
  } else {
    yPos = addPdfField(doc, "Beneficiaries", "None specified", yPos, margin, pageWidth);
  }
  yPos += 5;

  // STEP 5: Policy & Riders
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth);
  yPos = addPdfSectionHeader(doc, "STEP 5: POLICY & RIDERS", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Plan", getPlanLabel(step5.planName as string), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Face Amount", formatCurrency(step5.faceAmount as number), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Term Duration", formatPdfValue(step5.termDuration), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Children's Term", formatPdfValue(step5.ridersChildrenTerm), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Waiver of Premium", formatPdfValue(step5.ridersWaiverOfPremium), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Accelerated Benefits", formatPdfValue(step5.ridersAcceleratedBenefits), yPos, margin, pageWidth);
  yPos += 5;

  // STEP 6: Existing Coverage
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth);
  yPos = addPdfSectionHeader(doc, "STEP 6: EXISTING COVERAGE", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Has Existing Coverage", formatPdfValue(step6.hasExistingCoverage), yPos, margin, pageWidth);
  const existingPolicies = (step6.existingPolicies || []) as ExistingPolicy[];
  if (existingPolicies.length > 0) {
    existingPolicies.forEach((pol, idx) => {
      yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth);
      yPos = addPdfField(doc, `Policy ${idx + 1}`, pol.companyName || "N/A", yPos, margin, pageWidth);
      yPos = addPdfField(doc, "  Policy Number", formatPdfValue(pol.policyNumber), yPos, margin, pageWidth);
      yPos = addPdfField(doc, "  Coverage Amount", formatCurrency(pol.amountOfCoverage), yPos, margin, pageWidth);
      yPos = addPdfField(doc, "  Being Replaced", formatPdfValue(pol.isBeingReplaced), yPos, margin, pageWidth);
    });
  }
  yPos += 5;

  // STEP 7: Medical & Lifestyle
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth);
  yPos = addPdfSectionHeader(doc, "STEP 7: MEDICAL & LIFESTYLE", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Used Tobacco (5 yrs)", formatPdfValue(step7.usedTobacco), yPos, margin, pageWidth);
  if (step7.usedTobacco) {
    yPos = addPdfField(doc, "  Tobacco Type", formatPdfValue(step7.tobaccoType), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "  Frequency", formatPdfValue(step7.tobaccoFrequency), yPos, margin, pageWidth);
  }
  yPos = addPdfField(doc, "Pilots Aircraft", formatPdfValue(step7.aviation), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Hazardous Sports", formatPdfValue(step7.hazardousSports), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Foreign Travel", formatPdfValue(step7.foreignTravel), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Driving Violations", formatPdfValue(step7.drivingViolations), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Criminal History", formatPdfValue(step7.criminalHistory), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Bankruptcy", formatPdfValue(step7.bankruptcy), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Medical Conditions", formatPdfValue(step7.hasMedicalConditions), yPos, margin, pageWidth);
  yPos += 5;

  // STEP 8: Payment
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth);
  yPos = addPdfSectionHeader(doc, "STEP 8: PREMIUM PAYMENT", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Payment Method", getPaymentMethodLabel(step8.paymentMethod as string), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Frequency", getPaymentFrequencyLabel(step8.paymentFrequency as string), yPos, margin, pageWidth);
  if (step8.paymentMethod === "eft") {
    yPos = addPdfField(doc, "Bank Name", formatPdfValue(step8.bankName), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Account Number", maskAccountNumber(step8.accountNumber as string), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Account Type", formatPdfValue(step8.accountType), yPos, margin, pageWidth);
  }
  yPos = addPdfField(doc, "Source of Funds", getSourceOfFundsLabel(step8.sourceOfFunds as string), yPos, margin, pageWidth);
  yPos += 5;

  // STEP 9: Signature
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth);
  yPos = addPdfSectionHeader(doc, "STEP 9: ACKNOWLEDGMENT & SIGNATURE", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Acknowledged", formatPdfValue(step9.acknowledged), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Electronic Signature", formatPdfValue(step9.electronicSignature), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Signature Date", formatPdfDate(step9.signatureDate as string), yPos, margin, pageWidth);

  addPdfFooter(doc, pageWidth);

  return doc.output("datauristring").split(",")[1];
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicationId } = await req.json();

    if (!applicationId) {
      return new Response(
        JSON.stringify({ error: "applicationId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Resending PDF for application:", applicationId);

    // Fetch application from database
    const { data: application, error: fetchError } = await supabaseAdmin
      .from("life_insurance_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (fetchError || !application) {
      console.error("Failed to fetch application:", fetchError);
      return new Response(
        JSON.stringify({ error: "Application not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch advisor email if we have advisor_id
    let advisorEmail = application.advisor_email;
    if (!advisorEmail && application.advisor_id) {
      console.log("Looking up advisor email for ID:", application.advisor_id, "Name:", application.advisor_name);
      
      // Try UUID lookup first
      const { data: advisor, error: advisorError } = await supabaseAdmin
        .from("dynamic_advisors")
        .select("email")
        .eq("id", application.advisor_id)
        .single();
      
      if (advisor?.email && !advisorError) {
        advisorEmail = advisor.email;
        console.log("Found advisor email via UUID lookup:", advisorEmail);
      } else {
        console.log("UUID lookup failed, error:", advisorError?.message);
        
        // Fallback: try lookup by slug derived from advisor_name
        if (application.advisor_name) {
          const slug = application.advisor_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          console.log("Trying slug fallback lookup with slug:", slug);
          
          const { data: slugAdvisor, error: slugError } = await supabaseAdmin
            .from("dynamic_advisors")
            .select("email")
            .eq("slug", slug)
            .single();
          
          if (slugAdvisor?.email && !slugError) {
            advisorEmail = slugAdvisor.email;
            console.log("Found advisor email via slug lookup:", advisorEmail);
          } else {
            console.log("Slug lookup failed, error:", slugError?.message);
          }
        }
      }
      
      if (!advisorEmail) {
        console.warn("Could not find advisor email for ID:", application.advisor_id, "Name:", application.advisor_name);
      }
    }

    // Generate PDF
    const pdfBase64 = generateApplicationPdf(application);
    const applicantName = application.applicant_name || "Unknown Applicant";
    const fileName = `Life_Insurance_Application_${applicantName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;

    const results: { recipient: string; success: boolean; error?: string }[] = [];

    // Send to advisor if email available
    if (advisorEmail) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: [advisorEmail],
          subject: `[RESEND] Life Insurance Application - ${applicantName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1e3a5f; padding: 20px; text-align: center;">
                <h1 style="color: #d4af37; margin: 0;">The Financial Architects</h1>
              </div>
              <div style="padding: 20px;">
                <p>Hello ${application.advisor_name || "Advisor"},</p>
                <p>This is a resend of the life insurance application PDF for <strong>${applicantName}</strong>.</p>
                <p>The PDF is attached to this email.</p>
                <p style="margin-top: 20px;">Best regards,<br>TFA Admin Team</p>
              </div>
            </div>
          `,
          attachments: [
            {
              filename: fileName,
              content: pdfBase64,
            },
          ],
        });
        results.push({ recipient: "advisor", success: true });
        console.log("PDF sent to advisor:", advisorEmail);
      } catch (emailError) {
        console.error("Failed to send to advisor:", emailError);
        results.push({ recipient: "advisor", success: false, error: String(emailError) });
      }
    } else {
      results.push({ recipient: "advisor", success: false, error: "No advisor email available" });
    }

    // Always send to leads inbox
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `[RESEND] Life Insurance Application - ${applicantName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1e3a5f; padding: 20px; text-align: center;">
              <h1 style="color: #d4af37; margin: 0;">The Financial Architects</h1>
            </div>
            <div style="padding: 20px;">
              <p>A life insurance application PDF has been resent.</p>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Applicant:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${applicantName}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Advisor:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${application.advisor_name || "N/A"}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Application ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${applicationId}</td></tr>
              </table>
              <p>The PDF is attached to this email.</p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: fileName,
            content: pdfBase64,
          },
        ],
      });
      results.push({ recipient: "leads", success: true });
      console.log("PDF sent to leads inbox");
    } catch (emailError) {
      console.error("Failed to send to leads:", emailError);
      results.push({ recipient: "leads", success: false, error: String(emailError) });
    }

    const anySuccess = results.some((r) => r.success);
    const advisorResult = results.find((r) => r.recipient === "advisor");

    return new Response(
      JSON.stringify({
        success: anySuccess,
        message: anySuccess
          ? advisorResult?.success
            ? `PDF resent to ${application.advisor_name || "advisor"}`
            : "PDF sent to leads inbox (advisor email not available)"
          : "Failed to resend PDF",
        results,
      }),
      {
        status: anySuccess ? 200 : 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in resend-life-insurance-pdf:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
