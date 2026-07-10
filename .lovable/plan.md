## Omar Referral Prequalification — Field trims & tweaks

### 1. Step 2 (Client Info) — hide fields for "Quotes only"
When `referrer.handoffPreference === "Quotes only"`, hide these client fields entirely (not just optional):
- ZIP code
- Best phone
- Email
- Preferred contact method
- Best time to reach
- Occupation
- Employer
- Annual household income
- Estimated net worth

Keep: First name, Last name, DOB, Gender, State of residence, Citizenship/residency (+ Visa type when applicable).

For "Full handoff", all current fields remain (phone/email required as today).

### 2. Step 3 (Coverage) — Urgency options
Add two options to the Urgency dropdown, placed at top:
- "Within the next hour"
- "Same day"
- (then existing) Immediate (within days), This month, Next 1-3 months, Just exploring

Also remove the entire "Does the client currently have life insurance?" question and all its conditional follow-ups (carrier, amount, year, reason, replacement).

### 3. Step 4 (Health Baseline) — remove fields
Remove:
- Primary physician name
- Physician phone
- Reason for last visit
- Pending tests/surgeries/hospitalizations in the next 90 days? (+ its details field)

Keep height, weight, BMI, and weight-change question.

### 4. Step 7 (Review / Consent) — remove authorization line
Remove the sentence: "I confirm the information provided is accurate to the best of my knowledge and I authorize Omar Sanchez and The Financial Architects to contact the proposed insured for the purpose of providing a life insurance quote."

Keep the signature + date fields and submit button. (Adjust the consent checkbox label if it still references that authorization — replace with a simple accuracy acknowledgment.)

### Files to edit
- `src/components/prequalification/omar-referral/OmarReferralWizard.tsx` — Step 2 conditional rendering, Step 3 urgency options + remove existing-coverage block, Step 4 field removals, Step 7 consent text, and remove review-summary rows referencing removed fields.
- `src/types/omarReferralPrequal.ts` — no field removals required (types are all optional), no change needed unless we want to keep it clean. Leave as-is to avoid churn.
- `supabase/functions/send-prequalification-notification/index.ts` — remove rendering of removed fields (physician, pending tests, existing coverage, and Step-2 fields when Quotes only) from the Omar-referral email template.

No route or DB changes.
