

## Plan: Add Trustindex Reviews Widget to Brea Landing Page

Add the Trustindex review widget to the Brea page, between the "What to Expect" and "Booking" sections, using the same `useRef` injection pattern from `src/components/Testimonials.tsx`.

### Changes

**File: `src/pages/Brea.tsx`**
- Add a `useRef` for the widget container
- Add a `useEffect` to inject the Trustindex loader script (`58410d862849832fdb76669e5ee`)
- Insert a new "What Our Clients Say" section between "What to Expect" and the Booking section with the widget container div

