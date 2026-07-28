# Wizard → GHL Notification Verification Plan

Goal: prove that every wizard submission triggers the correct edge function(s), reaches GoHighLevel (or the fallback recipient) with the expected payload, and that each intended recipient (client, advisor, partner, admin/leads inbox) receives their message in the correct order.

## 1. Inventory: wizards → notification path

Build a single truth table (documented in `docs/notifications-matrix.md`) mapping each wizard to its notification flow:

| Wizard / Page | Submit call | Notification hop(s) | Recipients |
|---|---|---|---|
| `/start` (bilingual intake) | `intake-submit` | inserts `intake_leads` → DB trigger `intake_leads_forward_to_ghl` → `forward-to-ghl` → GHL webhook | GHL workflow (client SMS/email, Minh/partner if `partner_slug`, leads inbox) |
| `/concierge` | `intake-submit` (staff mode) | same trigger → `forward-to-ghl` | GHL workflow |
| `/book/minh`, `/protect`, `/trust`, `/whatsamortgage-newsletter`, `/homeowner-protection` | `save-lead-progress` → `leads` table | `send-form-notification` / GHL forward | leads@, minhwin80@, partner |
| `/life-insurance-application` | `ApplicationWizard` → `send-life-insurance-notification` | direct edge fn | advisor, applicant, admin (leads@) |
| `/life-insurance-application` (save draft) | `SaveProgressModal` → `send-application-resume-link` | direct edge fn | applicant only |
| `/non-medical-life-application` | shares `ApplicationWizard` path | same as above | same |
| `/advisors/omar-sanchez/refer` | `OmarReferralWizard` → `send-prequalification-notification` | direct edge fn | Omar, referring partner, leads@ |
| `/prequalification` | `PrequalificationWizard` → `send-prequalification-notification` | direct edge fn | advisor, leads@ |
| `/agent-onboarding-application` | `AgentOnboardingForm` → `send-agent-onboarding-notification` | direct edge fn | onboarding admin, applicant |
| `/services/estate-planning` + `/es/...` | `EstatePlanningWizard` → `send-estate-planning-notification` (+ `vanessa-pipedrive-submit` if Vanessa) | direct edge fn | advisor, leads@ |
| `/living-trust-questionnaire` | `LivingTrustForm` / `ThinkTaxLivingTrustForm` / `CardenasLivingTrustForm` → `vanessa-pipedrive-submit` (+ notify) | direct edge fn | advisor, leads@ |
| Business insurance, Estate Guru, Sponsorship, Event, Calculators, Contact/Schedule modals | dedicated `send-*-notification` fns | direct edge fn | per-form recipients |

Any wizard whose row can't be filled in from code inspection is a finding on its own.

## 2. Automated end-to-end runs

For each wizard row:

1. Playwright script (headless, `viewport 1280x1800`) fills the form with a tagged test payload — first name `E2ETest`, last name = wizard slug, phone `+15005550006` (Twilio magic number, safe if any legacy path fires), email `qa+<slug>@tfainsuranceadvisors.com`, and unique `utm_campaign=e2e-<slug>-<timestamp>` so runs are trivially filterable.
2. Capture: network request/response for the submit call, resulting DB row id, and any secondary edge-function invocations visible in the network tab.
3. Immediately after submit, poll `supabase--edge_function_logs` for the expected function name(s) filtered to the last 2 minutes and assert: (a) function invoked, (b) status 200, (c) log line for each intended recipient.
4. For `/start`-family flows, also query `intake_leads` for the new row and confirm `ghl_forward_status='sent'`, `ghl_forward_attempts >= 1`, `ghl_forwarded_at` populated, and `ghl_last_error IS NULL`.
5. For `leads`-family flows, confirm `partner_slug` is set when expected (e.g. `/book/minh` → `minh`, `/protect?ref=minh` → `minh`).

## 3. Payload correctness against GHL contract

For each successful forward, dump the payload that `forward-to-ghl` / `send-*-notification` sent (from function logs) and diff it against the expected shape in `docs/notifications-matrix.md`:

- `schema_version`, `event_type`, `supabase_lead_id`, `submitted_at`, `source`, `lead_status`
- Contact block: first/last name, phone (E.164), email, zip, timezone, language, best_time
- Services block: `services` (CSV), `services_count`, `primary_service`, `solve_first`, `routing_override`
- Answers block: age_range, family_status, dependents, homeowner, work_situation, trust_real_estate, existing_estate_docs, estate_composition, prompting_event, nicotine, health_selfrating, life_purpose, coverage_band, term_length, senior_trust_flag
- Attribution: `partner_slug`, `referrer_id`, `attribution_path`, `origin_referrer_id`, UTM fields
- Consent: `consent_type` (`tcpa_web` for public wizards, `tcpa_verbal` for `/concierge`, `none` for abandoned)

Flag any field GHL expects that is empty when it should not be (this was the root cause of the earlier "blank GHL answers" finding).

## 4. Recipient/order verification

For each recipient in the truth table, confirm the arrival channel:

- Email recipients (`leads@tfainsuranceadvisors.com`, `minhwin80@gmail.com`, per-advisor addresses, applicant email): verify in the Resend dashboard by matching the `X-Entity-Ref-ID` or subject to the E2E tag. Confirm order matches the intended UX (e.g. applicant "resume link" arrives before advisor notification for save-draft; advisor notification arrives before admin CC for full submissions).
- SMS / client-facing GHL workflow messages: verify inside the GHL workflow history for the tagged contact — one entry per intended step, in order (welcome SMS → advisor intro → partner ping if applicable).
- Partner visibility: log in as `minh` via `/auth` and confirm the new lead appears in `/concierge`; log in as admin and confirm it appears in `/admin/partners` → Minh's leads sheet.

## 5. Negative / edge cases to exercise

- Missing `GHL_WEBHOOK_URL` (temporarily unset in a staging run) → `forward-to-ghl` should mark `ghl_forward_status='failed'` with a clear error and NOT loop; retry function `retry-missed-life-insurance-notifications` should pick life-insurance failures on the next cron tick.
- Abandoned lead (`/start` closed after step 2) → `intake_leads.status='abandoned'`, `consent_type='none'`, no client-facing GHL message but internal alert still fires.
- Partner referral (`?ref=minh`) on `/start` and `/protect` → `partner_slug=minh` and `attribution_path` includes Minh's referrer id.
- Bilingual: submit `/start` in Spanish → payload `language='es'` and GHL workflow uses ES template.
- Duplicate submit (double-click) → only one `intake_leads` row, only one forward.

## 6. Deliverables

- `docs/notifications-matrix.md` — truth table above, kept in repo.
- `scripts/e2e/notifications/` — one Playwright script per wizard plus a runner that prints a pass/fail matrix.
- A verification report posted back in chat with:
  - Matrix of wizard × recipient × pass/fail
  - Any payload diffs found
  - Any wizard where a recipient was silent, out of order, or received a malformed message
  - Recommended fixes (grouped by edge function) for anything failing

## Technical notes

- Test runs stay on the preview deploy so real Resend + real GHL fire; tagged addresses/UTMs let us clean up after.
- Where a wizard has both a legacy notify function AND the DB→`forward-to-ghl` trigger (life insurance, prequalification), assert BOTH fire — the earlier architecture change kept email notifications in-app while moving SMS to GHL; a regression in either half is a bug.
- No code changes are expected from this task itself; findings become follow-up build-mode fixes.
