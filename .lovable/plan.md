

# Create Israel Castaneda Dedicated Landing Page

## Summary
Create a dedicated landing page for Israel Castaneda at `/advisors/israel-castaneda` following the established TFA advisor page pattern, featuring booking and contact modals, SEO optimization, and his unique specialties as a bilingual financial strategist in Fresno.

---

## Israel Castaneda Profile Data

| Field | Value |
|-------|-------|
| Name | Israel Castaneda |
| Title | Partner |
| Location | Fresno, California |
| Office | 7621 N Del Mar Ave, Unit 102, Fresno, CA 93711 |
| Email | israel@tfainsuranceadvisors.com |
| License | Life & Health (Lic# 0I35205) |
| Specialties | Bilingual, Life Insurance, Retirement Planning, Estate Planning, Tax Strategies |

---

## Page Structure

Following the established pattern (Hero → About → Services → Process → CTA):

### 1. Hero Section
- Badge: "Partner" with bilingual indicator
- Tagline: "Building Generational Security for Your Family"
- Location: Fresno, California with office address
- CTA buttons: Book a Consultation, Contact Me, Start Life Insurance Application

### 2. About Section
- Emphasis on bilingual service and Central California presence
- Focus on generational security and estate protection
- Highlight clear communication and genuine care philosophy

### 3. Services Section (6 Cards)
| Service | Icon | Focus |
|---------|------|-------|
| Life Insurance | Shield | Family protection and wealth building |
| Retirement Planning | Target | Long-term financial independence |
| Estate Planning | FileText | Living trusts and legacy preservation |
| Tax Strategies | TrendingUp | Wealth retention and optimization |
| Generational Wealth | Users | Multi-generational security |
| Bilingual Services | Globe | Spanish-language financial guidance |

### 4. Process Section (4 Steps)
1. Discovery Meeting - Understand family goals and situation
2. Comprehensive Analysis - Review complete financial picture
3. Strategy Presentation - Customized plan presentation
4. Implementation & Support - Ongoing guidance

### 5. CTA Section
- Final call to action with consultation booking
- Phone number and life insurance application link

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/pages/AdvisorIsraelCastaneda.tsx` | CREATE | New landing page component |
| `src/App.tsx` | MODIFY | Add route and import |

---

## Technical Implementation

### Page Component Structure
```typescript
// src/pages/AdvisorIsraelCastaneda.tsx
import israelImage from "@/assets/advisors/israel-castaneda.jpg";
import ScheduleModal from "@/components/advisors/ScheduleModal";
import ContactModal from "@/components/advisors/ContactModal";
import { SEOHead, JsonLd } from "@/components/seo";

// Specialties array (page-specific labels)
const specialties = [
  "Life Insurance",
  "Retirement Planning",
  "Estate Planning",
  "Tax Strategies",
  "Generational Wealth",
  "Bilingual Services"
];

// Services with tailored descriptions
// Process steps with family-focused messaging
```

### Route Addition
```typescript
// In src/App.tsx - imports
import AdvisorIsraelCastaneda from "./pages/AdvisorIsraelCastaneda";

// In Routes
<Route path="/advisors/israel-castaneda" element={<AdvisorIsraelCastaneda />} />
```

---

## SEO Configuration

| Element | Value |
|---------|-------|
| Title | Israel Castaneda - Partner at The Financial Architects |
| Description | Work with Israel Castaneda, bilingual Financial Partner serving Fresno and Central California. Expert in life insurance, retirement planning, and estate protection. |
| Canonical | /advisors/israel-castaneda |
| Keywords | bilingual financial advisor Fresno, life insurance Fresno, retirement planning Central California |

---

## Modal Configuration

### Schedule Modal
```typescript
<ScheduleModal
  advisorName="Israel Castaneda"
  advisorEmail="israel@tfainsuranceadvisors.com"
  advisorImage={israelImage}
/>
```

### Contact Modal
```typescript
<ContactModal
  advisorName="Israel Castaneda"
  advisorEmail="israel@tfainsuranceadvisors.com"
  advisorImage={israelImage}
/>
```

---

## Unique Differentiators for Israel's Page

1. **Bilingual Badge** - Prominent "Bilingual • Bilingue" indicator in hero
2. **Office Address** - Display the new Fresno office location prominently
3. **Central California Focus** - Position as TFA's Central Valley presence
4. **Generational Wealth Theme** - Consistent messaging about multi-generational security
5. **Life Insurance Application Link** - Direct link to `/advisors/israel-castaneda/life-insurance`

---

## After Implementation

- Israel Castaneda will have a dedicated landing page at `/advisors/israel-castaneda`
- Booking modal will capture leads and route to israel@tfainsuranceadvisors.com
- Contact modal will enable direct communication
- SEO schema will be properly configured for search visibility
- Life insurance application flow will be accessible from the page
- The Fresno office address will be prominently displayed

