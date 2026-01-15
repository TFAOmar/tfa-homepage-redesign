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
];

// Helper to get resource by key
export const getResourceByKey = (key: string): OnboardingResource | undefined => {
  return ONBOARDING_RESOURCES.find(r => r.key === key);
};

// Helper to get multiple resources by keys
export const getResourcesByKeys = (keys: string[]): OnboardingResource[] => {
  return keys.map(key => getResourceByKey(key)).filter((r): r is OnboardingResource => r !== undefined);
};
