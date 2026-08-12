# Manuel Soto Pre-Qualification Questionnaire

Manuel already has a working 4-step pre-qualification wizard at `/advisors/manuel-soto/prequalification` (Personal Info → Health & Lifestyle → Coverage Needs → Review & Submit), and his profile page links to it in two places. The one real gap is notification routing: submissions currently go to the generic `info@` inbox because his address is not on the server-side allowlist.

## What will change

1. **Route notifications to Manuel**
   Add `manuel@tfainsuranceadvisors.com` to the allowlist in the notification function so his submissions reach him instead of falling back to the generic inbox.

2. **CC the leads inbox**
   Copy every submission to `leads@tfainsuranceadvisors.com` alongside the existing internal copy, so nothing is lost if he misses one.

3. **Applicant confirmation**
   The applicant already receives a "we received your pre-qualification" email; it will show Manuel as the advisor handling their case.

4. **Verify end to end**
   Complete all four steps with test data and confirm the record saves and the notification dispatches to Manuel + the leads inbox.

## Technical details

- `supabase/functions/send-prequalification-notification/index.ts`: extend `ADVISOR_EMAIL_ALLOWLIST` with Manuel's address and add the leads inbox to the CC list; redeploy the function.
- No database or schema changes — submissions already land in `prequalification_applications` with `advisor_id`, `advisor_name`, `advisor_email`.
- No new page or route needed; `/advisors/:advisorSlug/prequalification` already resolves Manuel from the static advisor record.

## QR code target

`https://tfawealthplanning.com/advisors/manuel-soto/prequalification`