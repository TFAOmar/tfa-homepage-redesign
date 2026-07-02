# Ensure Every Advisor-Page Application Link Notifies That Advisor

## Goal
Any application form opened from an advisor's page (profile or landing page) must carry that advisor's identity through to submission, so the advisor receives the notification email.

## Audit results (see report)
Most advisor pages already use the `/advisors/:advisorSlug/<form>` route pattern, which works correctly. Attribution breaks in a small number of specific places, listed below. This plan fixes only those gaps — no rework of already-working flows.

---

## Fixes

### 1. AdvisorElenaEsquivel links to a non-attributed form
`src/pages/AdvisorElenaEsquivel.tsx:328` links to `/living-trust-questionnaire` with no advisor.
- Change to `/advisors/elena-esquivel/living-trust-questionnaire`.
- Confirm `elena-esquivel` exists in `src/data/advisors.ts` with a real email; add/update if missing so `LivingTrustQuestionnaire` can resolve her advisor record.

### 2. Application pages that ignore `?advisor=` query param
Today only `LifeInsuranceApplication` reads `?advisor=`. Add the same fallback (route param first, then query param) to:
- `src/pages/NonMedicalLifeApplication.tsx`
- `src/pages/PrequalificationQuestionnaire.tsx`
- `src/pages/LivingTrustQuestionnaire.tsx`

This future-proofs any advisor landing/referral page that links with a query string instead of the slug route (mirrors the Patricia Serafin pattern) and prevents silent attribution loss.

### 3. Sweep for any stale non-attributed links across the repo
Ripgrep for direct links to `/life-insurance-application`, `/non-medical-life-application`, `/prequalification`, `/living-trust-questionnaire`, `/estate-planning` inside every `src/pages/Advisor*.tsx` and every advisor landing page (`AileenGutierrezReferral`, `AileenPartnerProgram`, `OmarConnect`, Patricia's pages, referral/partner variants). Any link found without either the `/advisors/:slug/...` route or an `?advisor=<slug>` query param gets fixed to include the advisor slug. (Current audit found only #1; this sweep guarantees no straggler.)

### 4. Verification
- Playwright: open one representative page from each fixed area (Elena's living trust link; a non-medical link with `?advisor=` query; a prequalification link with `?advisor=`) and assert the wizard's advisor context is populated (via a console log or the hidden field on the form).
- Manual DB check on a test submission for Elena to confirm `advisor_slug` / `advisor_email` are saved and the notification edge function routes to her.

---

## Out of scope (call out, do not silently expand)
These pages have no advisor context by design today; changing them is a larger product decision, not a bug fix, so this plan does **not** touch them:
- `EstatePlanning` (`/services/estate-planning`) — generic service page, no advisor scoping.
- `BookConsultation` (`/book-consultation`) — general scheduling.
- `AgentOnboardingApplication` — recruiting flow, not client-facing.
- `HomeownerProtection` — intentionally hard-wired to Mariah Lorenzen.
- 13 advisor profiles have no application CTAs at all (schedule/contact modals only). If you want application CTAs added to any of those, tell me which and I'll add them in a follow-up.

## Technical notes
Attribution fallback pattern to add to each application page:
```ts
const { advisorSlug: routeSlug } = useParams();
const [searchParams] = useSearchParams();
const advisorSlug = routeSlug ?? searchParams.get("advisor") ?? undefined;
```
Then resolve `advisorSlug` against `src/data/advisors.ts` exactly the way `LifeInsuranceApplication.tsx` already does, and pass `advisorId`/`advisorName`/`advisorEmail` into the existing wizard props. No schema, edge-function, or notification-logic changes required — those already handle advisor attribution correctly.
