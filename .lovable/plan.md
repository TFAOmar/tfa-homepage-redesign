## Goal

Rip Twilio/SMS/email automation out of this app. Supabase remains the lead + TCPA system of record. Every lead insert (submitted or abandoned) forwards a single flat JSON to GoHighLevel, which now owns all messaging, quiet hours, routing sends, and opt-outs.

## 1. Remove Twilio / SMS send code

Delete (edge functions + config entries):
- `supabase/functions/dispatch-group-sms/`
- `supabase/functions/dispatch-queued-sms/`
- `supabase/functions/sms-inbound/`
- Corresponding `[functions.*]` blocks in `supabase/config.toml`.

Database migration:
- Drop trigger `intake_leads_after_insert` and function `public.intake_leads_after_insert()`.
- `cron.unschedule(...)` for the quiet-hours flush job.
- Leave columns (`conversation_sid`, `sms_status`, `intro_sent_at`, `intro_scheduled_for`, `intro_fallback`, `assigned_member_id`) and tables (`intake_sms_events`, `intake_sms_templates`, `intake_teams`, `intake_team_members`) in place as inert. No code will read/write them.
- Keep `intake_suppressions` (now populated only by GHL sync).

Secrets: leave `TWILIO_*` and `TWILIO_CONVERSATIONS_SERVICE_SID` in Supabase for now (unused). Note in admin doc that they can be deleted from the dashboard.

Frontend: remove any UI copy/logic referencing Twilio Conversations, projected addresses, or SMS status. `LegalFooter` and the /sms-terms page stay (still accurate as a policy page).

## 2. Keep intact (verify only, no functional change)

- `/start` wizard, `/concierge` form, all branch questions, EN/ES i18n, both consent checkboxes and exact copy, footers, 65+ senior-trust banner, honeypot, rate limiting.
- `/dashboard`, `/admin`, `/admin/intake-templates` (repurposed — see §5).
- `intake-submit` edge function still writes `intake_leads` + `intake_consent_log` atomically. Keep RLS. Keep ZIP→IANA (`src/lib/zipTimezone.ts`) — value flows into GHL payload `timezone`.

## 3. New: forward-to-ghl

New edge function `supabase/functions/forward-to-ghl/index.ts` invoked by DB webhook on `intake_leads` INSERT (both `submitted` and `abandoned`). Runs after the row + consent row are written.

Payload: one flat JSON, snake_case keys, every listed key always present (`""` when N/A), booleans as `"yes"`/`"no"`, multi-selects comma-joined, no arrays. Keys exactly as specified in the spec (secret, event_type, schema_version, supabase_lead_id, submitted_at, source, lead_status, contact fields, service fields, senior_trust_flag, branch-specific fields, referrer fields, consent fields, staff fields, hold_automation, `answers_json` stringified backup).

Delivery:
- POST to `GHL_WEBHOOK_URL` with `Content-Type: application/json`.
- On non-2xx / network error: 3 retries with exponential backoff (e.g. 1s / 4s / 15s).
- Success → update lead `ghl_forward_status='sent'`, `ghl_forward_attempts`, clear `ghl_last_error`.
- Failure after retries → `ghl_forward_status='failed'`, store `ghl_forward_attempts`, `ghl_last_error`.
- Never blocks user's confirmation screen (webhook-driven, out of request path).

New columns on `intake_leads`: `ghl_forward_status text default 'pending'`, `ghl_forward_attempts int default 0`, `ghl_last_error text`, `preferred_contact_at timestamptz`, `hold_automation boolean default false`.

Secrets to add: `GHL_WEBHOOK_URL`, `GHL_SHARED_SECRET` (Edge Function env only).

DB webhook: Supabase Realtime/DB webhook on `intake_leads` INSERT → POST to `forward-to-ghl` with service-role auth header. (Replaces the old `intake_leads_after_insert` trigger.)

## 4. Dashboard

`src/pages/IntakeDashboard.tsx`:
- Add filter chip "Failed to GHL" (`ghl_forward_status = 'failed'`).
- Row/detail action "Resend to GHL" (staff/admin only) → calls a small `resend-to-ghl` endpoint (or `forward-to-ghl` with `{ lead_id }` param) that re-builds and re-sends the identical payload keyed by `supabase_lead_id` for idempotency.
- Replace any `sms_status` badge with `ghl_forward_status`.

## 5. GHL → Supabase opt-out sync

New edge function `supabase/functions/ghl-optout-sync/index.ts`:
- Auth: verifies `GHL_SHARED_SECRET` header.
- Body: `{ phone, reason, occurred_at }`.
- Inserts into `intake_suppressions` (idempotent on phone). Read-only mirror; app does not enforce.

Repurpose `/admin/intake-templates` → static "Messaging lives in GoHighLevel" info page (or hide from nav). Keeps the route from 404'ing.

## 6. UI copy updates

- Confirmation screen: keep "Watch your texts — we're introducing you to your TFA specialist now" and the after-9pm variant as a purely client-side display choice (no send logic anywhere).
- Concierge buttons:
  - "Save & send intro text now" → **"Save & send to GHL"**
  - "Save & schedule text" → saves `preferred_contact_at`, included in GHL payload
  - "Save without text" → forwards with `hold_automation='yes'`
- Add `src/pages/AdminGhlNotes.tsx` (or a section in existing admin) documenting: `GHL_WEBHOOK_URL`, `GHL_SHARED_SECRET`, and that all messaging / routing sends / quiet hours / opt-outs are owned by GoHighLevel.

## Technical details

- Edge functions: `verify_jwt = false` for `forward-to-ghl` (called by DB webhook with service-role bearer); `ghl-optout-sync` uses shared-secret header; `resend-to-ghl` requires authenticated staff/admin JWT.
- `answers_json`: `JSON.stringify(lead.answers)` as a debug backup blob in the payload.
- `senior_trust_flag`: `'yes'` iff `services` includes `living_trust` AND `age_range` band ≥ 65.
- Idempotency: GHL side keyed on `supabase_lead_id`; retries and manual resends use the same ID.
- Migration ordering: (a) add new columns, (b) drop old trigger + cron, (c) create DB webhook to new function.

## Open questions

1. Confirm you'll paste `GHL_WEBHOOK_URL` and `GHL_SHARED_SECRET` when I request them via `add_secret`.
2. OK to hide `/admin/intake-templates` from nav (route stays, shows "Managed in GHL")? Or delete it outright?
3. OK to leave legacy Twilio secrets in Supabase (unused) so I don't disturb any other project sharing them? I'll flag them in the admin note either way.
