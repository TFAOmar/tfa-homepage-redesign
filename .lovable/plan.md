# Fix: Pre-Qualification submission error

## What's wrong

Confirmed two database-level problems on `prequalification_applications`, both of which block a public submission before any email is sent:

1. **No table permissions.** The table has zero grants — `anon` and `authenticated` have no INSERT privilege at all, so every submit is rejected with a permission error.
2. **Insert policy contradicts the form.** The public insert policy only allows rows where `status = 'draft'`, but the wizard submits `status = 'submitted'`, so even with grants it would fail row-level security.

The edge function and wizard code look fine; the failure happens at the database insert step.

## The fix

One migration that:
- Grants `INSERT` to `anon` and `authenticated`, `SELECT/UPDATE/DELETE` to `authenticated` (admin reads are already gated by role policies), and `ALL` to `service_role`.
- Replaces the public insert policy so it accepts both `draft` and `submitted` rows, while still preventing anonymous reads.

Then submit a real test through `/advisors/manuel-soto/prequalification` end to end and confirm the row lands in the table and the notification email dispatches.

## Technical details

- Migration on `public.prequalification_applications`: `GRANT INSERT ... TO anon, authenticated;` `GRANT SELECT, UPDATE, DELETE ON ... TO authenticated;` `GRANT ALL ... TO service_role;`
- Drop and recreate `"Anyone can submit prequalification"` with `WITH CHECK (status IN ('draft','submitted'))`.
- No frontend or edge-function changes expected; if the browser test surfaces a further error, fix it in the same pass.
