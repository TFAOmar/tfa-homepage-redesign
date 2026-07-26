## Fix: admin can't see Minh's past referrals

Two separate issues to resolve.

### 1. Admin view is empty because the panel is owner-scoped

`PartnerLegacyLeadsPanel` calls `partner_list_my_leads` / `partner_list_my_form_submissions`, both of which filter by `owner_user_id = auth.uid()`. When you (admin) open `/concierge`, you aren't Minh's owner, so both RPCs return zero rows — even though 5 rows are correctly tagged in the DB.

**Fix:** add an admin-scoped drill-down.

- New RPC `admin_list_partner_leads(p_slug text)` and `admin_list_partner_form_submissions(p_slug text)` — both `SECURITY DEFINER`, both gated by `has_role(auth.uid(), 'admin')`, returning rows where `partner_slug = p_slug` (or where the partner is anywhere in `attribution_path` for `intake_leads`).
- On `/admin/partners`, add a "View leads" action on each row that opens a drawer/page showing that partner's tagged `leads` + `form_submissions` using the new RPCs. Reuse the same table layout as `PartnerLegacyLeadsPanel`.

This gives admins a per-partner view without changing what partners themselves see.

### 2. Backfill missed historical attributions

Currently only funnel-matched rows and `Homeowner Protection Squeeze` are tagged. Per your answers, also tag:

- **UTM matches:** any `leads` or `form_submissions` where `utm_source ILIKE '%minh%'` OR `utm_campaign ILIKE '%minh%'` OR (for `form_submissions`) `utm_content ILIKE '%minh%'`.
- **Notes/free-text mentions:** any `form_submissions` where `form_type IN ('Book Consultation','book-consultation','Contact Form','contact','Schedule Request','schedule-inquiry')` AND the `form_data` JSON contains the substring `minh` (case-insensitive, e.g. in `notes`, `message`, `referred_by`, `how_did_you_hear`).

Set `partner_slug = 'minh'` on all matches that don't already have one. Report count of newly-tagged rows so we can spot-check.

### Technical notes

- RPCs live alongside existing `partner_list_*` / `admin_*` functions; grants: `EXECUTE TO authenticated`, admin-guard inside the body.
- Backfill runs as a data-only statement via the insert tool (not a migration), scoped with a `WHERE partner_slug IS NULL` guard so it's idempotent.
- No changes to partner-facing UI or existing RPCs — Minh's own view stays as-is.
- After running, I'll query counts and share what was newly attributed before you sign off.
