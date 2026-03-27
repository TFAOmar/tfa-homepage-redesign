

## Plan: Fix Sponsorship Page Crash

The `/events/sponsorship` page renders a blank white screen due to a React crash in the Radix `<Select>` component. The error: "An error occurred in the `<select>` component" followed by "Failed to execute 'removeChild' on 'Node'."

### Root Cause

In `GeneralSponsorshipForm.tsx`, the "Preferred Package" `<Select>` uses `defaultValue` but its `<SelectItem>` children are dynamic — they start empty (while `tiers` loads from Supabase) then populate with 3 items plus "undecided". Radix Select cannot handle its children changing after mount when `defaultValue` is set, causing a DOM crash that kills the entire page.

### Fix

**File: `src/components/sponsorship/GeneralSponsorshipForm.tsx`**

1. Switch the Package `<Select>` from `defaultValue` to controlled `value` prop (using `watchedPackage` which is already tracked)
2. Guard the event checkboxes and package Select to only render after data has loaded (show a loading state while `tiers` or `events` are still fetching)

Specifically:
- Line 313-314: Change `defaultValue={preselectedPackage || 'undecided'}` to `value={watchedPackage}` — this makes it a fully controlled component that works with dynamic children
- Wrap the events checkbox grid and package select in a conditional that checks `tiers.length > 0` before rendering the Select items, preventing the empty-to-populated transition that crashes Radix

This is a minimal, targeted fix — no new files, no schema changes.

