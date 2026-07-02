## Goal
Verify every form/application reachable from Patricia Serafin's advisor pages (English + Spanish) delivers notifications correctly end-to-end: advisor email → patricia@tfainsuranceadvisors.com, team → leads@tfainsuranceadvisors.com, applicant confirmation, and no Pipedrive deal creation (she's not in the owner map).

## Forms in scope
From `AdvisorPatriciaSerafin.tsx` and `AdvisorPatriciaSerafinSpanish.tsx`:
1. **Contact modal** (`ContactModal`) — advisor contact form
2. **Life Insurance Application** — `/life-insurance-application?advisor=patricia-serafin`
3. **Non-Medical Term Life Application** — `/advisors/patricia-serafin/non-medical-life`
4. **Book Consultation CTA** (if present) — verify routing

## Test approach
Mirror the last successful E2E pattern (insert test rows, invoke edge function, verify logs + DB timestamps + Resend delivery), rather than driving each wizard through Playwright:

1. **Discovery pass** — grep both Patricia pages to enumerate every CTA/link and confirm the advisor slug is passed on each. Report any link missing attribution.
2. **Life Insurance Application** — insert draft row attributed to `patricia-serafin`, submit via RPC, invoke `send-life-insurance-notification`, verify:
   - `advisor_notification_sent_at` set
   - `admin_notification_sent_at` set
   - Resend log shows 3 sends (advisor, leads, applicant)
3. **Non-Medical Term Life** — same as above with `product_type = 'non_medical_term'`.
4. **Contact modal** — submit via `pipedrive-submit` edge function with advisor context; verify lead lands in leads inbox and no deal is created (Patricia not in owner map).
5. **Cleanup** — delete all test rows; report Resend message IDs + timestamps.

## Deliverable
A pass/fail table per form with Resend IDs, DB timestamps, and any attribution or delivery gaps found (with proposed fix if any).
