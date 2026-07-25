## Problem

Logging in and landing back on `/concierge` only works when the user arrives at `/auth?next=/concierge` (via the `<Navigate>` inside `Concierge.tsx`). If they instead reach `/auth` directly — bookmark, header login link, page reload that drops the query string, or the email-confirmation return — the `next` param is missing and `Auth.tsx` falls back to `/admin` (admins) or `/` (everyone else). That matches the reported symptom: sign-in from `/auth` on the live site redirects to home.

## Fix

Persist the intended destination so it survives a lost query string, and consume it after login.

### 1. `src/pages/Concierge.tsx`
Before rendering `<Navigate to="/auth?next=/concierge" replace />`, write `sessionStorage.setItem('tfa:postLoginRedirect', '/concierge')`. Keep the `?next=/concierge` query string too so the existing path still works.

### 2. `src/pages/Auth.tsx`
- Read `next` from the query string as today. If missing, fall back to `sessionStorage.getItem('tfa:postLoginRedirect')` (validated the same way — must start with a single `/`).
- In the post-login `useEffect`, use that resolved value:
  - If present → `navigate(resolvedNext, { replace: true })` and `sessionStorage.removeItem('tfa:postLoginRedirect')`.
  - Else keep current behavior (`/admin` for admins, `/` otherwise).
- Same resolved value drives the "Partner Login" copy so the labeling stays correct when the user arrived via the sessionStorage path.
- Pass the resolved value into `signUp(..., resolvedNext ?? undefined)` so the email-confirm link also returns to `/concierge`.

### 3. No other files change
`useAuth.tsx`, `ProtectedRoute.tsx`, and admin pages are unaffected. This is a pure client-side redirect fix — no schema, RLS, or edge-function changes.

## Verification

- Visit `/concierge` while signed out → redirected to `/auth?next=/concierge`, sign in → land on `/concierge`. (regression check, already works)
- Visit `/auth` directly after previously being bounced from `/concierge` in the same tab → sign in → land on `/concierge` (new behavior, via sessionStorage).
- Visit `/auth` with no prior `/concierge` visit → sign in → admins go to `/admin`, others to `/` (unchanged).
- Sign-up confirmation email from the partner flow returns to `/auth?next=/concierge` and completes the redirect (unchanged path, still covered).
