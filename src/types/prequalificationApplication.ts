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
