# Add a "Partner Spotlight" button to the home page

The home page already has a preferred-partner section further down, but there is no quick way to reach it from the top of the page. This adds a clearly labeled button.

## What changes

1. **Hero area button** — Add a secondary "Partner Spotlight" button next to the existing hero call-to-action, linking to `/preferred-partners`. Styled as an outline/secondary button so the main "Book Consultation" action stays dominant.
2. **Partner section button label** — Update the existing button in the preferred-partner section from "Meet Our Preferred Partners" to "Partner Spotlight" wording so the two match and visitors recognize the destination.
3. Keep mobile layout intact: buttons stack full-width on small screens, sit side by side on larger screens.

## Technical notes

- Edit `src/components/Hero.tsx` to add a `Button asChild variant="outline"` wrapping `<Link to="/preferred-partners">`.
- Edit `src/components/PreferredPartnersPreview.tsx` button label.
- No routing, data, or backend changes; `/preferred-partners` already exists.
