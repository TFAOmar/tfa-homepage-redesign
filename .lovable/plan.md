## Goals

1. Fix mobile layout collision on `/start` between the sticky "Book Consultation" header button and the floating EN/ES language toggle.
2. Create a Minh-specific booking page that is tracked as a Minh partner lead — used by the `/start` header CTA (and any other Minh-associated surfaces).

## Changes

### 1. Fix `/start` mobile header/toggle collision

In `src/pages/Start.tsx`, the `LangToggle` is `fixed top-3 right-3` and overlaps the sticky `LandingHeader` CTA button on mobile.

Move the language toggle **into** the `LandingHeader` (left of the CTA) instead of floating it. Approach:
- Add an optional `rightSlot?: React.ReactNode` prop to `LandingHeader` rendered before the CTA button (with a small gap).
- In `Start.tsx`, remove the `fixed` `LangToggle` wrapper and pass `<LangToggle />` as `rightSlot` to `LandingHeader`.

This eliminates the overlap on every viewport without any absolute positioning hacks.

### 2. New Minh-branded booking page `/book/minh`

Create `src/pages/BookConsultationMinh.tsx` — a trimmed variant of `BookConsultation.tsx` styled with `LandingHeader` (no global header/footer, matching the `/start` and `/protect` landing pattern). It will:
- Use the same booking form fields as `BookConsultation`.
- Hardcode `partner_slug: "minh"` on the submission.
- Tag the lead/form submission `source` as `book-minh` and include `utm_source=minh`, `utm_campaign=book-minh` fallbacks so it shows in Minh's partner dashboards (the existing `admin_list_partner_leads` / `PartnerLegacyLeadsPanel` already keys off `partner_slug` and utm/notes containing "minh").
- Show a subtle "Referred through Minh" badge in the hero, mirroring the `/start` referrer badge treatment.
- Include Minh-appropriate SEO (`noindex` to keep it off the sitemap since it's a referral page).

Register the route in `src/App.tsx` and add `/book/minh` to the `standalonePages` array so the global header/footer/FloatingCTA are suppressed.

### 3. Wire `/start` header CTA to the new page when the visitor is Minh's

Update `src/pages/Start.tsx` so the `LandingHeader` `ctaHref` is:
- `/book/minh` when `refSlug === "minh"` OR when the loaded `referrer.slug === "minh"`.
- `/book-consultation` (unchanged) otherwise.

This keeps the CTA generic for other partners/direct traffic and Minh-specific for Minh's referral links.

### 4. Tracking

No schema changes required — `leads.partner_slug` and `form_submissions.partner_slug` already exist and are surfaced in the admin/partner dashboards. Every submission from `/book/minh` will:
- Persist `partner_slug = "minh"`.
- Appear under Minh in `/admin/partners` → "View leads" and in Minh's `/concierge` partner dashboard via `PartnerLegacyLeadsPanel`.

## Technical notes

- `LangToggle` currently lives in `src/lib/i18n/LanguageContext.tsx` and requires `LanguageProvider` context, which already wraps `StartInner` — safe to render inside `LandingHeader` from `Start.tsx`.
- `standalonePages` list is in `src/App.tsx`; add `/book/minh` there.
- The Minh partner record and edge-function notification CC logic already exist from prior work, so no edge function changes are needed.

## Out of scope

- Redesigning `/book-consultation` for other partners (can be generalized to `/book/:partnerSlug` later if more partners want branded booking pages).
- Changing GHL forwarding logic.
