

# Life Insurance Pre-Qualification Questionnaire for Conrad Olvera

## Overview
Create a 4-step pre-qualification wizard that screens potential life insurance clients before they begin the full 9-step application. The form will be accessible at `/advisors/conrad-olvera/prequalification` and will notify Conrad and the admin team when a client completes it.

## Steps in the Questionnaire

### Step 1: Personal Information
- First name, last name
- Date of birth
- Gender
- Phone number, email
- State of residence

### Step 2: Health & Lifestyle Screening
- Height and weight
- Tobacco/nicotine use (and frequency)
- Any major medical conditions diagnosed (diabetes, heart disease, cancer, stroke, etc.) -- checkbox list
- Currently taking prescription medications? (Yes/No, if yes: brief description)
- Hospitalized or had surgery in the past 5 years? (Yes/No)
- Family history of heart disease or cancer before age 60? (Yes/No)

### Step 3: Coverage Needs
- Coverage amount desired (dropdown: $25K, $50K, $100K, $250K, $500K, $1M, $1M+, Not Sure)
- Type of coverage interested in (Term, Whole Life, IUL, Not Sure)
- Monthly budget for premiums (dropdown: Under $50, $50-$100, $100-$200, $200-$500, $500+, Not Sure)
- Do you currently have life insurance? (Yes/No, if yes: carrier and amount)
- Purpose of coverage (dropdown: Income replacement, Mortgage protection, Final expenses, Wealth transfer, Business protection, Other)

### Step 4: Review & Submit
- Summary of all answers
- E-signature (name + date consent checkbox)
- Submit button

## Technical Implementation

### New Database Table: `prequalification_applications`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, gen_random_uuid() |
| status | text | 'draft' or 'submitted' |
| advisor_id | text | e.g. 'conrad-olvera' |
| advisor_name | text | |
| advisor_email | text | |
| applicant_name | text | |
| applicant_email | text | |
| applicant_phone | text | |
| form_data | jsonb | All step data |
| current_step | integer | Default 1 |
| source_url | text | |
| created_at | timestamptz | |
| updated_at | timestamptz | |
| submitted_at | timestamptz | |

RLS: Anyone can INSERT, Admins can SELECT/UPDATE/DELETE (same pattern as other application tables).

### New Files
1. **`src/types/prequalificationApplication.ts`** -- Zod schemas for each step + TypeScript types
2. **`src/components/prequalification/PrequalificationWizard.tsx`** -- Main wizard component (follows EstatePlanningWizard pattern with localStorage draft persistence, step navigation, Supabase save on submit)
3. **`src/components/prequalification/PrequalificationProgressBar.tsx`** -- 4-step progress indicator
4. **`src/components/prequalification/steps/Step1PersonalInfo.tsx`**
5. **`src/components/prequalification/steps/Step2HealthLifestyle.tsx`**
6. **`src/components/prequalification/steps/Step3CoverageNeeds.tsx`**
7. **`src/components/prequalification/steps/Step4ReviewSubmit.tsx`**
8. **`src/pages/PrequalificationQuestionnaire.tsx`** -- Page wrapper with advisor lookup (same hybrid pattern as LifeInsuranceApplication.tsx)
9. **`supabase/functions/send-prequalification-notification/index.ts`** -- Edge function to email Conrad + admin

### Modified Files
1. **`src/App.tsx`** -- Add dynamic route `/advisors/:advisorSlug/prequalification` + standalone page regex
2. **`src/pages/AdvisorConradOlvera.tsx`** -- Add "Start Pre-Qualification" button in hero and CTA sections
3. **`supabase/config.toml`** -- Add `verify_jwt = false` for the new edge function

### Notification Flow
1. Client completes wizard and submits
2. Component saves to `prequalification_applications` table with status 'submitted'
3. Calls `supabase.functions.invoke("send-prequalification-notification")` with application ID
4. Edge function fetches data, sends formatted HTML email via Resend to:
   - Conrad (`conradolvera21@gmail.com`)
   - Admin CC (`clients@tfainsuranceadvisors.com`)
5. CORS headers will include the expanded Supabase client headers from the start

### Design
- Standalone page (no global nav/footer) -- matches life insurance and living trust patterns
- TFA logo header with company phone number
- Mobile-first, clean card-based step layout
- Auto-save to localStorage per step for draft persistence
