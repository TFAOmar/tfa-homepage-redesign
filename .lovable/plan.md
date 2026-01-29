

# Add Erica Valenzuela Advisor Profile & Living Trust Landing Page

## Summary
Create a complete advisor presence for **Erica Valenzuela**, including:
1. Static advisor directory entry with enhanced biography
2. Dedicated advisor profile page at `/advisors/erica-valenzuela`
3. Standalone Living Trust landing page at `/advisors/erica-valenzuela/living-trust`
4. Custom Living Trust form component for lead capture

---

## Enhanced Biography

Based on the provided information, here's an improved bio that highlights Erica's unique background and approach:

> **"Erica Valenzuela understands the realities of high-stress professions—and the importance of planning for the unexpected. With a background in corrections, she brings a grounded, steady approach to financial education, helping families in demanding careers protect what matters most.**
>
> **Specializing in protection planning with a focus on Living Trust awareness, Erica empowers clients to make informed decisions about their family's future. Her calm, education-first philosophy ensures you'll feel supported and confident at every step.**
>
> **As a licensed Notary, Real Estate Professional, and Life Insurance Specialist, Erica provides a unique, well-rounded perspective—bridging real estate, protection planning, and estate awareness into a cohesive strategy for families who need their plan to work when it counts."**

---

## Files to Create

### 1. Advisor Photo
**Copy:** `user-uploads://Erica_Valenzuela.jpg` → `src/assets/advisors/erica-valenzuela.jpg`

### 2. Advisor Directory Entry
**File:** `src/data/advisors.ts`

Add import and entry:
```typescript
import ericaValenzuelaImg from "@/assets/advisors/erica-valenzuela.jpg";

// Add to advisors array:
{
  id: "erica-valenzuela",
  name: "Erica Valenzuela",
  title: "Financial Strategist",
  type: "Advisor",
  state: "California",
  city: "Chino Hills",  // Assuming based on TFA HQ
  region: "West",
  bio: "Erica brings a grounded, steady approach to financial education, helping families in demanding careers—including corrections and first responders—protect what matters most. Specializing in protection planning with a focus on Living Trust awareness, she empowers clients to make informed decisions with a calm, education-first philosophy.",
  specialties: ["Bilingual • Bilingüe", "Living Trust Planning", "Life Insurance", "Estate Planning", "Real Estate"],
  licenses: ["Life & Health", "Notary Public", "Real Estate"],
  image: ericaValenzuelaImg,
  email: "evalenzuela@tfainsuranceadvisors.com",
  phone: "(909) 455-3878",
  landingPage: "/advisors/erica-valenzuela"
}
```

### 3. Advisor Profile Page
**File:** `src/pages/AdvisorEricaValenzuela.tsx`

Structure following established pattern (like AdvisorFabianSerrano):
- **Hero Section** with photo, badge, name, tagline, contact buttons
- **About Section** highlighting corrections background and education-first approach
- **Services Section** (6 cards): Living Trust Planning, Life Insurance, Estate Planning, Real Estate Solutions, Protection Planning, Financial Education
- **Process Section** (4 steps): Discovery → Analysis → Strategy → Implementation
- **CTA Section** with Living Trust Questionnaire button
- **Modals**: ScheduleModal and ContactModal

Key differentiators to highlight:
- Background in corrections (understands high-stress professions)
- Notary, Real Estate, and Life License credentials
- Education-driven approach
- Focus on Living Trust awareness
- Bilingual capability (gold badge)

### 4. Living Trust Landing Page
**File:** `src/pages/EricaValenzuelaLivingTrust.tsx`

Standalone page structure following BraihyraLivingTrust pattern:
- **TFA-Only Header** (no co-branding needed)
- **Hero Section** with photo and headline
- **Benefits Section** (4 cards): Avoid Probate, Protect Privacy, Maintain Control, Reduce Family Stress
- **About Erica Section** emphasizing her corrections background and calm approach
- **Form Section** with custom lead capture form
- **What Happens Next Section** (3 steps)
- **Final CTA Section** with phone/email
- **Footer**

### 5. Living Trust Form Component
**File:** `src/components/living-trust/EricaValenzuelaLivingTrustForm.tsx`

Custom form that:
- Collects: Name, Email, Phone, Marital Status, Property Ownership, Estate Value, Preferred Contact, Best Time
- Routes to: `evalenzuela@tfainsuranceadvisors.com`
- Tags: `["Living Trust", "Erica Valenzuela"]`
- Uses standard form submission via `submitForm()`
- Includes honeypot protection and confetti celebration

---

## Files to Modify

### 6. App.tsx Routes & Standalone Pages

Add imports:
```typescript
import AdvisorEricaValenzuela from "./pages/AdvisorEricaValenzuela";
import EricaValenzuelaLivingTrust from "./pages/EricaValenzuelaLivingTrust";
```

Add to standalonePages array:
```typescript
'/advisors/erica-valenzuela/living-trust'
```

Add routes:
```typescript
<Route path="/advisors/erica-valenzuela" element={<AdvisorEricaValenzuela />} />
<Route path="/advisors/erica-valenzuela/living-trust" element={<EricaValenzuelaLivingTrust />} />
```

---

## Technical Details

### Specialties & Badges
- **Primary Badge**: "Bilingual • Bilingüe" (gold styling per TFA pattern)
- **Credentials**: Notary, Real Estate, Life License

### Email Routing
- Form submissions route to: `evalenzuela@tfainsuranceadvisors.com`
- CC: `leads@tfainsuranceadvisors.com` (via standard form handler)

### SEO Configuration
- Profile: `/advisors/erica-valenzuela`
- Living Trust: `/advisors/erica-valenzuela/living-trust`
- Keywords: living trust, estate planning, corrections, first responders, bilingual

### Contact Information
- Phone: (909) 455-3878
- Email: evalenzuela@tfainsuranceadvisors.com
- Location: California (Chino Hills area based on TFA HQ)

---

## Summary of All Files

| Action | File |
|--------|------|
| Copy | `user-uploads://Erica_Valenzuela.jpg` → `src/assets/advisors/erica-valenzuela.jpg` |
| Modify | `src/data/advisors.ts` - Add import + advisor entry |
| Create | `src/pages/AdvisorEricaValenzuela.tsx` - Full profile page |
| Create | `src/pages/EricaValenzuelaLivingTrust.tsx` - Standalone landing page |
| Create | `src/components/living-trust/EricaValenzuelaLivingTrustForm.tsx` - Lead form |
| Modify | `src/App.tsx` - Add imports, routes, and standalone page path |

---

## After Implementation

1. Erica will appear in the advisor directory with bilingual badge
2. Her profile page will be accessible at `/advisors/erica-valenzuela`
3. Living Trust landing page available at `/advisors/erica-valenzuela/living-trust`
4. Form submissions will route to her email with proper lead tracking
5. She can use the Living Trust page for QR codes and lead generation

