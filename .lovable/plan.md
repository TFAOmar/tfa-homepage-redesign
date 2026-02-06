
# Update American Way Health Landing Page

## Overview
This plan adds comprehensive content from the American Way Health website, including their phone CTA, enhanced form fields, insurance plans information, "Why Us" features, about section, insurance carrier logos, and required legal disclaimers.

---

## Content Sections to Add

### 1. Phone Number CTA Banner
Add a prominent call-now banner at the top of the hero with the phone number **888-669-7553**.

### 2. Enhanced Hero Section
Update hero with:
- "GET FREE INSURANCE QUOTES NOW"
- "EASY WAY TO SHOP FOR INSURANCE"
- "GET EXACTLY WHAT YOU NEED"
- "PERSONAL PLANS / FAMILY PLANS / GROUP PLANS"

### 3. Enhanced Quote Form
Expand the form to include:
- First Name, Last Name (existing)
- Email (existing)
- Phone with character limit indicator
- Yearly income dropdown (Under $30K, $30K-$50K, $50K-$75K, $75K-$100K, Over $100K)
- Date of Birth (MM/DD/YYYY fields)
- ZIP Code
- Insurance type dropdown (existing, expanded)
- Terms & Conditions checkbox with consent text
- "Call Now" button for instant quote

### 4. Insurance Plans Section
New section explaining the coverage types:
- Short-Term, Long-Term, Marketplace Plans
- Individual, Family, Group
- Accident, Catastrophic, Critical Illness, Cancer
- ACA/Marketplace Plans explanation with Open Enrollment info

### 5. "Why Us?" Section
Add the 5 key features:
1. Live licensed health insurance agents
2. Create and view your Payment Statements
3. Review your Explanations of Benefits
4. Print and order your ID cards
5. Locate Preferred Providers in your network

### 6. About American Way Health Section
Company description and value proposition:
- "We take the confusion out of buying insurance"
- Quote: "WE OFFER THE BEST PLANS FOR YOU AND YOUR FAMILY"
- Contact information display

### 7. Insurance Companies Section
Add carrier logo grid with the 10 uploaded insurance carrier logos:
- Cigna, Humana, Aetna, Ambetter Health, Molina Healthcare
- BlueCross BlueShield, Oscar, United Healthcare, First Health Network
- Health Insurance Marketplace

### 8. Legal Disclaimer Footer
Add the comprehensive legal disclaimer including:
- Licensing information (35 states)
- Independent broker status
- Agent compensation disclosure
- Medicare disclaimer
- Subsidy/premium information

---

## Files to Create/Modify

### New Assets (10 carrier logos)
Copy uploaded logos to `src/assets/carriers/health/`:
- cigna.png
- humana.png
- aetna.png
- ambetter-health.png
- molina-healthcare.png
- bluecross-blueshield.png
- oscar.png
- united-healthcare.png
- first-health-network.png
- health-insurance-marketplace.png

### Modify: `src/components/health-insurance/AmericanWayHealthForm.tsx`
- Add yearly income field
- Add date of birth fields (MM/DD/YYYY)
- Add ZIP code field
- Add terms & conditions checkbox with consent text
- Update form schema with new required fields

### Modify: `src/pages/AmericanWayHealth.tsx`
Major restructure to include:
- Phone CTA banner in header
- Enhanced hero messaging
- "Call Now" button with tel: link
- New Insurance Plans section
- "Why Us?" section with numbered list
- About American Way Health section
- Insurance Companies logo grid
- Legal disclaimer in footer

---

## Technical Details

### Form Schema Updates
```typescript
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10).max(11, "Phone must be 10-11 characters"),
  yearlyIncome: z.string().min(1, "Please select yearly income"),
  dobMonth: z.string().min(1, "Month is required"),
  dobDay: z.string().min(1, "Day is required"),
  dobYear: z.string().min(4, "Year is required"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
  insuranceType: z.string().min(1, "Please select insurance type"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" })
  }),
  message: z.string().optional(),
});
```

### New Data Arrays
```typescript
const whyUsFeatures = [
  "Live licensed health insurance agents.",
  "Create and view your Payment Statements.",
  "Review your Explanations of Benefits.",
  "Print and order your ID cards.",
  "Locate Preferred Providers in your network.",
];

const insuranceCarriers = [
  { name: "Cigna", logo: cignaLogo },
  { name: "Humana", logo: humanaLogo },
  // ... etc
];
```

### Phone Number Constant
```typescript
const PHONE_NUMBER = "888-669-7553";
const PHONE_TEL = "tel:+18886697553";
```

---

## UI Design Approach

- Maintain existing dark gradient theme (from-primary via-navy to-primary)
- Use glassmorphic cards (bg-white/10 backdrop-blur-sm border-white/10)
- Accent color for CTAs and highlights
- White background sections for carrier logos (better logo visibility)
- Numbered list styling for "Why Us" section
- Compact legal disclaimer with smaller text

---

## Expected Outcome

The updated page will include:
- Prominent phone CTA throughout (888-669-7553)
- More comprehensive lead capture form
- Educational content about insurance options
- Trust-building carrier logos section
- Required legal disclosures
- Multiple conversion paths (form + phone)
