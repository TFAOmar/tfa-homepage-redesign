

# Co-Branded Landing Page: Vanessa Sanchez x Think Tax Solutions

## Overview

Create a new co-branded landing page at `/advisors/vanessa-sanchez/think-tax-solutions` for Brennon Ploenzke's tax firm, Think Tax Solutions (Glendora, CA). This follows the exact same pattern as the existing Brandon Drew Group landing page (`/advisors/vanessa-sanchez/living-trust`), but with Think Tax Solutions branding and a focus on Living Trust + Mortgage Protection services.

---

## What Gets Built

A standalone landing page (no global navigation) co-branded with TFA and Think Tax Solutions logos. The page will feature:

- Co-branded header with TFA logo + Think Tax Solutions logo
- Hero section with Vanessa's photo and headline about Living Trust + Mortgage Protection
- Benefits section (Why a Living Trust + Mortgage Protection)
- Partnership trust section explaining the Think Tax Solutions relationship
- Lead capture form (same fields as the Brandon Drew Group version)
- "What Happens Next" process steps
- Final CTA + footer with co-branding

Leads will route to Vanessa's email and her personal Pipedrive, tagged with "Think Tax Solutions" instead of "The Brandon Group."

---

## Files to Create

### 1. Copy Think Tax Solutions Logo
- **From:** `user-uploads://image-13.png`
- **To:** `src/assets/partners/think-tax-solutions.png`

### 2. New Form Component
- **File:** `src/components/living-trust/ThinkTaxLivingTrustForm.tsx`
- Clone of `LivingTrustForm.tsx` with these changes:
  - `form_name`: `"Living Trust Inquiry - Vanessa (Think Tax Solutions)"`
  - `tags`: `["Living Trust", "Mortgage Protection", "Vanessa Sanchez", "Think Tax Solutions"]`
  - Pipedrive submission tags: `["Living Trust", "Mortgage Protection", "Think Tax Solutions"]`

### 3. New Page Component
- **File:** `src/pages/VanessaThinkTaxSolutions.tsx`
- Clone of `VanessaLivingTrust.tsx` with these changes:
  - Replace Brandon Drew Group logo with Think Tax Solutions logo
  - Update partnership text: "Think Tax Solutions and The Financial Architects have partnered..."
  - Update hero headline to include Mortgage Protection emphasis
  - Update SEO metadata for the new URL
  - Import `ThinkTaxLivingTrustForm` instead of `LivingTrustForm`

---

## Files to Modify

### 4. App.tsx (Router + Standalone Config)
- Add import for `VanessaThinkTaxSolutions`
- Add route: `/advisors/vanessa-sanchez/think-tax-solutions`
- Add path to `standalonePages` array

---

## Key Differences from Brandon Drew Group Page

| Aspect | Brandon Drew Group | Think Tax Solutions |
|--------|-------------------|-------------------|
| Partner | Robert & Colleen Olivas | Brennon Ploenzke |
| Location | N/A | Glendora, CA |
| Logo | `the-brandon-group.png` | `think-tax-solutions.png` |
| Services Focus | Living Trust only | Living Trust + Mortgage Protection |
| URL | `/advisors/vanessa-sanchez/living-trust` | `/advisors/vanessa-sanchez/think-tax-solutions` |
| Form Tags | `["Living Trust", "The Brandon Group"]` | `["Living Trust", "Mortgage Protection", "Think Tax Solutions"]` |
| Pipedrive | `vanessa-pipedrive-submit` | Same function, different tags |

---

## Lead Routing

All form submissions will:
1. Submit to `pipedrive-submit` for general email notification to `vsanchez@tfainsuranceadvisors.com` and `leads@tfainsuranceadvisors.com`
2. Submit to `vanessa-pipedrive-submit` as a Lead in Vanessa's personal Pipedrive, tagged with "Think Tax Solutions"

---

## Technical Notes

- The Think Tax Solutions logo has a black background; the co-branded header uses a white background per design standards, so the logo will display cleanly with its dark styling against white
- Page follows the standalone layout pattern (no global nav/footer)
- Form reuses the same validation schema, honeypot protection, confetti celebration, and shake-on-error animations
- The Mortgage Protection interest is captured via tags for Pipedrive filtering

