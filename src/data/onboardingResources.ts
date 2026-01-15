/**
 * ONBOARDING RESOURCES CONFIGURATION
 * 
 * Edit this file to update resource links shown on the onboarding checklist.
 * 
 * Each resource has:
 * - key: unique identifier (used to link resources to checklist sections)
 * - title: display name shown on the card
 * - description: brief description of the resource
 * - url: the link URL (update these with actual links)
 * - buttonText: text shown on the CTA button
 * 
 * To add a new resource:
 * 1. Add a new object to the ONBOARDING_RESOURCES array below
 * 2. Use a unique key that describes the resource
 * 3. Reference the key in onboardingChecklist.ts relatedResources array
 */

export interface OnboardingResource {
  key: string;
  title: string;
  description: string;
  url: string;
  buttonText: string;
}

export const ONBOARDING_RESOURCES: OnboardingResource[] = [
  {
    key: "tfa_onboarding_registration_link",
    title: "TFA Onboarding Registration",
    description: "NDA + $49.99 onboarding fee payment form for new agents",
    url: "https://app.tfawealthplanning.com/",
    buttonText: "Open Registration"
  },
  {
    key: "skool_community_invite_link",
    title: "Skool Community",
    description: "Join the TFA agent community for training, support, and networking",
    url: "https://www.skool.com/tfa/about",
    buttonText: "Join Skool"
  },
  {
    key: "orientation_video_link",
    title: "Orientation Video",
    description: "Watch the new agent orientation and get started on the right foot",
    url: "https://placeholder.com/orientation-video",
    buttonText: "Watch Video"
  },
  {
    key: "required_courses_link",
    title: "Required Courses",
    description: "Complete all required training courses in the Skool platform",
    url: "https://placeholder.com/required-courses",
    buttonText: "View Courses"
  },
  {
    key: "office_hours_calendar_link",
    title: "Office Hours Calendar",
    description: "Book time for live training sessions and Q&A with leadership",
    url: "https://placeholder.com/office-hours",
    buttonText: "View Calendar"
  },
  {
    key: "pipedrive_setup_guide_link",
    title: "Pipedrive Setup Guide",
    description: "Step-by-step guide to setting up your CRM for lead management",
    url: "https://www.pipedrive.com/en/programlp?utm_medium=Affiliate&utm_source=b17739830578&utm_campaign=risingaffiliate&pscd=aff.trypipedrive.com&ps_partner_key=YjE3NzM5ODMwNTc4&ps_xid=s908biY4T8ixWH&gsxid=s908biY4T8ixWH&gspk=YjE3NzM5ODMwNTc4",
    buttonText: "View Guide"
  },
  {
    key: "signal_advisors_portal_link",
    title: "Signal Advisors Portal",
    description: "Access Signal Advisors for case support and second opinions",
    url: "https://portal.signaladvisors.com/",
    buttonText: "Open Portal"
  },
  {
    key: "carrier_appointment_request_form_link",
    title: "Carrier Appointment Request",
    description: "Submit requests for carrier appointments and contracting",
    url: "https://placeholder.com/carrier-appointments",
    buttonText: "Request Appointment"
  },
  {
    key: "compliance_upload_checklist_link",
    title: "Compliance Upload Checklist",
    description: "Upload required compliance documents (ID, voided check, etc.)",
    url: "https://placeholder.com/compliance-upload",
    buttonText: "Upload Documents"
  },
  {
    key: "roleplay_scripts_link",
    title: "Roleplay Scripts",
    description: "Practice scripts for intro calls and appointment setting",
    url: "https://placeholder.com/roleplay-scripts",
    buttonText: "View Scripts"
  },
  {
    key: "delivery_script_link",
    title: "Delivery Script",
    description: "Script for policy delivery and client follow-up",
    url: "https://placeholder.com/delivery-script",
    buttonText: "View Script"
  },
  {
    key: "referral_review_script_link",
    title: "Referral & Review Script",
    description: "Templates for asking for referrals and Google reviews",
    url: "https://placeholder.com/referral-scripts",
    buttonText: "View Templates"
  },
];

// Helper to get resource by key
export const getResourceByKey = (key: string): OnboardingResource | undefined => {
  return ONBOARDING_RESOURCES.find(r => r.key === key);
};

// Helper to get multiple resources by keys
export const getResourcesByKeys = (keys: string[]): OnboardingResource[] => {
  return keys.map(key => getResourceByKey(key)).filter((r): r is OnboardingResource => r !== undefined);
};
