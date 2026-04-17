
Add a new checklist item to Section 5 (Contracting + Tools) in `src/data/onboardingChecklist.ts`. Place it as the first item so it's prominent.

New item: "🚨 CRITICAL: Email contracting@tfainsuranceadvisors.com ASAP — once agent has completed TFA onboarding, is licensed, and joined both Skool + WhatsApp group — to request their Signal Advisors email to begin contracting"

## Change

| File | Change |
|------|--------|
| `src/data/onboardingChecklist.ts` | Insert new item `ct-notify-contracting` at the top of Section 5's items array |

That's it — single one-line data edit. No component changes needed since the checklist renders dynamically from this config.
