import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

interface NotificationRequest {
  applicationId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  advisorName?: string;
  advisorEmail?: string;
  formData: {
    step1?: {
      firstName?: string;
      lastName?: string;
      middleName?: string;
      suffix?: string;
      dateOfBirth?: string;
      gender?: string;
      ssn?: string;
      birthCity?: string;
      birthState?: string;
      birthCountry?: string;
      citizenship?: string;
    };
    step2?: {
      email?: string;
      mobilePhone?: string;
      homePhone?: string;
      address?: string;
      address2?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      mailingAddressDifferent?: boolean;
      mailingAddress?: string;
      mailingCity?: string;
      mailingState?: string;
      mailingZipCode?: string;
      employer?: string;
      occupation?: string;
      employerAddress?: string;
      employerCity?: string;
      employerState?: string;
      employerZipCode?: string;
      annualIncome?: number;
      netWorth?: number;
    };
    step3?: {
      insuredIsOwner?: boolean;
      ownerType?: string;
      ownerFirstName?: string;
      ownerLastName?: string;
      ownerSsn?: string;
      ownerDateOfBirth?: string;
      ownerRelationship?: string;
      trustName?: string;
      trustTaxId?: string;
      trustDate?: string;
      trusteeNames?: string;
      businessName?: string;
      businessTaxId?: string;
      ownerAddress?: string;
      ownerCity?: string;
      ownerState?: string;
      ownerZipCode?: string;
      ownerEmail?: string;
      ownerPhone?: string;
      ownerCitizenship?: string;
    };
    step4?: {
      beneficiaries?: Beneficiary[];
    };
    step5?: {
      planName?: string;
      faceAmount?: number;
      termDuration?: string;
      riders?: string[];
      premiumMode?: string;
    };
    step6?: {
      hasExistingCoverage?: boolean;
      existingPolicies?: ExistingPolicy[];
    };
    step7?: {
      usesTobacco?: boolean;
      tobaccoType?: string;
      tobaccoFrequency?: string;
      tobaccoLastUsed?: string;
      hasAviation?: boolean;
      aviationDetails?: string;
      hasHazardousSports?: boolean;
      hazardousSportsDetails?: string;
      hasForeignTravel?: boolean;
      foreignTravelDetails?: string;
      hasBankruptcy?: boolean;
      bankruptcyDetails?: string;
      hasCriminalHistory?: boolean;
      criminalHistoryDetails?: string;
      hasDrivingViolations?: boolean;
      drivingViolationsDetails?: string;
      hasMedicalConditions?: boolean;
      medicalConditionsDetails?: string;
    };
    step8?: {
      paymentMethod?: string;
      paymentFrequency?: string;
      bankName?: string;
      routingNumber?: string;
      accountNumber?: string;
      accountType?: string;
      sourceOfFunds?: string;
      sourceOfFundsOther?: string;
    };
    step9?: {
      acknowledgment?: boolean;
      electronicSignature?: string;
      signatureDate?: string;
    };
    [key: string]: unknown;
  };
}

const ADMIN_EMAIL = "leads@tfainsuranceadvisors.com";
const FROM_EMAIL = "The Financial Architects <noreply@tfainsuranceadvisors.com>";

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
        <a href="https://supabase.com/dashboard/project/cstkeblqqyjwlrbppucu/editor" style="display: inline-block; background-color: #1e3a5f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">View in Dashboard</a>
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
    const data: NotificationRequest = await req.json();
    console.log("Received notification request for application:", data.applicationId);
    console.log("Form data steps received:", Object.keys(data.formData || {}).join(", "));

    const emailResults: { recipient: string; success: boolean; error?: string }[] = [];

    // 1. Send notification to admin team
    try {
      console.log("Sending admin notification to:", ADMIN_EMAIL);
      const adminResult = await resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `New Life Insurance Application - ${data.applicantName}`,
        html: generateAdminEmail(data),
      });
      console.log("Admin email sent successfully:", adminResult);
      emailResults.push({ recipient: "admin", success: true });
    } catch (error: unknown) {
      console.error("Failed to send admin email:", error);
      emailResults.push({ recipient: "admin", success: false, error: String(error) });
    }

    // 2. Send notification to advisor (if assigned)
    if (data.advisorEmail) {
      try {
        console.log("Sending advisor notification to:", data.advisorEmail);
        const advisorResult = await resend.emails.send({
          from: FROM_EMAIL,
          to: [data.advisorEmail],
          subject: `New Life Insurance Application - ${data.applicantName}`,
          html: generateAdminEmail(data),
        });
        console.log("Advisor email sent successfully:", advisorResult);
        emailResults.push({ recipient: "advisor", success: true });
      } catch (error: unknown) {
        console.error("Failed to send advisor email:", error);
        emailResults.push({ recipient: "advisor", success: false, error: String(error) });
      }
    }

    // 3. Send confirmation to applicant
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
      JSON.stringify({ success: true, results: emailResults }),
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
