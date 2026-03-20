
# Dynamic Sponsorship Dashboard — Completed

## What was done

### Database
- Created `sponsorship_events` table (5 events seeded: Kick Off, Crash Courses, Leadership Summit, Summer Sizzler, Christmas Party)
- Created `sponsorship_tiers` table (3 tiers: Title $5,000, Supporting $2,500, Community $1,000)
- RLS: public read for active rows, admin-only write via `has_role()`

### Stripe Products
- Title Sponsor: `price_1TD8cpI5s9xwrb3eyaGSQ8Pj` ($5,000)
- Supporting Sponsor: `price_1TD8dII5s9xwrb3eM3jbITVt` ($2,500)
- Community Sponsor: `price_1TD8gTI5s9xwrb3ek6QkdIFf` ($1,000)

### Files Created/Updated
- `src/hooks/useSponsorshipData.ts` — hooks for fetching events/tiers + admin mutations
- `src/pages/AdminSponsorshipEvents.tsx` — admin CRUD for events & tiers at `/admin/sponsorship`
- `src/components/sponsorship/EventsShowcase.tsx` — now fetches from DB
- `src/components/sponsorship/GeneralSponsorshipTiers.tsx` — now fetches from DB with new prices
- `src/components/sponsorship/GeneralSponsorshipForm.tsx` — dynamic events/tiers + Stripe checkout button
- `supabase/functions/create-sponsorship-checkout/index.ts` — dynamic price lookup from DB
- `src/App.tsx` — added `/admin/sponsorship` route

### Stripe Discounts
`allow_promotion_codes: true` is enabled. Create coupons in Stripe Dashboard → Coupons → Promotion Codes.
