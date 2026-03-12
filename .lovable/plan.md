

## Plan: Brea QR Code Landing Page

### Overview
Create a standalone, mobile-first appointment booking page at `/brea` — no global header/footer/floating CTA. Single-purpose conversion page accessed via QR code.

### Files to Create/Modify

| File | Change |
|------|--------|
| `src/pages/Brea.tsx` | New standalone landing page with all 6 sections |
| `src/App.tsx` | Add route `/brea` + add to `standalonePages` array |

### Page Structure (`Brea.tsx`)

**Sticky Header** — Appears on scroll with "Book My Free Appointment" gold button + tap-to-call icon. Uses `useState` + scroll listener.

**Section 1: Hero** — Navy gradient background. Badge pill "Now Open in Brea, CA". Bold headline, subheadline. Two CTAs: gold filled "Book My Free Appointment" (scrolls to `#book`) + outlined "Call Us Now" (`tel:+18883505396`). Staggered CSS fade-in animations.

**Section 2: Trust Bar** — 3 icon items in a row (Licensed & Insured, Hablamos Español, 100+ Families Served). Thin dividers above/below.

**Section 3: What to Expect** — 3 cards with gold left border, hover lift. Review → Plan → Protected.

**Section 4: Booking Section** (`id="book"`) — Calendly iframe placeholder with `{/* REPLACE: Calendly URL */}` comment. Fallback phone CTA below.

**Section 5: Location Strip** — Dark card with address (200 W Imperial Hwy, Brea, CA), phone, hours. Google Maps iframe placeholder.

**Section 6: Footer** — TFA branding, tagline, privacy link, copyright.

### Technical Details
- Smooth scroll via `document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth' })`
- Staggered animations using Tailwind `animate-fade-in` + inline `animation-delay`
- Sticky header uses `useState<boolean>` tracking scroll position > 300px
- All phone numbers as `tel:+18883505396`
- Mobile-first: stacked CTAs, single-column cards, responsive Calendly embed
- Brand colors: Navy `#1E3A5F`, Gold `#C9A84C`
- Uses existing Lucide icons + Inter font (already loaded)
- All placeholder content wrapped in `{/* REPLACE: ... */}` comments

