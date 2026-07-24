## Goal
Send a single branded test email to `leads@tfainsuranceadvisors.com` via Resend so you can preview how a TFA transactional email looks in an inbox.

## Approach
Create a lightweight, admin-only edge function `send-test-email` that:
1. Requires the caller to be an authenticated admin (via `has_role`), so it can't be abused if left deployed.
2. Uses the existing `RESEND_API_KEY` secret already configured in the project.
3. Sends a TFA-branded HTML email (navy `#1E3A5F` / gold `#C9A84C`, Inter font, logo, sample "your consultation is confirmed" style copy) to `leads@tfainsuranceadvisors.com`.
4. Returns Resend's response so we can confirm delivery status.

## Sender address
- Default: `TFA Wealth Planning <noreply@tfainsuranceadvisors.com>` — this domain is already used by other notification functions in the project (e.g. `send-life-insurance-notification`, `notify-lead`), which strongly suggests it is verified in your Resend account. If Resend rejects it as unverified, I will fall back to `onboarding@resend.dev` and note the limitation.

## Trigger
Rather than build a UI just for a one-off, I'll trigger the function once from the server-side and share the Resend response ID with you. No frontend changes.

## Files
- `supabase/functions/send-test-email/index.ts` — new edge function
- `supabase/config.toml` — register the function

## Not doing
- No new UI, routes, tables, or ongoing sending logic.
- Not setting up a custom Lovable email domain (separate follow-up if you want branded auth emails).
