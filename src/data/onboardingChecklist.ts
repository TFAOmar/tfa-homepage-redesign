/**
 * ONBOARDING CHECKLIST CONFIGURATION
 * 
 * This file contains all checklist sections and items for the New Agent Onboarding process.
 * 
 * To edit:
 * - Modify item text directly in the items array
 * - Add/remove items by updating the items array
 * - Add new sections by adding to the ONBOARDING_CHECKLIST array
 * - Link resources by adding resource keys to relatedResources array
 * 
 * Item structure:
 * - id: unique identifier (used for localStorage persistence)
 * - text: display text for the checklist item
 * - isSubSection: if true, displays as a sub-header (e.g., "Agent Verify:")
 */

export interface ChecklistItem {
  id: string;
  text: string;
  isSubSection?: boolean;
}

export interface ChecklistSection {
  id: string;
  title: string;
  subtitle?: string;
  items: ChecklistItem[];
  relatedResources?: string[];
}

export const ONBOARDING_CHECKLIST: ChecklistSection[] = [
  {
    id: "pre-qualify",
    title: "Section 1: Pre-Qualify",
    subtitle: "(5–10 mins)",
    items: [
      { id: "pq-1", text: "Confirm they're serious about building a business (not \"curious\")" },
      { id: "pq-2", text: "Confirm timeline: ready to start this week" },
      { id: "pq-3", text: "Confirm license status (licensed / not licensed / needs exam + fingerprints)" },
      { id: "pq-4", text: "Confirm they can attend trainings + office hours (or Zoom)" },
      { id: "pq-5", text: "Set expectation: follow the steps = results" },
    ],
    relatedResources: ["orientation_video_link"]
  },
  {
    id: "starter-pack",
    title: "Section 2: Send the Starter Pack",
    subtitle: "(Same Day)",
    items: [
      { id: "sp-1", text: "Send TFA onboarding registration link (NDA + $49.99 onboarding fee)" },
      { id: "sp-2", text: "Send Skool community invite link" },
      { id: "sp-3", text: "Send \"What to do first\" instructions" },
      { id: "sp-verify", text: "Agent Verify:", isSubSection: true },
      { id: "sp-4", text: "Confirm they paid and completed onboarding form" },
      { id: "sp-5", text: "Confirm they joined Skool + posted an intro" },
    ],
    relatedResources: ["tfa_onboarding_registration_link", "skool_community_invite_link"]
  },
  {
    id: "day-1-setup",
    title: "Section 3: Day 1 Setup",
    subtitle: "(Within 24 Hours)",
    items: [
      { id: "d1-verify", text: "Agent Verify:", isSubSection: true },
      { id: "d1-1", text: "Agent profile completed (phone/email correct)" },
      { id: "d1-2", text: "Joined Skool + intro posted" },
      { id: "d1-3", text: "Booked Orientation (or watched orientation video)" },
      { id: "d1-4", text: "Has a working calendar + can take calls/appointments" },
    ],
    relatedResources: ["orientation_video_link", "office_hours_calendar_link"]
  },
  {
    id: "licensing-track",
    title: "Section 4: Licensing Track",
    subtitle: "(If Not Licensed Yet)",
    items: [
      { id: "lt-1", text: "Purchase/prep course" },
      { id: "lt-2", text: "Fingerprints scheduled" },
      { id: "lt-3", text: "Exam date scheduled" },
      { id: "lt-4", text: "Weekly accountability check-in with Agent" },
      { id: "lt-rule", text: "Rule:", isSubSection: true },
      { id: "lt-5", text: "No vibes: dates + proof" },
    ],
    relatedResources: []
  },
  {
    id: "contracting-tools",
    title: "Section 5: Contracting + Tools",
    subtitle: "(Week 1)",
    items: [
      { id: "ct-1", text: "Signal Advisors access (if applicable)" },
      { id: "ct-2", text: "E&O active (if required)" },
      { id: "ct-3", text: "Carrier appointment requests submitted" },
      { id: "ct-4", text: "CRM chosen and set up (Pipedrive recommended)" },
      { id: "ct-5", text: "Compliance items ready (ID, voided check, etc. if needed)" },
    ],
    relatedResources: ["signal_advisors_portal_link", "carrier_appointment_request_form_link", "pipedrive_setup_guide_link", "compliance_upload_checklist_link"]
  },
  {
    id: "training-requirements",
    title: "Section 6: Training Requirements",
    subtitle: "(Week 1–2)",
    items: [
      { id: "tr-1", text: "Required Courses in Skool complete" },
      { id: "tr-2", text: "Product basics: Term, IUL, Annuities, Living Trusts (as assigned)" },
      { id: "tr-3", text: "Illustration basics (run quotes / simple presentations)" },
      { id: "tr-4", text: "Attend live training / office hours (or watch replay)" },
      { id: "tr-verify", text: "Agent Verify:", isSubSection: true },
      { id: "tr-5", text: "Proof (screenshot) or short quiz/check-in call" },
    ],
    relatedResources: ["required_courses_link", "office_hours_calendar_link"]
  },
  {
    id: "first-money-activities",
    title: "Section 7: First Money Activities",
    subtitle: "(Week 1–2)",
    items: [
      { id: "fm-1", text: "Build Top 25 warm market list" },
      { id: "fm-2", text: "Book 5 appointments minimum (with Agent support)" },
      { id: "fm-3", text: "Roleplay intro script + appointment-setting script" },
      { id: "fm-4", text: "First 3 appointments are 3-way with agent minimum" },
      { id: "fm-verify", text: "Agent Verify:", isSubSection: true },
      { id: "fm-5", text: "Appointments scheduled in calendar" },
      { id: "fm-6", text: "Debrief after each appointment" },
    ],
    relatedResources: ["roleplay_scripts_link"]
  },
  {
    id: "first-case-written",
    title: "Section 8: First Case Written",
    subtitle: "(By Day 14–22 Goal)",
    items: [
      { id: "fc-1", text: "Needs analysis done" },
      { id: "fc-2", text: "Correct product selection" },
      { id: "fc-3", text: "App completed accurately" },
      { id: "fc-4", text: "Supporting docs attached" },
      { id: "fc-5", text: "Delivery plan set" },
      { id: "fc-verify", text: "Agent Verify:", isSubSection: true },
      { id: "fc-6", text: "Review case before submission (or Signal 2nd set of eyes)" },
    ],
    relatedResources: ["signal_advisors_portal_link"]
  },
  {
    id: "delivery-referrals",
    title: "Section 9: Delivery + Referrals",
    subtitle: "(After Approval)",
    items: [
      { id: "dr-1", text: "Delivery script practiced" },
      { id: "dr-2", text: "Ask for 2 referrals" },
      { id: "dr-3", text: "Ask for Google review (if applicable)" },
      { id: "dr-4", text: "Ask for short testimonial (optional)" },
      { id: "dr-5", text: "Post win in Skool" },
    ],
    relatedResources: ["delivery_script_link", "referral_review_script_link"]
  },
  {
    id: "30-day-scorecard",
    title: "Section 10: 30-Day Success Scorecard",
    subtitle: "(Agent Accountability)",
    items: [
      { id: "sc-header", text: "By Day 30:", isSubSection: true },
      { id: "sc-1", text: "10+ appointments completed" },
      { id: "sc-2", text: "1–3 apps submitted minimum" },
      { id: "sc-3", text: "Attending weekly training consistently" },
      { id: "sc-4", text: "CRM being used (basic is fine)" },
      { id: "sc-5", text: "Clear 90-day target with Agent" },
    ],
    relatedResources: []
  },
  {
    id: "agent-rules",
    title: "Section 11: Agent Rules",
    subtitle: "(Non-Negotiables)",
    items: [
      { id: "ar-1", text: "Set expectations + deadlines on Day 1" },
      { id: "ar-2", text: "Weekly check-ins (10–15 mins)" },
      { id: "ar-3", text: "Ensure trainings + roleplays happen" },
      { id: "ar-4", text: "No ghosting: address stalling fast" },
    ],
    relatedResources: []
  },
];

// Helper to get total item count (excluding sub-section headers)
export const getTotalCheckableItems = (): number => {
  return ONBOARDING_CHECKLIST.reduce((total, section) => {
    return total + section.items.filter(item => !item.isSubSection).length;
  }, 0);
};

// Helper to get checkable items for a section
export const getSectionCheckableItems = (section: ChecklistSection): ChecklistItem[] => {
  return section.items.filter(item => !item.isSubSection);
};
