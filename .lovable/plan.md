
# Omar Sanchez Referral Prequalification Questionnaire

A dedicated, in-depth life insurance prequalification form Omar can share with referral partners and other advisors. It captures who is referring the client, runs an underwriter-level health/lifestyle screen with conditional follow-ups on every "yes," and routes submissions to Omar + Miguelina.

## Route & entry point

- New page: `/omar-sanchez/prequalification` (standalone — no site header/footer/FloatingCTA; add slug to `standalonePages` in `App.tsx`).
- Co-branded header: TFA logo + "Referral Prequalification – Omar Sanchez" and Omar's photo/contact.
- Also add the slug to Omar's existing advisor page as a "Share with a referral partner" button so Omar can copy the link.

## New wizard: `OmarReferralPrequalWizard`

Separate from the existing `PrequalificationWizard` (left untouched). 6 steps with a progress bar, localStorage draft autosave, honeypot via `useHoneypot`, client-generated `generateUUID` submission id.

### Step 1 — Referrer (required)
- Referrer type: Referral Partner / Licensed Agent or Advisor / Other
- Full name, email, phone, company/agency (required)
- License # / NPN (shown only if type = agent/advisor)
- Relationship to client (optional)
- How they want to be credited (optional)

### Step 2 — Proposed Insured (client)
First/last name, DOB, gender, state of residence, ZIP, best phone, email, preferred contact method/time, US citizen or visa status (with visa type follow-up), occupation & employer, annual income, net worth.

### Step 3 — Coverage Needs
Product interest (Term / IUL / Whole Life / Final Expense / Not sure) multi-select, coverage amount range, term length (if term), purpose (income replacement, mortgage, business, estate, key person, other), existing coverage yes→carrier/amount/year/reason keeping, replacement intent, urgency.

### Step 4 — Health baseline
Height, weight (auto-calc BMI badge), build history (major weight change > 10 lbs in 12 mo → follow-up), primary physician name/phone/last visit date, reason for last visit, any pending tests/surgeries/hospitalizations in next 90 days.

### Step 5 — Health history (conditional, underwriter pre-screen)
Grouped yes/no with per-yes follow-ups (date diagnosed, current treatment, medications & dosage, last episode, controlled Y/N, specialist name):
- Cardiovascular: heart attack, stroke/TIA, high BP, high cholesterol, arrhythmia, bypass/stent
- Cancer: type, stage, treatment, remission date
- Endocrine: diabetes (Type 1/2, A1C, insulin), thyroid
- Respiratory: asthma, COPD, sleep apnea (CPAP compliance)
- Neurological: seizures, MS, Parkinson's, memory disorders
- Mental health: depression, anxiety, bipolar, PTSD (hospitalization? suicide attempt? current meds?)
- Substance use: alcohol (drinks/week; ever treatment/DUI), recreational drug use (type, last use, treatment)
- Autoimmune / kidney / liver / HIV / hepatitis
- Musculoskeletal / chronic pain / opioid use
- Current medications list (name, dose, frequency, condition) — repeatable
- Family history: parents/siblings — cancer, heart disease, diabetes before age 60 (who, age at diagnosis)

### Step 6 — Lifestyle & risk
- Tobacco/nicotine (cigarettes, cigars, pipe, vape, chew, patches/gum) → last use date, frequency, quit date
- Marijuana → medical vs recreational, frequency, route (smoke/edible)
- Driving: DUI/DWI, reckless, license suspension, moving violations (5 yr) → dates & details
- Criminal history: felony/misdemeanor, probation, pending charges → details
- Bankruptcy (7 yr) → discharge date
- Hazardous activities: aviation (private pilot hours, ratings), scuba (depth, dives/yr), racing, climbing, skydiving, BASE, MMA → follow-ups
- Foreign travel/residence next 12 mo: countries, duration, purpose
- Military status & deployment plans

### Step 7 — Review & submit
Section-by-section review with edit-jump, consent checkbox ("Info is accurate; authorize Omar Sanchez / TFA advisor to contact me for a quote"), electronic signature (typed), submit.

## Backend

- Reuse existing `prequalification_applications` table — `form_data jsonb` holds everything above; add `source = 'omar-referral'` inside `form_data`. No migration needed.
- Reuse `send-prequalification-notification` edge function but branch on `source`:
  - When `omar-referral`: send to `omar@tfainsuranceadvisors.com` **and** `miguelina@tfainsuranceadvisors.com` (cc), subject `New Referral Prequalification – {client name} (from {referrer name})`, include referrer block at top of email, full health/lifestyle summary, and admin deep link.
  - Existing behavior for other sources unchanged.
- Submissions surface in existing Admin → Prequalifications view (already built via `usePrequalificationApplications`).

## Files to add / edit

Add:
- `src/pages/OmarReferralPrequalification.tsx`
- `src/components/prequalification/omar-referral/OmarReferralWizard.tsx`
- `src/components/prequalification/omar-referral/steps/Step1Referrer.tsx` … `Step7Review.tsx`
- `src/components/prequalification/omar-referral/ConditionalYesNo.tsx` (reusable yes → nested form block)
- `src/types/omarReferralPrequal.ts` (typed schema per step + zod validators)

Edit:
- `src/App.tsx` — add route + include slug in `standalonePages`
- `src/pages/AdvisorOmarSanchez.tsx` — add "Referral Partner Link" share button
- `supabase/functions/send-prequalification-notification/index.ts` — add Omar-referral branch (cc miguelina, referrer-aware template)

## Technical notes

- Each conditional follow-up rendered via `<ConditionalYesNo>` that reveals a nested field group; validation only enforced when parent = yes.
- Zod schema per step, react-hook-form; per-step `onNext` calls `handleStepComplete` (mirrors existing wizard pattern).
- Auto-save to `localStorage` under `omar-referral-prequal-draft` and clear on successful submit.
- Honeypot hidden field + 3s time-trap via `useHoneypot`.
- HTML escaping in the email template (per security memory).
- Email uses `noreply@tfainsuranceadvisors.com` sender.
- No changes to existing `PrequalificationWizard` or `/prequalification` route.
