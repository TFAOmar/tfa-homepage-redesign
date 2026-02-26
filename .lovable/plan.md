

# Add CTA Buttons to Manuel Soto's Coaching Landing Page

## Overview
The coaching page currently has no actionable button in the hero section to guide visitors to the booking calendar. We'll add a prominent "Book Your Session" CTA button in the hero and a final CTA section at the bottom of the page.

## Changes

### File: `src/pages/ManuelSotoCoaching.tsx`

1. **Hero CTA Button** -- Add a "Book Your Session" button below the "60-minute dedicated session" line (after line 94). It will use an anchor link (`#book`) to smooth-scroll down to the Calendly embed section. Styled with the gold/accent color to stand out against the dark hero background, matching the existing `btn-primary-cta` pattern used in `FinalCTA.tsx`.

2. **Bottom CTA Section** -- Add a new section after the Calendly embed (after line 181) with a bold headline like "Don't Wait — Your Financial Clarity Starts Here", a short motivating line, and another "Book Your Session" button linking to `#book`. Dark background matching the site's FinalCTA style.

3. **Smooth scroll behavior** -- Add `scroll-behavior: smooth` to the parent div or use a click handler to ensure the anchor link scrolls smoothly.

