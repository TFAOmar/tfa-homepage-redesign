export interface StateLicense {
  state: string;
  licenseNumber: string;
  linesOfAuthority: string;
  expiration: string;
}

export interface EmploymentEntry {
  company: string;
  title: string;
  from: string;
  to: string;
  reason: string;
}

export interface ReferenceEntry {
  name: string;
  relationship: string;
  company: string;
  contact: string;
}

export type YesNo = "" | "yes" | "no";

export interface DisclosureAnswer {
  answer: YesNo;
  explanation: string;
}

export interface AgentOnboardingFormData {
  // 1. Applicant
  fullLegalName: string;
  preferredName: string;
  dateOfBirth: string;
  ssn: string;
  citizenshipStatus: string;
  driversLicense: string;
  driversLicenseState: string;

  // 2. Contact
  residentialAddress: string;
  city: string;
  state: string;
  zip: string;
  mailingAddress: string;
  mailingCityStateZip: string;
  mobilePhone: string;
  altPhone: string;
  email: string;
  preferredLanguage: string;
  bestTimeToContact: string;

  // 3. Emergency
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  emergencyAltPhone: string;

  // 4. Licensing
  npn: string;
  residentLicenseState: string;
  stateLicenses: StateLicense[];
  yearsLicensed: string;
  numStatesLicensed: string;

  // 5. E&O
  eoCarrier: string;
  eoPolicyNumber: string;
  eoCoverageAmount: string;
  eoExpiration: string;
  eoDeclarationPath?: string;
  eoDeclarationName?: string;

  // 6. AML
  amlProvider: string;
  amlCompletedDate: string;
  amlExpiration: string;
  ceCompliant: string;
  amlCertificatePath?: string;
  amlCertificateName?: string;

  // 7. Background
  backgroundDisclosure: Record<
    "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7" | "q8",
    DisclosureAnswer
  >;

  // 8. Employment
  employment: EmploymentEntry[];

  // 9. References
  references: ReferenceEntry[];

  // 10. Sub-firm
  recruitedBy: string;
  upline: string;
  subFirm: string;
  referralSource: string;

  // 11. Education
  highestEducation: string;
  school: string;
  designations: string;

  // 12. Direct deposit
  bankName: string;
  accountType: string;
  routingNumber: string;
  accountNumber: string;
  nameOnAccount: string;
  voidedCheckPath?: string;
  voidedCheckName?: string;

  // 13. Tax
  taxClassification: string;
  businessName: string;
  ein: string;

  // 14. Authorization
  authConsent: boolean;

  // 15. Certification
  certifyTrue: boolean;
  smsConsent?: boolean;
  smsConsentTextVersion?: string;
  signature: string;
  printedName: string;
  signNpn: string;
}

export const emptyDisclosure: DisclosureAnswer = { answer: "", explanation: "" };

export const initialFormData: AgentOnboardingFormData = {
  fullLegalName: "",
  preferredName: "",
  dateOfBirth: "",
  ssn: "",
  citizenshipStatus: "",
  driversLicense: "",
  driversLicenseState: "",
  residentialAddress: "",
  city: "",
  state: "",
  zip: "",
  mailingAddress: "",
  mailingCityStateZip: "",
  mobilePhone: "",
  altPhone: "",
  email: "",
  preferredLanguage: "",
  bestTimeToContact: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyPhone: "",
  emergencyAltPhone: "",
  npn: "",
  residentLicenseState: "",
  stateLicenses: Array.from({ length: 4 }, () => ({
    state: "",
    licenseNumber: "",
    linesOfAuthority: "",
    expiration: "",
  })),
  yearsLicensed: "",
  numStatesLicensed: "",
  eoCarrier: "",
  eoPolicyNumber: "",
  eoCoverageAmount: "",
  eoExpiration: "",
  amlProvider: "",
  amlCompletedDate: "",
  amlExpiration: "",
  ceCompliant: "",
  backgroundDisclosure: {
    q1: { ...emptyDisclosure },
    q2: { ...emptyDisclosure },
    q3: { ...emptyDisclosure },
    q4: { ...emptyDisclosure },
    q5: { ...emptyDisclosure },
    q6: { ...emptyDisclosure },
    q7: { ...emptyDisclosure },
    q8: { ...emptyDisclosure },
  },
  employment: Array.from({ length: 3 }, () => ({
    company: "",
    title: "",
    from: "",
    to: "",
    reason: "",
  })),
  references: Array.from({ length: 3 }, () => ({
    name: "",
    relationship: "",
    company: "",
    contact: "",
  })),
  recruitedBy: "",
  upline: "",
  subFirm: "",
  referralSource: "",
  highestEducation: "",
  school: "",
  designations: "",
  bankName: "",
  accountType: "",
  routingNumber: "",
  accountNumber: "",
  nameOnAccount: "",
  taxClassification: "",
  businessName: "",
  ein: "",
  authConsent: false,
  certifyTrue: false,
  smsConsent: false,
  smsConsentTextVersion: "",
  signature: "",
  printedName: "",
  signNpn: "",
};

export const SECTION_TITLES: { num: string; title: string; help?: string }[] = [
  { num: "01", title: "Applicant information", help: "Enter your name exactly as it appears on your insurance license and government-issued ID." },
  { num: "02", title: "Contact information", help: "We use these details for all contracting and commission correspondence." },
  { num: "03", title: "Emergency contact", help: "Someone we can reach if we're unable to contact you directly." },
  { num: "04", title: "Licensing & producer information", help: "List every state in which you currently hold an active resident or non-resident license, with lines of authority and expiration dates." },
  { num: "05", title: "Errors & omissions (E&O) coverage", help: "E&O coverage is required before any contract is activated." },
  { num: "06", title: "AML certification & continuing education", help: "Anti-money-laundering training must be current and renewed every two years." },
  { num: "07", title: "Background & compliance disclosure", help: "Answer every question. A \"yes\" answer does not automatically disqualify you, but it must be explained. Failure to disclose may result in denial or termination of your contract." },
  { num: "08", title: "Employment & industry history", help: "Begin with your most recent position. Include any prior IMO, FMO, or agency affiliations." },
  { num: "09", title: "Professional references", help: "Provide at least three references who are not related to you and can speak to your character and work ethic." },
  { num: "10", title: "Sub-firm & upline information", help: "Tell us who introduced you to TFA and where you'll be placed." },
  { num: "11", title: "Education & professional designations", help: "Optional — share your education and any industry designations (e.g. CLU, ChFC, FIC, LUTCF)." },
  { num: "12", title: "Commission direct deposit", help: "Used solely to pay your commissions and kept strictly confidential. Attach a voided check or bank-issued direct-deposit letter." },
  { num: "13", title: "Tax information", help: "Match this to your W-9. A completed IRS Form W-9 may be required for commission payment." },
  { num: "14", title: "Authorization & background check consent" },
  { num: "15", title: "Applicant certification & signature" },
];