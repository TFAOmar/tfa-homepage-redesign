## Change

Make `LandingHeader` accept optional props so the CTA can be customized per page, then use it on `/protect` to show a "Free Quote" button linking to `https://quotes.tfawealthplanning.com`. `/trust` keeps its current "Book Consultation" CTA.

## Files

1. **`src/components/LandingHeader.tsx`**
   - Add optional props: `ctaLabel?: string`, `ctaHref?: string`, `ctaExternal?: boolean`.
   - Defaults preserve current behavior (`"Book Consultation"` → `/book-consultation` via react-router `Link`).
   - When `ctaExternal` is true, render an `<a href={ctaHref} target="_blank" rel="noopener noreferrer">` instead of the router `Link`.

2. **`src/pages/Protect.tsx`**
   - Update `<LandingHeader />` to `<LandingHeader ctaLabel="Free Quote" ctaHref="https://quotes.tfawealthplanning.com" ctaExternal />`.

No other pages or logic change.