import { z } from "zod";

// Step definitions for progress bar
export const PREQUALIFICATION_STEPS = [
  { number: 1, title: "Personal Info" },
  { number: 2, title: "Health & Lifestyle" },
  { number: 3, title: "Coverage Needs" },
  { number: 4, title: "Review & Submit" },
];

// Step 1: Personal Information
export const step1Schema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(10, "Valid phone number is required").max(20),
  email: z.string().email("Valid email is required").max(255),
  stateOfResidence: z.string().min(1, "State of residence is required"),
});

export type Step1Data = z.infer<typeof step1Schema>;

// Step 2: Health & Lifestyle
export const step2Schema = z.object({
  heightFeet: z.string().min(1, "Height (feet) is required"),
  heightInches: z.string().min(1, "Height (inches) is required"),
  weight: z.string().min(1, "Weight is required"),
  tobaccoUse: z.string().min(1, "Required"),
  tobaccoFrequency: z.string().optional(),
  medicalConditions: z.array(z.string()).default([]),
  conditionDetails: z.record(z.string(), z.record(z.string(), z.string())).optional().default({}),
  takingMedications: z.string().min(1, "Required"),
  medicationDetails: z.string().optional(),
  hospitalizedPast5Years: z.string().min(1, "Required"),
  familyHistoryHeartCancer: z.string().min(1, "Required"),
});

export type Step2Data = z.infer<typeof step2Schema>;

// Step 3: Coverage Needs
export const step3Schema = z.object({
  coverageAmount: z.string().min(1, "Coverage amount is required"),
  coverageType: z.string().min(1, "Coverage type is required"),
  monthlyBudget: z.string().min(1, "Monthly budget is required"),
  hasExistingInsurance: z.string().min(1, "Required"),
  existingCarrier: z.string().optional(),
  existingAmount: z.string().optional(),
  purposeOfCoverage: z.string().min(1, "Purpose is required"),
});

export type Step3Data = z.infer<typeof step3Schema>;

// Step 4: Review & Submit
export const step4Schema = z.object({
  electronicSignature: z.string().min(1, "Signature is required"),
  consentChecked: z.literal(true, {
    errorMap: () => ({ message: "You must agree to proceed" }),
  }),
  smsConsent: z.boolean().optional(),
  smsConsentTextVersion: z.string().optional(),
});

export type Step4Data = z.infer<typeof step4Schema>;

// Complete application data
export interface PrequalificationApplicationData {
  step1: Step1Data | Record<string, unknown>;
  step2: Step2Data | Record<string, unknown>;
  step3: Step3Data | Record<string, unknown>;
  step4: Step4Data | Record<string, unknown>;
}

export const defaultPrequalificationData: PrequalificationApplicationData = {
  step1: {},
  step2: { medicalConditions: [] },
  step3: {},
  step4: {},
};

export const MEDICAL_CONDITIONS = [
  "Diabetes",
  "Heart Disease",
  "Cancer",
  "Stroke",
  "High Blood Pressure",
  "High Cholesterol",
  "Asthma / COPD",
  "Mental Health Condition",
  "Autoimmune Disorder",
  "Kidney Disease",
];

// Condition-specific follow-up question definitions.
// Each field is rendered dynamically when the parent condition is selected.
export type ConditionFieldType = "text" | "select" | "year" | "textarea";

export interface ConditionFieldDef {
  key: string;
  label: string;
  type: ConditionFieldType;
  options?: string[];
  placeholder?: string;
}

export const CONDITION_FOLLOWUPS: Record<string, ConditionFieldDef[]> = {
  "Diabetes": [
    { key: "type", label: "Type", type: "select", options: ["Type 1", "Type 2", "Gestational", "Pre-diabetes"] },
    { key: "yearDiagnosed", label: "Year diagnosed", type: "year", placeholder: "e.g., 2015" },
    { key: "recentA1C", label: "Most recent A1C (if known)", type: "text", placeholder: "e.g., 6.8" },
    { key: "onInsulin", label: "On insulin?", type: "select", options: ["No", "Yes"] },
    { key: "complications", label: "Any complications? (neuropathy, retinopathy, kidney, none)", type: "text", placeholder: "None / list any" },
  ],
  "Heart Disease": [
    { key: "diagnosis", label: "Specific diagnosis", type: "select", options: ["Coronary Artery Disease", "Heart Attack", "Bypass Surgery", "Stent", "Arrhythmia", "Heart Failure", "Other"] },
    { key: "yearOfEvent", label: "Year of event/diagnosis", type: "year" },
    { key: "treatment", label: "Treatment received", type: "select", options: ["Medication only", "Stent", "Bypass surgery", "Pacemaker/ICD", "Other"] },
    { key: "currentlySymptomatic", label: "Currently symptomatic?", type: "select", options: ["No", "Yes"] },
  ],
  "Cancer": [
    { key: "typeSite", label: "Type / site of cancer", type: "text", placeholder: "e.g., Breast, Prostate, Skin (basal cell)" },
    { key: "yearDiagnosed", label: "Year diagnosed", type: "year" },
    { key: "stage", label: "Stage", type: "select", options: ["Stage I", "Stage II", "Stage III", "Stage IV", "Unknown"] },
    { key: "treatment", label: "Treatment", type: "text", placeholder: "Surgery, chemo, radiation, immunotherapy" },
    { key: "inRemission", label: "In remission?", type: "select", options: ["No", "Yes"] },
    { key: "remissionYear", label: "Year remission began (if applicable)", type: "year" },
  ],
  "Stroke": [
    { key: "strokeOrTia", label: "Stroke or TIA?", type: "select", options: ["Stroke", "TIA (mini-stroke)"] },
    { key: "year", label: "Year of event", type: "year" },
    { key: "residualDeficits", label: "Any residual deficits?", type: "select", options: ["No", "Yes"] },
    { key: "onBloodThinners", label: "On blood thinners?", type: "select", options: ["No", "Yes"] },
  ],
  "High Blood Pressure": [
    { key: "yearDiagnosed", label: "Year diagnosed", type: "year" },
    { key: "controlledWithMeds", label: "Controlled with medication?", type: "select", options: ["Yes", "No"] },
    { key: "recentReading", label: "Most recent reading (if known)", type: "text", placeholder: "e.g., 128/82" },
  ],
  "High Cholesterol": [
    { key: "yearDiagnosed", label: "Year diagnosed", type: "year" },
    { key: "onStatin", label: "On statin/medication?", type: "select", options: ["Yes", "No"] },
    { key: "recentLevel", label: "Most recent total cholesterol / LDL (if known)", type: "text", placeholder: "e.g., Total 195, LDL 110" },
  ],
  "Asthma / COPD": [
    { key: "which", label: "Which one?", type: "select", options: ["Asthma", "COPD", "Both"] },
    { key: "severity", label: "Severity", type: "select", options: ["Mild", "Moderate", "Severe"] },
    { key: "dailyController", label: "On daily controller medication?", type: "select", options: ["No", "Yes"] },
    { key: "erOrHospitalized2yr", label: "ER visit or hospitalization in past 2 years?", type: "select", options: ["No", "Yes"] },
  ],
  "Mental Health Condition": [
    { key: "condition", label: "Condition", type: "select", options: ["Depression", "Anxiety", "Bipolar", "PTSD", "Other"] },
    { key: "onMedication", label: "On medication?", type: "select", options: ["No", "Yes"] },
    { key: "hospitalizedOrAttempt", label: "Any hospitalization or suicide attempt?", type: "select", options: ["No", "Yes"] },
    { key: "yearIfYes", label: "Year (if yes above)", type: "year" },
  ],
  "Autoimmune Disorder": [
    { key: "specificCondition", label: "Specific condition", type: "text", placeholder: "Lupus, RA, MS, Crohn's, etc." },
    { key: "yearDiagnosed", label: "Year diagnosed", type: "year" },
    { key: "onImmunosuppressants", label: "Currently on immunosuppressants/biologics?", type: "select", options: ["No", "Yes"] },
    { key: "flarePast12mo", label: "Flare in past 12 months?", type: "select", options: ["No", "Yes"] },
  ],
  "Kidney Disease": [
    { key: "stage", label: "Stage", type: "select", options: ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5", "Unknown"] },
    { key: "onDialysis", label: "On dialysis?", type: "select", options: ["No", "Yes"] },
    { key: "cause", label: "Cause", type: "select", options: ["Diabetes", "High Blood Pressure", "Other", "Unknown"] },
  ],
};

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];
