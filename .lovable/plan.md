

# Update Erica Valenzuela's Location and Phone Number

## Summary
Update Erica Valenzuela's profile information:
- **Location**: Chino Hills, CA → **Riverside, CA**
- **Phone**: (909) 455-3878 → **(949) 415-8537**

---

## Files to Modify

### 1. `src/data/advisors.ts`
**Lines 493 and 500**: Update city and phone in advisor directory entry

| Field | Before | After |
|-------|--------|-------|
| city | "Chino Hills" | "Riverside" |
| phone | "(909) 455-3878" | "(949) 415-8537" |

### 2. `src/pages/AdvisorEricaValenzuela.tsx`
Update 5 occurrences:

| Line | Location | Change |
|------|----------|--------|
| 118 | SEO PersonSchema zip | "91709" → "92501" (Riverside zip) |
| 120 | SEO PersonSchema phone | "(909) 455-3878" → "(949) 415-8537" |
| 128 | SEO keywords | "Chino Hills CA" → "Riverside CA" |
| 174-176 | Hero tel link + display | `+19094553878` → `+19494158537`, "(909) 455-3878" → "(949) 415-8537" |
| 338-342 | CTA section tel link + display | `+19094553878` → `+19494158537`, "(909) 455-3878" → "(949) 415-8537" |

### 3. `src/pages/EricaValenzuelaLivingTrust.tsx`
Update 2 occurrences:

| Line | Location | Change |
|------|----------|--------|
| 241-243 | Final CTA tel link + display | `+19094553878` → `+19494158537`, "(909) 455-3878" → "(949) 415-8537" |

---

## Summary of Changes

| File | Changes |
|------|---------|
| `src/data/advisors.ts` | Update city to "Riverside", phone to "(949) 415-8537" |
| `src/pages/AdvisorEricaValenzuela.tsx` | Update phone (4 places), update SEO keywords and zip |
| `src/pages/EricaValenzuelaLivingTrust.tsx` | Update phone (2 places) |

---

## After Implementation

1. Erica's directory card will show Riverside, CA as her location
2. All phone links and displays will use (949) 415-8537
3. SEO metadata will reflect the correct Riverside location

