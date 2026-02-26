import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import jsPDF from "https://esm.sh/jspdf@2.5.1?bundle";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Create Supabase client with service role for fetching advisor email
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://tfainsuranceadvisors.com",
  "https://www.tfainsuranceadvisors.com",
  "http://localhost:5173",
  "http://localhost:8080",
];

// Check if origin is allowed (includes Lovable preview domains)
const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Allow Lovable preview domains
  if (origin.endsWith(".lovable.app") || origin.endsWith(".lovable.dev") || origin.endsWith(".lovableproject.com")) return true;
  return false;
};

const getCorsHeaders = (origin: string | null): Record<string, string> => {
  // Echo allowed origin for proper CORS, fallback to production
  const allowedOrigin = isAllowedOrigin(origin) ? origin! : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
};

// Zod validation schemas - Updated to match frontend schema
const beneficiarySchema = z.object({
  id: z.string().optional(),
  fullName: z.string().max(200).optional(),
  relationship: z.string().max(100).optional(),
  sharePercentage: z.number().min(0).max(100).optional(),
  designation: z.string().max(50).optional(),
  ssn: z.string().max(20).optional(),
  dateOfBirth: z.string().max(20).optional(),
  street: z.string().max(300).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  zip: z.string().max(20).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().email().max(255).optional().or(z.literal("")),
}).passthrough();

const existingPolicySchema = z.object({
  id: z.string().optional(),
  companyName: z.string().max(200).optional(),
  policyNumber: z.string().max(100).optional(),
  amountOfCoverage: z.number().optional(),
  isBeingReplaced: z.boolean().optional(),
}).passthrough();

const notificationRequestSchema = z.object({
  applicationId: z.string().uuid(),
  applicantName: z.string().min(1).max(200),
  applicantEmail: z.string().email().max(255),
  applicantPhone: z.string().max(30).optional(),
  advisorId: z.string().uuid().optional().or(z.literal("")).or(z.null()),
  advisorName: z.string().max(200).optional(),
  formData: z.object({
    step1: z.object({
      firstName: z.string().max(100).optional(),
      lastName: z.string().max(100).optional(),
      middleName: z.string().max(100).optional(),
      gender: z.string().max(20).optional(),
      dateOfBirth: z.string().max(20).optional(),
      ssn: z.string().max(20).optional(),
      birthplaceState: z.string().max(100).optional(),
      birthplaceCountry: z.string().max(100).optional(),
      // Home Address
      homeStreet: z.string().max(300).optional(),
      homeCity: z.string().max(100).optional(),
      homeState: z.string().max(100).optional(),
      homeZip: z.string().max(20).optional(),
      // Mailing Address
      mailingAddressDifferent: z.boolean().optional(),
      mailingStreet: z.string().max(300).optional(),
      mailingCity: z.string().max(100).optional(),
      mailingState: z.string().max(100).optional(),
      mailingZip: z.string().max(20).optional(),
      // Citizenship
      citizenshipStatus: z.string().max(100).optional(),
      countryOfCitizenship: z.string().max(100).optional(),
      dateOfEntry: z.string().max(20).optional(),
      visaType: z.string().max(100).optional(),
      permanentResidentCard: z.string().max(100).optional(),
      visaExpirationDate: z.string().max(20).optional(),
      // ID Verification
      driversLicenseNumber: z.string().max(100).optional(),
      driversLicenseState: z.string().max(100).optional(),
    }).passthrough().optional(),
    step2: z.object({
      email: z.string().email().max(255).optional().or(z.literal("")),
      mobilePhone: z.string().max(30).optional(),
      homePhone: z.string().max(30).optional(),
      workPhone: z.string().max(30).optional(),
      // Employment
      employerName: z.string().max(200).optional(),
      occupation: z.string().max(200).optional(),
      industry: z.string().max(200).optional(),
      jobDuties: z.string().max(1000).optional(),
      yearsEmployed: z.number().optional(),
      // Financials
      annualEarnedIncome: z.number().optional(),
      householdIncome: z.number().optional(),
      netWorth: z.number().optional(),
      // Family Insurance
      spouseInsuranceAmount: z.number().optional(),
      parentsInsuranceAmount: z.number().optional(),
      siblingsInsuranceAmount: z.number().optional(),
    }).passthrough().optional(),
    step3: z.object({
      insuredIsOwner: z.boolean().optional(),
      ownerType: z.string().max(50).optional(),
      ownerName: z.string().max(200).optional(),
      ownerSSN: z.string().max(20).optional(),
      ownerDateOfBirth: z.string().max(20).optional(),
      ownerTrustDate: z.string().max(20).optional(),
      ownerRelationshipToInsured: z.string().max(100).optional(),
      ownerStreet: z.string().max(300).optional(),
      ownerCity: z.string().max(100).optional(),
      ownerState: z.string().max(100).optional(),
      ownerZip: z.string().max(20).optional(),
      ownerEmail: z.string().email().max(255).optional().or(z.literal("")),
      ownerPhone: z.string().max(30).optional(),
      ownerCitizenshipStatus: z.string().max(100).optional(),
      ownerCountryOfCitizenship: z.string().max(100).optional(),
      trusteeNames: z.string().max(500).optional(),
    }).passthrough().optional(),
    step4: z.object({
      beneficiaries: z.array(beneficiarySchema).optional(),
    }).passthrough().optional(),
    step5: z.object({
      planName: z.string().max(100).optional(),
      faceAmount: z.number().optional(),
      termDuration: z.string().max(50).optional(),
      ridersChildrenTerm: z.boolean().optional(),
      ridersWaiverOfPremium: z.boolean().optional(),
      ridersAcceleratedBenefits: z.boolean().optional(),
      ridersChronicIllness: z.boolean().optional(),
      ridersAccidentalDeath: z.boolean().optional(),
      childrenDetails: z.array(z.object({
        name: z.string().optional(),
        dateOfBirth: z.string().optional(),
      })).optional(),
    }).passthrough().optional(),
    step6: z.object({
      hasExistingCoverage: z.boolean().optional(),
      existingPolicies: z.array(existingPolicySchema).optional(),
    }).passthrough().optional(),
    step7: z.object({
      usedTobacco: z.boolean().optional(),
      tobaccoType: z.string().max(100).optional(),
      tobaccoFrequency: z.string().max(100).optional(),
      tobaccoLastUsed: z.string().max(100).optional(),
      aviation: z.boolean().optional(),
      aviationDetails: z.string().max(1000).optional(),
      hazardousSports: z.boolean().optional(),
      hazardousSportsDetails: z.string().max(1000).optional(),
      foreignTravel: z.boolean().optional(),
      foreignTravelDetails: z.string().max(1000).optional(),
      bankruptcy: z.boolean().optional(),
      bankruptcyDetails: z.string().max(1000).optional(),
      criminalHistory: z.boolean().optional(),
      criminalHistoryDetails: z.string().max(1000).optional(),
      drivingViolations: z.boolean().optional(),
      drivingViolationsDetails: z.string().max(1000).optional(),
      hasMedicalConditions: z.boolean().optional(),
      medicalConditionsDetails: z.string().max(2000).optional(),
    }).passthrough().optional(),
    step8: z.object({
      paymentMethod: z.string().max(50).optional(),
      paymentFrequency: z.string().max(50).optional(),
      bankName: z.string().max(200).optional(),
      routingNumber: z.string().max(20).optional(),
      accountNumber: z.string().max(30).optional(),
      accountType: z.string().max(50).optional(),
      sourceOfFunds: z.string().max(100).optional(),
      sourceOfFundsOther: z.string().max(200).optional(),
    }).passthrough().optional(),
    step9: z.object({
      acknowledged: z.boolean().optional(),
      electronicSignature: z.string().max(200).optional(),
      signatureDate: z.string().max(20).optional(),
    }).passthrough().optional(),
  }).passthrough(),
});

// Infer types from Zod schema
type NotificationRequest = z.infer<typeof notificationRequestSchema>;

interface Beneficiary {
  id?: string;
  fullName?: string;
  relationship?: string;
  sharePercentage?: number;
  designation?: string;
  ssn?: string;
  dateOfBirth?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  email?: string;
}

interface ExistingPolicy {
  id?: string;
  companyName?: string;
  policyNumber?: string;
  amountOfCoverage?: number;
  isBeingReplaced?: boolean;
}

const ADMIN_EMAIL = "leads@tfainsuranceadvisors.com";
const FROM_EMAIL = "The Financial Architects <noreply@tfainsuranceadvisors.com>";

// PDF Color Constants (RGB values 0-255)
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

// Show full account/routing numbers for agent PDF (unmasked for underwriting)
const formatAccountNumber = (accountNum?: string): string => {
  if (!accountNum) return "N/A";
  return accountNum;
};

const formatRoutingNumber = (routingNum?: string): string => {
  if (!routingNum) return "N/A";
  return routingNum;
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

// ============ PDF GENERATION FUNCTIONS ============

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
  // Navy header background
  doc.setFillColor(TFA_NAVY[0], TFA_NAVY[1], TFA_NAVY[2]);
  doc.rect(0, 0, pageWidth, 45, "F");

  // Company name in gold
  doc.setTextColor(TFA_GOLD[0], TFA_GOLD[1], TFA_GOLD[2]);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("THE FINANCIAL ARCHITECTS", margin, 20);

  // Document title in white
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Life Insurance Application", margin, 32);

  // Date on right side
  doc.setFontSize(10);
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Generated: ${dateStr}`, pageWidth - margin, 32, { align: "right" });

  return 55; // Return Y position after header
};

const addPdfSectionHeader = (
  doc: jsPDF,
  title: string,
  yPos: number,
  margin: number,
  pageWidth: number
): number => {
  // Section header with navy background
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

  // Handle text wrapping for long values
  const lines = doc.splitTextToSize(value, valueWidth);
  const neededSpace = Math.max(lines.length * 5, 7) + 5;
  
  // Check for page break before rendering
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

    // Footer line
    doc.setDrawColor(TFA_NAVY[0], TFA_NAVY[1], TFA_NAVY[2]);
    doc.setLineWidth(0.5);
    doc.line(15, pageHeight - 20, pageWidth - 15, pageHeight - 20);

    // Footer text
    doc.setTextColor(TEXT_GRAY[0], TEXT_GRAY[1], TEXT_GRAY[2]);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("The Financial Architects | www.tfainsuranceadvisors.com | CONFIDENTIAL", 15, pageHeight - 12);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 15, pageHeight - 12, { align: "right" });
  }
};

// Extended type that includes advisor email (fetched server-side)
interface NotificationDataWithEmail extends NotificationRequest {
  advisorEmail?: string;
}

const generateApplicationPdf = (data: NotificationDataWithEmail): string => {
  console.log("Generating PDF for application:", data.applicationId);
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;

  const { applicationId, applicantName, applicantPhone, advisorName, advisorEmail, formData } = data;
  const step1 = formData.step1 || {};
  const step2 = formData.step2 || {};
  const step3 = formData.step3 || {};
  const step4 = formData.step4 || {};
  const step5 = formData.step5 || {};
  const step6 = formData.step6 || {};
  const step7 = formData.step7 || {};
  const step8 = formData.step8 || {};
  const step9 = formData.step9 || {};

  let yPos = addPdfHeader(doc, pageWidth, margin);

  // Application ID box
  doc.setFillColor(240, 253, 244);
  doc.rect(margin, yPos, pageWidth - margin * 2, 12, "F");
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Application ID: ${applicationId}`, margin + 4, yPos + 8);
  yPos += 18;

  // ============ STEP 1: Proposed Insured ============
  yPos = addPdfSectionHeader(doc, "STEP 1: PROPOSED INSURED", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Full Name", applicantName || "N/A", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Date of Birth", formatPdfDate(step1.dateOfBirth), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Gender", formatPdfValue(step1.gender), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "SSN", formatSSN(step1.ssn), yPos, margin, pageWidth);
  
  // Birthplace - using correct field names
  const birthPlace = step1.birthplaceCountry 
    ? `${step1.birthplaceState ? step1.birthplaceState + ", " : ""}${step1.birthplaceCountry}` 
    : "N/A";
  yPos = addPdfField(doc, "Birth Place", birthPlace, yPos, margin, pageWidth);
  
  // Citizenship - using correct field name
  yPos = addPdfField(doc, "Citizenship Status", getCitizenshipLabel(step1.citizenshipStatus), yPos, margin, pageWidth);
  if (step1.citizenshipStatus === "other") {
    yPos = addPdfField(doc, "Country of Citizenship", formatPdfValue(step1.countryOfCitizenship), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Date of Entry", formatPdfDate(step1.dateOfEntry), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Visa Type", formatPdfValue(step1.visaType), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Visa Expiration", formatPdfDate(step1.visaExpirationDate), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Permanent Resident Card #", formatPdfValue(step1.permanentResidentCard), yPos, margin, pageWidth);
  }
  
  // Home Address - using correct field names
  const homeAddress = step1.homeStreet 
    ? `${step1.homeStreet}, ${step1.homeCity || ""}, ${step1.homeState || ""} ${step1.homeZip || ""}`.trim()
    : "N/A";
  yPos = addPdfField(doc, "Home Address", homeAddress, yPos, margin, pageWidth);
  
  // Mailing Address - using correct field names
  if (step1.mailingAddressDifferent && step1.mailingStreet) {
    const mailingAddr = `${step1.mailingStreet}, ${step1.mailingCity || ""}, ${step1.mailingState || ""} ${step1.mailingZip || ""}`.trim();
    yPos = addPdfField(doc, "Mailing Address", mailingAddr, yPos, margin, pageWidth);
  }
  
  // Driver's License - using correct field names
  if (step1.driversLicenseNumber) {
    yPos = addPdfField(doc, "Driver's License", `${step1.driversLicenseNumber} (${step1.driversLicenseState || "N/A"})`, yPos, margin, pageWidth);
  }
  yPos += 5;

  // ============ STEP 2: Contact & Employment ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 60);
  yPos = addPdfSectionHeader(doc, "STEP 2: CONTACT & EMPLOYMENT", yPos, margin, pageWidth);
  
  // Contact - Always show all phone numbers
  yPos = addPdfField(doc, "Email", formatPdfValue(step2.email), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Mobile Phone", formatPdfValue(step2.mobilePhone || applicantPhone), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Home Phone", formatPdfValue(step2.homePhone), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Work Phone", formatPdfValue(step2.workPhone), yPos, margin, pageWidth);
  
  // Employment - Always show all fields
  yPos = addPdfField(doc, "Employer", formatPdfValue(step2.employerName), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Occupation", formatPdfValue(step2.occupation), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Industry", formatPdfValue(step2.industry), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Job Duties", formatPdfValue(step2.jobDuties), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Years Employed", formatPdfValue(step2.yearsEmployed), yPos, margin, pageWidth);
  
  // Financials - Always show all fields
  yPos = addPdfField(doc, "Annual Earned Income", formatCurrency(step2.annualEarnedIncome), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Household Income", formatCurrency(step2.householdIncome), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Net Worth", formatCurrency(step2.netWorth), yPos, margin, pageWidth);
  
  // Family Insurance - Always show all fields
  yPos = addPdfField(doc, "Spouse Insurance", formatCurrency(step2.spouseInsuranceAmount), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Parents Insurance", formatCurrency(step2.parentsInsuranceAmount), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Siblings Insurance", formatCurrency(step2.siblingsInsuranceAmount), yPos, margin, pageWidth);
  yPos += 5;

  // ============ STEP 3: Ownership ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 50);
  yPos = addPdfSectionHeader(doc, "STEP 3: OWNERSHIP", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Insured is Owner", step3.insuredIsOwner ? "Yes" : "No", yPos, margin, pageWidth);
  
  if (!step3.insuredIsOwner) {
    const ownerTypeLabel = step3.ownerType === "individual" ? "Individual" : step3.ownerType === "trust" ? "Trust" : step3.ownerType === "business" ? "Business" : "N/A";
    yPos = addPdfField(doc, "Owner Type", ownerTypeLabel, yPos, margin, pageWidth);
    
    // Using correct field names
    yPos = addPdfField(doc, "Owner Name", formatPdfValue(step3.ownerName), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Owner SSN/TIN", formatSSN(step3.ownerSSN), yPos, margin, pageWidth);
    
    if (step3.ownerType === "individual") {
      yPos = addPdfField(doc, "Owner DOB", formatPdfDate(step3.ownerDateOfBirth), yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Relationship to Insured", formatPdfValue(step3.ownerRelationshipToInsured), yPos, margin, pageWidth);
    }
    
    if (step3.ownerType === "trust" && step3.ownerTrustDate) {
      yPos = addPdfField(doc, "Trust Date", formatPdfDate(step3.ownerTrustDate), yPos, margin, pageWidth);
      if (step3.trusteeNames) {
        yPos = addPdfField(doc, "Trustee Names", formatPdfValue(step3.trusteeNames), yPos, margin, pageWidth);
      }
    }
    
    // Owner Address - using correct field names
    if (step3.ownerStreet) {
      const ownerAddr = `${step3.ownerStreet}, ${step3.ownerCity || ""}, ${step3.ownerState || ""} ${step3.ownerZip || ""}`.trim();
      yPos = addPdfField(doc, "Owner Address", ownerAddr, yPos, margin, pageWidth);
    }
    if (step3.ownerEmail) {
      yPos = addPdfField(doc, "Owner Email", formatPdfValue(step3.ownerEmail), yPos, margin, pageWidth);
    }
    if (step3.ownerPhone) {
      yPos = addPdfField(doc, "Owner Phone", formatPdfValue(step3.ownerPhone), yPos, margin, pageWidth);
    }
    
    // Owner Citizenship - using correct field names
    if (step3.ownerCitizenshipStatus) {
      yPos = addPdfField(doc, "Owner Citizenship", getCitizenshipLabel(step3.ownerCitizenshipStatus), yPos, margin, pageWidth);
      if (step3.ownerCitizenshipStatus === "other" && step3.ownerCountryOfCitizenship) {
        yPos = addPdfField(doc, "Owner Country", formatPdfValue(step3.ownerCountryOfCitizenship), yPos, margin, pageWidth);
      }
    }
  }
  yPos += 5;

  // ============ STEP 4: Beneficiaries ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 50);
  yPos = addPdfSectionHeader(doc, "STEP 4: BENEFICIARIES", yPos, margin, pageWidth);
  
  if (step4.beneficiaries && step4.beneficiaries.length > 0) {
    step4.beneficiaries.forEach((b: Beneficiary, index: number) => {
      yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 50);
      
      // Beneficiary sub-header
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, yPos, pageWidth - margin * 2, 8, "F");
      doc.setTextColor(TFA_NAVY[0], TFA_NAVY[1], TFA_NAVY[2]);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`Beneficiary ${index + 1}: ${b.fullName || "N/A"}`, margin + 4, yPos + 6);
      yPos += 12;
      
      const designation = b.designation === "primary" ? "Primary" : "Contingent";
      yPos = addPdfField(doc, "Type", designation, yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Share", `${b.sharePercentage || 0}%`, yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Relationship", formatPdfValue(b.relationship), yPos, margin, pageWidth);
      if (b.ssn) {
        yPos = addPdfField(doc, "SSN", formatSSN(b.ssn), yPos, margin, pageWidth);
      }
      if (b.dateOfBirth) {
        yPos = addPdfField(doc, "Date of Birth", formatPdfDate(b.dateOfBirth), yPos, margin, pageWidth);
      }
      // Beneficiary Address - using correct field names
      if (b.street) {
        const benAddr = `${b.street}, ${b.city || ""}, ${b.state || ""} ${b.zip || ""}`.trim();
        yPos = addPdfField(doc, "Address", benAddr, yPos, margin, pageWidth);
      }
      if (b.phone) {
        yPos = addPdfField(doc, "Phone", formatPdfValue(b.phone), yPos, margin, pageWidth);
      }
      if (b.email) {
        yPos = addPdfField(doc, "Email", formatPdfValue(b.email), yPos, margin, pageWidth);
      }
      yPos += 3;
    });
  } else {
    doc.setTextColor(TEXT_GRAY[0], TEXT_GRAY[1], TEXT_GRAY[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("No beneficiaries specified", margin, yPos);
    yPos += 7;
  }
  yPos += 5;

  // ============ STEP 5: Policy & Riders ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 40);
  yPos = addPdfSectionHeader(doc, "STEP 5: POLICY & RIDERS", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Plan Type", getPlanLabel(step5.planName), yPos, margin, pageWidth);
  
  // Face Amount highlighted
  doc.setTextColor(TEXT_GRAY[0], TEXT_GRAY[1], TEXT_GRAY[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Face Amount:", margin, yPos);
  doc.setTextColor(TFA_NAVY[0], TFA_NAVY[1], TFA_NAVY[2]);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(formatCurrency(step5.faceAmount), margin + 70, yPos);
  yPos += 8;
  
  if (step5.termDuration) {
    yPos = addPdfField(doc, "Term Duration", formatPdfValue(step5.termDuration), yPos, margin, pageWidth);
  }
  
  // Riders - using correct boolean field names
  const riders: string[] = [];
  if (step5.ridersChildrenTerm) riders.push("Children's Term");
  if (step5.ridersWaiverOfPremium) riders.push("Waiver of Premium");
  if (step5.ridersAcceleratedBenefits) riders.push("Accelerated Benefits");
  if (step5.ridersChronicIllness) riders.push("Chronic Illness");
  if (step5.ridersAccidentalDeath) riders.push("Accidental Death");
  
  if (riders.length > 0) {
    yPos = addPdfField(doc, "Riders", riders.join(", "), yPos, margin, pageWidth);
  }
  
  // Children Details
  if (step5.ridersChildrenTerm && step5.childrenDetails && step5.childrenDetails.length > 0) {
    yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 30);
    step5.childrenDetails.forEach((child, idx) => {
      yPos = addPdfField(doc, `Child ${idx + 1}`, `${child.name || "N/A"} (DOB: ${formatPdfDate(child.dateOfBirth)})`, yPos, margin, pageWidth);
    });
  }
  yPos += 5;

  // ============ STEP 6: Existing Coverage ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 40);
  yPos = addPdfSectionHeader(doc, "STEP 6: EXISTING COVERAGE", yPos, margin, pageWidth);
  
  if (step6.hasExistingCoverage && step6.existingPolicies && step6.existingPolicies.length > 0) {
    step6.existingPolicies.forEach((p: ExistingPolicy, index: number) => {
      yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 25);
      
      // Policy sub-header with warning color
      doc.setFillColor(254, 243, 199);
      doc.rect(margin, yPos, pageWidth - margin * 2, 8, "F");
      doc.setTextColor(146, 64, 14);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`Policy ${index + 1}: ${p.companyName || "Unknown Company"}`, margin + 4, yPos + 6);
      yPos += 12;
      
      yPos = addPdfField(doc, "Policy Number", formatPdfValue(p.policyNumber), yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Amount", formatCurrency(p.amountOfCoverage), yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Being Replaced", p.isBeingReplaced ? "Yes" : "No", yPos, margin, pageWidth);
      yPos += 3;
    });
  } else {
    doc.setTextColor(TEXT_GRAY[0], TEXT_GRAY[1], TEXT_GRAY[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("No existing coverage", margin, yPos);
    yPos += 7;
  }
  yPos += 5;

  // ============ STEP 7: Medical & Lifestyle ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 80);
  yPos = addPdfSectionHeader(doc, "STEP 7: MEDICAL & LIFESTYLE", yPos, margin, pageWidth);
  
  // Show ALL questions with explicit Yes/No answers
  yPos = addPdfField(doc, "Used Tobacco (Last 5 Years)", step7.usedTobacco ? "Yes" : "No", yPos, margin, pageWidth);
  if (step7.usedTobacco) {
    yPos = addPdfField(doc, "Tobacco Type", formatPdfValue(step7.tobaccoType), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Tobacco Frequency", formatPdfValue(step7.tobaccoFrequency), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Tobacco Last Used", formatPdfValue(step7.tobaccoLastUsed), yPos, margin, pageWidth);
  }
  
  yPos = addPdfField(doc, "Pilots Aircraft", step7.aviation ? "Yes" : "No", yPos, margin, pageWidth);
  if (step7.aviation) {
    yPos = addPdfField(doc, "Aviation Details", formatPdfValue(step7.aviationDetails), yPos, margin, pageWidth);
  }
  
  yPos = addPdfField(doc, "Hazardous Sports", step7.hazardousSports ? "Yes" : "No", yPos, margin, pageWidth);
  if (step7.hazardousSports) {
    yPos = addPdfField(doc, "Hazardous Sports Details", formatPdfValue(step7.hazardousSportsDetails), yPos, margin, pageWidth);
  }
  
  yPos = addPdfField(doc, "Foreign Travel Planned", step7.foreignTravel ? "Yes" : "No", yPos, margin, pageWidth);
  if (step7.foreignTravel) {
    yPos = addPdfField(doc, "Foreign Travel Details", formatPdfValue(step7.foreignTravelDetails), yPos, margin, pageWidth);
  }
  
  yPos = addPdfField(doc, "Driving Violations (Last 5 Years)", step7.drivingViolations ? "Yes" : "No", yPos, margin, pageWidth);
  if (step7.drivingViolations) {
    yPos = addPdfField(doc, "Driving Violations Details", formatPdfValue(step7.drivingViolationsDetails), yPos, margin, pageWidth);
  }
  
  yPos = addPdfField(doc, "Bankruptcy Filed", step7.bankruptcy ? "Yes" : "No", yPos, margin, pageWidth);
  if (step7.bankruptcy) {
    yPos = addPdfField(doc, "Bankruptcy Details", formatPdfValue(step7.bankruptcyDetails), yPos, margin, pageWidth);
  }
  
  yPos = addPdfField(doc, "Criminal History", step7.criminalHistory ? "Yes" : "No", yPos, margin, pageWidth);
  if (step7.criminalHistory) {
    yPos = addPdfField(doc, "Criminal History Details", formatPdfValue(step7.criminalHistoryDetails), yPos, margin, pageWidth);
  }
  
  yPos = addPdfField(doc, "Has Medical Conditions", step7.hasMedicalConditions ? "Yes" : "No", yPos, margin, pageWidth);
  if (step7.hasMedicalConditions) {
    yPos = addPdfField(doc, "Medical Conditions Details", formatPdfValue(step7.medicalConditionsDetails), yPos, margin, pageWidth);
  }
  yPos += 5;

  // ============ STEP 8: Premium Payment ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 50);
  yPos = addPdfSectionHeader(doc, "STEP 8: PREMIUM PAYMENT", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Payment Method", getPaymentMethodLabel(step8.paymentMethod), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Payment Frequency", getPaymentFrequencyLabel(step8.paymentFrequency), yPos, margin, pageWidth);
  
  if (step8.paymentMethod === "eft") {
    yPos = addPdfField(doc, "Bank Name", formatPdfValue(step8.bankName), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Routing Number", formatRoutingNumber(step8.routingNumber), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Account Number", formatAccountNumber(step8.accountNumber), yPos, margin, pageWidth);
    const accountType = step8.accountType === "checking" ? "Checking" : step8.accountType === "savings" ? "Savings" : formatPdfValue(step8.accountType);
    yPos = addPdfField(doc, "Account Type", accountType, yPos, margin, pageWidth);
  }
  
  const sourceOfFunds = step8.sourceOfFunds === "other" && step8.sourceOfFundsOther 
    ? step8.sourceOfFundsOther 
    : getSourceOfFundsLabel(step8.sourceOfFunds);
  yPos = addPdfField(doc, "Source of Funds", sourceOfFunds, yPos, margin, pageWidth);
  yPos += 5;

  // ============ STEP 9: Signature ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 40);
  yPos = addPdfSectionHeader(doc, "STEP 9: SIGNATURE & ACKNOWLEDGMENT", yPos, margin, pageWidth);
  // Using correct field name
  yPos = addPdfField(doc, "Acknowledgment", step9.acknowledged ? "Confirmed" : "Not confirmed", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Electronic Signature", formatPdfValue(step9.electronicSignature), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Signature Date", formatPdfDate(step9.signatureDate), yPos, margin, pageWidth);
  yPos += 5;

  // ============ Advisor Info ============
  if (advisorName) {
    yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 30);
    yPos = addPdfSectionHeader(doc, "ASSIGNED ADVISOR", yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Advisor Name", advisorName, yPos, margin, pageWidth);
    if (advisorEmail) {
      yPos = addPdfField(doc, "Advisor Email", advisorEmail, yPos, margin, pageWidth);
    }
  }

  // Add security notice
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 25);
  yPos += 10;
  doc.setFillColor(240, 249, 255);
  doc.rect(margin, yPos, pageWidth - margin * 2, 15, "F");
  doc.setTextColor(12, 74, 110);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("Note: SSNs and bank account details are partially masked for security.", margin + 4, yPos + 6);
  doc.text("Full details are available in the admin dashboard.", margin + 4, yPos + 12);

  // Add footer to all pages
  addPdfFooter(doc, pageWidth);

  // Return base64 encoded PDF
  const pdfOutput = doc.output("datauristring");
  const base64Data = pdfOutput.split(",")[1];
  
  console.log("PDF generated successfully, size:", base64Data.length, "characters");
  return base64Data;
};

// ============ EMAIL HTML GENERATION ============

const generateSectionHeader = (title: string): string => {
  return `<h2 style="color: #1e3a5f; font-size: 18px; margin: 25px 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">${title}</h2>`;
};

const generateDataRow = (label: string, value: string, isLink: boolean = false, linkType: string = "text"): string => {
  let formattedValue = value;
  if (isLink && value && value !== "N/A") {
    if (linkType === "email") {
      formattedValue = `<a href="mailto:${value}" style="color: #2563eb;">${value}</a>`;
    } else if (linkType === "phone") {
      formattedValue = `<a href="tel:${value}" style="color: #2563eb;">${value}</a>`;
    }
  }
  return `
    <tr>
      <td style="padding: 8px 0; color: #6b7280; width: 40%;">${label}:</td>
      <td style="padding: 8px 0; color: #111827;">${formattedValue}</td>
    </tr>
  `;
};

const generateAdminEmail = (data: NotificationDataWithEmail): string => {
  const { applicationId, applicantName, applicantPhone, advisorName, advisorEmail, formData } = data;
  const step1 = formData.step1 || {};
  const step2 = formData.step2 || {};
  const step3 = formData.step3 || {};
  const step4 = formData.step4 || {};
  const step5 = formData.step5 || {};
  const step6 = formData.step6 || {};
  const step7 = formData.step7 || {};
  const step8 = formData.step8 || {};
  const step9 = formData.step9 || {};

  // Build beneficiaries section
  let beneficiariesHtml = "";
  if (step4.beneficiaries && step4.beneficiaries.length > 0) {
    beneficiariesHtml = step4.beneficiaries.map((b: Beneficiary, index: number) => `
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 10px;">
        <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e3a5f;">Beneficiary ${index + 1}: ${b.fullName || "N/A"}</p>
        <p style="margin: 0; font-size: 14px; color: #374151;">
          <strong>Type:</strong> ${b.designation === "primary" ? "Primary" : "Contingent"} |
          <strong>Share:</strong> ${b.sharePercentage || 0}% |
          <strong>Relationship:</strong> ${b.relationship || "N/A"}
        </p>
        ${b.ssn ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: #374151;"><strong>SSN:</strong> ${maskSSN(b.ssn)}</p>` : ""}
        ${b.dateOfBirth ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: #374151;"><strong>DOB:</strong> ${formatPdfDate(b.dateOfBirth)}</p>` : ""}
        ${b.street ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: #374151;"><strong>Address:</strong> ${b.street}, ${b.city || ""}, ${b.state || ""} ${b.zip || ""}</p>` : ""}
        ${b.phone ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: #374151;"><strong>Phone:</strong> ${b.phone}</p>` : ""}
        ${b.email ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: #374151;"><strong>Email:</strong> ${b.email}</p>` : ""}
      </div>
    `).join("");
  } else {
    beneficiariesHtml = `<p style="color: #6b7280; font-style: italic;">No beneficiaries specified</p>`;
  }

  // Build existing policies section
  let existingPoliciesHtml = "";
  if (step6.hasExistingCoverage && step6.existingPolicies && step6.existingPolicies.length > 0) {
    existingPoliciesHtml = step6.existingPolicies.map((p: ExistingPolicy, index: number) => `
      <div style="background-color: #fef3c7; padding: 12px; border-radius: 6px; margin-bottom: 8px;">
        <p style="margin: 0; font-weight: 600; color: #92400e;">Policy ${index + 1}: ${p.companyName || "Unknown Company"}</p>
        <p style="margin: 4px 0 0 0; font-size: 14px; color: #78350f;">
          Policy #: ${p.policyNumber || "N/A"} |
          Amount: ${formatCurrency(p.amountOfCoverage)} |
          Being Replaced: ${p.isBeingReplaced ? "Yes" : "No"}
        </p>
      </div>
    `).join("");
  } else {
    existingPoliciesHtml = `<p style="color: #6b7280; font-style: italic;">No existing coverage</p>`;
  }

  // Build medical/lifestyle flags - using correct field names
  const medicalFlags: string[] = [];
  if (step7.usedTobacco) medicalFlags.push(`Tobacco Use: ${step7.tobaccoType || "Yes"} (${step7.tobaccoFrequency || "N/A"})`);
  if (step7.aviation) medicalFlags.push("Aviation Activities");
  if (step7.hazardousSports) medicalFlags.push("Hazardous Sports");
  if (step7.foreignTravel) medicalFlags.push("Foreign Travel");
  if (step7.bankruptcy) medicalFlags.push("Bankruptcy History");
  if (step7.criminalHistory) medicalFlags.push("Criminal History");
  if (step7.drivingViolations) medicalFlags.push("Driving Violations");
  if (step7.hasMedicalConditions) medicalFlags.push("Medical Conditions");

  // Build riders list - using correct field names
  const riders: string[] = [];
  if (step5.ridersChildrenTerm) riders.push("Children's Term");
  if (step5.ridersWaiverOfPremium) riders.push("Waiver of Premium");
  if (step5.ridersAcceleratedBenefits) riders.push("Accelerated Benefits");
  if (step5.ridersChronicIllness) riders.push("Chronic Illness");
  if (step5.ridersAccidentalDeath) riders.push("Accidental Death");

  // Home address - using correct field names
  const homeAddress = step1.homeStreet 
    ? `${step1.homeStreet}, ${step1.homeCity || ""}, ${step1.homeState || ""} ${step1.homeZip || ""}`
    : "N/A";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Life Insurance Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <div style="max-width: 700px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #1e3a5f; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Life Insurance Application</h1>
      <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">The Financial Architects</p>
    </div>
    
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin-bottom: 25px; border-radius: 0 4px 4px 0;">
        <p style="margin: 0; color: #166534; font-weight: 600;">Application ID: ${applicationId}</p>
        <p style="margin: 5px 0 0 0; color: #166534; font-size: 14px;">Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}</p>
        <p style="margin: 5px 0 0 0; color: #166534; font-size: 14px;">📎 PDF attachment included for easy filing</p>
      </div>

      <!-- STEP 1: Proposed Insured -->
      ${generateSectionHeader("Step 1: Proposed Insured")}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        ${generateDataRow("Full Name", applicantName || "N/A")}
        ${generateDataRow("Date of Birth", formatPdfDate(step1.dateOfBirth))}
        ${generateDataRow("Gender", step1.gender || "N/A")}
        ${generateDataRow("SSN", maskSSN(step1.ssn))}
        ${generateDataRow("Birth Place", step1.birthplaceCountry ? `${step1.birthplaceState ? step1.birthplaceState + ", " : ""}${step1.birthplaceCountry}` : "N/A")}
        ${generateDataRow("Citizenship Status", getCitizenshipLabel(step1.citizenshipStatus))}
        ${step1.citizenshipStatus === "other" ? `
          ${generateDataRow("Country of Citizenship", step1.countryOfCitizenship || "N/A")}
          ${generateDataRow("Date of Entry", formatPdfDate(step1.dateOfEntry))}
          ${generateDataRow("Visa Type", step1.visaType || "N/A")}
        ` : ""}
        ${generateDataRow("Home Address", homeAddress)}
        ${step1.mailingAddressDifferent && step1.mailingStreet ? generateDataRow("Mailing Address", `${step1.mailingStreet}, ${step1.mailingCity || ""}, ${step1.mailingState || ""} ${step1.mailingZip || ""}`) : ""}
        ${step1.driversLicenseNumber ? generateDataRow("Driver's License", `${step1.driversLicenseNumber} (${step1.driversLicenseState || "N/A"})`) : ""}
      </table>

      <!-- STEP 2: Contact & Employment -->
      ${generateSectionHeader("Step 2: Contact & Employment")}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        ${generateDataRow("Email", step2.email || "N/A", true, "email")}
        ${generateDataRow("Mobile Phone", step2.mobilePhone || applicantPhone || "N/A", true, "phone")}
        ${step2.homePhone ? generateDataRow("Home Phone", step2.homePhone, true, "phone") : ""}
        ${step2.workPhone ? generateDataRow("Work Phone", step2.workPhone, true, "phone") : ""}
        ${generateDataRow("Employer", step2.employerName || "N/A")}
        ${generateDataRow("Occupation", step2.occupation || "N/A")}
        ${step2.industry ? generateDataRow("Industry", step2.industry) : ""}
        ${step2.jobDuties ? generateDataRow("Job Duties", step2.jobDuties) : ""}
        ${step2.yearsEmployed !== undefined ? generateDataRow("Years Employed", String(step2.yearsEmployed)) : ""}
        ${generateDataRow("Annual Earned Income", formatCurrency(step2.annualEarnedIncome))}
        ${step2.householdIncome ? generateDataRow("Household Income", formatCurrency(step2.householdIncome)) : ""}
        ${generateDataRow("Net Worth", formatCurrency(step2.netWorth))}
        ${step2.spouseInsuranceAmount ? generateDataRow("Spouse Insurance", formatCurrency(step2.spouseInsuranceAmount)) : ""}
        ${step2.parentsInsuranceAmount ? generateDataRow("Parents Insurance", formatCurrency(step2.parentsInsuranceAmount)) : ""}
        ${step2.siblingsInsuranceAmount ? generateDataRow("Siblings Insurance", formatCurrency(step2.siblingsInsuranceAmount)) : ""}
      </table>

      <!-- STEP 3: Ownership -->
      ${generateSectionHeader("Step 3: Ownership")}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        ${generateDataRow("Insured is Owner", step3.insuredIsOwner ? "Yes" : "No")}
        ${!step3.insuredIsOwner ? `
          ${generateDataRow("Owner Type", step3.ownerType === "individual" ? "Individual" : step3.ownerType === "trust" ? "Trust" : step3.ownerType === "business" ? "Business" : "N/A")}
          ${generateDataRow("Owner Name", step3.ownerName || "N/A")}
          ${generateDataRow("Owner SSN/TIN", maskSSN(step3.ownerSSN))}
          ${step3.ownerType === "individual" ? `
            ${generateDataRow("Owner DOB", formatPdfDate(step3.ownerDateOfBirth))}
            ${generateDataRow("Relationship to Insured", step3.ownerRelationshipToInsured || "N/A")}
          ` : ""}
          ${step3.ownerType === "trust" && step3.ownerTrustDate ? `
            ${generateDataRow("Trust Date", formatPdfDate(step3.ownerTrustDate))}
            ${step3.trusteeNames ? generateDataRow("Trustee Names", step3.trusteeNames) : ""}
          ` : ""}
          ${step3.ownerStreet ? generateDataRow("Owner Address", `${step3.ownerStreet}, ${step3.ownerCity || ""}, ${step3.ownerState || ""} ${step3.ownerZip || ""}`) : ""}
          ${generateDataRow("Owner Email", step3.ownerEmail || "N/A", true, "email")}
          ${generateDataRow("Owner Phone", step3.ownerPhone || "N/A", true, "phone")}
          ${step3.ownerCitizenshipStatus ? generateDataRow("Owner Citizenship", getCitizenshipLabel(step3.ownerCitizenshipStatus)) : ""}
        ` : ""}
      </table>

      <!-- STEP 4: Beneficiaries -->
      ${generateSectionHeader("Step 4: Beneficiaries")}
      ${beneficiariesHtml}

      <!-- STEP 5: Policy & Riders -->
      ${generateSectionHeader("Step 5: Policy & Riders")}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        ${generateDataRow("Plan Type", getPlanLabel(step5.planName))}
        <tr>
          <td style="padding: 8px 0; color: #6b7280; width: 40%;">Face Amount:</td>
          <td style="padding: 8px 0; color: #111827; font-weight: 700; font-size: 18px;">${formatCurrency(step5.faceAmount)}</td>
        </tr>
        ${step5.termDuration ? generateDataRow("Term Duration", step5.termDuration) : ""}
        ${riders.length > 0 ? generateDataRow("Riders", riders.join(", ")) : ""}
      </table>
      ${step5.ridersChildrenTerm && step5.childrenDetails && step5.childrenDetails.length > 0 ? `
        <div style="background-color: #f9fafb; padding: 10px; border-radius: 6px; margin-bottom: 15px;">
          <p style="margin: 0 0 5px 0; font-weight: 600; color: #1e3a5f;">Children Covered:</p>
          ${step5.childrenDetails.map((child, idx) => `<p style="margin: 2px 0; font-size: 14px; color: #374151;">Child ${idx + 1}: ${child.name || "N/A"} (DOB: ${formatPdfDate(child.dateOfBirth)})</p>`).join("")}
        </div>
      ` : ""}

      <!-- STEP 6: Existing Coverage -->
      ${generateSectionHeader("Step 6: Existing Coverage")}
      ${existingPoliciesHtml}

      <!-- STEP 7: Medical & Lifestyle -->
      ${generateSectionHeader("Step 7: Medical & Lifestyle")}
      ${medicalFlags.length > 0 ? `
        <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; border-radius: 0 4px 4px 0; margin-bottom: 15px;">
          <p style="margin: 0; color: #991b1b; font-weight: 600;">⚠️ Flags Requiring Review:</p>
          <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #991b1b;">
            ${medicalFlags.map(flag => `<li>${flag}</li>`).join("")}
          </ul>
        </div>
        ${step7.usedTobacco && step7.tobaccoLastUsed ? `<p style="color: #374151; font-size: 14px;"><strong>Tobacco Last Used:</strong> ${step7.tobaccoLastUsed}</p>` : ""}
        ${step7.aviationDetails ? `<p style="color: #374151; font-size: 14px;"><strong>Aviation Details:</strong> ${step7.aviationDetails}</p>` : ""}
        ${step7.hazardousSportsDetails ? `<p style="color: #374151; font-size: 14px;"><strong>Hazardous Sports Details:</strong> ${step7.hazardousSportsDetails}</p>` : ""}
        ${step7.foreignTravelDetails ? `<p style="color: #374151; font-size: 14px;"><strong>Foreign Travel Details:</strong> ${step7.foreignTravelDetails}</p>` : ""}
        ${step7.bankruptcyDetails ? `<p style="color: #374151; font-size: 14px;"><strong>Bankruptcy Details:</strong> ${step7.bankruptcyDetails}</p>` : ""}
        ${step7.criminalHistoryDetails ? `<p style="color: #374151; font-size: 14px;"><strong>Criminal History Details:</strong> ${step7.criminalHistoryDetails}</p>` : ""}
        ${step7.drivingViolationsDetails ? `<p style="color: #374151; font-size: 14px;"><strong>Driving Violations Details:</strong> ${step7.drivingViolationsDetails}</p>` : ""}
        ${step7.medicalConditionsDetails ? `<p style="color: #374151; font-size: 14px;"><strong>Medical Conditions Details:</strong> ${step7.medicalConditionsDetails}</p>` : ""}
      ` : `<p style="color: #16a34a; font-weight: 500;">✓ No medical or lifestyle flags</p>`}

      <!-- STEP 8: Premium Payment -->
      ${generateSectionHeader("Step 8: Premium Payment")}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        ${generateDataRow("Payment Method", getPaymentMethodLabel(step8.paymentMethod))}
        ${generateDataRow("Payment Frequency", getPaymentFrequencyLabel(step8.paymentFrequency))}
        ${step8.paymentMethod === "eft" ? `
          ${generateDataRow("Bank Name", step8.bankName || "N/A")}
          ${generateDataRow("Routing Number", formatRoutingNumber(step8.routingNumber))}
          ${generateDataRow("Account Number", formatAccountNumber(step8.accountNumber))}
          ${generateDataRow("Account Type", step8.accountType === "checking" ? "Checking" : step8.accountType === "savings" ? "Savings" : step8.accountType || "N/A")}
        ` : ""}
        ${generateDataRow("Source of Funds", step8.sourceOfFunds === "other" && step8.sourceOfFundsOther ? step8.sourceOfFundsOther : getSourceOfFundsLabel(step8.sourceOfFunds))}
      </table>

      <!-- STEP 9: Signature -->
      ${generateSectionHeader("Step 9: Signature & Acknowledgment")}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        ${generateDataRow("Acknowledgment", step9.acknowledged ? "✓ Confirmed" : "Not confirmed")}
        ${generateDataRow("Electronic Signature", step9.electronicSignature || "N/A")}
        ${generateDataRow("Signature Date", formatPdfDate(step9.signatureDate))}
      </table>

      ${advisorName ? `
      ${generateSectionHeader("Assigned Advisor")}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        ${generateDataRow("Advisor Name", advisorName)}
        ${advisorEmail ? generateDataRow("Advisor Email", advisorEmail, true, "email") : ""}
      </table>
      ` : ""}

      <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; padding: 15px; border-radius: 8px; margin-top: 25px;">
        <p style="margin: 0; color: #0c4a6e; font-size: 14px;">
          <strong>Note:</strong> For security, SSNs and bank account details are partially masked. Full details are available in the admin dashboard.
        </p>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <a href="https://tfawealthplanning.com/admin/applications" style="display: inline-block; background-color: #1e3a5f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">View in Dashboard</a>
      </div>
    </div>
    
    <p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
      © ${new Date().getFullYear()} The Financial Architects. All rights reserved.
    </p>
  </div>
</body>
</html>
  `;
};

const generateApplicantEmail = (data: NotificationDataWithEmail): string => {
  const { applicationId, applicantName, advisorName, advisorEmail } = data;
  const firstName = applicantName.split(" ")[0] || "Valued Customer";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #1e3a5f; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Application Received!</h1>
      <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">The Financial Architects</p>
    </div>
    
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <p style="color: #111827; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Dear ${firstName},
      </p>
      
      <p style="color: #111827; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
        Thank you for submitting your life insurance application with The Financial Architects. We have successfully received your application and our team is reviewing it.
      </p>

      <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 25px 0; border-radius: 0 4px 4px 0;">
        <p style="margin: 0; color: #0c4a6e; font-weight: 600;">Your Reference Number:</p>
        <p style="margin: 5px 0 0 0; color: #0c4a6e; font-family: monospace; font-size: 14px;">${applicationId}</p>
      </div>

      <h2 style="color: #1e3a5f; font-size: 18px; margin: 25px 0 15px 0;">What Happens Next?</h2>
      <ol style="color: #374151; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0 0 25px 0;">
        <li style="margin-bottom: 8px;"><strong>Application Review:</strong> Our underwriting team will review your application within 2-3 business days.</li>
        <li style="margin-bottom: 8px;"><strong>Additional Information:</strong> If we need any additional details, we'll reach out to you directly.</li>
        <li style="margin-bottom: 8px;"><strong>Medical Underwriting:</strong> Depending on your coverage amount, a medical exam may be scheduled.</li>
        <li style="margin-bottom: 8px;"><strong>Policy Issuance:</strong> Once approved, your policy documents will be prepared for delivery.</li>
      </ol>

      ${advisorName ? `
      <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #7c3aed; font-size: 16px; margin: 0 0 10px 0;">Your Assigned Advisor</h3>
        <p style="color: #374151; margin: 0;"><strong>${advisorName}</strong></p>
        ${advisorEmail ? `<p style="margin: 5px 0 0 0;"><a href="mailto:${advisorEmail}" style="color: #7c3aed;">${advisorEmail}</a></p>` : ""}
        <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">Feel free to reach out to your advisor with any questions.</p>
      </div>
      ` : ""}

      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #1e3a5f; font-size: 16px; margin: 0 0 10px 0;">Need Assistance?</h3>
        <p style="color: #374151; font-size: 14px; margin: 0;">
          If you have any questions about your application, please don't hesitate to contact us:
        </p>
        <p style="margin: 10px 0 0 0;">
          <a href="mailto:clients@tfainsuranceadvisors.com" style="color: #2563eb;">clients@tfainsuranceadvisors.com</a>
        </p>
      </div>

      <p style="color: #111827; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
        Thank you for choosing The Financial Architects. We're committed to helping you protect what matters most.
      </p>

      <p style="color: #111827; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
        Warm regards,<br>
        <strong>The Financial Architects Team</strong>
      </p>
    </div>
    
    <p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
      © ${new Date().getFullYear()} The Financial Architects. All rights reserved.<br>
      This email was sent regarding your life insurance application.
    </p>
  </div>
</body>
</html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("send-life-insurance-notification function invoked");
  
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate request data with Zod schema
    const parseResult = notificationRequestSchema.safeParse(rawData);
    
    if (!parseResult.success) {
      console.error("Validation error:", parseResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request data", 
          details: parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    const data: NotificationRequest = parseResult.data;
    console.log("Received notification request for application:", data.applicationId);
    console.log("Form data steps received:", Object.keys(data.formData || {}).join(", "));

    // Fetch advisor email - FIRST try from the application record itself
    let advisorEmail: string | undefined;
    
    // Primary source: Get advisor_email directly from the application record
    // This works for ALL advisors (static and dynamic) since email is stored at submission time
    try {
      console.log("Looking up advisor email from application record:", data.applicationId);
      const { data: appData, error: appError } = await supabaseAdmin
        .from("life_insurance_applications")
        .select("advisor_email")
        .eq("id", data.applicationId)
        .single();
      
      if (appData?.advisor_email && !appError) {
        advisorEmail = appData.advisor_email;
        console.log("Found advisor email from application record:", advisorEmail);
      } else {
        console.log("Application record lookup returned no advisor_email, error:", appError?.message);
      }
    } catch (e) {
      console.error("Error fetching advisor email from application:", e);
    }
    
    // Fallback: Try dynamic_advisors lookup if no email found in application record
    if (!advisorEmail && data.advisorId) {
      console.log("Falling back to dynamic_advisors lookup for ID:", data.advisorId, "Name:", data.advisorName);
      
      // Try UUID lookup first
      try {
        const { data: advisorData, error: advisorError } = await supabaseAdmin
          .from("dynamic_advisors")
          .select("email")
          .eq("id", data.advisorId)
          .single();
        
        if (advisorData?.email && !advisorError) {
          advisorEmail = advisorData.email;
          console.log("Found advisor email via UUID lookup:", advisorEmail);
        } else {
          console.log("UUID lookup failed or returned no email, error:", advisorError?.message);
        }
      } catch (e) {
        console.error("Error in UUID lookup:", e);
      }
      
      // Fallback: try lookup by slug derived from advisorName
      if (!advisorEmail && data.advisorName) {
        const slug = data.advisorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        console.log("Trying slug fallback lookup with slug:", slug);
        
        try {
          const { data: slugData, error: slugError } = await supabaseAdmin
            .from("dynamic_advisors")
            .select("email")
            .eq("slug", slug)
            .single();
          
          if (slugData?.email && !slugError) {
            advisorEmail = slugData.email;
            console.log("Found advisor email via slug lookup:", advisorEmail);
          } else {
            console.log("Slug lookup failed or returned no email, error:", slugError?.message);
          }
        } catch (e) {
          console.error("Error in slug lookup:", e);
        }
      }
      
      if (!advisorEmail) {
        console.warn("Could not find advisor email for ID:", data.advisorId, "Name:", data.advisorName);
      }
    }

    // Create extended data with advisor email for internal use
    const dataWithEmail: NotificationDataWithEmail = { ...data, advisorEmail };

    // Generate PDF attachment
    let pdfBase64: string | null = null;
    try {
      pdfBase64 = generateApplicationPdf(dataWithEmail);
      console.log("PDF generated successfully");
    } catch (pdfError) {
      console.error("Failed to generate PDF:", pdfError);
      // Continue without PDF if generation fails
    }

    const pdfFilename = `TFA_Life_Insurance_Application_${data.applicationId.slice(0, 8).toUpperCase()}.pdf`;
    const emailResults: { recipient: string; success: boolean; error?: string }[] = [];

    // 1. Send notification to admin team (with PDF)
    try {
      console.log("Sending admin notification to:", ADMIN_EMAIL);
      const adminEmailOptions: {
        from: string;
        to: string[];
        subject: string;
        html: string;
        attachments?: { filename: string; content: string }[];
      } = {
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `New Life Insurance Application - ${data.applicantName}`,
        html: generateAdminEmail(dataWithEmail),
      };

      if (pdfBase64) {
        adminEmailOptions.attachments = [
          {
            filename: pdfFilename,
            content: pdfBase64,
          },
        ];
      }

      const adminResult = await resend.emails.send(adminEmailOptions);
      console.log("Admin email sent successfully:", adminResult);
      emailResults.push({ recipient: "admin", success: true });
    } catch (error: unknown) {
      console.error("Failed to send admin email:", error);
      emailResults.push({ recipient: "admin", success: false, error: String(error) });
    }

    // 2. Send notification to advisor (if assigned, with PDF)
    if (advisorEmail) {
      try {
        console.log("Sending advisor notification to:", advisorEmail);
        const advisorEmailOptions: {
          from: string;
          to: string[];
          subject: string;
          html: string;
          attachments?: { filename: string; content: string }[];
        } = {
          from: FROM_EMAIL,
          to: [advisorEmail],
          subject: `New Life Insurance Application Assigned - ${data.applicantName}`,
          html: generateAdminEmail(dataWithEmail),
        };

        if (pdfBase64) {
          advisorEmailOptions.attachments = [
            {
              filename: pdfFilename,
              content: pdfBase64,
            },
          ];
        }

        const advisorResult = await resend.emails.send(advisorEmailOptions);
        console.log("Advisor email sent successfully:", advisorResult);
        emailResults.push({ recipient: "advisor", success: true });
      } catch (error: unknown) {
        console.error("Failed to send advisor email:", error);
        emailResults.push({ recipient: "advisor", success: false, error: String(error) });
      }
    }

    // 3. Send confirmation to applicant (no PDF for privacy)
    try {
      console.log("Sending applicant confirmation to:", data.applicantEmail);
      const applicantResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: [data.applicantEmail],
        subject: "Your Life Insurance Application Has Been Received",
        html: generateApplicantEmail(dataWithEmail),
      });
      console.log("Applicant email sent successfully:", applicantResult);
      emailResults.push({ recipient: "applicant", success: true });
    } catch (error: unknown) {
      console.error("Failed to send applicant email:", error);
      emailResults.push({ recipient: "applicant", success: false, error: String(error) });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Notifications processed",
        results: emailResults,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-life-insurance-notification:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
