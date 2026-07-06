## Goal
Create a fully Spanish version of the Estate Planning page, reachable at `/es/services/estate-planning`, so you can point a QR code directly to it. Both the English and Spanish pages get a small EN/ES language toggle in the hero for cross-navigation.

## Changes

### 1. New page: `src/pages/EstatePlanningES.tsx`
- Full Spanish translation of `EstatePlanning.tsx` (hero, stats, "Why Estate Planning Matters", services grid, Living Trust deep-dive, "How It Works", FAQ, final CTA, and the embedded consultation form section heading).
- Spanish SEO metadata:
  - Title: "Planificación Patrimonial y Fideicomisos en Vida"
  - Description: Spanish equivalent focused on evitar el proceso de sucesión (probate) y proteger a la familia.
  - `canonical`: `${siteConfig.url}/es/services/estate-planning`
  - `<html lang="es">` set via SEOHead if supported, plus `hreflang` alternates linking EN ↔ ES.
- Reuses existing `EstatePlanningForm` component (form field labels stay as-is; only page copy is translated). If you want the form itself translated too, that's a follow-up.
- FAQ items and JSON-LD schemas translated to Spanish.

### 2. Small EN/ES toggle
- Add a compact language switch pill at the top of the hero on both pages (e.g. `EN | ES`).
- Clicking navigates between `/services/estate-planning` and `/es/services/estate-planning`.
- Purely presentational — no i18n library, no context.

### 3. Route registration in `src/App.tsx`
- Import `EstatePlanningES`.
- Add `<Route path="/es/services/estate-planning" element={<EstatePlanningES />} />` alongside the existing English route.

### 4. `hreflang` + sitemap
- Add `<link rel="alternate" hreflang="es" href=".../es/services/estate-planning" />` and matching `en` alternate on both pages via SEOHead.
- Add the new URL to `public/sitemap.xml`.

## Out of scope
- Translating the consultation form fields, Header, Footer, or FloatingCTA (they remain in English on the Spanish page).
- Building a site-wide i18n system.
- Generating the QR code itself — once deployed, you can point any QR generator at `https://tfawealthplanning.com/es/services/estate-planning`.

## Technical notes
- No new dependencies.
- Spanish translation done by me directly in the JSX; you can tweak wording after review.
- SEOHead already supports `canonical`; I'll extend the component only if needed to accept `alternates` — otherwise I'll inject the hreflang tags via `react-helmet` inline in the page.
