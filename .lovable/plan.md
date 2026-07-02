## Problem
The `/admin` page denies access because `has_role()` returns 403 "permission denied for function has_role" for authenticated users. This happened after the recent security hardening pass that converted SECURITY DEFINER functions — the EXECUTE grant on `has_role` to `authenticated` (and `anon`) was revoked in the process.

Network logs confirm: `POST /rpc/has_role` → 403 `permission denied for function has_role`.

## Fix
Run a migration restoring EXECUTE on the function (keeping it SECURITY DEFINER, which is required so it can read `user_roles` without recursive RLS):

```sql
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, anon;
```

No frontend changes needed — `useAuth` already calls `has_role` correctly. Once the grant is restored, admin login will resolve `isAdmin = true` and `/admin` will load.

## Verification
- Reload `/admin` as the admin user; the `has_role` RPC should return `true` with status 200 and the page should render instead of showing the access denied toast.