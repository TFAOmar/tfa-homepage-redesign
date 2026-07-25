## Location updates in `src/data/locations.ts`

### Remove (4)
- Rancho Cucamonga — `9267 Haven Ave` (id 3)
- Glendora — `223 S Glendora Ave` (id 7)
- Anaheim (Satellite) — duplicate, keep the Katella one (id 13)
- Tempe, AZ — `60 E. Rio Salado Pkwy` (id 17)

### Add (5, all CA)
- Whittier — 7648 Painter Ave Ste A, Whittier, CA 90602
- Whittier — 13112 Hadley St Unit 101, Whittier, CA
- Riverside — 1650 Spruce St Suite 500, Riverside, CA 92507
- Corona — 4160 Temescal Canyon Rd #401, Corona, CA
- Fresno — 191 W Shaw Ave #110, Fresno, CA 93704 (added alongside existing Fresno location; no removal was requested for the current Del Mar Fresno office)

New entries will use the shared `(888) 350-5396` line, `Mon-Fri: 9am-5pm`, `Southern California` region (Central California for the new Fresno), and approximate lat/lng coordinates for map display.

### Location count updates (net change: 32 → 33)
- `src/lib/seo/siteConfig.ts` — `numberOfLocations: 33`
- `src/components/about/NationalImpact.tsx` — stats card "32" → "33"
- `src/components/Locations.tsx` — "32 locations across the United States" → "33"
- `src/pages/Locations.tsx` — SEO title/description copy mentioning 32
- `src/components/contact/ContactInfo.tsx` — stat block currently shows "21"; update to "33" for consistency
- `src/components/locations/LocationsHero.tsx` — check and update any "32" references

No changes to routing, schemas, or DB. LocalBusiness JSON-LD is generated from the `locations` array, so it updates automatically.
