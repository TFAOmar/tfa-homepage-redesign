## Convert /trust into a landing page (mirror of /protect)

Replace the current 8-step Trust wizard at `/trust` with a single-page, TFA-branded landing page modeled after `/protect`, but tailored for Living Trusts. Same visual system, section order, and lead-capture pattern.

### Page structure (mirrors /protect)

1. **Hero** — Navy gradient, gold accent chip, headline about protecting family and avoiding probate, primary CTA scrolls to lead form (no quoter for trust).
2. **3-tile explainer** — "Avoid probate", "Keep it private", "You stay in control". Same card grid.
3. **How it works** — 3-step strip replacing the quoter section: (1) Free 20-min consult, (2) We draft your trust, (3) Notarize & fund. This slot keeps section rhythm parity with /protect.
4. **Lead capture form** (`#lead-form`) — Fields tuned to trust intent:
   - first_name, last_name, email, phone, state (required)
   - marital_status (Single / Married / Divorced / Widowed)
   - has_minor_children (Yes / No)
   - approximate_estate_value range ("Under $250k", "$250k–$500k", "$500k–$1M", "$1M–$3M", "Over $3M", "Not sure")
   - best_time
   - TCPA consent checkbox with living-trust-specific consent text
5. **FAQ accordion** — 5 living-trust questions (probate, will vs trust, cost range, timing, "do I need one if I don't own a home").
6. **Sticky mobile CTA** — same pattern, scrolls to `#lead-form`.
7. **Compliance footer** — "Information only, not legal advice" + TFA licensing TODO line.

### Submit behavior

Single `INSERT` into `leads` with:
- `funnel: 'trust'`
- `is_complete: true`, `last_step: 1` (single-step landing, matches how `/protect` works)
- `consent_text` + `consent_at` stored
- Attribution via existing `useAttribution`
- `payload` = `{ marital_status, has_minor_children, estate_value, best_time }`
- On success → `notifyLead(id)` → inline success card ("You'll hear from an advisor within one business day")

No changes to Edge Functions, DB schema, admin dashboard, or `App.tsx` routes. `save-lead-progress` is no longer used by /trust but stays in place (still valid for future wizard flows).

### Files

**Rewritten:**
- `src/pages/Trust.tsx` — full rewrite as landing page (drops wizard, step components, localStorage resume).

**Untouched:**
- Trust wizard step components (if orphaned they'll simply be unused; can be pruned in a follow-up if desired).
- All edge functions, migrations, admin, routing.

### Copy direction (living-trust voice)

- Hero H1: "Protect your family. Skip probate. Keep it simple."
- Hero sub: "A living trust puts your home, savings, and wishes in one place — so your family doesn't get stuck in court."
- Explainer tiles use plain-English framing consistent with /protect's tone (no jargon, no hype).

### Out of scope

- Quoter embed (no equivalent for trusts).
- Retaining the wizard at a different route — the request is to replace `/trust` with a landing page. If a wizard is still needed later, we can restore it at `/trust/questionnaire`.
