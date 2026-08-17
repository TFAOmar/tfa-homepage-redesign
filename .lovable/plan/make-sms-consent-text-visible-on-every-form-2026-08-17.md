# Make SMS consent text visible on every form

The optional SMS-consent disclosure is rendered by one shared component used by ~35 forms, so the fix is mostly in that single component plus an audit of the few forms that pass the wrong light/dark setting.

## What changes

1. **Raise contrast in the shared checkbox component**
   - Light surfaces: use normal foreground text at reduced opacity instead of the muted gray, and bump the size from extra-small to small so the disclosure is legible.
   - Dark surfaces: use near-white text instead of 70% white.
   - Links get an explicit, higher-contrast token in both modes.
   - The checkbox box itself gets a visible border/accent in both modes (currently it inherits `accent-current`, which can disappear on dark backgrounds).

2. **Auto-adapt instead of relying on a prop**
   Keep the `variant` prop, but default the styling to color tokens that read correctly on both light and dark card surfaces, so a form that forgets to pass `variant="dark"` still shows readable text.

3. **Audit every usage**
   Check each of the ~35 call sites and correct any that render on a dark panel but omit `variant="dark"` (and vice versa) — for example the Kai-Zen, Medicare, Estate Planning, and booking pages use dark panels, while Contact, Trust, Protect, and the living-trust wizards use light cards.

4. **Visual verification**
   Screenshot a representative light form (Contact) and a dark form (Book Consultation, Kai-Zen) with Playwright to confirm the disclosure is readable before finishing.

## Technical notes

- Primary file: `src/components/forms/SmsConsentCheckbox.tsx` (text classes, link classes, input styling).
- No changes to the consent text, its version string, submission payloads, or database columns — this is a presentation-only fix so existing consent records stay auditable.
