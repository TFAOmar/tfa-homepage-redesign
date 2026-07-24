# TFA Bilingual Lead Intake System

Two new surfaces (`/start` public, `/concierge` staff), a full Supabase schema, and Twilio-backed intro texts. Scoped to be additive — no changes to `/trust`, `/protect`, `/minh*`, or existing advisor pages.

## 1. Database (single migration)

New tables per spec — `referrers`, `teams`, `team_members`, `leads`, `consent_log`, `sms_events`, `suppressions`. Each with `GRANT`s + RLS:

- `leads`, `consent_log`: `INSERT` allowed to `anon` (public intake). `SELECT/UPDATE` on `leads` restricted to staff/admin via `has_role`. `consent_log` is append-only (no UPDATE/DELETE policies, no grants for those).
- `referrers`, `teams`, `team_members`, `suppressions`: admin-only writes; staff read.
- `sms_events`: service_role only (edge functions write).
- Add `profiles` table + trigger for staff/admin role bootstrapping via existing `user_roles` + `app_role` enum (already has `admin`, `moderator`, `user` — add `staff` value).
- Realtime enabled on `leads` for dashboard.
- Indexes: normalized phone/email on `leads` for duplicate detection; `referrers.slug`.

## 2. i18n

New `src/lib/i18n/` with `en.ts` / `es.ts` dictionaries covering every string in both surfaces + consent block (verbatim EN, human-quality ES). Lightweight `useT()` hook + `LanguageContext` that persists to `localStorage`. Global EN/ES toggle in top-right of both surface layouts.

## 3. Public intake — `/start`

Route added to `standalonePages` in `App.tsx` (uses `LandingHeader` with EN/ES toggle instead of nav).

- `src/pages/Start.tsx` — hero + referrer lookup by `?ref=` slug (via public RPC `get_referrer_by_slug`).
- `src/components/start/ServicePicker.tsx` — Step 0 four cards; "Combination" opens multi-select.
- `src/components/start/Wizard.tsx` — one-question-per-screen engine driven by JSON step configs:
  - `src/components/start/steps/trust.ts` (6 Qs)
  - `src/components/start/steps/life.ts` (7 Qs)
  - `src/components/start/steps/retirement.ts` (7 Qs)
  - `src/components/start/steps/combination.ts` (adaptive, max 8)
- `src/components/start/ContactStep.tsx` — name/phone/email/ZIP/best time/language, E.164 validation, US mask.
- `src/components/start/ConsentBlock.tsx` — two separate unchecked checkboxes with exact verbatim text (EN + ES from dictionary).
- `src/components/start/Confirmation.tsx` — time-aware message using timezone derived from ZIP (lookup via lightweight ZIP→TZ map in `src/lib/zipTimezone.ts`, quiet hours 9pm–8am local); scheduling-URL fallback button.
- Partial-lead capture: after phone or email entered, debounce-save `status='abandoned'` via edge function; overwrite on later completion.
- Anti-abuse: `useHoneypot` hook (already exists), per-IP rate limit in edge function, phone validator.

## 4. Staff surface — `/concierge` + `/dashboard` + `/admin`

Auth-gated via existing `useAuth` + new `ProtectedRoute` role check (`staff` or `admin`).

- `src/pages/Concierge.tsx` — dense keyboard-navigable grid form with all fields per spec, including collapsible "Advisor extras", verbal consent module (records `agent_user_id`, `script_version` into `consent_log`), separate referrer-inclusion checkbox, three action buttons (send now / schedule / save only). Persistent amber CA Art. 6.3 banner when `services` includes trust AND age band ≥65 (logged to `consent_log`).
- `src/pages/LeadsDashboard.tsx` — filterable table (service, team, temperature, language, referrer, date + name/phone search), pipeline status column, duplicate badge, detail drawer with answers/consent log/SMS thread/quick actions. Uses realtime `leads` channel.
- `src/pages/AdminConcierge.tsx` — CRUD for referrers, teams, team_members, consent versions, privacy/terms URLs, Spanish copy overrides; CSV export (admin only).

## 5. Edge functions

- `intake-submit` — validates payload (Zod), rate-limits by IP, inserts `leads` + `consent_log` rows, computes routing (see below), triggers `send-intro-sms`. Returns confirmation copy key.
- `save-partial-lead` — upserts abandoned leads (dedup by phone/email + resume token).
- `send-intro-sms` — Twilio Conversations API via connector gateway. Creates group thread (client + assigned team member + optionally referrer). Honors quiet hours → status `queued_quiet_hours`. Logs to `sms_events`. Skips numbers in `suppressions`. Handles STOP/HELP via `twilio-sms-webhook`.
- `twilio-sms-webhook` — inbound handler: STOP→insert `suppressions`, log all events, update `leads.sms_status`.
- `schedule-intro-sms` — scheduled dispatcher (pg_cron every 5m) that flushes `queued_quiet_hours` when local time enters daytime.

Routing: choose highest-priority active `team_members` row for `primary_service` matching language capability; override respected when set by concierge.

## 6. Twilio

I'll initiate the Twilio connector connect flow. Requires: purchased Twilio number, A2P 10DLC registration (or accept SMS deferral until approved — email-only fallback exists in `notify-lead` pattern).

## 7. What I need before build

1. Approval to connect Twilio (I'll open the connect card).
2. Verbatim Spanish translation approval for the consent block (I'll draft; you approve in a follow-up).
3. Confirmation that the `staff` role should be added to the existing `app_role` enum (vs a separate table).

## Technical details

**Files created:** ~30 (pages: 4, components: ~15, edge functions: 4, i18n: 3, lib: 2, migration: 1).
**Files edited:** `src/App.tsx` (routes + `standalonePages`), `public/sitemap.xml` (`/start` only, not `/concierge`), `supabase/config.toml` (new function entries only if non-default config needed).
**Untouched:** all existing advisor pages, `/trust`, `/protect`, `/minh*`, existing edge functions, existing admin dashboards.
**Security:** append-only `consent_log` enforced via absence of update/delete policies; PII never in logs; `SUPABASE_SERVICE_ROLE_KEY` only in edge fns; anon has zero SELECT access.
