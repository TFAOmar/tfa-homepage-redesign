## Goal
Replace the default Supabase-branded confirmation/reset/magic-link emails with TFA-branded emails (navy #1E3A5F, gold #C9A84C, Inter, logo, clear "what to expect next" copy) sent from a TFA sender address.

## Approach
Use Lovable's managed auth email flow (`scaffold_auth_email_templates` + `auth-email-hook` edge function). This is the supported path — it hooks Supabase Auth so every signup/reset/magic-link/invite/email-change email is rendered from React Email templates we control and sent through Lovable's email infrastructure.

## Steps
1. **Verify email domain status.** Check that a Lovable email domain is configured for this project (likely `tfawealthplanning.com` or `tfainsuranceadvisors.com`). If none is configured, open the email setup dialog so you can pick/verify one before proceeding. DNS doesn't have to be fully verified to scaffold — it just has to be verified before emails actually send.
2. **Scaffold the auth email templates.** Creates:
   - `supabase/functions/auth-email-hook/index.ts` (+ deno.json)
   - `supabase/functions/_shared/email-templates/{signup,magic-link,recovery,invite,email-change,reauthentication}.tsx`
3. **Brand every template** to match TFA:
   - Colors: navy `#1E3A5F` header/headings, gold `#C9A84C` CTA button + accent bar, dark slate footer
   - Font stack: Inter with Arial fallback
   - Logo pulled from `/images/` (stable URL per project memory)
   - Body background stays white per email guidance
4. **Rewrite copy** for each email so recipients know exactly what to expect. For signup confirmation specifically:
   - Subject: "Confirm your email — TFA Wealth Planning"
   - Greeting + one-line "thanks for creating your TFA account"
   - Prominent gold "Confirm My Email" CTA
   - "What happens next" section: 3 short bullets (confirm link → access account → an advisor may follow up if you requested a consultation)
   - Support line with `info@tfainsuranceadvisors.com` and `(888) 350-5396`
   - Small legal footer with company name + canonical domain
   - Analogous, purpose-specific copy for recovery / magic-link / invite / email-change / reauthentication
5. **Deploy** `auth-email-hook` so Supabase Auth starts routing through it.
6. **Tell you** where to monitor activation (Cloud → Emails) and note that default Supabase emails keep sending until DNS on the sender domain finishes verifying.

## Not doing
- No changes to `/auth` page UI or signup logic.
- No new app-side transactional emails (contact form, lead notifications, etc.) — that's a separate follow-up.
- Not touching the existing `send-test-email` function.

## Technical notes
- Templates use `@react-email/components@0.0.22` and `npm:` specifiers (required because `_shared/` doesn't inherit deno.json).
- `auth-email-hook` name is a Lovable system contract — cannot be renamed.
- `LOVABLE_API_KEY` is auto-provisioned; no secrets requested from you.

## Open question
Which sender domain do you want on these auth emails — `tfawealthplanning.com` (canonical brand) or `tfainsuranceadvisors.com` (already used for `noreply@` on other automated emails)? Default I'll use if you don't say: `tfainsuranceadvisors.com`, since it's already the established automated-mail domain.
