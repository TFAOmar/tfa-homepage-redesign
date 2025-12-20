import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import jsPDF from "https://esm.sh/jspdf@2.5.1?bundle";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zod validation schemas
const beneficiarySchema = z.object({
  fullName: z.string().max(200).optional(),
  relationship: z.string().max(100).optional(),
  sharePercentage: z.number().min(0).max(100).optional(),
  designation: z.string().max(50).optional(),
  ssn: z.string().max(20).optional(),
  dateOfBirth: z.string().max(20).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().email().max(255).optional().or(z.literal("")),
}).passthrough();

const existingPolicySchema = z.object({
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
  advisorName: z.string().max(200).optional(),
  advisorEmail: z.string().email().max(255).optional().or(z.literal("")),
  formData: z.object({
    step1: z.object({
      firstName: z.string().max(100).optional(),
      lastName: z.string().max(100).optional(),
      middleName: z.string().max(100).optional(),
      suffix: z.string().max(20).optional(),
      dateOfBirth: z.string().max(20).optional(),
      gender: z.string().max(20).optional(),
      ssn: z.string().max(20).optional(),
      birthCity: z.string().max(100).optional(),
      birthState: z.string().max(100).optional(),
      birthCountry: z.string().max(100).optional(),
      citizenship: z.string().max(100).optional(),
    }).passthrough().optional(),
    step2: z.object({
      email: z.string().email().max(255).optional().or(z.literal("")),
      mobilePhone: z.string().max(30).optional(),
      homePhone: z.string().max(30).optional(),
      address: z.string().max(300).optional(),
      address2: z.string().max(300).optional(),
      city: z.string().max(100).optional(),
      state: z.string().max(100).optional(),
      zipCode: z.string().max(20).optional(),
      mailingAddressDifferent: z.boolean().optional(),
      mailingAddress: z.string().max(300).optional(),
      mailingCity: z.string().max(100).optional(),
      mailingState: z.string().max(100).optional(),
      mailingZipCode: z.string().max(20).optional(),
      employer: z.string().max(200).optional(),
      occupation: z.string().max(200).optional(),
      employerAddress: z.string().max(300).optional(),
      employerCity: z.string().max(100).optional(),
      employerState: z.string().max(100).optional(),
      employerZipCode: z.string().max(20).optional(),
      annualIncome: z.number().optional(),
      netWorth: z.number().optional(),
    }).passthrough().optional(),
    step3: z.object({
      insuredIsOwner: z.boolean().optional(),
      ownerType: z.string().max(50).optional(),
      ownerFirstName: z.string().max(100).optional(),
      ownerLastName: z.string().max(100).optional(),
      ownerSsn: z.string().max(20).optional(),
      ownerDateOfBirth: z.string().max(20).optional(),
      ownerRelationship: z.string().max(100).optional(),
      trustName: z.string().max(200).optional(),
      trustTaxId: z.string().max(20).optional(),
      trustDate: z.string().max(20).optional(),
      trusteeNames: z.string().max(500).optional(),
      businessName: z.string().max(200).optional(),
      businessTaxId: z.string().max(20).optional(),
      ownerAddress: z.string().max(300).optional(),
      ownerCity: z.string().max(100).optional(),
      ownerState: z.string().max(100).optional(),
      ownerZipCode: z.string().max(20).optional(),
      ownerEmail: z.string().email().max(255).optional().or(z.literal("")),
      ownerPhone: z.string().max(30).optional(),
      ownerCitizenship: z.string().max(100).optional(),
    }).passthrough().optional(),
    step4: z.object({
      beneficiaries: z.array(beneficiarySchema).optional(),
    }).passthrough().optional(),
    step5: z.object({
      planName: z.string().max(100).optional(),
      faceAmount: z.number().optional(),
      termDuration: z.string().max(50).optional(),
      riders: z.array(z.string().max(100)).optional(),
      premiumMode: z.string().max(50).optional(),
    }).passthrough().optional(),
    step6: z.object({
      hasExistingCoverage: z.boolean().optional(),
      existingPolicies: z.array(existingPolicySchema).optional(),
    }).passthrough().optional(),
    step7: z.object({
      usesTobacco: z.boolean().optional(),
      tobaccoType: z.string().max(100).optional(),
      tobaccoFrequency: z.string().max(100).optional(),
      tobaccoLastUsed: z.string().max(100).optional(),
      hasAviation: z.boolean().optional(),
      aviationDetails: z.string().max(1000).optional(),
      hasHazardousSports: z.boolean().optional(),
      hazardousSportsDetails: z.string().max(1000).optional(),
      hasForeignTravel: z.boolean().optional(),
      foreignTravelDetails: z.string().max(1000).optional(),
      hasBankruptcy: z.boolean().optional(),
      bankruptcyDetails: z.string().max(1000).optional(),
      hasCriminalHistory: z.boolean().optional(),
      criminalHistoryDetails: z.string().max(1000).optional(),
      hasDrivingViolations: z.boolean().optional(),
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
      acknowledgment: z.boolean().optional(),
      electronicSignature: z.string().max(200).optional(),
      signatureDate: z.string().max(20).optional(),
    }).passthrough().optional(),
  }).passthrough(),
});

// Infer types from Zod schema
type NotificationRequest = z.infer<typeof notificationRequestSchema>;

interface Beneficiary {
  fullName?: string;
  relationship?: string;
  sharePercentage?: number;
  designation?: string;
  ssn?: string;
  dateOfBirth?: string;
  phone?: string;
  email?: string;
}

interface ExistingPolicy {
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

const maskAccountNumber = (accountNum?: string): string => {
  if (!accountNum) return "N/A";
  const cleaned = accountNum.replace(/\D/g, "");
  if (cleaned.length >= 4) {
    return `****${cleaned.slice(-4)}`;
  }
  return "****";
};

const maskRoutingNumber = (routingNum?: string): string => {
  if (!routingNum) return "N/A";
  return "***masked***";
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
    "direct-bill": "Direct Bill / Check",
  };
  return method ? labels[method] || method : "N/A";
};

const getSourceOfFundsLabel = (source?: string): string => {
  const labels: Record<string, string> = {
    employment: "Employment Income",
    savings: "Savings",
    investments: "Investments",
    retirement: "Retirement Funds",
    inheritance: "Inheritance",
    other: "Other",
  };
  return source ? labels[source] || source : "N/A";
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

  doc.setTextColor(TEXT_GRAY[0], TEXT_GRAY[1], TEXT_GRAY[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`${label}:`, margin, yPos);

  doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
  doc.setFont("helvetica", "bold");

  // Handle text wrapping for long values
  const lines = doc.splitTextToSize(value, valueWidth);
  doc.text(lines, margin + labelWidth, yPos);

  return yPos + Math.max(lines.length * 5, 7);
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

const generateApplicationPdf = (data: NotificationRequest): string => {
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
  yPos = addPdfField(doc, "SSN", maskSSN(step1.ssn), yPos, margin, pageWidth);
  const birthPlace = step1.birthCity ? `${step1.birthCity}, ${step1.birthState || ""} ${step1.birthCountry || ""}` : "N/A";
  yPos = addPdfField(doc, "Birth Place", birthPlace.trim(), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Citizenship", formatPdfValue(step1.citizenship), yPos, margin, pageWidth);
  yPos += 5;

  // ============ STEP 2: Contact & Employment ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 60);
  yPos = addPdfSectionHeader(doc, "STEP 2: CONTACT & EMPLOYMENT", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Email", formatPdfValue(step2.email), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Mobile Phone", formatPdfValue(step2.mobilePhone || applicantPhone), yPos, margin, pageWidth);
  if (step2.homePhone) {
    yPos = addPdfField(doc, "Home Phone", formatPdfValue(step2.homePhone), yPos, margin, pageWidth);
  }
  const address = step2.address ? `${step2.address}${step2.address2 ? ", " + step2.address2 : ""}, ${step2.city}, ${step2.state} ${step2.zipCode}` : "N/A";
  yPos = addPdfField(doc, "Address", address, yPos, margin, pageWidth);
  if (step2.mailingAddressDifferent) {
    const mailAddr = `${step2.mailingAddress}, ${step2.mailingCity}, ${step2.mailingState} ${step2.mailingZipCode}`;
    yPos = addPdfField(doc, "Mailing Address", mailAddr, yPos, margin, pageWidth);
  }
  yPos = addPdfField(doc, "Employer", formatPdfValue(step2.employer), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Occupation", formatPdfValue(step2.occupation), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Annual Income", formatCurrency(step2.annualIncome), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Net Worth", formatCurrency(step2.netWorth), yPos, margin, pageWidth);
  yPos += 5;

  // ============ STEP 3: Ownership ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 50);
  yPos = addPdfSectionHeader(doc, "STEP 3: OWNERSHIP", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Insured is Owner", step3.insuredIsOwner ? "Yes" : "No", yPos, margin, pageWidth);
  
  if (!step3.insuredIsOwner) {
    const ownerTypeLabel = step3.ownerType === "individual" ? "Individual" : step3.ownerType === "trust" ? "Trust" : step3.ownerType === "business" ? "Business" : "N/A";
    yPos = addPdfField(doc, "Owner Type", ownerTypeLabel, yPos, margin, pageWidth);
    
    if (step3.ownerType === "individual") {
      const ownerName = `${step3.ownerFirstName || ""} ${step3.ownerLastName || ""}`.trim() || "N/A";
      yPos = addPdfField(doc, "Owner Name", ownerName, yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Owner SSN", maskSSN(step3.ownerSsn), yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Owner DOB", formatPdfDate(step3.ownerDateOfBirth), yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Relationship", formatPdfValue(step3.ownerRelationship), yPos, margin, pageWidth);
    } else if (step3.ownerType === "trust") {
      yPos = addPdfField(doc, "Trust Name", formatPdfValue(step3.trustName), yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Trust Tax ID", step3.trustTaxId ? maskSSN(step3.trustTaxId) : "N/A", yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Trust Date", formatPdfDate(step3.trustDate), yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Trustee Names", formatPdfValue(step3.trusteeNames), yPos, margin, pageWidth);
    } else if (step3.ownerType === "business") {
      yPos = addPdfField(doc, "Business Name", formatPdfValue(step3.businessName), yPos, margin, pageWidth);
      yPos = addPdfField(doc, "Business Tax ID", step3.businessTaxId ? maskSSN(step3.businessTaxId) : "N/A", yPos, margin, pageWidth);
    }
    
    if (step3.ownerAddress) {
      const ownerAddr = `${step3.ownerAddress}, ${step3.ownerCity}, ${step3.ownerState} ${step3.ownerZipCode}`;
      yPos = addPdfField(doc, "Owner Address", ownerAddr, yPos, margin, pageWidth);
    }
    if (step3.ownerEmail) {
      yPos = addPdfField(doc, "Owner Email", formatPdfValue(step3.ownerEmail), yPos, margin, pageWidth);
    }
    if (step3.ownerPhone) {
      yPos = addPdfField(doc, "Owner Phone", formatPdfValue(step3.ownerPhone), yPos, margin, pageWidth);
    }
  }
  yPos += 5;

  // ============ STEP 4: Beneficiaries ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 50);
  yPos = addPdfSectionHeader(doc, "STEP 4: BENEFICIARIES", yPos, margin, pageWidth);
  
  if (step4.beneficiaries && step4.beneficiaries.length > 0) {
    step4.beneficiaries.forEach((b: Beneficiary, index: number) => {
      yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 35);
      
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
        yPos = addPdfField(doc, "SSN", maskSSN(b.ssn), yPos, margin, pageWidth);
      }
      if (b.dateOfBirth) {
        yPos = addPdfField(doc, "Date of Birth", formatPdfDate(b.dateOfBirth), yPos, margin, pageWidth);
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
  yPos = addPdfField(doc, "Premium Mode", getPaymentFrequencyLabel(step5.premiumMode), yPos, margin, pageWidth);
  if (step5.riders && step5.riders.length > 0) {
    yPos = addPdfField(doc, "Riders", step5.riders.join(", "), yPos, margin, pageWidth);
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
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 60);
  yPos = addPdfSectionHeader(doc, "STEP 7: MEDICAL & LIFESTYLE", yPos, margin, pageWidth);
  
  const medicalFlags: string[] = [];
  if (step7.usesTobacco) medicalFlags.push(`Tobacco Use: ${step7.tobaccoType || "Yes"}`);
  if (step7.hasAviation) medicalFlags.push("Aviation Activities");
  if (step7.hasHazardousSports) medicalFlags.push("Hazardous Sports");
  if (step7.hasForeignTravel) medicalFlags.push("Foreign Travel");
  if (step7.hasBankruptcy) medicalFlags.push("Bankruptcy History");
  if (step7.hasCriminalHistory) medicalFlags.push("Criminal History");
  if (step7.hasDrivingViolations) medicalFlags.push("Driving Violations");
  if (step7.hasMedicalConditions) medicalFlags.push("Medical Conditions");

  if (medicalFlags.length > 0) {
    // Warning box
    doc.setFillColor(254, 242, 242);
    doc.rect(margin, yPos, pageWidth - margin * 2, 10 + medicalFlags.length * 6, "F");
    doc.setDrawColor(239, 68, 68);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin, yPos + 10 + medicalFlags.length * 6);
    
    doc.setTextColor(153, 27, 27);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("FLAGS REQUIRING REVIEW:", margin + 4, yPos + 7);
    
    doc.setFont("helvetica", "normal");
    medicalFlags.forEach((flag, idx) => {
      doc.text(`• ${flag}`, margin + 8, yPos + 14 + idx * 6);
    });
    yPos += 15 + medicalFlags.length * 6;
    
    // Add details if present
    if (step7.tobaccoLastUsed) {
      yPos = addPdfField(doc, "Tobacco Last Used", formatPdfValue(step7.tobaccoLastUsed), yPos, margin, pageWidth);
    }
    if (step7.aviationDetails) {
      yPos = addPdfField(doc, "Aviation Details", formatPdfValue(step7.aviationDetails), yPos, margin, pageWidth);
    }
    if (step7.hazardousSportsDetails) {
      yPos = addPdfField(doc, "Hazardous Sports", formatPdfValue(step7.hazardousSportsDetails), yPos, margin, pageWidth);
    }
    if (step7.foreignTravelDetails) {
      yPos = addPdfField(doc, "Foreign Travel", formatPdfValue(step7.foreignTravelDetails), yPos, margin, pageWidth);
    }
    if (step7.medicalConditionsDetails) {
      yPos = addPdfField(doc, "Medical Conditions", formatPdfValue(step7.medicalConditionsDetails), yPos, margin, pageWidth);
    }
  } else {
    doc.setTextColor(22, 163, 74);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("No medical or lifestyle flags", margin, yPos);
    yPos += 7;
  }
  yPos += 5;

  // ============ STEP 8: Premium Payment ============
  yPos = checkPdfPageBreak(doc, yPos, margin, pageWidth, 50);
  yPos = addPdfSectionHeader(doc, "STEP 8: PREMIUM PAYMENT", yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Payment Method", getPaymentMethodLabel(step8.paymentMethod), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Payment Frequency", getPaymentFrequencyLabel(step8.paymentFrequency), yPos, margin, pageWidth);
  
  if (step8.paymentMethod === "eft") {
    yPos = addPdfField(doc, "Bank Name", formatPdfValue(step8.bankName), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Routing Number", maskRoutingNumber(step8.routingNumber), yPos, margin, pageWidth);
    yPos = addPdfField(doc, "Account Number", maskAccountNumber(step8.accountNumber), yPos, margin, pageWidth);
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
  yPos = addPdfField(doc, "Acknowledgment", step9.acknowledgment ? "Confirmed" : "Not confirmed", yPos, margin, pageWidth);
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

const generateAdminEmail = (data: NotificationRequest): string => {
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
        ${b.dateOfBirth ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: #374151;"><strong>DOB:</strong> ${b.dateOfBirth}</p>` : ""}
        ${b.email ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: #374151;"><strong>Email:</strong> ${b.email}</p>` : ""}
        ${b.phone ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: #374151;"><strong>Phone:</strong> ${b.phone}</p>` : ""}
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

  // Build medical/lifestyle flags
  const medicalFlags: string[] = [];
  if (step7.usesTobacco) medicalFlags.push(`Tobacco Use: ${step7.tobaccoType || "Yes"} (${step7.tobaccoFrequency || "N/A"})`);
  if (step7.hasAviation) medicalFlags.push("Aviation Activities");
  if (step7.hasHazardousSports) medicalFlags.push("Hazardous Sports");
  if (step7.hasForeignTravel) medicalFlags.push("Foreign Travel");
  if (step7.hasBankruptcy) medicalFlags.push("Bankruptcy History");
  if (step7.hasCriminalHistory) medicalFlags.push("Criminal History");
  if (step7.hasDrivingViolations) medicalFlags.push("Driving Violations");
  if (step7.hasMedicalConditions) medicalFlags.push("Medical Conditions");

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
        ${generateDataRow("Date of Birth", step1.dateOfBirth || "N/A")}
        ${generateDataRow("Gender", step1.gender || "N/A")}
        ${generateDataRow("SSN", maskSSN(step1.ssn))}
        ${generateDataRow("Birth Place", step1.birthCity ? `${step1.birthCity}, ${step1.birthState || ""} ${step1.birthCountry || ""}` : "N/A")}
        ${generateDataRow("Citizenship", step1.citizenship || "N/A")}
      </table>

      <!-- STEP 2: Contact & Employment -->
      ${generateSectionHeader("Step 2: Contact & Employment")}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        ${generateDataRow("Email", step2.email || "N/A", true, "email")}
        ${generateDataRow("Mobile Phone", step2.mobilePhone || applicantPhone || "N/A", true, "phone")}
        ${step2.homePhone ? generateDataRow("Home Phone", step2.homePhone, true, "phone") : ""}
        ${generateDataRow("Address", step2.address ? `${step2.address}${step2.address2 ? ", " + step2.address2 : ""}, ${step2.city}, ${step2.state} ${step2.zipCode}` : "N/A")}
        ${step2.mailingAddressDifferent ? generateDataRow("Mailing Address", `${step2.mailingAddress}, ${step2.mailingCity}, ${step2.mailingState} ${step2.mailingZipCode}`) : ""}
        ${generateDataRow("Employer", step2.employer || "N/A")}
        ${generateDataRow("Occupation", step2.occupation || "N/A")}
        ${step2.employerAddress ? generateDataRow("Employer Address", `${step2.employerAddress}, ${step2.employerCity}, ${step2.employerState} ${step2.employerZipCode}`) : ""}
        ${generateDataRow("Annual Income", formatCurrency(step2.annualIncome))}
        ${generateDataRow("Net Worth", formatCurrency(step2.netWorth))}
      </table>

      <!-- STEP 3: Ownership -->
      ${generateSectionHeader("Step 3: Ownership")}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        ${generateDataRow("Insured is Owner", step3.insuredIsOwner ? "Yes" : "No")}
        ${!step3.insuredIsOwner ? `
          ${generateDataRow("Owner Type", step3.ownerType === "individual" ? "Individual" : step3.ownerType === "trust" ? "Trust" : step3.ownerType === "business" ? "Business" : "N/A")}
          ${step3.ownerType === "individual" ? `
            ${generateDataRow("Owner Name", `${step3.ownerFirstName || ""} ${step3.ownerLastName || ""}`.trim() || "N/A")}
            ${generateDataRow("Owner SSN", maskSSN(step3.ownerSsn))}
            ${generateDataRow("Owner DOB", step3.ownerDateOfBirth || "N/A")}
            ${generateDataRow("Relationship", step3.ownerRelationship || "N/A")}
          ` : ""}
          ${step3.ownerType === "trust" ? `
            ${generateDataRow("Trust Name", step3.trustName || "N/A")}
            ${generateDataRow("Trust Tax ID", step3.trustTaxId ? maskSSN(step3.trustTaxId) : "N/A")}
            ${generateDataRow("Trust Date", step3.trustDate || "N/A")}
            ${generateDataRow("Trustee Names", step3.trusteeNames || "N/A")}
          ` : ""}
          ${step3.ownerType === "business" ? `
            ${generateDataRow("Business Name", step3.businessName || "N/A")}
            ${generateDataRow("Business Tax ID", step3.businessTaxId ? maskSSN(step3.businessTaxId) : "N/A")}
          ` : ""}
          ${generateDataRow("Owner Address", step3.ownerAddress ? `${step3.ownerAddress}, ${step3.ownerCity}, ${step3.ownerState} ${step3.ownerZipCode}` : "N/A")}
          ${generateDataRow("Owner Email", step3.ownerEmail || "N/A", true, "email")}
          ${generateDataRow("Owner Phone", step3.ownerPhone || "N/A", true, "phone")}
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
        ${generateDataRow("Premium Mode", getPaymentFrequencyLabel(step5.premiumMode))}
        ${step5.riders && step5.riders.length > 0 ? generateDataRow("Riders", step5.riders.join(", ")) : ""}
      </table>

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
        ${step7.usesTobacco && step7.tobaccoLastUsed ? `<p style="color: #374151; font-size: 14px;"><strong>Tobacco Last Used:</strong> ${step7.tobaccoLastUsed}</p>` : ""}
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
          ${generateDataRow("Routing Number", maskRoutingNumber(step8.routingNumber))}
          ${generateDataRow("Account Number", maskAccountNumber(step8.accountNumber))}
          ${generateDataRow("Account Type", step8.accountType === "checking" ? "Checking" : step8.accountType === "savings" ? "Savings" : step8.accountType || "N/A")}
        ` : ""}
        ${generateDataRow("Source of Funds", step8.sourceOfFunds === "other" && step8.sourceOfFundsOther ? step8.sourceOfFundsOther : getSourceOfFundsLabel(step8.sourceOfFunds))}
      </table>

      <!-- STEP 9: Signature -->
      ${generateSectionHeader("Step 9: Signature & Acknowledgment")}
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        ${generateDataRow("Acknowledgment", step9.acknowledgment ? "✓ Confirmed" : "Not confirmed")}
        ${generateDataRow("Electronic Signature", step9.electronicSignature || "N/A")}
        ${generateDataRow("Signature Date", step9.signatureDate || "N/A")}
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

const generateApplicantEmail = (data: NotificationRequest): string => {
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

    // Generate PDF attachment
    let pdfBase64: string | null = null;
    try {
      pdfBase64 = generateApplicationPdf(data);
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
        html: generateAdminEmail(data),
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
    if (data.advisorEmail) {
      try {
        console.log("Sending advisor notification to:", data.advisorEmail);
        const advisorEmailOptions: {
          from: string;
          to: string[];
          subject: string;
          html: string;
          attachments?: { filename: string; content: string }[];
        } = {
          from: FROM_EMAIL,
          to: [data.advisorEmail],
          subject: `New Life Insurance Application - ${data.applicantName}`,
          html: generateAdminEmail(data),
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

    // 3. Send confirmation to applicant (NO PDF for security)
    if (data.applicantEmail) {
      try {
        console.log("Sending confirmation to applicant:", data.applicantEmail);
        const applicantResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: [data.applicantEmail],
          subject: "Your Life Insurance Application Has Been Received",
          html: generateApplicantEmail(data),
        });
        console.log("Applicant email sent successfully:", applicantResult);
        emailResults.push({ recipient: "applicant", success: true });
      } catch (error: unknown) {
        console.error("Failed to send applicant email:", error);
        emailResults.push({ recipient: "applicant", success: false, error: String(error) });
      }
    }

    console.log("Email notification results:", emailResults);

    return new Response(
      JSON.stringify({ success: true, results: emailResults, pdfGenerated: !!pdfBase64 }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-life-insurance-notification function:", error);
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
