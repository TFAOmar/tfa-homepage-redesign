

## Plan: Add Live Countdown Timer + Redesign Category Cards

### 1. Add countdown timer — `src/pages/SalesContest.tsx`

Add a `useState` + `useEffect` hook that calculates time remaining until April 30, 2026 23:59:59 PT. Updates every second. Displays 4 segments: Days, Hours, Minutes, Seconds — each in a styled box with gold borders and a label beneath.

Place the countdown between the hero section and the categories section, or directly below the "Contest Period" badge — replacing the static date display with a live, ticking counter.

If the contest hasn't started yet (before April 1), show "Contest starts in..." instead. If the contest is over, show "Contest has ended."

### 2. Redesign category cards (lines 101-133)

Transform the two cards from simple flat cards into more dramatic, premium-feeling cards:

- Add a gold gradient top border (4px) simulating a "ribbon" effect
- Larger icon area with a subtle radial glow behind it
- Add a numbered badge ("Category 1" / "Category 2") as a chip at the top
- Add a gold divider line between the title and description
- Replace the emoji trophy with a pulsing gold dot or animated trophy icon
- Add a subtle shimmer/shine animation on hover (CSS gradient sweep)
- Slightly more padding and a more pronounced hover lift (`hover:-translate-y-1`)

### Files Changed

| File | Change |
|------|--------|
| `src/pages/SalesContest.tsx` | Add countdown state/effect, redesign category cards, replace static contest period section with live timer |

