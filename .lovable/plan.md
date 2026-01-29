

# Add Elena Esquivel Advisor Profile Page

## Summary
Create a dedicated advisor profile page for **Elena Esquivel** at `/advisors/elena-esquivel`. Elena already has a complete directory entry and photo in the system—she just needs a full landing page.

---

## Elena's Background (from existing data)

- **Title**: Financial Strategist & Estate Planning Consultant
- **Location**: Chino Hills, CA
- **Experience**: 15+ years in Insurance and Financial Services
- **Notable Achievement**: Top producer at Kaiser Permanente for 5 consecutive years
- **Credentials**: Life & Health License (Lic# 4218087)
- **Languages**: Bilingual (Spanish/English)

**Specialties**:
- Medicare Planning
- Retirement Planning
- 401(k) Guidance
- Estate Planning
- Tax Strategies
- Life Insurance

---

## Files to Create

### 1. Advisor Profile Page
**File**: `src/pages/AdvisorElenaEsquivel.tsx`

Following the established pattern (like Erica Valenzuela), the page will include:

**Hero Section**:
- Photo, bilingual badge, name, tagline
- "Book a Consultation" and "Contact Me" buttons
- Phone: (951) 255-4997
- Email: eeesquivel@tfainsuranceadvisors.com

**About Section**:
- Enhanced biography highlighting her Kaiser Permanente success
- 15+ years of experience
- Specialties badges

**Services Section** (6 cards tailored to her expertise):
1. **Medicare Planning** - Navigate Medicare options with confidence
2. **Retirement Planning** - Sustainable income strategies for your golden years
3. **401(k) Guidance** - Smart rollover and optimization strategies
4. **Estate Planning** - Living trusts and legacy protection
5. **Tax Strategies** - Wealth-preservation and tax-efficient planning
6. **Life Insurance** - Income protection for you and your family

**Process Section** (4 steps):
1. Discovery - Understand your goals and current situation
2. Analysis - Review coverage, gaps, and opportunities
3. Strategy - Develop a customized plan
4. Implementation - Guide you through execution with ongoing support

**CTA Section**:
- Schedule consultation button
- Link to Living Trust Questionnaire

**Modals**:
- ScheduleModal for consultation booking
- ContactModal for direct inquiries

---

## Files to Modify

### 2. App.tsx

**Add import**:
```typescript
import AdvisorElenaEsquivel from "./pages/AdvisorElenaEsquivel";
```

**Add route**:
```typescript
<Route path="/advisors/elena-esquivel" element={<AdvisorElenaEsquivel />} />
```

### 3. src/data/advisors.ts

**Add `landingPage` property** to Elena's existing entry:
```typescript
landingPage: "/advisors/elena-esquivel"
```

This enables the "View Full Profile" button in the directory.

---

## Technical Details

### Contact Information
- **Phone**: (951) 255-4997
- **Email**: eeesquivel@tfainsuranceadvisors.com
- **Location**: Chino Hills, CA

### Email Routing
Form submissions will route to:
- `eeesquivel@tfainsuranceadvisors.com` (Elena's direct email)
- `leads@tfainsuranceadvisors.com` (via standard form handler CC)

### SEO Configuration
- **URL**: `/advisors/elena-esquivel`
- **Keywords**: Elena Esquivel, Medicare planning, retirement planning, 401k rollover, estate planning, bilingual, Chino Hills CA

---

## Summary of All Files

| Action | File |
|--------|------|
| Create | `src/pages/AdvisorElenaEsquivel.tsx` - Full profile page |
| Modify | `src/App.tsx` - Add import and route |
| Modify | `src/data/advisors.ts` - Add `landingPage` property |

---

## After Implementation

1. Elena will have her "View Full Profile" button active in the advisor directory
2. Her profile page will be accessible at `/advisors/elena-esquivel`
3. Form submissions will route to her email with proper lead tracking
4. Her Kaiser Permanente background and 15+ years experience will be prominently featured

