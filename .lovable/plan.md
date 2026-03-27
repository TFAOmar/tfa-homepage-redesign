

## Plan: Fix Hardcoded "Next Event" in Final CTA

### Problem
`GeneralSponsorshipFinalCTA.tsx` line 26 has a hardcoded string: `"Next Event: Kick Off — January 2026"`. The hero component was already fixed to be dynamic, but this pre-footer CTA was missed.

### Fix — `src/components/sponsorship/GeneralSponsorshipFinalCTA.tsx`

1. Import `useSponsorshipEvents` hook, `format`, and `parseISO`
2. Add the same dynamic next-event logic used in the hero:
   - Filter events where `event_date >= today`
   - Sort ascending, pick the first
   - Format as `"Next Event: {name} — {month year}"`
   - Fallback to `"Events Coming Soon"`
3. Replace the hardcoded string on line 26 with the dynamic label

Single file change. No schema or migration needed.

