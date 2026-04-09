

## Plan: Update Chatsworth Location — Phone Number + Link to Hamlet

### Changes

**1. Update Chatsworth phone — `src/data/locations.ts` (line 30)**

Change the Chatsworth entry's phone from `(888) 350-5396` to `(818) 415-9109`.

**2. Add advisor linking to Location type — `src/data/locations.ts`**

Add an optional `advisorSlug` field to the `Location` interface. Set `advisorSlug: "hamlet-ohandjanian"` on the Chatsworth entry.

**3. Update Hamlet's city in advisors data — `src/data/advisors.ts`**

Change Hamlet's `city` from `"Granada Hills"` to `"Chatsworth"` to match the location.

**4. Show linked advisor on location card — `src/components/locations/LocationsList.tsx`**

When a location has an `advisorSlug`, display the advisor's name and a "Meet Your Advisor" link below the card content, linking to their landing page (e.g. `/advisors/hamlet-ohandjanian`).

### Files Changed

| File | Change |
|------|--------|
| `src/data/locations.ts` | Add optional `advisorSlug` to interface; update Chatsworth phone + add `advisorSlug` |
| `src/data/advisors.ts` | Update Hamlet's city to "Chatsworth" |
| `src/components/locations/LocationsList.tsx` | Import advisors data, show linked advisor name + link on cards that have `advisorSlug` |

