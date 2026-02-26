

# Paid Consultation Booking Page for Manuel Soto

## Overview
Create a dedicated landing page at `/advisors/manuel-soto/coaching` where clients can book a 1-hour paid consultation ($500) with Manuel. The page will embed his Calendly (`https://calendly.com/manuel-soto-/coaching`) and be linked from his profile page.

## What Gets Built

### 1. New Page: `src/pages/ManuelSotoCoaching.tsx`
A standalone-style focused landing page with:
- **Hero section**: Manuel's photo, headline ("1-on-1 Coaching Session with Manuel Soto"), $500/hour pricing prominently displayed, brief value proposition -- this is a serious, dedicated session with the founder
- **What You Get section**: 3-4 cards explaining the value (e.g., Full financial review, Personalized strategy, Direct access to the founder, Action plan you walk away with)
- **Embedded Calendly widget**: Full inline Calendly embed of `https://calendly.com/manuel-soto-/coaching` (using an iframe) so visitors can book directly on the page
- **SEO head** with appropriate meta tags

### 2. Update Manuel's Profile (`src/pages/AdvisorManuelSoto.tsx`)
Add a "Book a Coaching Session" button/card in the hero section and CTA section linking to `/advisors/manuel-soto/coaching` with clear "$500/hr" pricing badge.

### 3. Routing (`src/App.tsx`)
- Add import for `ManuelSotoCoaching`
- Add route: `/advisors/manuel-soto/coaching`
- Add to `standalonePages` array so it renders without global header/footer for a focused booking experience

## Files Changed
| File | Action |
|------|--------|
| `src/pages/ManuelSotoCoaching.tsx` | New -- paid coaching booking page with embedded Calendly |
| `src/pages/AdvisorManuelSoto.tsx` | Add coaching session CTA button |
| `src/App.tsx` | Add route + standalone page entry |

