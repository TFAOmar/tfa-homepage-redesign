## Goal
Make the intake form on `/es/services/estate-planning` fully Spanish (labels, placeholders, dropdown options, button, validation messages, toasts, disclaimer) without affecting the English form on `/services/estate-planning`.

## Approach
Add an optional `lang` prop to `EstatePlanningForm` (defaults to `"en"`). All user-visible strings are pulled from a small inline `copy` object keyed by language. The Spanish page passes `lang="es"`; the English page keeps default behavior.

Submitted values (dropdown `value` keys like `single`, `married`, `under-250k`) stay in English so backend/CRM tagging is unchanged. Only the visible option labels are translated.

## Changes

### 1. `src/components/estate-planning/EstatePlanningForm.tsx`
- Add `interface Props { lang?: "en" | "es" }`.
- Define a `copy` map with both languages for: field labels, placeholders, all Select options, best-time-to-call options, additional info placeholder, submit button (idle + submitting), disclaimer, success/error toasts, and Zod validation messages.
- Build the Zod schema inside the component using the localized messages.
- Pass the honeypot success toast in the correct language.
- Tag stays `"Estate Planning"`; add `"Spanish"` tag when `lang === "es"` so leads are easy to identify. `form_name` becomes `"Estate Planning Inquiry (Spanish)"` in ES.

### 2. `src/pages/EstatePlanningES.tsx`
- Pass `<EstatePlanningForm lang="es" />`.

## Out of scope
- Header, Footer, FloatingCTA translation.
- Any change to English page behavior.
