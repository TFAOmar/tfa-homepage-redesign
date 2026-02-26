
# Fix Life Insurance Notification CORS Issues

## Problem Found
The test application (ID: `529b3cc8-...`, submitted by Omar Sanchez for Conrad Olvera) was saved to the database successfully with status "submitted", but **no notification emails were sent**. The edge function logs confirm only a CORS preflight (OPTIONS) reached the function -- the actual POST never arrived.

Two CORS issues are blocking notifications:

1. **Missing allowed headers**: The edge function only allows `authorization, x-client-info, apikey, content-type`, but Supabase JS v2.95 sends additional headers (`x-supabase-client-platform`, `x-supabase-client-platform-version`, `x-supabase-client-runtime`, `x-supabase-client-runtime-version`). The browser blocks the POST when these aren't whitelisted.

2. **Missing origin**: The preview domain `lovableproject.com` isn't in the allowed origins check (only `.lovable.app` and `.lovable.dev` are matched). This also blocks the POST from the preview environment.

## Fix

Update the `send-life-insurance-notification` edge function's CORS configuration:

### File: `supabase/functions/send-life-insurance-notification/index.ts`

**Change 1 -- Expand allowed headers (line 36)**
- Add `x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version` to the `Access-Control-Allow-Headers` value

**Change 2 -- Add lovableproject.com to allowed origins (line 27)**
- Add `origin.endsWith(".lovableproject.com")` to the `isAllowedOrigin` check so the preview domain works

## Verification
After deploying, we can use the "Resend PDF" feature from the admin dashboard to re-trigger the notification for Conrad's test application, or submit a new test to confirm emails arrive at:
- `conradolvera21@gmail.com` (Conrad's inbox)
- `leads@tfainsuranceadvisors.com` (admin inbox)
- `osanchez2222@gmail.com` (applicant confirmation)
