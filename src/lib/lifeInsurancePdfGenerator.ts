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
  doc.setTextColor(...TFA_NAVY);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(label + ":", margin + 5, yPos);
  doc.setFont("helvetica", "bold");
  
  const formattedValue = formatValue(value);
  const maxWidth = pageWidth - margin * 2 - 70;
  const splitText = doc.splitTextToSize(formattedValue, maxWidth);
  
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
  yPos = addField(doc, "SSN", step1.ssn ? "***-**-" + String(step1.ssn).slice(-4) : "N/A", yPos, margin, pageWidth);
  yPos = addField(doc, "Address", `${step1.streetAddress || ""}, ${step1.city || ""}, ${step1.state || ""} ${step1.zipCode || ""}`, yPos, margin, pageWidth);
  yPos = addField(doc, "US Citizen", step1.isUSCitizen, yPos, margin, pageWidth);
  yPos = addField(doc, "ID Type", step1.idType, yPos, margin, pageWidth);
  yPos = addField(doc, "ID Number", step1.idNumber, yPos, margin, pageWidth);
  yPos += 5;

  // Step 2: Contact & Employment
  const step2 = formData.step2 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "2. Contact & Employment", yPos, margin, pageWidth);
  yPos = addField(doc, "Primary Phone", step2.primaryPhone, yPos, margin, pageWidth);
  yPos = addField(doc, "Email", step2.email, yPos, margin, pageWidth);
  yPos = addField(doc, "Employment Status", step2.employmentStatus, yPos, margin, pageWidth);
  yPos = addField(doc, "Employer", step2.employerName, yPos, margin, pageWidth);
  yPos = addField(doc, "Occupation", step2.occupation, yPos, margin, pageWidth);
  yPos = addField(doc, "Annual Income", step2.annualIncome, yPos, margin, pageWidth);
  yPos = addField(doc, "Net Worth", step2.netWorth, yPos, margin, pageWidth);
  yPos += 5;

  // Step 3: Ownership
  const step3 = formData.step3 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "3. Policy Ownership", yPos, margin, pageWidth);
  yPos = addField(doc, "Owner Same as Insured", step3.ownerSameAsInsured, yPos, margin, pageWidth);
  if (step3.ownerSameAsInsured === false) {
    yPos = addField(doc, "Owner Name", `${step3.ownerFirstName || ""} ${step3.ownerLastName || ""}`.trim(), yPos, margin, pageWidth);
    yPos = addField(doc, "Owner Relationship", step3.ownerRelationship, yPos, margin, pageWidth);
    yPos = addField(doc, "Owner SSN", step3.ownerSSN ? "***-**-" + String(step3.ownerSSN).slice(-4) : "N/A", yPos, margin, pageWidth);
  }
  yPos += 5;

  // Step 4: Beneficiaries
  const step4 = formData.step4 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "4. Beneficiaries", yPos, margin, pageWidth);
  const beneficiaries = (step4.beneficiaries || []) as Array<Record<string, unknown>>;
  if (beneficiaries.length > 0) {
    beneficiaries.forEach((ben, idx) => {
      yPos = checkPageBreak(doc, yPos, margin, pageWidth, 30);
      doc.setFillColor(...LIGHT_GRAY);
      doc.rect(margin, yPos - 3, pageWidth - margin * 2, 22, "F");
      doc.setTextColor(...TFA_NAVY);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(`${ben.type === "primary" ? "Primary" : "Contingent"} Beneficiary ${idx + 1}`, margin + 5, yPos + 3);
      yPos += 8;
      yPos = addField(doc, "Name", `${ben.firstName || ""} ${ben.lastName || ""}`, yPos, margin, pageWidth);
      yPos = addField(doc, "Relationship", ben.relationship, yPos, margin, pageWidth);
      yPos = addField(doc, "Percentage", `${ben.percentage || 0}%`, yPos, margin, pageWidth);
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
  yPos = addField(doc, "Plan Type", step5.planType, yPos, margin, pageWidth);
  yPos = addField(doc, "Face Amount", step5.faceAmount, yPos, margin, pageWidth);
  yPos = addField(doc, "Accelerated Death Benefit", step5.acceleratedDeathBenefit, yPos, margin, pageWidth);
  yPos = addField(doc, "Waiver of Premium", step5.waiverOfPremium, yPos, margin, pageWidth);
  yPos = addField(doc, "Term Rider", step5.termRider, yPos, margin, pageWidth);
  yPos = addField(doc, "Child Rider", step5.childRider, yPos, margin, pageWidth);
  yPos += 5;

  // Step 6: Existing Coverage
  const step6 = formData.step6 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "6. Existing Coverage", yPos, margin, pageWidth);
  yPos = addField(doc, "Has Existing Insurance", step6.hasExistingInsurance, yPos, margin, pageWidth);
  yPos = addField(doc, "Replacing Coverage", step6.replacingCoverage, yPos, margin, pageWidth);
  const existingPolicies = (step6.existingPolicies || []) as Array<Record<string, unknown>>;
  if (existingPolicies.length > 0) {
    existingPolicies.forEach((policy, idx) => {
      yPos = checkPageBreak(doc, yPos, margin, pageWidth, 25);
      yPos = addField(doc, `Policy ${idx + 1} Company`, policy.company, yPos, margin, pageWidth);
      yPos = addField(doc, `Policy ${idx + 1} Amount`, policy.faceAmount, yPos, margin, pageWidth);
      yPos = addField(doc, `Policy ${idx + 1} Type`, policy.policyType, yPos, margin, pageWidth);
    });
  }
  yPos += 5;

  // Step 7: Medical & Lifestyle
  const step7 = formData.step7 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "7. Medical & Lifestyle History", yPos, margin, pageWidth);
  yPos = addField(doc, "Tobacco Use", step7.tobaccoUse, yPos, margin, pageWidth);
  if (step7.tobaccoUse) {
    yPos = addField(doc, "Tobacco Type", step7.tobaccoType, yPos, margin, pageWidth);
    yPos = addField(doc, "Last Used", step7.tobaccoLastUsed, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Hazardous Activities", step7.hazardousActivities, yPos, margin, pageWidth);
  yPos = addField(doc, "Criminal History", step7.criminalHistory, yPos, margin, pageWidth);
  yPos = addField(doc, "Bankruptcy", step7.bankruptcy, yPos, margin, pageWidth);
  yPos = addField(doc, "Medical Conditions", step7.medicalConditions, yPos, margin, pageWidth);
  yPos += 5;

  // Step 8: Premium Payment
  const step8 = formData.step8 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "8. Premium Payment", yPos, margin, pageWidth);
  yPos = addField(doc, "Payment Method", step8.paymentMethod, yPos, margin, pageWidth);
  yPos = addField(doc, "Payment Frequency", step8.paymentFrequency, yPos, margin, pageWidth);
  yPos = addField(doc, "Bank Name", step8.bankName, yPos, margin, pageWidth);
  yPos = addField(doc, "Account Type", step8.accountType, yPos, margin, pageWidth);
  yPos = addField(doc, "Source of Funds", step8.sourceOfFunds, yPos, margin, pageWidth);
  yPos += 5;

  // Step 9: Signature
  const step9 = formData.step9 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "9. Acknowledgment & Signature", yPos, margin, pageWidth);
  yPos = addField(doc, "Acknowledgments Accepted", step9.acknowledgments, yPos, margin, pageWidth);
  yPos = addField(doc, "Electronic Signature", step9.electronicSignature, yPos, margin, pageWidth);
  yPos = addField(doc, "Signature Date", formatDate(step9.signatureDate as string), yPos, margin, pageWidth);

  // Add footer to all pages
  addFooter(doc, pageWidth);

  // Save the PDF
  const fileName = `TFA_Life_Insurance_Application_${application.id.slice(0, 8).toUpperCase()}.pdf`;
  doc.save(fileName);
};

export const downloadApplicationPdf = generateLifeInsurancePdf;
