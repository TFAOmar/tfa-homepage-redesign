# Bulletproof the Life Insurance Application

Goal: ensure no runtime errors, no broken drafts, and no PDF crashes from the new carrier fields.

## 1. Default Values (prevent undefined crashes)
- File: `src/components/life-insurance-application/ApplicationWizard.tsx` (and/or initial state location)
- Add safe defaults for all newly added fields so legacy drafts loaded from `life_insurance_applications.form_data` don't crash:
  - Step 1/2: `reasonForInsurance: ""`, `activelyAtWork: undefined`, `hoursPerWeek: ""`, residency tie fields
  - Step 5: children medical screening arrays default `[]`
  - Step 6: `has1035Exchange`, `lifeSettlementDiscussion` defaults
  - Step 7: `familyHistory: { father: {}, mother: {}, siblings: [] }`, all `hx10*` booleans default `false`, `primaryPhysician: {}`, `adlNeeds: []`, `iadlNeeds: []`, `substanceUse: {}`, `erVisits: []`, `weightChange: {}`
- Merge defaults with loaded `form_data` on hydrate (deep merge for nested objects).

## 2. PDF Null-Safety
- File: `src/lib/lifeInsurancePdfGenerator.ts`
- Wrap nested accessors in optional chaining + fallbacks:
  - `familyHistory?.father`, `?.mother`, `?.siblings ?? []`
  - Loops over `children`, `existingPolicies`, `beneficiaries`, `erVisits` guarded with `?? []`
  - Skip rendering sections entirely when their parent object is missing
- Add a top-level try/catch around each section so one bad field can't fail the whole PDF.

## 3. Zod Schema Audit
- File: `src/types/lifeInsuranceApplication.ts`
- Verify every newly added field is `.optional()` or has a `.default()` so step navigation isn't blocked for users who skip optional questions.

## 4. Edge Function Smoke Test
- Use `supabase--curl_edge_functions` to POST a synthetic payload with the full new schema to `send-life-insurance-notification`.
- Check `supabase--edge_function_logs` for any rendering or PDF errors.
- Also test with a minimal/legacy payload (only old fields) to confirm backwards compatibility.

## 5. TypeScript + Build Verification
- Run `tsc --noEmit` and `vite build` to catch any type drift.

## 6. Manual Browser Smoke Test (final step, with user)
- After 1–5 pass, walk through the wizard end-to-end in preview, triggering every conditional branch:
  - Non-citizen → residency ties appear
  - Not actively at work → reason field appears
  - Has children → child medical screening appears
  - Has existing coverage → 1035 + life settlement questions appear
  - Each Yes on Step 7 medical history → details field appears
- Submit and verify PDF + advisor email arrive correctly.

## Out of scope
- New carrier fields (already shipped in prior turn)
- DB schema changes (none needed — `form_data` is `jsonb`)
- New edge functions

After approval, I'll execute steps 1–5 automatically, then pause and ask before driving the browser for step 6.