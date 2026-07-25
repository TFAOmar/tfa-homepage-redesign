## Goals

1. When an **admin** lands on `/concierge`, they should see the full referral‑partner lead feed (not just the empty intake form).
2. Clearly separate four roles — **admin**, **staff**, **partner**, **user** — with predictable views and routing.
3. Clean up `/auth` so login goes to the right place for each role and every screen shows who you are.

## Current state (verified)

- `has_role()` + `user_roles` table already exist with an `app_role` enum: `admin, moderator, user, staff`. No `partner` role yet.
- `/concierge` (`src/pages/Concierge.tsx`) is gated only by "logged in". Any signed‑in user reaches the intake form. There is no admin-specific view.
- `/dashboard` (`src/pages/IntakeDashboard.tsx`) already lists all `intake_leads` and is also gated only by "logged in" — RLS on `intake_leads` is what actually restricts reads to `staff`/`admin`, so partners currently see an empty table with no explanation.
- `intake_referrers` has no link to `auth.users`, so we can't scope "a partner's own leads".
- `useAuth` only exposes `isAdmin`. There is no `isStaff` / `isPartner`.
- `AdminTopBar` exists but is not on `/concierge`.

## What to build

### 1. Role model

- Add `'partner'` to the `app_role` enum.
- Add `owner_user_id uuid` to `public.intake_referrers` (nullable, FK `auth.users`) so a partner account can be linked to their referrer record.
- Extend RLS on `intake_leads`:
  - Keep existing staff/admin read.
  - Add: partners may `SELECT` rows where `referrer_id` belongs to an `intake_referrers` row whose `owner_user_id = auth.uid()`.
- Add a small helper view/RPC `my_referrer_id()` (security definer) so the client can query "my leads" cleanly.

### 2. `useAuth` cleanup

- Expose `role: 'admin' | 'staff' | 'partner' | 'user'` and booleans `isAdmin`, `isStaff`, `isPartner`.
- Compute once from `user_roles` (single query returning all rows for the user), with `admin > staff > partner > user` precedence.

### 3. `/concierge` — role-aware

Split the page by role inside `ConciergeInner`:

- **Admin / staff:** render a new "Referral Partner Leads" panel above the intake form:
  - Table of `intake_leads` filtered to `source in ('concierge','partner')`, columns: date, partner (referrer name), client name, services, GHL status, staff notes.
  - Filters: partner, service, GHL status, date range.
  - Row click opens the same detail Sheet used in `IntakeDashboard`.
  - Admins also see a "View full intake dashboard" link to `/dashboard`.
  - The intake form stays below, collapsed by default for admins ("New concierge intake" toggle).
- **Partner:** show only *their* referrals (via `owner_user_id` link) plus a simplified "Send new referral" form (a trimmed version of the concierge form — no routing overrides, no staff‑only extras).
- **Plain user (no role):** show a friendly "This area is for TFA staff and referral partners" screen with a link home; do not render the form.

Add `AdminTopBar` to `/concierge` for signed‑in admins/staff so logout is always visible.

### 4. `/auth` post‑login routing

Update the redirect in `src/pages/Auth.tsx`:

```text
if next -> honor it
else if isAdmin -> /admin
else if isStaff -> /dashboard
else if isPartner -> /concierge
else -> /
```

Also:
- Show the current role as a small badge under "Signed in as …".
- Rename card copy: "Admin Login" → "Staff & Partner Login" when no `next` is set.

### 5. Nav polish

- `AdminTopBar` gets a role badge (Admin / Staff / Partner) and links tuned to the role: Admin → Admin Dashboard, Intake Dashboard, Concierge; Staff → Intake Dashboard, Concierge; Partner → Concierge (My Referrals).
- `ProtectedRoute` gains an optional `requireRole` prop (`'admin' | 'staff' | 'partner'`) used by `/admin/*` and `/dashboard`.

## Technical details

- Migration:
  - `ALTER TYPE app_role ADD VALUE 'partner';`
  - `ALTER TABLE public.intake_referrers ADD COLUMN owner_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;` + index.
  - New RLS policy `"Partners read own referred leads"` on `intake_leads` using an `EXISTS` against `intake_referrers` where `owner_user_id = auth.uid()`.
  - New security‑definer function `public.get_my_referrer_id() returns uuid` used by the partner UI.
  - No changes to existing staff/admin policies.
- Frontend files touched: `src/hooks/useAuth.tsx`, `src/pages/Auth.tsx`, `src/pages/Concierge.tsx` (split into `ConciergeAdminView`, `ConciergePartnerView`, `ConciergeIntakeForm`), `src/components/admin/AdminTopBar.tsx`, `src/components/ProtectedRoute.tsx`, `src/App.tsx` (wrap `/admin/*` and `/dashboard` with `requireRole`).
- Assigning partners: admins link a user to a referrer from the existing admin surface (a small "Owner user email" field on the intake_referrers row); if we skip that UI this pass, it can be done directly in Supabase — I'll flag this in the shipped notes.

## Out of scope (ask if you want it added)

- A full "Partners" admin CRUD page for managing `intake_referrers` linkage.
- Per‑partner analytics/dashboards beyond the leads table.
- Email invites for new partner accounts.
