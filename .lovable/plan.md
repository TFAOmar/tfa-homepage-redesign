

## Plan: Fix Estate Guru Checkout & Add Payment Notification

### Problem Summary

1. **Stripe redirect not loading**: Checkout sessions are created successfully but the Stripe payment page doesn't load. This is almost certainly because you're testing in the Lovable preview iframe, which blocks cross-origin navigations. The published site should work fine. However, we should verify and can also improve the UX.

2. **No email after agent checkout**: The notification email is only sent when the agent completes the registration form on the success page. If they pay but don't fill out the form, you get no notification. The recent agent likely paid but never submitted the registration form.

### Changes

**1. Verify Stripe redirect works on published site**
- Test from the published URL (`tfawealthplanning.lovable.app` or custom domain) to confirm checkout works
- The preview iframe is likely the issue — no code change needed for this

**2. Add payment-completed notification** (`supabase/functions/create-estate-guru-checkout/index.ts`)
- After the Stripe checkout session is created, we can't know if payment completes (that requires webhooks)
- Instead, add a lightweight notification on the **success page load** — when someone lands on `/estate-guru/success`, send an internal notification email to you and Heather that a payment was completed, even before the registration form is filled out
- This way you know immediately when someone pays, regardless of whether they complete the form

**3. Add success page payment notification** (`src/pages/EstateGuruSuccess.tsx`)
- On mount, call a new or existing edge function to notify the team that a checkout was completed
- Extract the `session_id` from the URL query params and include it in the notification
- This runs independently of the registration form

**4. Create edge function for checkout-completed notification** (`supabase/functions/send-estate-guru-checkout-notification/index.ts`)
- Accepts the Stripe `session_id`
- Retrieves checkout session details from Stripe (customer email, plan purchased)
- Sends a brief notification email to you, Heather, and Nancy: "New Estate Guru payment received — awaiting registration form"
- Uses Resend API (same pattern as existing notification functions)

### Files Changed

| File | Change |
|------|--------|
| `supabase/functions/send-estate-guru-checkout-notification/index.ts` | New edge function: fetches Stripe session details and emails team |
| `src/pages/EstateGuruSuccess.tsx` | Add `useEffect` on mount to call the checkout notification function with `session_id` from URL |

### Technical Notes
- The success page already receives `?session_id={CHECKOUT_SESSION_ID}` from Stripe — we just need to use it
- The notification is idempotent per session_id (can guard against duplicate sends)
- This does NOT replace the registration form notification — both will fire (payment notification first, then registration notification when form is submitted)

