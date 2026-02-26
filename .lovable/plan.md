

# Add Living Trust Questionnaire for Conrad Olvera

## Overview
The Living Trust questionnaire system already supports any advisor via the dynamic route `/advisors/:advisorSlug/living-trust-questionnaire`. Conrad's URL (`/advisors/conrad-olvera/living-trust-questionnaire`) will work out of the box since he's in the static advisors data with matching id `conrad-olvera` and email `conradolvera21@gmail.com`. We just need two changes:

1. Add a "Start Living Trust Questionnaire" button to Conrad's profile page
2. Fix the CORS headers on the estate planning notification edge function (same bug that blocked life insurance notifications)

---

## Changes

### 1. Conrad's Profile Page (`src/pages/AdvisorConradOlvera.tsx`)
- Add a "Start Living Trust Questionnaire" button in the hero section CTA buttons (next to the existing Life Insurance Application button)
- Add a matching button in the bottom CTA section

### 2. Fix CORS in Estate Planning Notification (`supabase/functions/send-estate-planning-notification/index.ts`)
The `Access-Control-Allow-Headers` is missing the newer Supabase client headers, which will block the POST request (same issue we just fixed for life insurance notifications).

**Current:**
```
"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
```

**Updated:**
```
"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version"
```

This ensures the browser preflight check passes and the actual POST with form data reaches the function, triggering emails to:
- Conrad (`conradolvera21@gmail.com`)
- Admin CC (`clients@tfainsuranceadvisors.com`)

---

## Technical Details

### Notification Flow (already wired)
1. Client completes 8-step wizard at `/advisors/conrad-olvera/living-trust-questionnaire`
2. `EstatePlanningWizard` calls `supabase.functions.invoke("send-estate-planning-notification")` with Conrad's email
3. Edge function saves to `estate_planning_applications` table and sends email via Resend
4. Email goes to `conradolvera21@gmail.com` with CC to `clients@tfainsuranceadvisors.com`

### No routing changes needed
The dynamic route `/advisors/:advisorSlug/living-trust-questionnaire` is already registered in `App.tsx` (line 212) and included in the standalone pages regex (line 113).

