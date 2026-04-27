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

  // Top-level safety wrapper: a single malformed field must not crash the whole PDF.
  try {
    renderApplicationBody(doc, application, formData, yPos, margin, pageWidth);
  } catch (err) {
    console.error("[lifeInsurancePdfGenerator] Render error, emitting fallback page:", err);
    doc.setTextColor(200, 0, 0);
    doc.setFontSize(11);
    doc.text(
      "Note: Some fields could not be rendered. Please review the raw application data in the admin panel.",
      margin,
      yPos + 10,
      { maxWidth: pageWidth - margin * 2 }
    );
  }

  addFooter(doc, pageWidth);
  const fileName = `TFA_Life_Insurance_Application_${application.id.slice(0, 8).toUpperCase()}.pdf`;
  doc.save(fileName);
};

// Internal renderer — separated so the public entry can wrap it in try/catch.
const renderApplicationBody = (
  doc: jsPDF,
  application: LifeInsuranceApplication,
  formData: FormData,
  startY: number,
  margin: number,
  pageWidth: number
): void => {
  let yPos = startY;

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
  if (step1.reasonForInsurance) {
    yPos = addField(doc, "Reason for Insurance", step1.reasonForInsurance, yPos, margin, pageWidth);
  }
  if (step1.reasonForInsuranceOther) {
    yPos = addField(doc, "Reason (Other)", step1.reasonForInsuranceOther, yPos, margin, pageWidth);
  }
  if (step1.citizenshipStatus === "other") {
    yPos = addField(doc, "Owns US Property", step1.ownsUsProperty, yPos, margin, pageWidth);
    yPos = addField(doc, "Plans to Remain in US", step1.plansToRemainInUs, yPos, margin, pageWidth);
  }
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
  yPos = addField(doc, "Hours Per Week", step2.hoursPerWeek, yPos, margin, pageWidth);
  yPos = addField(doc, "Actively At Work", step2.activelyAtWork, yPos, margin, pageWidth);
  yPos = addField(doc, "Able to Perform Duties", step2.ableToPerformDuties, yPos, margin, pageWidth);
  if (step2.workStatusExplanation) {
    yPos = addField(doc, "Work Status Explanation", step2.workStatusExplanation, yPos, margin, pageWidth);
  }
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
      yPos = checkPageBreak(doc, yPos, margin, pageWidth, 40);
      yPos = addField(doc, `Child ${idx + 1} Name`, child.name, yPos, margin, pageWidth);
      yPos = addField(doc, `Child ${idx + 1} DOB`, child.dateOfBirth, yPos, margin, pageWidth);
      if (child.ssn) yPos = addField(doc, `Child ${idx + 1} SSN`, formatSSN(child.ssn as string), yPos, margin, pageWidth);
      yPos = addField(doc, `Child ${idx + 1} Lives w/ Parent`, child.livesWithParent, yPos, margin, pageWidth);
      yPos = addField(doc, `Child ${idx + 1} Takes Rx`, child.takesPrescribedMedication, yPos, margin, pageWidth);
      yPos = addField(doc, `Child ${idx + 1} Developmental Cond.`, child.hasDevelopmentalCondition, yPos, margin, pageWidth);
      if (child.developmentalConditionDetails) {
        yPos = addField(doc, `Child ${idx + 1} Dev. Details`, child.developmentalConditionDetails, yPos, margin, pageWidth);
      }
      yPos = addField(doc, `Child ${idx + 1} Medical Cond.`, child.hasMedicalCondition, yPos, margin, pageWidth);
      if (child.medicalConditionDetails) {
        yPos = addField(doc, `Child ${idx + 1} Med. Details`, child.medicalConditionDetails, yPos, margin, pageWidth);
      }
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
      if (policy.yearOfIssue) yPos = addField(doc, `Policy ${idx + 1} Year of Issue`, policy.yearOfIssue, yPos, margin, pageWidth);
      if (policy.coverageType) yPos = addField(doc, `Policy ${idx + 1} Coverage Type`, policy.coverageType, yPos, margin, pageWidth);
      if (policy.classification) yPos = addField(doc, `Policy ${idx + 1} Classification`, policy.classification, yPos, margin, pageWidth);
      yPos = addField(doc, `Policy ${idx + 1} 1035 Exchange`, policy.is1035Exchange, yPos, margin, pageWidth);
    });
  }
  if (step6.lifeSettlementDiscussion !== undefined) {
    yPos = addField(doc, "Life Settlement Discussion", step6.lifeSettlementDiscussion, yPos, margin, pageWidth);
    if (step6.lifeSettlementDetails) {
      yPos = addField(doc, "Life Settlement Details", step6.lifeSettlementDetails, yPos, margin, pageWidth);
    }
  }
  yPos += 5;

  // Step 7: Medical & Lifestyle
  const step7 = formData.step7 || {};
  yPos = checkPageBreak(doc, yPos, margin, pageWidth);
  yPos = addSectionHeader(doc, "7. Medical & Lifestyle History", yPos, margin, pageWidth);
  // Physician
  if (step7.primaryPhysicianName || step7.primaryPhysicianPhone || step7.lastVisitDate) {
    yPos = addField(doc, "Primary Physician", step7.primaryPhysicianName, yPos, margin, pageWidth);
    yPos = addField(doc, "Physician Phone", step7.primaryPhysicianPhone, yPos, margin, pageWidth);
    yPos = addField(doc, "Physician Address", step7.primaryPhysicianAddress, yPos, margin, pageWidth);
    yPos = addField(doc, "Last Visit Date", formatDate(step7.lastVisitDate as string), yPos, margin, pageWidth);
    yPos = addField(doc, "Last Visit Reason", step7.lastVisitReason, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Pending Medical Appointment", step7.pendingMedicalAppointment, yPos, margin, pageWidth);
  if (step7.pendingMedicalAppointment) {
    yPos = addField(doc, "Pending Appt Details", step7.pendingAppointmentDetails, yPos, margin, pageWidth);
  }
  // Build
  if (step7.heightFeet || step7.weightLbs) {
    yPos = addField(doc, "Height", `${step7.heightFeet || 0}' ${step7.heightInches || 0}"`, yPos, margin, pageWidth);
    yPos = addField(doc, "Weight (lbs)", step7.weightLbs, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Weight Change >10 lbs (12mo)", step7.weightChangeOver10Lbs, yPos, margin, pageWidth);
  if (step7.weightChangeOver10Lbs) {
    yPos = addField(doc, "Weight Change Amount", step7.weightChangeAmount, yPos, margin, pageWidth);
    yPos = addField(doc, "Weight Change Direction", step7.weightChangeDirection, yPos, margin, pageWidth);
    yPos = addField(doc, "Weight Change Reason", step7.weightChangeReason, yPos, margin, pageWidth);
  }
  // Family History
  const fh = (step7.familyHistory || {}) as Record<string, Record<string, unknown>>;
  (["father", "mother", "siblings"] as const).forEach((rel) => {
    const m = fh[rel];
    if (!m) return;
    const hasData = Object.values(m).some(v => v !== undefined && v !== "" && v !== false);
    if (!hasData) return;
    yPos = checkPageBreak(doc, yPos, margin, pageWidth, 30);
    const label = rel.charAt(0).toUpperCase() + rel.slice(1);
    if (m.ageIfLiving) yPos = addField(doc, `${label} - Age if Living`, m.ageIfLiving, yPos, margin, pageWidth);
    if (m.ageAtDeath) yPos = addField(doc, `${label} - Age at Death`, m.ageAtDeath, yPos, margin, pageWidth);
    if (m.causeOfDeath) yPos = addField(doc, `${label} - Cause of Death`, m.causeOfDeath, yPos, margin, pageWidth);
    if (m.heartDisease) yPos = addField(doc, `${label} - Heart Disease`, `Yes (onset: ${m.heartDiseaseAgeOfOnset || "N/A"})`, yPos, margin, pageWidth);
    if (m.cancer) yPos = addField(doc, `${label} - Cancer`, `Yes (${m.cancerType || ""}, onset: ${m.cancerAgeOfOnset || "N/A"})`, yPos, margin, pageWidth);
  });
  yPos = addField(doc, "Family Extended Conditions", step7.familyExtendedConditions, yPos, margin, pageWidth);
  if (step7.familyExtendedConditions) {
    yPos = addField(doc, "Family Ext. Cond. Details", step7.familyExtendedConditionsDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Family Mental Health History", step7.familyMentalHealthHistory, yPos, margin, pageWidth);
  if (step7.familyMentalHealthHistory) {
    yPos = addField(doc, "Family Mental Health Details", step7.familyMentalHealthDetails, yPos, margin, pageWidth);
  }
  // 10-year diagnosis history
  const hxFields: Array<[string, string, string]> = [
    ["hx10HeartCondition", "hx10HeartConditionDetails", "Heart Condition (10y)"],
    ["hx10VascularCondition", "hx10VascularConditionDetails", "Vascular Condition (10y)"],
    ["hx10RespiratoryCondition", "hx10RespiratoryConditionDetails", "Respiratory Condition (10y)"],
    ["hx10DigestiveCondition", "hx10DigestiveConditionDetails", "Digestive Condition (10y)"],
    ["hx10CancerOrTumor", "hx10CancerOrTumorDetails", "Cancer/Tumor (10y)"],
    ["hx10EndocrineDiabetes", "hx10EndocrineDiabetesDetails", "Endocrine/Diabetes (10y)"],
    ["hx10KidneyUrinary", "hx10KidneyUrinaryDetails", "Kidney/Urinary (10y)"],
    ["hx10NeurologicalCondition", "hx10NeurologicalConditionDetails", "Neurological (10y)"],
    ["hx10MentalEmotional", "hx10MentalEmotionalDetails", "Mental/Emotional (10y)"],
    ["hx10MusculoskeletalAutoimmune", "hx10MusculoskeletalAutoimmuneDetails", "Musculoskeletal/Autoimmune (10y)"],
    ["hx10BloodImmune", "hx10BloodImmuneDetails", "Blood/Immune (10y)"],
    ["hx10ReproductiveCondition", "hx10ReproductiveConditionDetails", "Reproductive (10y)"],
  ];
  hxFields.forEach(([flag, details, label]) => {
    yPos = addField(doc, label, step7[flag], yPos, margin, pageWidth);
    if (step7[flag] && step7[details]) {
      yPos = addField(doc, `${label} Details`, step7[details], yPos, margin, pageWidth);
    }
  });
  // Recent care
  yPos = addField(doc, "Treatment in Last 12 Months", step7.recent12MonthsTreatment, yPos, margin, pageWidth);
  if (step7.recent12MonthsTreatment) {
    yPos = addField(doc, "Treatment Details", step7.recent12MonthsTreatmentDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Symptoms Not Yet Consulted", step7.recent12MonthsSymptomsUnconsulted, yPos, margin, pageWidth);
  if (step7.recent12MonthsSymptomsUnconsulted) {
    yPos = addField(doc, "Symptoms Details", step7.recent12MonthsSymptomsDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Self-Administered Lab Test", step7.selfAdministeredLabTest, yPos, margin, pageWidth);
  if (step7.selfAdministeredLabTest) {
    yPos = addField(doc, "Lab Test Details", step7.selfAdministeredLabTestDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "ER/Urgent Care Visits (5y)", step7.erUrgentCareVisits5y, yPos, margin, pageWidth);
  if (step7.erUrgentCareVisits5y) {
    yPos = addField(doc, "ER/Urgent Care Details", step7.erUrgentCareVisitsDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Advised Nursing Home/Hospice", step7.advisedNursingHomeOrHospice, yPos, margin, pageWidth);
  if (step7.advisedNursingHomeOrHospice) {
    yPos = addField(doc, "Nursing Home Details", step7.advisedNursingHomeDetails, yPos, margin, pageWidth);
  }
  // Functional / ADL
  yPos = addField(doc, "Uses Assistive Device", step7.usesAssistiveDevice, yPos, margin, pageWidth);
  if (step7.usesAssistiveDevice) {
    yPos = addField(doc, "Assistive Device Details", step7.usesAssistiveDeviceDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Needs Help w/ ADLs", step7.needsHelpADLs, yPos, margin, pageWidth);
  if (step7.needsHelpADLs) {
    yPos = addField(doc, "ADL Help Details", step7.needsHelpADLsDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Needs Help w/ IADLs", step7.needsHelpIADLs, yPos, margin, pageWidth);
  if (step7.needsHelpIADLs) {
    yPos = addField(doc, "IADL Help Details", step7.needsHelpIADLsDetails, yPos, margin, pageWidth);
  }
  // Substance use
  yPos = addField(doc, "Uses Alcohol", step7.usesAlcohol, yPos, margin, pageWidth);
  if (step7.usesAlcohol) {
    yPos = addField(doc, "Drinks per Week", step7.alcoholDrinksPerWeek, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Treated for Alcohol/Drug Use", step7.treatedForAlcoholOrDrugUse, yPos, margin, pageWidth);
  if (step7.treatedForAlcoholOrDrugUse) {
    yPos = addField(doc, "Treatment Details", step7.treatedForAlcoholOrDrugUseDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Used Drugs", step7.usedDrugs, yPos, margin, pageWidth);
  if (step7.usedDrugs) {
    yPos = addField(doc, "Drug Use Details", step7.usedDrugsDetails, yPos, margin, pageWidth);
  }
  yPos = addField(doc, "Disability Claim", step7.disabilityClaim, yPos, margin, pageWidth);
  if (step7.disabilityClaim) {
    yPos = addField(doc, "Disability Claim Details", step7.disabilityClaimDetails, yPos, margin, pageWidth);
  }
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
  yPos = addField(doc, "Other Undisclosed Condition", step7.otherUndisclosedCondition, yPos, margin, pageWidth);
  if (step7.otherUndisclosedCondition) {
    yPos = addField(doc, "Other Condition Details", step7.otherUndisclosedConditionDetails, yPos, margin, pageWidth);
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
};

export const downloadApplicationPdf = generateLifeInsurancePdf;