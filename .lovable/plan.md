
# Minh Unified Intake + Group SMS Handoff

## Scope
Add two new pages alongside existing `/trust` and `/protect` (no changes to those):
- `/minh` — consumer-facing intake, meant to be shared with viewers
- `/minh/intake` — internal form for Minh + Mariah (public URL, no login; kept off sitemap and unlinked from site nav)

Both use the same conditional question engine and write to the existing `leads` table. On submit, an automatic group SMS (Twilio) introduces the client, Minh, and Mariah, and an email backup goes to the team.

## User flow

```text
/minh (consumer)                    /minh/intake (internal)
     |                                       |
Choose service(s):                    Same service picker
[ ] Living Trust                      + fields for "captured by" (Minh/Mariah)
[ ] Term Life Insurance               + client contact typed by staff
[ ] Retirement Planning               + free-text notes
     |
Contact info (name, email, phone, state, best time)
     |
Conditional per-service questions (short, only what's picked)
     |
Consent (TCPA for SMS + accuracy) --> Submit
     |
notify-lead edge fn:
  1. Insert into leads (funnel: "minh-unified", payload has service selections + answers)
  2. Send group SMS via Twilio to: client, Minh, Mariah
  3. Send backup email to leads@tfainsuranceadvisors.com + minhwin80@gmail.com
     |
Thank-you screen: "Minh and Mariah will text you shortly."
```

## Conditional question sets (kept short — 3–5 each)

**Living Trust**
- Do you own real estate? (Yes / No / Multiple properties)
- Approximate estate value bracket (<$500k / $500k–$1M / $1M–$3M / $3M+ / Prefer not to say)
- Marital status (Single / Married / Divorced / Widowed)
- Minor children or dependents? (Yes / No)
- Do you already have a will or trust? (No / Will only / Old trust needs review / Not sure)

**Term Life Insurance**
- Coverage amount you have in mind (<$250k / $250–500k / $500k–$1M / $1M+ / Not sure)
- Term length preference (10 / 15 / 20 / 30 / Not sure)
- Date of birth (for accurate quote)
- Tobacco/nicotine use in last 12 months? (Yes / No)
- Any major health conditions? (None / Diabetes / Heart / Cancer history / Other — short text)

**Retirement Planning**
- Current age bracket (<40 / 40–50 / 50–60 / 60+)
- Retirement accounts today (401k / IRA / Pension / None / Multiple)
- Approximate retirement savings (<$100k / $100–500k / $500k–$1M / $1M+ / Prefer not to say)
- Primary goal (Grow / Protect / Income / Tax strategy / Not sure)
- Target retirement age

If multiple services are selected, sections stack; nothing is asked twice.

## Group SMS (Twilio)

On submit, one outbound SMS per recipient (client, Minh, Mariah) using a shared thread-style message. Twilio does not do true "group MMS" reliably across carriers, so we send three individual SMS with the same body that names all three parties. Body varies by service selection, e.g.:

> Hi {ClientFirstName}, thanks for reaching out about {Trust / Term Life / Retirement Planning}. Introducing you to Minh Win and Mariah Lorenzen from TFA — they'll be in touch shortly to schedule your call. Reply STOP to opt out.

Requires TCPA consent checkbox on the form (explicit language about SMS from TFA and Minh).

## Internal form differences
- Same UI shell, headline says "Internal Intake"
- Extra field: "Captured by" (Minh / Mariah / Other)
- Extra field: free-text notes appended to lead payload
- `funnel: "minh-unified-internal"` so admin can filter

## Admin
Existing `/admin/leads` dashboard already lists all leads and filters by funnel — no changes needed beyond a label mapping for the two new funnel values.

## What I need from you before build
1. **Twilio setup** — I'll connect the Twilio connector via the standard connector flow. You'll need: a purchased Twilio number and A2P 10DLC brand/campaign registered (or I'll ship email-only first and swap SMS in once registration completes).
2. **Cell numbers** for Minh and Mariah (stored as edge-function secrets `MINH_CELL` and `MARIAH_CELL`, never in code).
3. **Confirm TCPA consent copy** is OK: *"By checking this box I agree to receive SMS from TFA Wealth Planning and Minh Win about my inquiry. Message and data rates may apply. Reply STOP to opt out."*

## Technical details
- New files: `src/pages/MinhUnified.tsx`, `src/pages/MinhInternalIntake.tsx`, `src/components/minh/UnifiedIntakeForm.tsx` (shared engine driven by `mode: "consumer" | "internal"`).
- Add routes in `src/App.tsx` and include both in `standalonePages` so `LandingHeader` is used (Logo + CTA only, matches `/trust` and `/protect`).
- Reuse `useLeads.notifyLead` — extend payload schema to accept `services: string[]` and per-service answer blocks; update Zod schema in `supabase/functions/notify-lead/index.ts` accordingly.
- Add a new edge function `send-group-sms` (called by `notify-lead` after insert) that reads Twilio secrets via the connector gateway and sends 3 SMS. Failure to send SMS does not fail the intake — the lead still saves and the email still sends.
- Do not add `/minh/intake` to `public/sitemap.xml`. `/minh` gets a sitemap entry.
- Keep the security-hardened resume-token pattern already in `notify-lead` and `save-lead-progress`.
- No changes to `/trust`, `/protect`, `/whatsamortgage-newsletter`, or existing admin dashboard code paths.
