

## Plan: Enhance PDF Flyer with Leadership Headshots and Richer Design

### What changes

Add CEO and COO headshots to the PDF flyer, include their names/titles, and improve the overall layout to match the energy of the landing page. The PDF will load three images (logo + two headshots) and feature a "Meet Your Hosts" section.

### Changes — `src/lib/salesContestPdf.ts`

**New imports**: Add leadership headshot imports (`@/assets/leadership/manny-soto.jpg`, `@/assets/leadership/omar-sanchez.jpg`)

**Layout redesign**:

1. **Tighter hero section** — Keep logo, headline, subheadline, and intro text but optimize spacing
2. **Category boxes** — Add a trophy/star symbol character and slightly enlarge the boxes with more visual weight
3. **New "Meet Your Hosts" section** (replaces the plain prize text area):
   - Load both headshots as base64 images using the existing `loadImageAsBase64` helper
   - Draw two side-by-side circular-framed headshots (using clipping or rounded rect with gold border)
   - Below each: Name, title, and a one-line edifying blurb
   - Manny Soto: "CEO & Founder — Nearly two decades of experience. The architect behind TFA's mission."
   - Omar Sanchez: "COO & Managing Partner — Leading TFA's national expansion with strategy and execution."
4. **Prize section** — Repositioned below the hosts section with the dinner/mastermind details
5. **Enhanced visual elements** — Add decorative gold corner accents, double gold bars at top/bottom, and additional divider lines for a more polished flyer feel
6. **Contest period and tagline** — Keep at bottom, adjust Y positions to fit new content

**Image handling**: All three images (logo, manny, omar) loaded in parallel with `Promise.all` for faster generation. Headshots rendered as square images with gold border strokes to simulate circular frames.

### Files Changed

| File | Change |
|------|--------|
| `src/lib/salesContestPdf.ts` | Add leadership headshot imports, "Meet Your Hosts" section, enhanced layout with images and bios |

