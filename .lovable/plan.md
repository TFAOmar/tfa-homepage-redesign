## Goals

Round out the partner system with the three items previously flagged out-of-scope:

1. Admin CRUD for `intake_referrers` including linking a Supabase auth user as owner.
2. Per-partner analytics beyond the raw leads table.
3. Email invitations for new partner accounts.

## 1. `/admin/partners` — CRUD page

New page `src/pages/AdminPartners.tsx` (admin-only via `ProtectedRoute requireRole="admin"`), linked from `AdminDashboard` and `AdminTopBar`.

Table of `intake_referrers` with columns: display name, slug, phone, active, owner (email if linked, "—" if not), leads (30d), created. Actions per row: Edit, Invite / Re-invite owner, Unlink owner, Deactivate/Activate, Delete (only if 0 leads).

Create/Edit dialog fields: `display_name`, `slug` (auto-generated, editable), `phone_e164`, `avatar_url` (upload to existing `advisor-photos` bucket or paste URL), `active`, `sms_notify_optin`, `owner_email` (optional — triggers invite flow).

Filters: search by name/slug/email, active toggle.

### Owner linking

We can't join `intake_referrers.owner_user_id` to `auth.users` from the client. Add a security-definer RPC `admin_list_referrers_with_owner()` returning referrers plus `owner_email` (checks `has_role(auth.uid(),'admin')`, joins `auth.users`). A parallel `admin_link_referrer_owner(referrer_id, email)` RPC resolves the email to a user id and updates `owner_user_id`, granting them the `partner` role in `user_roles` if missing.

## 2. Per-partner analytics

New tab/section on `/admin/partners/:id` (or expandable row) showing, for the selected referrer:

- KPI cards: total leads, leads last 30d, leads last 7d, appointments booked, GHL forward success rate.
- Chart: leads per week (last 12 weeks) — recharts line/bar, already in the project.
- Breakdown: top services (from `intake_leads.services`/`primary_service`), language mix (EN/ES), status mix.
- Recent 20 leads with link into the existing detail sheet pattern.

Data via a security-definer RPC `admin_partner_stats(referrer_id uuid)` returning a single JSON payload so the UI is one query. Admin-only guard inside the function.

Partners viewing `/concierge` get a lighter version of the KPI cards (their own referrer only) above their leads table, reusing the same RPC gated by `owner_user_id = auth.uid()` — no new endpoint.

## 3. Email invites for new partner accounts

Flow when admin clicks Invite (or provides `owner_email` while creating a referrer):

1. Admin UI calls edge function `invite-partner` with `{ referrer_id, email }`.
2. Function (verify_jwt=false; validates caller is admin via JWT + `has_role` RPC using service role):
   - Looks up existing user by email. If none, creates one via `supabase.auth.admin.inviteUserByEmail(email, { redirectTo: <site>/auth?next=/concierge })`.
   - Upserts `user_roles` row `(user_id, 'partner')`.
   - Updates `intake_referrers.owner_user_id = user_id`.
   - Sends a branded TFA welcome email via Resend (Navy/Gold, same style as `send-test-email`) from `noreply@tfainsuranceadvisors.com` explaining what `/concierge` is, with a magic sign-in link (from `generateLink` type `magiclink`) as a fallback to the Supabase invite.
3. Returns `{ status: 'invited' | 'linked_existing', owner_email }`.

Re-invite = same function; if user exists and is already linked, it resends the magic link email only.

Unlink = new RPC `admin_unlink_referrer_owner(referrer_id)` that nulls `owner_user_id` and removes the `partner` role if that user owns no other active referrers.

## Technical details

- Migration:
  - RPCs: `admin_list_referrers_with_owner()`, `admin_partner_stats(uuid)`, `admin_link_referrer_owner(uuid, text)`, `admin_unlink_referrer_owner(uuid)` — all `SECURITY DEFINER`, first line `IF NOT has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Not authorized'; END IF;` (partner-stats also permits the owner).
  - `GRANT EXECUTE ... TO authenticated` on each.
  - No schema change to `intake_referrers` (column already exists). Optional index on `intake_leads(referrer_id, created_at desc)` for analytics.
- Edge function `supabase/functions/invite-partner/index.ts`:
  - CORS via `npm:@supabase/supabase-js@2/cors`.
  - Uses `SUPABASE_SERVICE_ROLE_KEY` for admin auth API + Resend for branded email. Both secrets already configured.
  - Zod-validated body; JWT extracted from `Authorization` header, verified with anon client, admin check via `has_role` RPC before doing anything.
- Frontend files:
  - New: `src/pages/AdminPartners.tsx`, `src/components/admin/PartnerFormDialog.tsx`, `src/components/admin/PartnerStatsPanel.tsx`.
  - Edits: `src/App.tsx` (route `/admin/partners`, admin-guarded), `src/pages/AdminDashboard.tsx` (tile), `src/components/admin/AdminTopBar.tsx` (admin link), `src/components/concierge/ReferralLeadsPanel.tsx` (mount `PartnerStatsPanel` above table for partners; skip for staff/admin overview or show aggregated stats — TBD, defaulting to per-partner-only view for now).

## Out of scope

- Bulk CSV import of partners.
- Partner-to-partner sub-referrers / hierarchy.
- Custom per-partner branding on `/concierge`.
