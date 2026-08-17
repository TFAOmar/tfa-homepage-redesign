# SMS Consent Checkbox + Crawler-Readable Privacy Policy

## Goal
1. Every form that collects a phone number gets an optional SMS-consent checkbox with the required TCPA/10DLC disclosure, present in the page's initial HTML (not hidden behind a step, accordion, or conditional render).
2. The privacy policy is served as static HTML at `/privacy-policy` so Dialpad's crawler reads the full text, including the "we do not share for marketing" SMS clause.

## Part 1 — SMS consent checkbox

### Shared component
Create `src/components/forms/SmsConsentCheckbox.tsx`:
- Unchecked by default, never required to submit.
- Bilingual (EN/ES) via an optional `lang` prop, matching the existing estate-planning form pattern.
- Disclosure text (approved 10DLC wording):
  "By checking this box, you agree to receive SMS text messages from The Financial Architects at the number provided, including appointment reminders and service updates. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. See our Privacy Policy and SMS Terms."
- Links to `/privacy-policy` and `/sms-terms`.
- Rendered directly above the submit button in the same initial render as the phone field.

### Data flow
- Add `sms_consent?: boolean` and `sms_consent_text_version?: string` to the `FormSubmitPayload` interface in `src/lib/formSubmit.ts`.
- Migration: add `sms_consent boolean default false` and `sms_consent_at timestamptz` to `public.form_submissions`, plus the equivalent columns on `public.leads`.
- `pipedrive-submit` edge function: validate the new fields with zod, persist them on the submission row, and pass an "SMS Consent: Yes/No" note plus a Pipedrive label so sales sees it.
- `forward-to-ghl` edge function: include `sms_consent` in the GHL payload so GHL workflows can gate texting on it.
- Wizards that write to their own tables (`intake-submit`, prequalification, living trust, life insurance, agent onboarding) store the flag in their existing `form_data` JSON and, for `/start`, reuse the existing `intake_consent_log` `tcpa_web` record.

### Forms to update (every surface with a phone field)
- Lead/contact forms: contact, Brea, business insurance (x2), careers (x3), estate guru, estate planning, events, American Way health, Kai-Zen (x2), living trust (x6), Tamara Lee Medicare, service consultation, business card order, sponsorship (x2), Ruth Pacheco tax strategy, advisor onboarding, Minh newsletter, book-consultation pages.
- Wizards (checkbox on the step containing the phone field, which is the step's initial render): `/start` contact step, prequalification step 1, Omar referral wizard, life insurance and non-medical life applications, agent onboarding, living trust questionnaire.

## Part 2 — Static privacy policy

- Add `public/privacy-policy/index.html`: a complete, self-contained static HTML page (inline `<style>`, no JS) carrying the full policy text — all numbered sections currently in `src/pages/PrivacyPolicy.tsx`, with the "No Third-Party Marketing / SMS opt-in data is never shared" clause as its own clearly headed section.
- Static hosting serves this file at `/privacy-policy` ahead of the SPA fallback, so the crawler receives the full body in the first response.
- Keep `src/pages/PrivacyPolicy.tsx` and its route as the in-app version, with content kept identical to the static file. Add a comment in both files noting they must be updated together.
- Add the same static treatment for `public/sms-terms/index.html` since the consent disclosure links there and the crawler will follow it.
- Ensure both URLs are listed in `public/sitemap.xml` and are not disallowed in `robots.txt`.

## Verification
- Load a representative form with JS disabled in Playwright and confirm the checkbox and disclosure text appear in the served HTML for the SPA-rendered pages (documenting the SPA caveat), and `curl` `/privacy-policy` on the published site to confirm the full policy text is in the raw response.
- Submit one form with the box checked and one unchecked; confirm both the DB row and the GHL payload carry the right value.
