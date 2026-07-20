## Goal
Address the six findings from Martin/Nova's security review. Keep minhwin80@gmail.com on notify-lead. Mask sensitive fields in the agent-onboarding notification email.

## Changes

### 1. `save-lead-progress` — require per-lead secret
- Add a `resume_token` column (text, unique, indexed) to `leads`, generated at insert time by clients (crypto.randomUUID).
- Frontend (`Protect.tsx`, `Trust.tsx`, any other caller): mint `resume_token` alongside `id`, insert both, and pass `resume_token` on every `save-lead-progress` / `notify-lead` call.
- Edge function: require `resume_token` in body; look up the lead by `id`, compare token in constant time, reject 403 on mismatch. Keep rate limit + size cap.

### 2. `notify-lead` — require the same resume_token
- Same token check as above before any read/email. Retain existing recipients (leads@ + minhwin80@gmail.com per user confirmation).

### 3. Agent onboarding submit — require resume_token
- Replace `submit_agent_onboarding_application(p_application_id)` with `submit_agent_onboarding_application(p_application_id, p_resume_token, p_signature)`. The function verifies token match before flipping status to `submitted`. Update `AgentOnboardingForm` submit call to pass the token it already holds.

### 4. `send-agent-onboarding-notification` — require resume_token + mask PII
- Accept `{ applicationId, resumeToken }`. Load row, verify token, else 403.
- Mask in email body:
  - SSN → last-4 only (`***-**-1234`)
  - Bank routing → last-4 only
  - Bank account → last-4 only
  - DOB → year only
  - Driver's license → last-4 only
- Keep signed doc links (14-day expiry) and the rest of the summary as-is.
- Applicant confirmation email unchanged.

### 5. `retry-missed-life-insurance-notifications` — replace anon-key gate with CRON_SECRET
- Add `CRON_SECRET` via `generate_secret` (64 chars).
- Function requires `Authorization: Bearer <CRON_SECRET>`; reject anon key and user JWTs.
- Update the pg_cron job SQL to send the new header (user runs the shown SQL in the SQL editor — I'll include it in a follow-up message since it embeds the secret and can't go through the migration tool).

### 6. `send-prequalification-notification` — lock destinations, tighten input
- Remove any caller-controllable recipient field. Hardcode server-side recipient list (Omar + Miguelina + existing internal addresses already in the function).
- Zod-validate body; reject unknown fields.
- Add IP+applicationId rate limit (5/min) consistent with other functions.

## Files touched
- Migration: add `leads.resume_token`, replace `submit_agent_onboarding_application` signature.
- `supabase/functions/save-lead-progress/index.ts`
- `supabase/functions/notify-lead/index.ts`
- `supabase/functions/send-agent-onboarding-notification/index.ts`
- `supabase/functions/retry-missed-life-insurance-notifications/index.ts`
- `supabase/functions/send-prequalification-notification/index.ts`
- `src/pages/Protect.tsx`, `src/pages/Trust.tsx` (insert + call sites)
- `src/components/agent-onboarding/AgentOnboardingForm.tsx` (pass token to submit + notify)
- Any other caller of `notify-lead` / `save-lead-progress` found during implementation.

## Out of scope (per email)
- Making the repo private, log review, Supabase dashboard verification, and formal PR authorization stages — these are owner actions on Martin's checklist, not code changes.

## Post-deploy steps for you
1. Run the provided `cron.schedule` update SQL with the new CRON_SECRET header.
2. Confirm the retry cron ran successfully once.
3. Optionally rotate any leaked lead UUIDs by marking old rows read-only (not automated here).
