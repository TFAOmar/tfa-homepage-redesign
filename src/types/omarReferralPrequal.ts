// Shape of the Omar Sanchez referral prequalification form data.
// All fields optional in the type; per-step validation enforces required ones at runtime.

export interface ReferrerInfo {
  referrerType?: "Referral Partner" | "Licensed Agent/Advisor" | "Other";
  fullName?: string;
  email?: string;
  phone?: string;
  handoffPreference?: "Full handoff" | "Quotes only";
  notes?: string;
}

export interface InsuredInfo {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  stateOfResidence?: string;
  zip?: string;
  phone?: string;
  email?: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  citizenshipStatus?: string;
  visaType?: string;
  occupation?: string;
  employer?: string;
  annualIncome?: string;
  netWorth?: string;
}

export interface CoverageNeeds {
  productInterest?: string[];
  coverageAmount?: string;
  termLength?: string;
  purpose?: string[];
  purposeOther?: string;
  hasExistingCoverage?: "Yes" | "No";
  existingCarrier?: string;
  existingAmount?: string;
  existingYear?: string;
  existingReasonKeeping?: string;
  isReplacement?: "Yes" | "No";
  urgency?: string;
  monthlyBudget?: string;
}

export interface HealthBaseline {
  heightFeet?: string;
  heightInches?: string;
  weight?: string;
  weightChange12mo?: "Yes" | "No";
  weightChangeAmount?: string;
  weightChangeReason?: string;
  physicianName?: string;
  physicianPhone?: string;
  lastVisitDate?: string;
  lastVisitReason?: string;
  pendingTests?: "Yes" | "No";
  pendingTestsDetails?: string;
}

export interface ConditionDetail {
  yes: "Yes" | "No" | "";
  diagnosisDate?: string;
  details?: string;
  medications?: string;
  controlled?: "Yes" | "No" | "";
  lastEpisode?: string;
  specialist?: string;
}

export interface Medication {
  name: string;
  dose: string;
  frequency: string;
  condition: string;
}

export interface FamilyHistoryEntry {
  relative: string;
  condition: string;
  ageAtDiagnosis: string;
  livingOrDeceased: string;
}

export interface HealthHistory {
  // Cardiovascular
  cardiacHeartAttack?: ConditionDetail;
  cardiacStroke?: ConditionDetail;
  cardiacHighBP?: ConditionDetail;
  cardiacHighChol?: ConditionDetail;
  cardiacArrhythmia?: ConditionDetail;
  cardiacBypassStent?: ConditionDetail;
  // Cancer
  cancer?: ConditionDetail & { type?: string; stage?: string; remissionDate?: string };
  // Endocrine
  diabetes?: ConditionDetail & { diabetesType?: string; a1c?: string; onInsulin?: string };
  thyroid?: ConditionDetail;
  // Respiratory
  asthma?: ConditionDetail;
  copd?: ConditionDetail;
  sleepApnea?: ConditionDetail & { usesCpap?: string; compliant?: string };
  // Neurological
  seizures?: ConditionDetail;
  ms?: ConditionDetail;
  parkinsons?: ConditionDetail;
  memoryDisorder?: ConditionDetail;
  // Mental health
  depression?: ConditionDetail;
  anxiety?: ConditionDetail;
  bipolar?: ConditionDetail;
  ptsd?: ConditionDetail;
  mentalHospitalization?: "Yes" | "No" | "";
  mentalHospitalizationDetails?: string;
  suicideAttempt?: "Yes" | "No" | "";
  suicideAttemptDetails?: string;
  // Substance use
  alcohol?: {
    uses?: "Yes" | "No" | "";
    drinksPerWeek?: string;
    everTreatment?: "Yes" | "No" | "";
    treatmentDetails?: string;
    duiHistory?: "Yes" | "No" | "";
    duiDetails?: string;
  };
  drugs?: {
    uses?: "Yes" | "No" | "";
    substances?: string;
    lastUse?: string;
    treatment?: "Yes" | "No" | "";
    treatmentDetails?: string;
  };
  // Other
  autoimmune?: ConditionDetail;
  kidneyDisease?: ConditionDetail;
  liverDisease?: ConditionDetail;
  hiv?: ConditionDetail;
  hepatitis?: ConditionDetail & { hepType?: string };
  chronicPain?: ConditionDetail;
  opioidUse?: ConditionDetail;
  // Meds & family
  medications?: Medication[];
  familyHistory?: FamilyHistoryEntry[];
}

export interface Lifestyle {
  tobaccoUse?: "Yes" | "No" | "";
  tobaccoTypes?: string[];
  tobaccoFrequency?: string;
  tobaccoQuitDate?: string;
  tobaccoLastUse?: string;
  marijuanaUse?: "Yes" | "No" | "";
  marijuanaMedicalRec?: string;
  marijuanaFrequency?: string;
  marijuanaRoute?: string;
  // Driving
  duiHistory?: "Yes" | "No" | "";
  duiDetails?: string;
  recklessDriving?: "Yes" | "No" | "";
  recklessDetails?: string;
  licenseSuspended?: "Yes" | "No" | "";
  suspendedDetails?: string;
  movingViolations5yr?: string;
  // Legal
  felonyMisdemeanor?: "Yes" | "No" | "";
  felonyDetails?: string;
  probationOrPending?: "Yes" | "No" | "";
  probationDetails?: string;
  bankruptcy7yr?: "Yes" | "No" | "";
  bankruptcyDischargeDate?: string;
  // Hazardous
  aviation?: "Yes" | "No" | "";
  aviationHours?: string;
  aviationRatings?: string;
  scuba?: "Yes" | "No" | "";
  scubaMaxDepth?: string;
  scubaDivesPerYear?: string;
  racing?: "Yes" | "No" | "";
  racingDetails?: string;
  climbing?: "Yes" | "No" | "";
  climbingDetails?: string;
  skydiving?: "Yes" | "No" | "";
  skydivingDetails?: string;
  baseJumping?: "Yes" | "No" | "";
  mma?: "Yes" | "No" | "";
  otherHazardous?: string;
  // Foreign / military
  foreignTravel12mo?: "Yes" | "No" | "";
  foreignTravelCountries?: string;
  foreignTravelDuration?: string;
  foreignTravelPurpose?: string;
  militaryStatus?: string;
  deploymentPlans?: "Yes" | "No" | "";
  deploymentDetails?: string;
}

export interface Consent {
  consent?: boolean;
  smsConsent?: boolean;
  smsConsentTextVersion?: string;
  signature?: string;
  signedDate?: string;
}

export interface OmarReferralFormData {
  referrer: ReferrerInfo;
  insured: InsuredInfo;
  coverage: CoverageNeeds;
  healthBaseline: HealthBaseline;
  healthHistory: HealthHistory;
  lifestyle: Lifestyle;
  consent: Consent;
  source: "omar-referral";
}

export const defaultOmarReferralData: OmarReferralFormData = {
  referrer: {},
  insured: {},
  coverage: { productInterest: [], purpose: [] },
  healthBaseline: {},
  healthHistory: { medications: [], familyHistory: [] },
  lifestyle: {},
  consent: {},
  source: "omar-referral",
};

export const OMAR_REFERRAL_STEPS = [
  { number: 1, title: "Referrer" },
  { number: 2, title: "Client Info" },
  { number: 3, title: "Coverage" },
  { number: 4, title: "Health Baseline" },
  { number: 5, title: "Health History" },
  { number: 6, title: "Lifestyle" },
  { number: 7, title: "Review" },
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

// Cardiovascular condition groups used in Step 5
export const CARDIAC_CONDITIONS: { key: keyof HealthHistory; label: string }[] = [
  { key: "cardiacHeartAttack", label: "Heart attack" },
  { key: "cardiacStroke", label: "Stroke or TIA" },
  { key: "cardiacHighBP", label: "High blood pressure" },
  { key: "cardiacHighChol", label: "High cholesterol" },
  { key: "cardiacArrhythmia", label: "Arrhythmia" },
  { key: "cardiacBypassStent", label: "Bypass surgery / stent" },
];

export const RESPIRATORY_CONDITIONS: { key: keyof HealthHistory; label: string }[] = [
  { key: "asthma", label: "Asthma" },
  { key: "copd", label: "COPD" },
];

export const NEURO_CONDITIONS: { key: keyof HealthHistory; label: string }[] = [
  { key: "seizures", label: "Seizures / epilepsy" },
  { key: "ms", label: "Multiple Sclerosis" },
  { key: "parkinsons", label: "Parkinson's" },
  { key: "memoryDisorder", label: "Memory / cognitive disorder" },
];

export const MENTAL_CONDITIONS: { key: keyof HealthHistory; label: string }[] = [
  { key: "depression", label: "Depression" },
  { key: "anxiety", label: "Anxiety" },
  { key: "bipolar", label: "Bipolar" },
  { key: "ptsd", label: "PTSD" },
];

export const OTHER_CONDITIONS: { key: keyof HealthHistory; label: string }[] = [
  { key: "autoimmune", label: "Autoimmune disorder (lupus, RA, Crohn's, etc.)" },
  { key: "kidneyDisease", label: "Kidney disease" },
  { key: "liverDisease", label: "Liver disease / cirrhosis" },
  { key: "hiv", label: "HIV" },
  { key: "chronicPain", label: "Chronic pain" },
  { key: "opioidUse", label: "Prescription opioid use (long-term)" },
];