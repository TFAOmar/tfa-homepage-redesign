

## Plan: Fix Safari Popup Blocker Across All Checkout Flows

### Problem
Same Safari/iPhone issue as Estate Guru — `window.open(url, "_blank")` inside async callbacks gets blocked as a popup. Three more files have this problem.

### Changes

| File | Current | Fix |
|------|---------|-----|
| `src/components/sponsorship/GeneralSponsorshipForm.tsx` (line 125) | `window.open(data.url, '_blank')` | `window.location.href = data.url` |
| `src/components/sponsorship/SponsorApplicationForm.tsx` (lines 187-195) | `window.open` with popup fallback | `window.location.href = checkoutData.url` (remove the fallback block) |
| `src/components/shop/CartDrawer.tsx` (line 90) | `window.open(checkoutUrl, '_blank')` | `window.location.href = checkoutUrl` |

### Not changed (safe)
- `ScheduleModal.tsx` — opens a scheduling link (Calendly/HubSpot), not a payment flow; acceptable to keep as `window.open`
- `TFA2026KickoffSponsorship.tsx` — opens a local PDF file, not async; won't be blocked

### Files Changed

| File | Change |
|------|--------|
| `src/components/sponsorship/GeneralSponsorshipForm.tsx` | Replace `window.open` with `window.location.href` |
| `src/components/sponsorship/SponsorApplicationForm.tsx` | Replace popup logic with `window.location.href` |
| `src/components/shop/CartDrawer.tsx` | Replace `window.open` with `window.location.href` |

