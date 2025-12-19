import { z } from "zod";

// ==========================================
// Step 1: Proposed Insured Information
// ==========================================
export const step1Schema = z.object({
  // Personal ID
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
  ssn: z.string().min(9, "Valid SSN is required").max(11),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  birthplaceState: z.string().optional(),
  birthplaceCountry: z.string().min(1, "Birthplace country is required"),

  // Home Address
  homeStreet: z.string().min(1, "Street address is required"),
  homeCity: z.string().min(1, "City is required"),
  homeState: z.string().min(1, "State is required"),
  homeZip: z.string().min(5, "Valid ZIP code is required"),

  // Mailing Address (conditional)
  mailingAddressDifferent: z.boolean().default(false),
  mailingStreet: z.string().optional(),
  mailingCity: z.string().optional(),
  mailingState: z.string().optional(),
  mailingZip: z.string().optional(),

  // Citizenship
  citizenshipStatus: z.enum(["usa", "other"], { required_error: "Citizenship status is required" }),
  countryOfCitizenship: z.string().optional(),
  dateOfEntry: z.string().optional(),
  visaType: z.string().optional(),
  permanentResidentCard: z.string().optional(),
  visaExpirationDate: z.string().optional(),

  // Identity Verification
  driversLicenseNumber: z.string().min(1, "Driver's license number is required"),
  driversLicenseState: z.string().min(1, "Driver's license state is required"),
}).refine((data) => {
  if (data.mailingAddressDifferent) {
    return data.mailingStreet && data.mailingCity && data.mailingState && data.mailingZip;
  }
  return true;
}, {
  message: "Mailing address is required when different from home address",
  path: ["mailingStreet"],
}).refine((data) => {
  if (data.citizenshipStatus === "other") {
    return data.countryOfCitizenship && data.dateOfEntry && data.visaType;
  }
  return true;
}, {
  message: "Immigration details are required for non-US citizens",
  path: ["countryOfCitizenship"],
});

export type Step1Data = z.infer<typeof step1Schema>;

// ==========================================
// Step 2: Contact & Employment
// ==========================================
export const step2Schema = z.object({
  // Contact
  homePhone: z.string().optional(),
  mobilePhone: z.string().min(10, "Mobile phone is required"),
  workPhone: z.string().optional(),
  email: z.string().email("Valid email is required"),

  // Employment
  employerName: z.string().min(1, "Employer name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  industry: z.string().optional(),
  jobDuties: z.string().optional(),
  yearsEmployed: z.number().min(0).optional(),

  // Financials
  annualEarnedIncome: z.number().min(0, "Annual income is required"),
  householdIncome: z.number().min(0).optional(),
  netWorth: z.number().min(0, "Net worth is required"),

  // Family Insurance (AGL specific)
  spouseInsuranceAmount: z.number().optional(),
  parentsInsuranceAmount: z.number().optional(),
  siblingsInsuranceAmount: z.number().optional(),
});

export type Step2Data = z.infer<typeof step2Schema>;

// ==========================================
// Step 3: Ownership (Conditional)
// ==========================================
export const step3Schema = z.object({
  insuredIsOwner: z.boolean().default(true),
  
  // Owner Information (if different from insured)
  ownerType: z.enum(["individual", "trust", "business"]).optional(),
  ownerName: z.string().optional(),
  ownerSSN: z.string().optional(),
  ownerDateOfBirth: z.string().optional(),
  ownerTrustDate: z.string().optional(),
  ownerRelationshipToInsured: z.string().optional(),
  ownerStreet: z.string().optional(),
  ownerCity: z.string().optional(),
  ownerState: z.string().optional(),
  ownerZip: z.string().optional(),
  ownerEmail: z.string().optional(),
  ownerPhone: z.string().optional(),
  ownerCitizenshipStatus: z.enum(["usa", "other"]).optional(),
  ownerCountryOfCitizenship: z.string().optional(),
  trusteeNames: z.string().optional(), // For trust owners
});

export type Step3Data = z.infer<typeof step3Schema>;

// ==========================================
// Step 4: Beneficiaries
// ==========================================
export const beneficiarySchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, "Beneficiary name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  ssn: z.string().optional(),
  dateOfBirth: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  sharePercentage: z.number().min(0).max(100, "Share must be between 0-100%"),
  designation: z.enum(["primary", "contingent"]),
});

export const step4Schema = z.object({
  beneficiaries: z.array(beneficiarySchema).min(1, "At least one beneficiary is required"),
}).refine((data) => {
  const primaryTotal = data.beneficiaries
    .filter(b => b.designation === "primary")
    .reduce((sum, b) => sum + b.sharePercentage, 0);
  return primaryTotal === 100;
}, {
  message: "Primary beneficiaries must total 100%",
  path: ["beneficiaries"],
});

export type Beneficiary = z.infer<typeof beneficiarySchema>;
export type Step4Data = z.infer<typeof step4Schema>;

// ==========================================
// Step 5: Policy & Riders
// ==========================================
export const step5Schema = z.object({
  // Product Selection
  planName: z.string().min(1, "Plan name is required"),
  termDuration: z.string().optional(),
  faceAmount: z.number().min(1000, "Face amount is required"),

  // Riders
  ridersChildrenTerm: z.boolean().default(false),
  ridersWaiverOfPremium: z.boolean().default(false),
  ridersAcceleratedBenefits: z.boolean().default(false),
  ridersChronicIllness: z.boolean().default(false),
  ridersAccidentalDeath: z.boolean().default(false),

  // Children details (if children rider selected)
  childrenDetails: z.array(z.object({
    name: z.string(),
    dateOfBirth: z.string(),
  })).optional(),
});

export type Step5Data = z.infer<typeof step5Schema>;

// ==========================================
// Step 6: Existing Coverage & Replacements
// ==========================================
export const existingPolicySchema = z.object({
  id: z.string(),
  companyName: z.string().min(1, "Company name is required"),
  policyNumber: z.string().min(1, "Policy number is required"),
  amountOfCoverage: z.number().min(0),
  isBeingReplaced: z.boolean().default(false),
});

export const step6Schema = z.object({
  hasExistingCoverage: z.boolean().default(false),
  existingPolicies: z.array(existingPolicySchema).optional(),
});

export type ExistingPolicy = z.infer<typeof existingPolicySchema>;
export type Step6Data = z.infer<typeof step6Schema>;

// ==========================================
// Step 7: Medical & Lifestyle History
// ==========================================
export const step7Schema = z.object({
  // Tobacco
  usedTobacco: z.boolean().default(false),
  tobaccoType: z.string().optional(),
  tobaccoFrequency: z.string().optional(),
  tobaccoLastUsed: z.string().optional(),

  // High Risk Activities
  aviation: z.boolean().default(false),
  aviationDetails: z.string().optional(),
  hazardousSports: z.boolean().default(false),
  hazardousSportsDetails: z.string().optional(),
  foreignTravel: z.boolean().default(false),
  foreignTravelDetails: z.string().optional(),

  // Legal/Financial History
  bankruptcy: z.boolean().default(false),
  bankruptcyDetails: z.string().optional(),
  criminalHistory: z.boolean().default(false),
  criminalHistoryDetails: z.string().optional(),
  drivingViolations: z.boolean().default(false),
  drivingViolationsDetails: z.string().optional(),

  // Medical Knockout
  hasMedicalConditions: z.boolean().default(false),
  medicalConditionsDetails: z.string().optional(),
});

export type Step7Data = z.infer<typeof step7Schema>;

// ==========================================
// Step 8: Premium Payment
// ==========================================
export const step8Schema = z.object({
  paymentMethod: z.enum(["eft", "check"], { required_error: "Payment method is required" }),
  paymentFrequency: z.enum(["annual", "semi-annual", "quarterly", "monthly"], { required_error: "Payment frequency is required" }),

  // Bank Details (if EFT)
  bankName: z.string().optional(),
  routingNumber: z.string().optional(),
  accountNumber: z.string().optional(),
  accountType: z.enum(["checking", "savings"]).optional(),

  // Source of Funds
  sourceOfFunds: z.enum(["income", "savings", "loan", "gift", "other"], { required_error: "Source of funds is required" }),
  sourceOfFundsOther: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethod === "eft") {
    return data.bankName && data.routingNumber && data.accountNumber && data.accountType;
  }
  return true;
}, {
  message: "Bank details are required for EFT payments",
  path: ["bankName"],
});

export type Step8Data = z.infer<typeof step8Schema>;

// ==========================================
// Step 9: Review & Submit
// ==========================================
export const step9Schema = z.object({
  acknowledged: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge that the information is accurate",
  }),
  electronicSignature: z.string().min(2, "Electronic signature is required"),
  signatureDate: z.string().min(1, "Signature date is required"),
});

export type Step9Data = z.infer<typeof step9Schema>;

// ==========================================
// Complete Application Data
// ==========================================
export interface LifeInsuranceApplicationData {
  step1: Partial<Step1Data>;
  step2: Partial<Step2Data>;
  step3: Partial<Step3Data>;
  step4: Partial<Step4Data>;
  step5: Partial<Step5Data>;
  step6: Partial<Step6Data>;
  step7: Partial<Step7Data>;
  step8: Partial<Step8Data>;
  step9: Partial<Step9Data>;
}

export const defaultApplicationData: LifeInsuranceApplicationData = {
  step1: {},
  step2: {},
  step3: { insuredIsOwner: true },
  step4: { beneficiaries: [] },
  step5: {},
  step6: { hasExistingCoverage: false, existingPolicies: [] },
  step7: {},
  step8: {},
  step9: { signatureDate: new Date().toLocaleDateString("en-US") },
};

// Step configuration
export const STEPS = [
  { number: 1, title: "Proposed Insured", shortTitle: "Insured" },
  { number: 2, title: "Contact & Employment", shortTitle: "Contact" },
  { number: 3, title: "Ownership", shortTitle: "Owner" },
  { number: 4, title: "Beneficiaries", shortTitle: "Beneficiaries" },
  { number: 5, title: "Policy & Riders", shortTitle: "Policy" },
  { number: 6, title: "Existing Coverage", shortTitle: "Coverage" },
  { number: 7, title: "Medical & Lifestyle", shortTitle: "Medical" },
  { number: 8, title: "Premium Payment", shortTitle: "Payment" },
  { number: 9, title: "Review & Submit", shortTitle: "Review" },
] as const;
