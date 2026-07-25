## Overview

Add three capabilities to the partner system:
1. **Bulk CSV import** of partners from `/admin/partners`.
2. **Sub-referrer hierarchy** so partners can refer other partners and get credit for downstream leads.
3. **Custom per-partner branding** on `/concierge` (logo, accent color, welcome copy).

---

## 1. Bulk CSV Import

**UI (`AdminPartners.tsx`)**
- New "Import CSV" button opens a dialog.
- Download-template link generates a sample CSV.
- Paste-or-upload zone parses client-side with PapaParse.
- Preview table shows rows with validation status (valid / warning / error) before commit.
- On confirm, rows are processed in batches via `admin_bulk_upsert_referrers` RPC; results panel shows created / updated / skipped / failed counts.

**CSV columns**
`slug, display_name, phone_e164, avatar_url, active, sms_notify_optin, owner_email, parent_slug` (last two optional).

**Backend**
- New RPC `admin_bulk_upsert_referrers(p_rows jsonb)` — admin-only, wraps existing upsert + optional owner link + optional parent link, returns per-row result jsonb.
- Reuses `admin_link_referrer_owner` logic; skips owner link when email has no auth user (returns a warning row instead of failing).

---

## 2. Sub-referrer Hierarchy

**Schema**
- Add `parent_referrer_id uuid references intake_referrers(id)` and `depth int` to `intake_referrers`.
- Guard against cycles with a trigger that walks parents.
- Add `origin_referrer_id uuid` on `intake_leads` (denormalized top-of-tree) plus `attribution_path uuid[]` for reporting.
- Backfill: existing rows get `parent_referrer_id = null`, `depth = 0`, `origin_referrer_id = referrer_id`.

**Lead attribution**
- When a lead is created with `referrer_id = X`, a trigger fills `attribution_path` (X + all ancestors) and `origin_referrer_id` (root).
- Existing GHL forward payload unchanged; extra ancestor slugs added as custom fields.

**Visibility rules (updated policies + RPCs)**
- Partner sees leads where `auth.uid()` owns any referrer in `attribution_path`.
- `admin_partner_stats` gains `include_descendants boolean` param; when true, aggregates across the subtree.
- New RPC `partner_list_children()` returns the current partner's direct sub-referrers with basic KPIs.

**UI**
- `AdminPartners.tsx`: parent selector on create/edit; tree view toggle.
- `Concierge.tsx` (partner view): "My Sub-Referrers" panel with rollup stats and a link to invite a new sub-referrer (reuses `invite-partner` with `parent_referrer_id` param). Partners can only create children under themselves; admins can move nodes anywhere.

---

## 3. Custom Per-Partner Branding on /concierge

**Schema**
- Add columns on `intake_referrers`: `brand_logo_url text`, `brand_primary_hex text`, `brand_accent_hex text`, `brand_welcome_headline text`, `brand_welcome_body text`, `brand_support_email text`.
- Constrained hex validation via trigger.

**Storage**
- Reuse existing `advisor-photos` bucket (public) under a `partner-branding/` prefix, or add a new `partner-branding` public bucket if we want separation. Default: new public bucket `partner-branding` with 2MB image-only insert policy scoped to admins + the owning partner.

**Admin & partner editing**
- Admin: new "Branding" tab in the partner sheet on `/admin/partners`.
- Partner: new "Branding" section on `/concierge` (own referrer only), same form component.

**Rendering on /concierge**
- `useMyReferrer()` hook returns branding fields.
- New `<PartnerBrandingProvider>` wraps `/concierge` and injects CSS variables (`--partner-primary`, `--partner-accent`) plus header block (logo + headline + body).
- Falls back to TFA Navy/Gold when a partner has no branding set.
- Admins/staff viewing `/concierge` see default TFA branding (no partner scope).

---

## Technical Notes

- All new DB objects follow project rules: explicit GRANTs, RLS enabled, security-definer RPCs with `has_role` checks, `search_path = public`.
- No changes to Twilio (removed) — GHL forward payload gains optional `parent_slug` / `root_slug` fields only.
- CSV parser and preview kept client-side; no new deps beyond `papaparse` (already used? add if missing).
- Branding CSS variables are scoped to the concierge layout so they don't leak into admin surfaces.
- Cycle protection + max depth cap (e.g. 5) enforced in trigger and validated in UI.

---

## Rollout Order

1. Migration: hierarchy columns, branding columns, bulk-upsert RPC, updated policies, storage bucket.
2. Backend: `admin_bulk_upsert_referrers`, `partner_list_children`, updated `admin_partner_stats`.
3. Frontend: CSV importer → hierarchy UI → branding editor + provider.
4. Verify: build, admin flow (import + link parent + edit branding), partner flow (see subtree + edit own branding).
