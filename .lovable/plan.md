## Remove the /trust page's local sticky mobile CTA

The page already has:
- Two prominent CTAs in the hero (consult + intake)
- The "Two ways to start" section with the same two CTAs
- The site-wide `FloatingCTA` that renders globally on all non-standalone pages (including `/trust`)

The page-level sticky bar at the bottom is therefore duplicative of the hero on the same viewport and stacks on top of the global floating CTA, causing visual conflict on mobile.

### Change

- `src/pages/Trust.tsx`: delete the `{!submitted && (...)}` sticky mobile CTA block at the bottom of the page. Keep the global `FloatingCTA` as the only persistent mobile CTA.
- Remove now-unused `Link` import only if nothing else uses it (it's still used by the "Two ways to start" section, so it stays).

### Out of scope

- `/protect` is not changed — the user's report is scoped to `/trust`. If the same fix should apply there, we can do it as a follow-up.
- No changes to the global `FloatingCTA` or `standalonePages` list.
