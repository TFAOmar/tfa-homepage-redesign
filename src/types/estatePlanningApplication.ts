import { z } from "zod";

// Validation helpers
const phoneSchema = z
  .string()
  .transform((val) => val.replace(/\D/g, ""))
  .refine((val) => val.length === 10, {
    message: "Phone number must be 10 digits",
  });

const ssnSchema = z
  .string()
  .transform((val) => val.replace(/\D/g, ""))
  .refine((val) => val.length === 9, {
    message: "SSN must be 9 digits",
  });

// Step 1: Client Identity (Trustors)
export const step1Schema = z.object({
  // Trustor 1 (Primary)
  trustor1FirstName: z.string().min(1, "First name is required"),
  trustor1MiddleName: z.string().optional(),
  trustor1LastName: z.string().min(1, "Last name is required"),
  trustor1SSN: ssnSchema,
  trustor1DOB: z.string().min(1, "Date of birth is required"),
  trustor1BirthCity: z.string().min(1, "City of birth is required"),
  trustor1BirthState: z.string().min(1, "State of birth is required"),
  trustor1Phone: phoneSchema,
  trustor1Email: z.string().email("Valid email is required"),

  // Marital Status
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], {
    required_error: "Marital status is required",
  }),

  // Trustor 2 (Spouse - conditional)
  hasTrustor2: z.boolean().default(false),
  trustor2FirstName: z.string().optional(),
  trustor2MiddleName: z.string().optional(),
  trustor2LastName: z.string().optional(),
  trustor2SSN: z.string().optional(),
  trustor2DOB: z.string().optional(),
  trustor2BirthCity: z.string().optional(),
  trustor2BirthState: z.string().optional(),
  trustor2Phone: z.string().optional(),
  trustor2Email: z.string().optional(),

  // Marriage Details (conditional)
  marriageDate: z.string().optional(),
  marriageCity: z.string().optional(),
  marriageState: z.string().optional(),

  // Address
  homeStreet: z.string().min(1, "Street address is required"),
  homeCity: z.string().min(1, "City is required"),
  homeState: z.string().min(1, "State is required"),
  homeZip: z.string().min(5, "ZIP code is required"),

  // Contact Preference
  contactPreference: z.enum(["email", "text", "phone"]).default("email"),

  // Existing Trust Amendment
  hasExistingTrust: z.boolean().default(false),
  existingTrustName: z.string().optional(),
  amendmentClause: z.string().optional(),
});

export type Step1Data = z.infer<typeof step1Schema>;

// Step 2: Family & Heirs
export const childSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, "Child's full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  parentage: z.enum(["husband", "wife", "joint"], {
    required_error: "Parentage is required",
  }),
});

export type Child = z.infer<typeof childSchema>;

export const step2Schema = z.object({
  children: z.array(childSchema).default([]),
  acknowledgeAllChildrenListed: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge all children are listed",
  }),
});

export type Step2Data = z.infer<typeof step2Schema>;

// Step 3: Successor Trustees
export const trusteeSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, "Full name is required"),
  ssn: z.string().optional(),
  dob: z.string().optional(),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().optional(),
  role: z.enum(["primary", "alternate"]),
});

export type Trustee = z.infer<typeof trusteeSchema>;

export const step3Schema = z.object({
  successorTrustees: z.array(trusteeSchema).min(1, "At least one successor trustee is required"),
  managementStyle: z.enum(["independent", "together"], {
    required_error: "Management style is required",
  }),
  incapacityJudge1Name: z.string().min(1, "First incapacity judge is required"),
  incapacityJudge1Phone: z.string().optional(),
  incapacityJudge2Name: z.string().min(1, "Second incapacity judge is required"),
  incapacityJudge2Phone: z.string().optional(),
});

export type Step3Data = z.infer<typeof step3Schema>;

// Step 4: Beneficiaries
export const beneficiarySchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, "Beneficiary name is required"),
  relationship: z.string().optional(),
  percentage: z.number().min(0).max(100),
  contingencyPlan: z.enum(["per_stirpes", "per_capita", "charity"], {
    required_error: "Contingency plan is required",
  }),
  charityName: z.string().optional(),
});

export type Beneficiary = z.infer<typeof beneficiarySchema>;

export const step4Schema = z.object({
  beneficiaries: z.array(beneficiarySchema).min(1, "At least one beneficiary is required"),
  ultimateBeneficiaryAge: z.number().min(18).max(65).default(25),
  custodianName: z.string().optional(),
  custodianPhone: z.string().optional(),
});

export type Step4Data = z.infer<typeof step4Schema>;

// Step 5: Attorney-in-Fact Powers
export const step5Schema = z.object({
  // Financial POA
  financialPOAPrimary: z.string().min(1, "Primary Financial POA is required"),
  financialPOAPrimaryPhone: z.string().optional(),
  financialPOAAlternate: z.string().optional(),
  financialPOAAlternatePhone: z.string().optional(),

  // Medical POA
  medicalPOAPrimary: z.string().min(1, "Primary Medical POA is required"),
  medicalPOAPrimaryPhone: z.string().optional(),
  medicalPOAAlternate: z.string().optional(),
  medicalPOAAlternatePhone: z.string().optional(),

  // Permission toggles (12+ powers)
  powerRealEstate: z.boolean().default(false),
  powerTangibleProperty: z.boolean().default(false),
  powerSecurities: z.boolean().default(false),
  powerBanking: z.boolean().default(false),
  powerBusiness: z.boolean().default(false),
  powerInsuranceAnnuities: z.boolean().default(false),
  powerRetirementPlans: z.boolean().default(false),
  powerEstateTrustBeneficiary: z.boolean().default(false),
  powerTransferToTrust: z.boolean().default(false),
  powerLegalActions: z.boolean().default(false),
  powerGovernment: z.boolean().default(false),
  powerFamilyCare: z.boolean().default(false),
  powerTaxes: z.boolean().default(false),
  powerGifts: z.boolean().default(false),
  powerDelegateAuthority: z.boolean().default(false),
  powerBenefitFromActions: z.boolean().default(false),
  powerCommingleFunds: z.boolean().default(false),
  powerServeAsConservator: z.boolean().default(false),
});

export type Step5Data = z.infer<typeof step5Schema>;

// Step 6: Healthcare & End-of-Life
export const step6Schema = z.object({
  hipaaAuthorization: z.boolean().default(true),
  lifeProlonging: z.boolean({
    required_error: "Please indicate your preference",
  }),
  artificialNutrition: z.boolean({
    required_error: "Please indicate your preference",
  }),
  surrogateFinalDecision: z.boolean({
    required_error: "Please indicate your preference",
  }),
  additionalHealthcareDirectives: z.string().optional(),
});

export type Step6Data = z.infer<typeof step6Schema>;

// Step 7: Asset Identification
export const realEstateSchema = z.object({
  id: z.string(),
  address: z.string().min(1, "Property address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(5, "ZIP is required"),
  propertyType: z.enum(["primary", "rental", "vacation", "commercial"]),
  estimatedValue: z.number().optional(),
  hasGrantDeed: z.boolean().default(false),
});

export type RealEstate = z.infer<typeof realEstateSchema>;

export const financialAccountSchema = z.object({
  id: z.string(),
  institutionName: z.string().min(1, "Institution name is required"),
  accountType: z.enum(["checking", "savings", "brokerage", "401k", "ira", "roth_ira", "life_insurance", "annuity"]),
  approximateValue: z.number().optional(),
  accountNumber: z.string().optional(), // Last 4 only for security
});

export type FinancialAccount = z.infer<typeof financialAccountSchema>;

export const step7Schema = z.object({
  realEstateProperties: z.array(realEstateSchema).default([]),
  financialAccounts: z.array(financialAccountSchema).default([]),
  otherAssets: z.string().optional(),
});

export type Step7Data = z.infer<typeof step7Schema>;

// Step 8: Review & Submit
export const step8Schema = z.object({
  acknowledgeAccuracy: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the information is accurate",
  }),
  electronicSignature: z.string().min(1, "Electronic signature is required"),
  signatureDate: z.string().min(1, "Date is required"),
});

export type Step8Data = z.infer<typeof step8Schema>;

// Complete Application Data
export interface EstatePlanningApplicationData {
  step1?: Partial<Step1Data>;
  step2?: Partial<Step2Data>;
  step3?: Partial<Step3Data>;
  step4?: Partial<Step4Data>;
  step5?: Partial<Step5Data>;
  step6?: Partial<Step6Data>;
  step7?: Partial<Step7Data>;
  step8?: Partial<Step8Data>;
}

export const defaultApplicationData: EstatePlanningApplicationData = {
  step1: {
    maritalStatus: undefined,
    hasTrustor2: false,
    hasExistingTrust: false,
    contactPreference: "email",
  },
  step2: {
    children: [],
    acknowledgeAllChildrenListed: false,
  },
  step3: {
    successorTrustees: [],
    managementStyle: undefined,
  },
  step4: {
    beneficiaries: [],
    ultimateBeneficiaryAge: 25,
  },
  step5: {
    powerRealEstate: true,
    powerTangibleProperty: true,
    powerSecurities: true,
    powerBanking: true,
    powerBusiness: true,
    powerInsuranceAnnuities: true,
    powerRetirementPlans: true,
    powerEstateTrustBeneficiary: true,
    powerTransferToTrust: true,
    powerLegalActions: true,
    powerGovernment: true,
    powerFamilyCare: true,
    powerTaxes: true,
    powerGifts: false,
    powerDelegateAuthority: false,
    powerBenefitFromActions: false,
    powerCommingleFunds: false,
    powerServeAsConservator: true,
  },
  step6: {
    hipaaAuthorization: true,
  },
  step7: {
    realEstateProperties: [],
    financialAccounts: [],
  },
  step8: {},
};

// Step Configuration
export const ESTATE_STEPS = [
  { number: 1, title: "Client Identity" },
  { number: 2, title: "Family & Heirs" },
  { number: 3, title: "Successor Trustees" },
  { number: 4, title: "Beneficiaries" },
  { number: 5, title: "Legal Powers" },
  { number: 6, title: "Healthcare" },
  { number: 7, title: "Assets" },
  { number: 8, title: "Review & Submit" },
] as const;

// US States for dropdowns
export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
] as const;
