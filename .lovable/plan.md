

## Plan: Add Joseph Guzman — Advisor Profile + Landing Page

### 1. Copy uploaded image to assets
Copy `user-uploads://image-24.png` to `src/assets/advisors/joseph-guzman.png`

### 2. Add to advisor directory — `src/data/advisors.ts`
- Import `josephGuzmanImg` from `@/assets/advisors/joseph-guzman.png`
- Add entry with id `36`, name "Joseph Guzman", title "Financial Strategist", type "Advisor", city "Chino Hills", state "California", region "West", 8 years experience
- Specialties: Real Estate, Living Trusts, Mortgage Protection, Life Insurance
- Email: jguzman@tfainsuranceadvisors.com
- Landing page: `/advisors/joseph-guzman`

### 3. Create landing page — `src/pages/AdvisorJosephGuzman.tsx`
Follow the established advisor page pattern (same as Fabian Serrano, Michelle Martinez, etc.):
- Hero with uploaded photo, name, title, Chino Hills location
- Bio highlighting 8 years in Real Estate, Living Trusts, and Mortgage Protection
- Services cards: Real Estate Services, Living Trusts, Mortgage Protection, Life Insurance
- 4-step process (Discovery, Analysis, Strategy, Implementation)
- Schedule consultation modal + Contact modal
- SEO metadata and JSON-LD schema
- CTA section at bottom

### 4. Register route — `src/App.tsx`
- Import `AdvisorJosephGuzman`
- Add route: `/advisors/joseph-guzman`

### Files Changed

| File | Change |
|------|--------|
| `src/assets/advisors/joseph-guzman.png` | New — uploaded photo |
| `src/data/advisors.ts` | Add Joseph Guzman entry (id 36) |
| `src/pages/AdvisorJosephGuzman.tsx` | New — full advisor landing page |
| `src/App.tsx` | Import + route for `/advisors/joseph-guzman` |

