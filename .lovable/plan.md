## Rebuild `/homeowner-protection` from the provided design

Replace the current squeeze page markup with the design from `Homeowner Checkup Landing Export.dc.html`, while keeping all existing backend wiring intact (Pipedrive routing to Mariah, honeypot hook, UTM capture, SEO noindex, standalone layout).

### What changes

Rewrite `src/pages/HomeownerProtection.tsx` only. No other files touched.

**Visual/structural (from the design):**
- White logo strip header (`#FFFFFF` bg, subtle border) — TFA stacked logo, 46px tall, no `brightness-0 invert` (logo on white).
- Navy gradient hero (`linear-gradient(135deg, #1E3A5F, #3D5A80, #1E3A5F)`) with two soft gold radial glows, gold eyebrow "FOR HOMEOWNERS", H1 "A Quick Financial Checkup" with gold second line "for Homeowners.", supporting subhead.
- White form card overlapping the hero (`margin-top: -88px`, rounded 20px, shadow), max width 620px.
- Form fields: Full name, Email + Phone (2-col responsive grid), then three "topic" toggle cards (Living Trust / Mortgage Protection / Retirement & Income Planning) with icon pill + selected checkbox on the right (navy filled when selected, gold accent).
- Consent checkbox with explicit contact-consent copy.
- Gold pill CTA "Get My Free Review" with hover state (navy on hover).
- Trust line under CTA: shield icon + "Licensed professionals · No obligation · Completely confidential".
- Success state: gold circle with checkmark, "Thanks — request received.", "A licensed advisor will reach out within 1 business day."
- Slim footer with copyright + Privacy Policy link.
- Animations: `tfaFadeUp` on hero + card, `tfaShake` on validation errors, `tfaPop` on success icon.
- Inject Inter font via Google Fonts `<link>` (already the brand font, matches design).

**Kept from current implementation:**
- `useHoneypot` hook + `honeypotClassName` (design's own honeypot swapped for our project-standard one, per Core memory rule).
- `submitForm` call — same payload shape, still routes to `mariah@tfainsuranceadvisors.com` / `mariah-lorenzen` with the same tags/notes and UTM params.
- UTM + `referral_partner` + `lead_source` capture from query string.
- `SEOHead` with `noIndex`.
- Route stays `/homeowner-protection`, still in `standalonePages`.
- react-hook-form + zod validation (mapped to the design's inline error styling).

**Color tokens:** Use the exact hex values from the design (`#1E3A5F` navy, `#C9A84C`/`#E4B548` gold, `#FAFAFA` bg, `#283845` text, `#65728A` muted, `#D8DEE7` border, `#EF4444` error). Design uses inline styles per the source — I'll keep inline styles for the hero/card/buttons to match the design exactly and avoid Tailwind purge issues on dynamic values (consistent with the project Core rule about inline styles for dynamic styling). Semantic tokens are already navy/gold in `index.css`, so nothing conflicts.

### Out of scope
- No changes to `submitForm`, edge functions, routing, or other pages.
- Design's Supabase/webhook code is discarded — we already have working Pipedrive submission.
- Compliance/consent copy uses the exact wording from the design (user's approved copy).

### Files
- `src/pages/HomeownerProtection.tsx` — full rewrite.
