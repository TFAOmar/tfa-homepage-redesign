# Life Insurance Application — Gap Analysis & Update Plan

I cross-referenced both uploaded carrier applications (Corebridge Part A + Part B, NLG) against our current 9-step wizard. Most of the basics (proposed insured, contact, employment, ownership, beneficiaries, riders, existing coverage, payment, signature) are already covered. The big gaps are in **Step 7 (Medical & Lifestyle)** — our current Step 7 only asks high-level lifestyle/knockout questions, but both carriers ask detailed medical-history questions with conditional follow-ups. A few smaller gaps exist in Steps 1, 2, 5, and 6.

## Current coverage vs. gaps

### ✅ Already covered
- Personal info, SSN, DOB, gender, birthplace, citizenship/visa, driver's license — Step 1
- Phones (home/mobile/work), email, employer, occupation, income, net worth — Step 2
- Owner (individual/trust/business), trustee info — Step 3
- Beneficiaries (primary/contingent, share %, relationship, contact) — Step 4
- Plan, face amount, common riders (CTR, WoP, ABR, Chronic, AD&D) — Step 5
- Existing coverage, replacement, 1035 — Step 6
- Tobacco, aviation, hazardous sports, foreign travel, bankruptcy, criminal, driving, generic medical knockout — Step 7
- EFT/Check, frequency, bank info, source of funds — Step 8
- Acknowledgment + e-signature — Step 9

### ❌ Gaps to add

**Step 1 — Proposed Insured**
- "Reason for insurance" dropdown (income protection, estate planning, business, mortgage, final expense, other) — Corebridge Q3, NLG context
- Own property / mortgage in U.S.? + Plan to remain in U.S.? (only if non-citizen) — Corebridge

**Step 2 — Employment**
- Actively at work? (yes/no) + Able to perform all job duties? — Corebridge
- Average hours worked per week — Corebridge
- Date of employment / years employed (already optional — make visible)

**Step 5 — Children's Term Rider** (conditional, only if CTR selected)
- For each child: SSN
- Child has been diagnosed with: ADD, dyslexia, autism, psychiatric disease? (Y/N)
- Child diagnosed/treated for: seizures, juvenile diabetes, scoliosis, hemophilia, cancer, heart/lung/respiratory disease? (Y/N)
- Child lives with parent? (Y/N)
- Child takes prescribed medication? (Y/N)

**Step 6 — Existing Coverage** (when "yes")
- Year of issue, type (life/health/annuity/LTC/DI), coverage classification (individual/business/group/pending)
- 1035 Exchange? (per-policy Y/N) — currently only "isBeingReplaced"
- New question: "Have you been involved in discussions about selling/transferring this policy to a third party (life settlement)?" — NLG Part H Q8

**Step 7 — Medical & Lifestyle (largest gap)**

Add a structured **Medical History** section before the existing lifestyle/knockout questions:

1. **Primary physician** — name, phone, address, date of last visit, reason/findings
2. **Pending appointments** — Any pending or planned medical appointment in next 3 months? (if yes → date, doctor, reason)
3. **Build** — Height (ft/in), Weight (lbs), Weight change > 10 lbs in past year? (if yes → loss/gain amount, reason; pregnancy follow-up)
4. **Family history grid** — Father, Mother, Siblings: age if living, age at death, cause of death, history of heart disease (with age of onset), history of cancer (with age of onset & type)
5. **Family history extended** — Any immediate family with heart disease before 50, ALS, polycystic kidney, cardiomyopathy, sickle cell, Huntington's, aneurysm, or cancer? (Y/N + details)
6. **Family mental health** — Family history of mental illness, suicide, or substance abuse (parents/siblings)? (Y/N + details)
7. **Past 10 years — diagnosed/treated for** (Y/N each, conditional details textarea):
   - a. Heart conditions (irregular heartbeat, murmur, rheumatic fever, CAD, heart attack, chest pain, angina, high BP, high cholesterol)
   - b. Circulatory/vascular (aneurysm, TIA, stroke, carotid/arterial disease)
   - c. Lungs/respiratory (sleep apnea, asthma, bronchitis, emphysema, COPD, TB, allergies)
   - d. Digestive (ulcer, hepatitis, cirrhosis, jaundice, liver/stomach/intestine/pancreas/gallbladder/colon)
   - e. Cancer/tumor/mass/leukemia/melanoma
   - f. Diabetes, thyroid, or other endocrine disorder
   - g. Kidney, bladder, or urinary tract disorder
   - h. Brain/nervous system (seizures, epilepsy, MS, Parkinson's, paralysis, fainting)
   - i. Mental/emotional (depression, anxiety, bipolar, suicide attempt, eating disorder, PTSD)
   - j. Bones/joints/muscles (arthritis, back/neck disorder, autoimmune)
   - k. Blood disorder, anemia, hemophilia, immune deficiency, HIV/AIDS
   - l. Reproductive system disorders
8. **Past 12 months** — Any medications, treatments, therapy, or medical observation not already disclosed? (Y/N + details)
9. **Past 12 months — symptoms not consulted for** (Y/N + details):
   - Fainting, dizziness, headaches, convulsions, paralysis
   - Chest pain, shortness of breath, hoarseness, unexplained cough, coughing blood
   - Stomach/intestinal/rectal disorders, rectal bleeding, blood in urine
   - Unhealed sores or mole changes
   - Anxiety, depression, memory loss, confusion
10. **Past 5 years** — ER, urgent care, walk-in, or free clinic visits? (Y/N + details)
11. **Ever** — Advised to or chosen to enter nursing home, hospice, or assisted living? (Y/N + details)
12. **Currently** (Y/N each):
    - Use wheelchair, walker, multi-prong cane, hospital bed, dialysis, oxygen, motorized cart, stair lift?
    - Need help with bathing, eating, dressing, toileting, walking, transferring, continence (ADLs)?
    - Need help with medication, housework, laundry, shopping, meal prep (IADLs)?
13. **Alcohol** — Used alcoholic beverages in past 5 years? (Y/N → drinks/week, ever treated for alcohol use?)
14. **Drugs** — Ever used illegal/recreational drugs or misused prescription drugs? (Y/N + details)
15. **Self-administered lab tests** (other than pregnancy/HIV) — past 12 months? (Y/N)
16. **Disability claim** — Ever made a claim for or received disability/workers' comp/pension for injury/sickness? (Y/N + details)
17. **Catch-all** — Any other medical/physical/psychological condition not disclosed above? (Y/N + details)

Keep existing tobacco, aviation, hazardous sports, foreign travel, bankruptcy, criminal, driving — those are already aligned with carrier requirements.

## Implementation approach

- **Schema**: Extend `step7Schema` in `src/types/lifeInsuranceApplication.ts` with new fields (booleans + conditional detail strings + family history array). Add new fields to `step1Schema`, `step2Schema`, `step5Schema` (children medical), `step6Schema` (per-policy fields + life settlement question).
- **UI**: Refactor `Step7MedicalLifestyle.tsx` into collapsible sub-sections (Physician, Build, Family History, 10-Year History, 12-Month Symptoms, Functional/ADL, Substance Use, Other) so it stays usable on mobile despite length. All Y/N follow-ups render conditionally.
- **PDF generator** (`src/lib/lifeInsurancePdfGenerator.ts`): Add new sections so advisors receive the new data in the unmasked PDF (per memory rule on PDF data fidelity).
- **Backwards compatibility**: All new fields optional in stored `form_data` JSONB so existing in-flight applications don't break.
- **No DB migration needed** — `form_data` is already `jsonb`.

## Files to change

| File | Change |
|------|--------|
| `src/types/lifeInsuranceApplication.ts` | Extend step1/2/5/6/7 schemas |
| `src/components/life-insurance-application/steps/Step1ProposedInsured.tsx` | Add reason for insurance + non-citizen US ties |
| `src/components/life-insurance-application/steps/Step2ContactEmployment.tsx` | Add actively-at-work, hours/week |
| `src/components/life-insurance-application/steps/Step5PolicyRiders.tsx` | Add child medical questions when CTR selected |
| `src/components/life-insurance-application/steps/Step6ExistingCoverage.tsx` | Add per-policy year/type/1035 + life settlement question |
| `src/components/life-insurance-application/steps/Step7MedicalLifestyle.tsx` | Major expansion — add medical-history sub-sections |
| `src/lib/lifeInsurancePdfGenerator.ts` | Render new fields in advisor PDF |

No new edge functions, no DB migration, no third-party integrations.

## Out of scope (carrier-specific, advisor handles)
- HIPAA/MIB authorization signatures (carrier-specific legal forms — collected at policy delivery)
- Bank draft authorization signature (handled at carrier level)
- Paramed exam scheduling (handled by advisor post-submission)
- Carrier-specific product riders (APAR, FAVE, BSB, BIO, BDO, etc. — advisor selects with client)
