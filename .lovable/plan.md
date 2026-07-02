## Homeowner Protection Squeeze Page

Build a minimal, mobile-first lead-capture page at `/homeowner-protection` routed to Mariah Lorenzen.

### Route & File
- New page: `src/pages/HomeownerProtection.tsx`
- Register in `src/App.tsx` and add to the `standalonePages` array so Header/Footer/FloatingCTA are excluded (per project memory).

### Page Structure (single screen)
1. **Minimal header** — TFA logo only (links to `/`), no nav
2. **Hero** — Headline "Protect What You've Worked Hard to Build" + subhead "Tell us what matters most to your family — takes under 30 seconds."
3. **Lead form card** (above fold on mobile):
   - Interest multi-select cards: Trust / Estate Planning, Mortgage Protection, Retirement Planning
   - Full Name, Phone (tel), Email, ZIP Code
   - Consent line
   - Full-width brand-colored submit: "Request My Free Consultation"
   - Trust line: "Licensed professionals. Your information is never sold."
4. **Thank-you state** — replaces form in place with confirmation copy

### Hidden / captured fields
Auto-read from URL query string on mount and included in submission payload:
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`
- `referral_partner`, `lead_source`

### Data Handling
- Use existing `submitForm` helper (`src/lib/formSubmit.ts`) → `pipedrive-submit` edge function.
- Payload:
  - `form_name`: "Homeowner Protection Squeeze"
  - `advisor_email`: `Mariah@tfainsuranceadvisors.com`
  - `advisor_slug`: `mariah-lorenzen` (so pipedrive-submit routes ownership to Mariah)
  - `tags`: ["Homeowner Protection", ...selected interests]
  - `interest_category`: joined interest list for Pipedrive labels
  - `notes`: includes ZIP, interests, referral_partner, lead_source
  - UTM params passed through (helper already auto-extracts, plus explicit `referral_partner`/`lead_source` appended to notes)
- Use `useHoneypot` hook (project rule) for bot protection.
- Zod validation client-side (name, email, 10-digit phone, 5-digit ZIP, ≥1 interest).

### Design (per TFA brand guidelines)
- Navy (#1E3A5F) background accents, Gold (#C9A84C) CTA, Inter font
- Single column, generous whitespace, large 48px+ tap targets
- No animations, testimonials, videos, or long copy
- SEO: `SEOHead` with `noIndex` (drip-campaign landing, not for search)

### Out of scope
- No partner branding, no co-branding
- No nav, footer, floating CTA
- No new edge functions or DB tables — reuses existing Pipedrive pipeline