# Intake Submission Handling + Group-SMS Automation

Extends the existing `/start` + `/concierge` intake system with automated bilingual group-SMS handoff, quiet-hours queuing, opt-out handling, and legal footers. All Twilio work goes through the Twilio connector gateway; no credentials in the codebase.

## 1. Prerequisites (user actions)

Before Twilio code can run:
1. Connect the **Twilio** connector (I'll open the connect card in build mode).
2. Confirm A2P 10DLC brand + campaign is registered on the Twilio account, or acknowledge sends will be blocked until it is.
3. Provide the real CA license number to replace the `0XXXXXX` footer placeholder (optional — I'll ship with the placeholder + `system_settings` key so you can edit later without a code change).

## 2. Database migration

One migration, additive only:

- `intake_sms_templates(team_key, language, body)` — seeded with the 8 team×lang intros + the 2 referrer-declined variants + the 2 opt-out confirmations.
- `intake_teams` — add `scheduling_url_es`, ensure `twilio_projected_address` populated (seed rows if empty).
- `intake_team_members` — atomic increment RPC `intake_assign_member(team_key, language)` returning the winning `member_id` and bumping `open_lead_count` in one statement (prevents race under concurrent inserts).
- `intake_leads` — add `assigned_member_id uuid`, `routing_reason text`, `intro_scheduled_for timestamptz` (for quiet-hours queue), `intro_sent_at timestamptz`, `intro_fallback boolean`.
- `intake_sms_events` — add `severity text` and `needs_review boolean` for the "unrecognized negative-intent" queue.
- Database webhook trigger: `AFTER INSERT ON intake_leads WHEN status='new'` → `pg_net.http_post` to `dispatch-group-sms` with `Authorization: Bearer <CRON_SECRET>` (reuses existing secret).
- pg_cron: every 5 min, call `dispatch-queued-sms` for leads with `sms_status='queued_quiet_hours' AND intro_scheduled_for <= now()`.
- GRANTs + RLS on new table; policies mirror existing intake_ tables (staff/admin read, service_role write).

## 3. Edge functions

### `dispatch-group-sms` (new)
Auth: requires `Authorization: Bearer <CRON_SECRET>` header (webhook + cron only).

Flow per lead_id in body:
1. Load lead + referrer + team + templates.
2. **Route**: `services.length > 1 → 'multi'`; else map `trust/term_life/retirement → team`. Honor `routing_overridden`. Prefer ES-capable members when `language='es'`. Call `intake_assign_member(team_key, language)` RPC.
3. **Quiet hours**: compute local time from `timezone`; if outside 08:05–20:55, set `sms_status='queued_quiet_hours'`, `intro_scheduled_for = next 08:05 local`, return 202.
4. **Suppression**: filter client + referrer phones against `intake_suppressions`.
5. **Participants**: client (SMS binding to their phone), team (chat participant with `twilio_projected_address` as identity), referrer (SMS binding) only if `lead.referrer_in_thread && referrer.sms_notify_optin`.
6. **Send**: `POST /v1/Services/{sid}/Conversations` with `Participant` array in one call, then `POST /Conversations/{sid}/Messages` with rendered template (variables: `first_name`, `referrer_name`, `member_name`, `scheduling_url`) using the team's projected address as `Author`. Store `conversation_sid`, `assigned_member_id`, `intro_sent_at`.
7. **Fallback on Conversations failure**: two independent Messaging API sends:
   - Client: intro + link + opt-out.
   - Referrer: referrer-declined variant (no client PII beyond first name).
   Set `intro_fallback=true`, log to `sms_events`.
8. Log every Twilio call (success or error) to `intake_sms_events`.
9. Return structured `{status, sms_status, conversation_sid?, fallback?}` — surface provider errors verbatim, never a bare 500.

### `dispatch-queued-sms` (new)
Cron-triggered. Selects due queued leads, calls `dispatch-group-sms` per lead.

### `sms-inbound` (new)
Public webhook (`verify_jwt = false`) for Twilio Conversations `onMessageAdded`.
1. Validate `X-Twilio-Signature` against `TWILIO_AUTH_TOKEN`.
2. Insert every event into `intake_sms_events`.
3. Stop-word detection (case-insensitive, whole-token match): `STOP|END|QUIT|CANCEL|UNSUBSCRIBE|REVOKE|OPT OUT|ALTO|CANCELAR`.
   - If sender = **client** → remove participant, close conversation (`state=closed`), insert `intake_suppressions`, update `lead.sms_status='opted_out'`, send single opt-out confirmation in the message's language, alert staff via `notify-lead`.
   - If sender = **referrer** → remove only referrer participant, insert suppression, update `lead.referrer_in_thread=false`, alert staff.
4. Fuzzy negative-intent phrases ("please stop texting me", "no me llamen", "not interested", etc.) → flag `sms_events.needs_review=true`, alert staff; do NOT auto-suppress.

Register in `supabase/config.toml`: `dispatch-group-sms` (JWT on, cron-auth), `dispatch-queued-sms` (JWT off, cron-auth), `sms-inbound` (JWT off, signature-verified).

## 4. Footers (both surfaces)

New `src/components/intake/LegalFooter.tsx` — bilingual, rendered on `/start` and `/concierge`:
- `CA License #{value from system_settings}` (fallback `0XXXXXX`)
- Links: `/privacy-policy`, `/terms-of-service`, `/sms-terms` (new lightweight page)
- Legal line: *"TFA does not provide legal advice; trust documents are prepared by independent licensed attorneys."* + ES translation added to `src/lib/i18n/dictionary.ts`.

New page: `src/pages/SmsTerms.tsx` (EN + ES) covering message frequency, msg&data rates, HELP/STOP, carrier disclaimer. Added to `standalonePages` + sitemap.

## 5. Admin surface (minimal, for QA)

`src/pages/AdminIntakeTemplates.tsx` (staff/admin only) — read-only view of the 8 seeded templates + variable preview, so you can eyeball what will send before wiring Twilio. Full CRUD deferred unless you ask.

## 6. What this plan does NOT do

- No A2P 10DLC brand registration (you handle in Twilio console).
- No admin CRUD for referrers/teams/members yet (still deferred from prior turn — say the word and I'll add).
- No SMS analytics dashboard.

## Technical details

- **New files** (~8): 3 edge functions, `LegalFooter.tsx`, `SmsTerms.tsx`, `AdminIntakeTemplates.tsx`, migration, template seed.
- **Edited files** (~5): `App.tsx` (routes), `Start.tsx` + `Concierge.tsx` (footer mount), `config.toml` (function entries), `sitemap.xml`.
- **Untouched**: everything outside `intake_*` / `/start` / `/concierge` / `/dashboard`.
- **Secrets used**: `LOVABLE_API_KEY` (already set), `TWILIO_API_KEY` (from connector), `TWILIO_AUTH_TOKEN` (for webhook signature — will request via `add_secret` after Twilio connect), `TWILIO_CONVERSATIONS_SERVICE_SID` (same), `CRON_SECRET` (already set).
- **Concurrency safety**: `intake_assign_member` runs `UPDATE ... RETURNING` in one statement so two simultaneous webhook fires cannot double-assign.
- **Idempotency**: `dispatch-group-sms` no-ops if `lead.intro_sent_at IS NOT NULL` (webhook retries won't double-send).

Ready to proceed? If yes, I'll start with the migration + template seed in build mode, then open the Twilio connect card before writing the edge functions.
