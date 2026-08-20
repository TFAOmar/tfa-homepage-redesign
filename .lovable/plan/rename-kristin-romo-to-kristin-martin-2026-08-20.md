# Rename Kristin Romo to Kristin Martin

Update her name everywhere it appears and move her advisor page to a new URL, keeping the old link working.

## Changes

1. **Advisor directory** (`src/data/advisors.ts`)
   - Name: "Kristin Romo" -> "Kristin Martin"
   - id/slug: `kristin-romo` -> `kristin-martin`, `landingPage: /advisors/kristin-martin`

2. **Advisor page** — rename `src/pages/AdvisorKristinRomo.tsx` to `AdvisorKristinMartin.tsx`; update component name, all display text, SEO title/description/keywords, canonical URL, image alt, and the contact-form `advisorName`/`advisorSlug` props.

3. **Leadership section** (`src/components/about/Leadership.tsx`) — update her name in the leaders list and the image-styling conditional that matches on "Kristin Romo".

4. **Routing** (`src/App.tsx`)
   - New route `/advisors/kristin-martin`
   - Old route `/advisors/kristin-romo` renders a redirect to the new URL so existing QR codes and links keep working.

5. **SEO** — update `public/sitemap.xml` entry to the new URL.

## Notes
- The image file stays at `src/assets/advisors/kristin-romo.jpg` (filename only, not user-visible); the import variable is renamed for clarity.
- No database or edge-function changes; her records aren't keyed by name.
