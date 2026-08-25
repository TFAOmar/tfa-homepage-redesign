# Refresh sponsorship page events

The sponsorship page currently lists five events stored in the database, four of which are already in the past (Kick Off Jan 10, Crash Courses Apr 14, Leadership Summit Apr 23, Summer Sizzler Jun 27 — all 2026). Only the Christmas Party is still upcoming.

The public Events page pulls from the external Event Calendar App widget, so its listings are not connected to the sponsorship data. The sponsorship list will be updated to match the upcoming calendar events, starting with September 8.

## New sponsorship event list

| Date | Event | Location | Attendees |
|---|---|---|---|
| Sep 8, 2026 | Buy. Rent. Or Wait? | Irvine | 50+ |
| Sep 17, 2026 | TFA Brea Soft Opening | Brea | 100+ |
| Oct 15, 2026 | Q3 Leadership Summit 2026 | Avenue of the Arts | 50+ |
| Dec 12, 2026 | TFA Christmas Party 2026 | TBA | 250+ |
| Jul 10, 2027 | Summer Sizzler 2027 (Yacht Party) | Newport Beach | 200+ |

Existing Christmas Party and Summer Sizzler rows are reused/updated rather than duplicated; the four outdated rows are deactivated.

## Keeping it from going stale

Add a filter so the sponsorship showcase only loads events whose date is today or later — past events drop off automatically instead of lingering as greyed-out "Past Event" cards.

## Technical notes

- Database migration on `sponsorship_events`: set `is_active = false` for `kickoff`, `crash-courses`, `leadership-summit`; update `summer-sizzler` (2027-07-10) and `christmas-party` (2026-12-12); insert new rows for `buy-rent-or-wait` and `brea-soft-opening`, plus `q3-leadership-summit-2026`. Set `display_order` by date, keep existing `icon`/`gradient` token conventions.
- `src/hooks/useSponsorshipData.ts`: in `useSponsorshipEvents`, add `.or('event_date.is.null,event_date.gte.<today>')` so past-dated events are excluded from the public page. Admin hook stays unfiltered.
- No change needed in `EventsShowcase.tsx` beyond what the data drives (the "past" badge logic stays as a safety net).
