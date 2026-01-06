import { jsPDF } from "jspdf";
import type { LifeInsuranceApplication } from "@/hooks/useLifeInsuranceApplications";

const TFA_GOLD = [228, 181, 72] as const;
const TFA_NAVY = [10, 15, 31] as const;
const WHITE = [255, 255, 255] as const;
const LIGHT_GRAY = [248, 248, 248] as const;
const GRAY_TEXT = [100, 100, 100] as const;

interface FormData {
  step1?: Record<string, unknown>;
  step2?: Record<string, unknown>;
  step3?: Record<string, unknown>;
  step4?: Record<string, unknown>;
  step5?: Record<string, unknown>;
  step6?: Record<string, unknown>;
  step7?: Record<string, unknown>;
  step8?: Record<string, unknown>;
  step9?: Record<string, unknown>;
}

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "N/A";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") {
    if (value >= 1000) return `$${value.toLocaleString()}`;
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map((v) => formatValue(v)).join(", ");
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
};

const formatDate = (date: string | undefined): string => {
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

const formatSSN = (ssn?: string): string => {
  if (!ssn) return "N/A";
  const cleaned = ssn.replace(/\D/g, "");
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
  }
  return ssn;
};

const addHeader = (doc: jsPDF, pageWidth: number, margin: number): number => {
  doc.setFillColor(...TFA_NAVY);
  doc.rect(0, 0, pageWidth, 45, "F");

  doc.setTextColor(...TFA_GOLD);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("THE FINANCIAL ARCHITECTS", margin, 22);

  doc.setFontSize(12);
  doc.setTextColor(...WHITE);
  doc.text("Life Insurance Application", margin, 35);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.setFontSize(9);
  doc.text(`Generated: ${today}`, pageWidth - margin, 22, { align: "right" });

  return 55;
};

const addSectionHeader = (
  doc: jsPDF,
  title: string,
  yPos: number,
  margin: number,
  pageWidth: number
): number => {
  doc.setFillColor(...TFA_NAVY);
  doc.rect(margin, yPos, pageWidth - margin * 2, 10, "F");
  doc.setTextColor(...WHITE);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(title.toUpperCase(), margin + 5, yPos + 7);
  return yPos + 15;
};

const addField = (
  doc: jsPDF,
  label: string,
  value: unknown,
  yPos: number,
  margin: number,
  pageWidth: number
): number => {
  const formattedValue = formatValue(value);
  const maxWidth = pageWidth - margin * 2 - 70;
  const splitText = doc.splitTextToSize(formattedValue, maxWidth);
  
  // Calculate space needed: base height + extra lines for wrapped text
  const neededSpace = splitText.length > 1 ? (splitText.length * 5 + 7) : 12;
  
  // Check for page break before rendering each field
  const pageHeight = doc.internal.pageSize.getHeight();
  if (yPos + neededSpace > pageHeight - 30) {
    doc.addPage();
    yPos = addHeader(doc, pageWidth, margin);
  }
  
  doc.setTextColor(...TFA_NAVY);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(label + ":", margin + 5, yPos);
  doc.setFont("helvetica", "bold");
  
  if (splitText.length > 1) {
    doc.text(splitText, margin + 65, yPos);
    return yPos + splitText.length * 5 + 2;
  }
  
  doc.text(formattedValue, pageWidth - margin - 5, yPos, { align: "right" });
  return yPos + 7;
};

const checkPageBreak = (
  doc: jsPDF,
  yPos: number,
  margin: number,
  pageWidth: number,
  neededSpace: number = 40
): number => {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (yPos + neededSpace > pageHeight - 30) {
    doc.addPage();
    return addHeader(doc, pageWidth, margin);
  }
  return yPos;
};

const addFooter = (doc: jsPDF, pageWidth: number): void => {
  const pageHeight = doc.internal.pageSize.getHeight();
  const footerY = pageHeight - 12;

  doc.setDrawColor(200, 200, 200);
  doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);

  doc.setFontSize(8);
  doc.setTextColor(...GRAY_TEXT);
  doc.setFont("helvetica", "normal");
  doc.text(
    "The Financial Architects | (888) 350-5396 | info@tfainsuranceadvisors.com",
    pageWidth / 2,
    footerY,
    { align: "center" }
  );

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...GRAY_TEXT);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 20, footerY, {
      align: "right",
    });
  }
};

export const generateLifeInsurancePdf = (
  application: LifeInsuranceApplication
): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  const formData = application.form_data as FormData;
  let yPos = addHeader(doc, pageWidth, margin);

  // Application Info
  yPos = addSectionHeader(doc, "Application Information", yPos, margin, pageWidth);
  yPos = addField(doc, "Application ID", application.id.slice(0, 8).toUpperCase(), yPos, margin, pageWidth);
  yPos = addField(doc, "Status", application.status.replace(/_/g, " ").toUpperCase(), yPos, margin, pageWidth);
  yPos = addField(doc, "Submitted", formatDate(application.created_at), yPos, margin, pageWidth);
  yPos = addField(doc, "Last Updated", formatDate(application.updated_at), yPos, margin, pageWidth);
  if (application.advisor_name) {
    yPos = addField(doc, "Advisor", application.advisor_name, yPos, margin, pageWidth);
  }
  yPos += 5;

  // Step 1: Proposed Insured
  const step1 = formData.step1 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "1. Proposed Insured Information", yPos, margin, pageWidth);
  yPos = addField(doc, "Full Name", `${step1.firstName || ""} ${step1.middleName || ""} ${step1.lastName || ""}`.trim(), yPos, margin, pageWidth);
  yPos = addField(doc, "Date of Birth", formatDate(step1.dateOfBirth as string), yPos, margin, pageWidth);
  yPos = addField(doc, "Gender", step1.gender, yPos, margin, pageWidth);
  yPos = addField(doc, "SSN", formatSSN(step1.ssn as string), yPos, margin, pageWidth);
  yPos = addField(doc, "Birthplace Country", step1.birthplaceCountry, yPos, margin, pageWidth);
  yPos = addField(doc, "Birthplace State", step1.birthplaceState, yPos, margin, pageWidth);
  // Home Address (correct field names)
  yPos = addField(doc, "Home Address", `${step1.homeStreet || ""}, ${step1.homeCity || ""}, ${step1.homeState || ""} ${step1.homeZip || ""}`, yPos, margin, pageWidth);
  // Mailing Address (if different)
  if (step1.mailingAddressDifferent) {
    yPos = addField(doc, "Mailing Address", `${step1.mailingStreet || ""}, ${step1.mailingCity || ""}, ${step1.mailingState || ""} ${step1.mailingZip || ""}`, yPos, margin, pageWidth);
  }
  // Citizenship (correct field names)
  yPos = addField(doc, "Citizenship Status", step1.citizenshipStatus === "usa" ? "US Citizen" : "Non-US Citizen", yPos, margin, pageWidth);
  if (step1.citizenshipStatus === "other") {
    yPos = addField(doc, "Country of Citizenship", step1.countryOfCitizenship, yPos, margin, pageWidth);
    yPos = addField(doc, "Date of Entry", formatDate(step1.dateOfEntry as string), yPos, margin, pageWidth);
    yPos = addField(doc, "Visa Type", step1.visaType, yPos, margin, pageWidth);
    yPos = addField(doc, "Permanent Resident Card", step1.permanentResidentCard, yPos, margin, pageWidth);
    yPos = addField(doc, "Visa Expiration Date", formatDate(step1.visaExpirationDate as string), yPos, margin, pageWidth);
  }
  // Identity (correct field names)
  yPos = addField(doc, "Driver's License Number", step1.driversLicenseNumber, yPos, margin, pageWidth);
  yPos = addField(doc, "Driver's License State", step1.driversLicenseState, yPos, margin, pageWidth);
  yPos += 5;

  // Step 2: Contact & Employment
  const step2 = formData.step2 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "2. Contact & Employment", yPos, margin, pageWidth);
  yPos = addField(doc, "Mobile Phone", step2.mobilePhone, yPos, margin, pageWidth);
  yPos = addField(doc, "Home Phone", step2.homePhone, yPos, margin, pageWidth);
  yPos = addField(doc, "Work Phone", step2.workPhone, yPos, margin, pageWidth);
  yPos = addField(doc, "Email", step2.email, yPos, margin, pageWidth);
  yPos = addField(doc, "Employer", step2.employerName, yPos, margin, pageWidth);
  yPos = addField(doc, "Occupation", step2.occupation, yPos, margin, pageWidth);
  yPos = addField(doc, "Industry", step2.industry, yPos, margin, pageWidth);
  yPos = addField(doc, "Years Employed", step2.yearsEmployed, yPos, margin, pageWidth);
  yPos = addField(doc, "Job Duties", step2.jobDuties, yPos, margin, pageWidth);
  yPos = addField(doc, "Annual Earned Income", step2.annualEarnedIncome, yPos, margin, pageWidth);
  yPos = addField(doc, "Household Income", step2.householdIncome, yPos, margin, pageWidth);
  yPos = addField(doc, "Net Worth", step2.netWorth, yPos, margin, pageWidth);
  yPos = addField(doc, "Spouse Insurance", step2.spouseInsuranceAmount, yPos, margin, pageWidth);
  yPos = addField(doc, "Parents Insurance", step2.parentsInsuranceAmount, yPos, margin, pageWidth);
  yPos = addField(doc, "Siblings Insurance", step2.siblingsInsuranceAmount, yPos, margin, pageWidth);
  yPos += 5;

  // Step 3: Ownership (correct field names)
  const step3 = formData.step3 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "3. Policy Ownership", yPos, margin, pageWidth);
  yPos = addField(doc, "Insured Is Owner", step3.insuredIsOwner, yPos, margin, pageWidth);
  if (step3.insuredIsOwner === false) {
    yPos = addField(doc, "Owner Type", step3.ownerType, yPos, margin, pageWidth);
    yPos = addField(doc, "Owner Name", step3.ownerName, yPos, margin, pageWidth);
    yPos = addField(doc, "Owner SSN/TIN/EIN", formatSSN(step3.ownerSSN as string), yPos, margin, pageWidth);
    yPos = addField(doc, "Owner Date of Birth", formatDate(step3.ownerDateOfBirth as string), yPos, margin, pageWidth);
    yPos = addField(doc, "Owner Relationship to Insured", step3.ownerRelationshipToInsured, yPos, margin, pageWidth);
    yPos = addField(doc, "Owner Address", `${step3.ownerStreet || ""}, ${step3.ownerCity || ""}, ${step3.ownerState || ""} ${step3.ownerZip || ""}`, yPos, margin, pageWidth);
    yPos = addField(doc, "Owner Email", step3.ownerEmail, yPos, margin, pageWidth);
    yPos = addField(doc, "Owner Phone", step3.ownerPhone, yPos, margin, pageWidth);
    yPos = addField(doc, "Owner Citizenship Status", step3.ownerCitizenshipStatus === "usa" ? "US Citizen" : "Non-US Citizen", yPos, margin, pageWidth);
    if (step3.ownerCitizenshipStatus === "other") {
      yPos = addField(doc, "Owner Country of Citizenship", step3.ownerCountryOfCitizenship, yPos, margin, pageWidth);
    }
    if (step3.ownerType === "trust") {
      yPos = addField(doc, "Trust Date", formatDate(step3.ownerTrustDate as string), yPos, margin, pageWidth);
      yPos = addField(doc, "Trustee Names", step3.trusteeNames, yPos, margin, pageWidth);
    }
  }
  yPos += 5;

  // Step 4: Beneficiaries (correct field names)
  const step4 = formData.step4 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "4. Beneficiaries", yPos, margin, pageWidth);
  const beneficiaries = (step4.beneficiaries || []) as Array<Record<string, unknown>>;
  if (beneficiaries.length > 0) {
    beneficiaries.forEach((ben, idx) => {
      yPos = checkPageBreak(doc, yPos, margin, pageWidth, 50);
      doc.setFillColor(...LIGHT_GRAY);
      doc.rect(margin, yPos - 3, pageWidth - margin * 2, 42, "F");
      doc.setTextColor(...TFA_NAVY);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(`${ben.designation === "primary" ? "Primary" : "Contingent"} Beneficiary ${idx + 1}`, margin + 5, yPos + 3);
      yPos += 8;
      yPos = addField(doc, "Name", ben.fullName, yPos, margin, pageWidth);
      yPos = addField(doc, "Relationship", ben.relationship, yPos, margin, pageWidth);
      yPos = addField(doc, "Share Percentage", `${ben.sharePercentage || 0}%`, yPos, margin, pageWidth);
      yPos = addField(doc, "SSN", formatSSN(ben.ssn as string), yPos, margin, pageWidth);
      yPos = addField(doc, "Date of Birth", formatDate(ben.dateOfBirth as string), yPos, margin, pageWidth);
      if (ben.street || ben.city || ben.state || ben.zip) {
        yPos = addField(doc, "Address", `${ben.street || ""}, ${ben.city || ""}, ${ben.state || ""} ${ben.zip || ""}`, yPos, margin, pageWidth);
      }
      if (ben.phone) yPos = addField(doc, "Phone", ben.phone, yPos, margin, pageWidth);
      if (ben.email) yPos = addField(doc, "Email", ben.email, yPos, margin, pageWidth);
      yPos += 3;
    });
  } else {
    yPos = addField(doc, "Beneficiaries", "None specified", yPos, margin, pageWidth);
  }
  yPos += 5;

  // Step 5: Policy & Riders
  const step5 = formData.step5 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "5. Policy & Riders", yPos, margin, pageWidth);
  yPos = addField(doc, "Plan Name", step5.planName, yPos, margin, pageWidth);
  yPos = addField(doc, "Term Duration", step5.termDuration, yPos, margin, pageWidth);
  yPos = addField(doc, "Face Amount", step5.faceAmount, yPos, margin, pageWidth);
  yPos = addField(doc, "Children's Term Rider", step5.ridersChildrenTerm, yPos, margin, pageWidth);
  yPos = addField(doc, "Waiver of Premium Rider", step5.ridersWaiverOfPremium, yPos, margin, pageWidth);
  yPos = addField(doc, "Accelerated Benefits Rider", step5.ridersAcceleratedBenefits, yPos, margin, pageWidth);
  yPos = addField(doc, "Chronic Illness Rider", step5.ridersChronicIllness, yPos, margin, pageWidth);
  yPos = addField(doc, "Accidental Death Benefit", step5.ridersAccidentalDeath, yPos, margin, pageWidth);
  const childrenDetails = (step5.childrenDetails || []) as Array<Record<string, unknown>>;
  if (childrenDetails.length > 0) {
    childrenDetails.forEach((child, idx) => {
      yPos = checkPageBreak(doc, yPos, margin, pageWidth, 20);
      yPos = addField(doc, `Child ${idx + 1} Name`, child.name, yPos, margin, pageWidth);
      yPos = addField(doc, `Child ${idx + 1} DOB`, child.dateOfBirth, yPos, margin, pageWidth);
    });
  }
  yPos += 5;

  // Step 6: Existing Coverage (correct field names)
  const step6 = formData.step6 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "6. Existing Coverage", yPos, margin, pageWidth);
  yPos = addField(doc, "Has Existing Coverage", step6.hasExistingCoverage, yPos, margin, pageWidth);
  const existingPolicies = (step6.existingPolicies || []) as Array<Record<string, unknown>>;
  if (existingPolicies.length > 0) {
    existingPolicies.forEach((policy, idx) => {
      yPos = checkPageBreak(doc, yPos, margin, pageWidth, 35);
      yPos = addField(doc, `Policy ${idx + 1} Company`, policy.companyName, yPos, margin, pageWidth);
      yPos = addField(doc, `Policy ${idx + 1} Number`, policy.policyNumber, yPos, margin, pageWidth);
      yPos = addField(doc, `Policy ${idx + 1} Coverage Amount`, policy.amountOfCoverage, yPos, margin, pageWidth);
      yPos = addField(doc, `Policy ${idx + 1} Being Replaced`, policy.isBeingReplaced, yPos, margin, pageWidth);
    });
  }
  yPos += 5;

  // Step 7: Medical & Lifestyle
  const step7 = formData.step7 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "7. Medical & Lifestyle History", yPos, margin, pageWidth);
  yPos = addField(doc, "Used Tobacco (Last 5 Years)", step7.usedTobacco, yPos, margin, pageWidth);
  if (step7.usedTobacco) {
    yPos = addField(doc, "Tobacco Type", step7.tobaccoType, yPos, margin, pageWidth);
    yPos = addField(doc, "Tobacco Frequency", step7.tobaccoFrequency, yPos, margin, pageWidth);
    yPos = addField(doc, "Last Used", step7.tobaccoLastUsed, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Pilots Aircraft", step7.aviation, yPos, margin, pageWidth);
  if (step7.aviation) {
    yPos = addField(doc, "Aviation Details", step7.aviationDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Hazardous Sports", step7.hazardousSports, yPos, margin, pageWidth);
  if (step7.hazardousSports) {
    yPos = addField(doc, "Hazardous Sports Details", step7.hazardousSportsDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Foreign Travel Planned", step7.foreignTravel, yPos, margin, pageWidth);
  if (step7.foreignTravel) {
    yPos = addField(doc, "Foreign Travel Details", step7.foreignTravelDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Driving Violations (Last 5 Years)", step7.drivingViolations, yPos, margin, pageWidth);
  if (step7.drivingViolations) {
    yPos = addField(doc, "Driving Violations Details", step7.drivingViolationsDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Bankruptcy Filed", step7.bankruptcy, yPos, margin, pageWidth);
  if (step7.bankruptcy) {
    yPos = addField(doc, "Bankruptcy Details", step7.bankruptcyDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Criminal History", step7.criminalHistory, yPos, margin, pageWidth);
  if (step7.criminalHistory) {
    yPos = addField(doc, "Criminal History Details", step7.criminalHistoryDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Has Medical Conditions", step7.hasMedicalConditions, yPos, margin, pageWidth);
  if (step7.hasMedicalConditions) {
    yPos = addField(doc, "Medical Conditions Details", step7.medicalConditionsDetails, yPos, margin, pageWidth);
  }
  yPos += 5;

  // Step 8: Premium Payment
  const step8 = formData.step8 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "8. Premium Payment", yPos, margin, pageWidth);
  yPos = addField(doc, "Payment Method", step8.paymentMethod, yPos, margin, pageWidth);
  yPos = addField(doc, "Payment Frequency", step8.paymentFrequency, yPos, margin, pageWidth);
  if (step8.paymentMethod === "eft") {
    yPos = addField(doc, "Bank Name", step8.bankName, yPos, margin, pageWidth);
    yPos = addField(doc, "Routing Number", step8.routingNumber ? "****" + String(step8.routingNumber).slice(-4) : "N/A", yPos, margin, pageWidth);
    yPos = addField(doc, "Account Number", step8.accountNumber ? "****" + String(step8.accountNumber).slice(-4) : "N/A", yPos, margin, pageWidth);
    yPos = addField(doc, "Account Type", step8.accountType, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Source of Funds", step8.sourceOfFunds, yPos, margin, pageWidth);
  if (step8.sourceOfFundsOther) {
    yPos = addField(doc, "Source of Funds (Other)", step8.sourceOfFundsOther, yPos, margin, pageWidth);
  }
  yPos += 5;

  // Step 9: Signature
  const step9 = formData.step9 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "9. Acknowledgment & Signature", yPos, margin, pageWidth);
  yPos = addField(doc, "Acknowledged", step9.acknowledged, yPos, margin, pageWidth);
  yPos = addField(doc, "Electronic Signature", step9.electronicSignature, yPos, margin, pageWidth);
  yPos = addField(doc, "Signature Date", formatDate(step9.signatureDate as string), yPos, margin, pageWidth);

  // Add footer to all pages
  addFooter(doc, pageWidth);

  // Save the PDF
  const fileName = `TFA_Life_Insurance_Application_${application.id.slice(0, 8).toUpperCase()}.pdf`;
  doc.save(fileName);
};

export const downloadApplicationPdf = generateLifeInsurancePdf;