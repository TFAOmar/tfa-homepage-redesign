## Add self-serve intake option to /trust

Keep the new `/trust` landing page as-is, and give visitors a second path: complete the full 8-step living-trust intake wizard on their own. The wizard still exists in the codebase from the earlier build and is reused rather than rebuilt.

### UX changes on `/trust`

1. **Hero** — Two CTAs side by side:
   - Primary (gold): "Start with a free consult" → scrolls to `#lead-form` (existing behavior)
   - Secondary (outline): "Complete intake yourself" → routes to `/trust/questionnaire`
   - Small helper line under CTAs: "Prefer to get a jump start? Fill out the intake now and we'll review it before your call."

2. **New "Two ways to start" section** inserted between "How it works" and the lead form:
   - Two-card comparison
     - Card A "Talk first" — bullets: 20-min consult, we explain the process, no forms until you're ready. CTA scrolls to `#lead-form`.
     - Card B "Jump-start yourself" — bullets: 8-step guided intake, save & resume anytime, we review before your consult. CTA links to `/trust/questionnaire`.

3. **Sticky mobile CTA** — Split into two stacked buttons: gold "Free consult" + outline "Do intake now".

### Route change

- Add `/trust/questionnaire` route in `src/App.tsx` pointing to the existing `TrustWizard` component (currently the code the old `/trust` page rendered — restored from the wizard components created in the earlier build).
- If the wizard is not currently mounted anywhere, move the wizard render out of the old `Trust.tsx` (already replaced) into a new thin page `src/pages/TrustQuestionnaire.tsx` that renders the wizard the same way `Trust.tsx` did before the landing-page rewrite.

### Wizard behavior (unchanged from earlier build)

- Uses `localStorage` `lead_id` for resume.
- Every step calls `save-lead-progress` edge function.
- Step 1 inserts row with `funnel='trust'`, `is_complete=false`.
- Step 8 completion sets `is_complete=true` and fires `notify-lead`.
- Attribution flows through the same `useAttribution` hook.

Both entry points (landing form + full wizard) write to the same `leads` table with `funnel='trust'`. Admin dashboard already differentiates by `is_complete` and `last_step`.

### Files

**Edited:**
- `src/pages/Trust.tsx` — add secondary CTA in hero, "Two ways to start" section, split sticky mobile CTA.
- `src/App.tsx` — add `/trust/questionnaire` route.

**New (or restored):**
- `src/pages/TrustQuestionnaire.tsx` — thin page rendering the existing 8-step wizard component with TFA Header/Footer.

**Untouched:**
- All wizard step components, edge functions, migrations, admin dashboard.

### Out of scope

- Any changes to the wizard's step logic, validation, or fields.
- Any changes to /protect.
