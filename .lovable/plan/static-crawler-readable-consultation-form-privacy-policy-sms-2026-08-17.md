# Static (crawler-readable) Consultation Form + Privacy Policy SMS Clause

## Goal
1. `/book-consultation` is served as static HTML so Dialpad's non-JS crawler sees the phone field, SMS consent checkbox, and full disclosure in the first response.
2. The privacy policy carries the exact required no-sharing paragraph after Section 4.

## Part 1 — Static consultation page at /book-consultation

- Add `public/book-consultation/index.html`: a self-contained static page (inline CSS, brand navy/gold on dark, no build step, no JS required to render) containing a real `<form>` with:
  - First name, last name, email, **phone** (all visible in initial HTML)
  - Interest checkboxes (retirement, life insurance, investments, tax, estate, business)
  - The SMS consent checkbox, unchecked and optional, with the full approved 10DLC disclosure text inline (same wording as `SmsConsentCheckbox`), linking to `/privacy-policy` and `/sms-terms`
  - Honeypot field, hidden submit-time metadata (`form_name`, `sms_consent_text_version`)
  - Trust content: what happens next, phone `(888) 350-5396`, footer links
  - SEO head: title, meta description, canonical `https://tfawealthplanning.com/book-consultation`, plus inline JSON-LD (WebPage + Breadcrumb) mirroring the current React page.
- Because static files are served ahead of the SPA fallback, this file takes over `/book-consultation`.

### Submission that works without JavaScript
- The form posts `application/x-www-form-urlencoded` directly to the `pipedrive-submit` edge function URL.
- Update `supabase/functions/pipedrive-submit/index.ts` to also accept form-encoded bodies: parse `FormData` when the content type is not JSON, map fields into the existing payload shape (including `sms_consent`), keep honeypot and rate limiting, and respond with a `303` redirect to `/thank-you` (JSON responses unchanged for existing JSON callers).
- Progressive enhancement: a small inline script intercepts submit, posts JSON, and redirects to `/thank-you` — but the plain form POST remains the no-JS path.

### Existing React page
- Move the current rich React page to `/schedule` (route rename in `src/App.tsx`, canonical + SEO updated). The static page links to it as "See how our consultation process works".
- Update internal links/CTAs that point at `/book-consultation`: they keep working (static page is the primary conversion form), so no link rewrites are required; only `FloatingCTA` hide-list and `standalonePages` handling are checked for the new `/schedule` route.
- Sitemap: keep `/book-consultation`, add `/schedule`.

## Part 2 — Privacy policy paragraph

Insert, verbatim, immediately after Section 4 (Information Sharing — No Third-Party Marketing) in **both** copies:

"No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All information-sharing categories above exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."

- `public/privacy-policy/index.html` — as its own paragraph inside/after Section 4, visually emphasized.
- `src/pages/PrivacyPolicy.tsx` — same text in the Section 4 block so both versions stay identical.
- Also add the sentence to `public/sms-terms/index.html` and `src/pages/SmsTerms.tsx` under a "Data sharing" heading, since the disclosure links there.

## Verification
- `curl` the dev/published URL for `/book-consultation` and confirm the raw HTML contains the phone input, the consent checkbox, and the disclosure text.
- `curl` `/privacy-policy` and grep for the exact paragraph.
- Submit the static form with JS disabled in Playwright and confirm a row lands in `form_submissions` with the correct `sms_consent` value and the browser ends on `/thank-you`.
