## Goal
Ensure any life insurance application started from Patricia Serafin's landing page (English or Spanish) notifies **Patricia** in addition to `leads@tfainsuranceadvisors.com` and the applicant — matching how her advisor lead form already routes.

## Current behavior (why she's missing today)
- Both `AdvisorPatriciaSerafin.tsx` and `AdvisorPatriciaSerafinSpanish.tsx` link to the generic `/life-insurance-application` route with no advisor slug or query param.
- `LifeInsuranceApplication.tsx` reads `useParams<{ advisorSlug }>()`, but the route `/life-insurance-application` has no `:advisorSlug`, so `advisorSlug` is always `undefined`.
- The wizard therefore saves `advisor_email = null` on the DB row and `send-life-insurance-notification` skips the advisor email step entirely.
- Result: `leads@tfainsuranceadvisors.com` and the applicant get emailed; Patricia does not.

## Change — attribute the advisor via query string (least-risk, reusable for future advisors)

### 1. `src/pages/AdvisorPatriciaSerafin.tsx` & `AdvisorPatriciaSerafinSpanish.tsx`
Change the two `<Link to="/life-insurance-application">` tags to:
`<Link to="/life-insurance-application?advisor=patricia-serafin">`

### 2. `src/pages/LifeInsuranceApplication.tsx`
Currently reads only `useParams`. Add a `useSearchParams` fallback so the slug can also come from `?advisor=`:
```ts
const [params] = useSearchParams();
const advisorSlug = routeParams.advisorSlug ?? params.get("advisor") ?? undefined;
```
Everything downstream (advisor lookup, header, wizard props) already keys off `advisorSlug`, so no other component logic changes.

### 3. `src/components/life-insurance-application/ApplicationWizard.tsx`
Already forwards `advisorId`, `advisorName`, and looks up `advisor_email` server-side via slug. Confirm the wizard also passes an `advisorEmail` (or slug) so the edge function's existing slug-lookup branch (`send-life-insurance-notification` lines 1352-1364) resolves `patricia@tfainsuranceadvisors.com`. If the wizard isn't passing a slug today, add `advisorSlug` to the invoke payload and read it in the edge function's advisor-email resolver alongside the existing `advisorId` / `advisorName` fallbacks.

## Notification result after the fix
When someone submits from Patricia's page:
1. **Patricia** (`patricia@tfainsuranceadvisors.com`) — full application email + PDF attachment.
2. **Team inbox** (`leads@tfainsuranceadvisors.com`) — admin copy + PDF.
3. **Applicant** — confirmation email.

## Verification
- Submit a test application from `/life-insurance-application?advisor=patricia-serafin` and confirm three sends in the `send-life-insurance-notification` edge function logs (advisor / admin / applicant).
- Check the DB row's `advisor_email` column is populated with Patricia's address.
- Spot-check that visiting the plain `/life-insurance-application` URL (no query) still works and continues to email only leads@ + applicant, so no regression for un-attributed traffic.

## Out of scope
- No changes to routing structure, no new `/advisors/:slug/life-insurance-application` route.
- No changes to the notification email template, PDF, or Pipedrive behavior (Patricia is intentionally excluded from Pipedrive per prior decision).
