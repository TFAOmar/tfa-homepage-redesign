## Goal
Add a visible "Log out" control on `/auth` (when already signed in) and on every admin page.

## Approach
Create a small reusable `AdminTopBar` component that shows the signed-in email and a "Log out" button (calls `signOut()` from `useAuth`, then navigates to `/auth`). Since admin pages are in `standalonePages` (no global Header), each admin page needs the bar rendered locally.

## Changes

1. **New:** `src/components/admin/AdminTopBar.tsx`
   - Fixed/sticky top bar: TFA wordmark on left, user email + `Log out` button on right.
   - Uses `useAuth().signOut` + `useNavigate('/auth')`.

2. **Add `<AdminTopBar />`** to the top of each admin page:
   - `AdminDashboard.tsx`
   - `AdminApplications.tsx`
   - `AdminSubmissions.tsx`
   - `AdminFormSubmissions.tsx`
   - `AdminSponsorshipEvents.tsx`
   - `AdminResources.tsx`
   - `AdminLeads.tsx`
   - `AdminIntakeTemplates.tsx`
   - `IntakeDashboard.tsx` (also admin-gated)

3. **`src/pages/Auth.tsx`**
   - When `user` is present but role check is still resolving or user chose to stay, show a "Log out" button under the card (small link) so they can sign out without waiting for the redirect. Also show it if `user` exists and they navigate back to `/auth`.

## Notes
- No backend changes; purely UI.
- No changes to routing or `standalonePages`.
