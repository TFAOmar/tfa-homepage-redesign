# Simplify Header on /trust and /protect

Give the `/trust` and `/protect` landing pages a focused landing-page header (logo + single CTA, no site nav) instead of the full website header. Footer and global sticky mobile CTA are also removed to keep them fully standalone landing pages.

## Changes

1. **Create `src/components/LandingHeader.tsx`**
   - Sticky top bar, white background, subtle border/shadow.
   - Left: TFA logo (`@/assets/tfa-logo.png`) linking to `/`.
   - Right: single "Book Consultation" button linking to `/book-consultation` (hidden on very small screens where the page already has its own CTA if needed — keep visible by default).
   - No nav menu, no mobile hamburger, no Resources/Services dropdowns, no cart, no Agent Login.

2. **`src/App.tsx`**
   - Add `/trust` and `/protect` to the existing `standalonePages` array so the global `Header`, `Footer`, and `FloatingCTA` are not rendered on those routes.

3. **`src/pages/Trust.tsx` and `src/pages/Protect.tsx`**
   - Import and render `<LandingHeader />` at the top of the page.
   - Leave the rest of the page content untouched (hero, quoter section, existing compliance footer text on Trust, etc.).

## Out of scope

- No changes to page copy, hero, quoter embed, or compliance disclosures.
- No changes to any other route.
