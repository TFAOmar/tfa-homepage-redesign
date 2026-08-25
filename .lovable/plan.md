# Refresh sponsorship page events

Keep the existing event history on the sponsorship page and add the upcoming calendar events, starting September 8. Past events stay visible as greyed-out "Past Event" cards (current behavior); every upcoming event is sponsorable.

## Events added

| Date | Event | Location | Attendees |
|---|---|---|---|
| Sep 8, 2026 | Buy. Rent. Or Wait? | Irvine | 50+ |
| Sep 17, 2026 | TFA Brea Soft Opening | Brea | 100+ |
| Oct 15, 2026 | Q3 Leadership Summit 2026 | Avenue of the Arts | 50+ |
| Jul 10, 2027 | Summer Sizzler 2027 (Yacht Party) | Newport Beach | 200+ |

The existing Christmas Party (Dec 12, 2026) already covers that date and stays as-is. The existing Summer Sizzler row is dated June 2026 (past) — a new 2027 row is added rather than overwriting history. Kick Off, Crash Courses, Leadership Summit and Summer Sizzler 2026 remain in the list as past events.

## Sponsorship availability

- New upcoming events get status `available` so the "Sponsor This Event" button is active and pre-selects the event in the inquiry form.
- Ordering keeps upcoming events first (sorted by date) with past events pushed to the end, which the showcase already does.

## Technical notes

- Data insert into `sponsorship_events` for the four new rows: slugs `buy-rent-or-wait`, `brea-soft-opening`, `q3-leadership-summit-2026`, `summer-sizzler-2027`; `is_active = true`, `status = 'available'`, `event_date` set, and `display_order` renumbered so all events order chronologically.
- Reuse existing `icon` names (Rocket, GraduationCap, Crown, Sun, PartyPopper) and the same gradient style values already used by existing rows so cards render consistently.
- No frontend changes required — `EventsShowcase.tsx` already sorts past events last, badges them "Past Event", and disables their buttons; `GeneralSponsorshipForm` picks up new events by slug automatically.
