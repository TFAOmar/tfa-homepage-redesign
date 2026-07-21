# Minh Newsletter Landing Page

Create a new standalone landing page at `/whatsamortgage-newsletter` matching the look and behavior of `/protect` and `/trust`, targeted at visitors coming from Minh's newsletter who want info on Living Trust, Term Life Insurance, or Retirement Planning.

## Route & framing

- Path: `/whatsamortgage-newsletter`
- Added to `standalonePages` in `src/App.tsx` so global Header/Footer/FloatingCTA are suppressed.
- Uses `LandingHeader` with CTA "Get Started" scrolling to the form.
- SEO: title/description tuned for "newsletter reader landing page"; canonical `/whatsamortgage-newsletter`.

## Page sections

1. **Hero** — "You were referred by Minh for straight answers." Subheadline covering the three topics. Primary CTA scrolls to form.
2. **Three-tile explainer** — one card each for Living Trust, Term Life Insurance, Retirement Planning (icon + one-line plain-English description).
3. **Lead form** — the newsletter-style intake (see below).
4. **FAQ** — 4–5 short Q&As covering "Who is TFA?", "Is there a cost?", "What happens after I submit?", "How did Minh get my info?".
5. **Compliance footer note** identical style to `/protect`.

## Form (minimal + multi-select interests with priority)

Fields:
- First name, Last name (required)
- Email (required)
- Phone (required)
- State (required, US dropdown)
- Interests — checkboxes: Living Trust, Term Life Insurance, Retirement Planning (at least one required)
- Most urgent — dropdown populated from the checked interests (required if 2+ checked; auto-set if only one)
- TCPA consent checkbox (required)
- Honeypot via existing `useHoneypot`

Submission: insert into `leads` table with:
- `funnel: "newsletter"`
- `resume_token` minted client-side (matches recent security hardening)
- `referral_source: "minh"` (default from `useAttribution`)
- `payload: { interests: [...], priority: "..." }`
- `is_complete: true`, `last_step: 1`
- Attribution + consent fields identical to `/protect`

After insert: call `notifyLead(leadId, resumeToken)` so it flows through the existing lead notification pipeline (leads inbox + Gmail per current config). No changes to edge functions or DB schema — `funnel` is a free text column and `payload` is JSON.

## Success state

Same pattern as `/protect`: replace the form with a confirmation card ("Got it.") and the (888) 350-5396 phone fallback.

## Files

- New: `src/pages/MinhNewsletter.tsx`
- Edit: `src/App.tsx` — register route and add to `standalonePages`
- Edit: `public/sitemap.xml` — add the new URL

## Out of scope

- No newsletter/ESP integration (Mailchimp/Beehiiv/etc.) — this is a lead capture landing page only.
- No changes to edge functions, DB schema, or existing lead pipeline.
