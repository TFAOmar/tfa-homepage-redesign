# Fix Conrad Olvera's Living Trust Questionnaire email delivery

## Root cause (verified)

1. **Wrong recipient.** The questionnaire page reads the advisor's email from the static advisor directory. Conrad's record there still lists his personal Gmail (`src/data/advisors.ts` line 367: `conradolvera21@gmail.com`), and that value is passed straight through to the notification function. A January migration already set his TFA email in the database advisor record, but the questionnaire deliberately uses the static file, so the DB fix never took effect.
2. **Staff CC.** The notification function hard-codes `cc: ["clients@tfainsuranceadvisors.com"]` for *every* estate-planning submission (`supabase/functions/send-estate-planning-notification/index.ts` line 300). That is why staff see client details. There is no compliance rule in the code requiring it — it is a leftover hard-code.
3. **No PDF.** The estate-planning notification sends an HTML summary only; it never generates or attaches a PDF (the life-insurance flow does, using jsPDF inside the edge function — we'll reuse that pattern).
4. **No audit trail.** Nothing records who the email actually went to, or whether it sent.

Historical Conrad submissions found (both went to Gmail + staff CC):

| Submission ID | Client | Submitted |
|---|---|---|
| `16d983a9-84af-4b52-b28b-21831d74dd4b` | Telesford Quintana | Jul 22, 2026 |
| `e3fa9c5f-68d4-4d3e-b2bc-52dc7ee3dd7e` | Brittany Olvera | Aug 1, 2026 |

Both are stored intact in `estate_planning_applications`, so their PDFs can be regenerated and resent.

## What will change

### 1. Correct the advisor record
- `src/data/advisors.ts`: Conrad's email becomes `colvera@tfainsuranceadvisors.com`.
- `src/pages/AdvisorConradOlvera.tsx`: the two contact modals currently hard-code the Gmail address — both switch to the TFA address.
- No other advisor's email is touched.

### 2. Server-side recipient guard (so this cannot recur)
The notification function will resolve the recipient itself instead of trusting whatever the page sends:
- New table `advisor_email_routing` (advisor slug → approved business email, active flag), seeded with `conrad-olvera → colvera@tfainsuranceadvisors.com`.
- Resolution order: routing table by slug → submitted advisor email → default TFA inbox.
- Any consumer/free-mail domain (gmail, yahoo, hotmail, outlook, icloud, aol, proton) is rejected as a recipient. If a slug has an approved business email it is used instead; if not, the submission routes to the TFA fallback inbox and the audit row records the rejection.
- The questionnaire page will pass `advisorSlug` along with the submission so the server can resolve reliably.

### 3. Remove the staff CC
- The hard-coded `clients@tfainsuranceadvisors.com` CC is removed for advisor-attributed submissions. Advisor-specific questionnaires go **To: advisor only**, no CC, no BCC. Unattributed submissions (no advisor slug) still land in the TFA fallback inbox so nothing is lost.

### 4. PDF attachment
- The function generates a complete branded PDF of the submission (jsPDF, same approach as the life-insurance notification) and attaches it to the advisor's email.
- PDF contents: submission ID, submission timestamp, advisor name + slug, client contact info, spouse/co-trustee, children/dependents, guardianship and successor trustees, assets (real estate, financial accounts), liabilities, beneficiaries and percentages, estate-planning/health-directive answers, and the electronic signature block — every step of the wizard, with no fields dropped.
- If PDF generation fails, the email still sends (HTML summary) and the audit row records `pdf_status = failed`.

### 5. Audit trail
New table `notification_audit_log` written on every estate-planning send:
submission id, advisor slug, resolved recipient, actual to/cc/bcc arrays, Resend message id, PDF status, delivery status, error text, timestamp. Admin-only read access.

### 6. Admin resend / recovery
- New admin-only edge function `resend-estate-planning-pdf`: takes a submission id, regenerates the PDF from the stored submission, sends it to the resolved approved advisor email, and writes an audit row marked as a manual resend.
- A "Resend PDF to advisor" button in the existing admin submission detail view, with a confirmation dialog. Nothing is resent automatically — the two historical Conrad submissions are recovered by an admin clicking resend, and each click is logged.

### 7. Client-facing UI
Unchanged. Same URL, same wizard, same confirmation screen.

## Technical details

- Files: `src/data/advisors.ts`, `src/pages/AdvisorConradOlvera.tsx`, `src/pages/LivingTrustQuestionnaire.tsx` (pass `advisorSlug`), `src/components/living-trust/EstatePlanningWizard.tsx` (forward slug in payload), `supabase/functions/send-estate-planning-notification/index.ts` (recipient resolution, CC removal, PDF, audit), new `supabase/functions/resend-estate-planning-pdf/index.ts`, `src/components/admin/SubmissionDetailModal.tsx` (resend button).
- Migration: `advisor_email_routing` and `notification_audit_log` tables with grants and admin-scoped RLS; seed Conrad's routing row.
- The resend function requires a valid admin JWT (`has_role(auth.uid(),'admin')`).

## Verification

1. Submit a test questionnaire at `/advisors/conrad-olvera/living-trust-questionnaire`.
2. Read back the audit row and confirm: To = `colvera@tfainsuranceadvisors.com` only, CC empty, BCC empty, `pdf_status = generated`, `delivery_status = sent`, Resend message id present.
3. Confirm neither `conradolvera21@gmail.com` nor `clients@tfainsuranceadvisors.com` appears anywhere in the recipient set (grep + audit row).
4. Open the generated PDF and check every wizard section renders and is readable.
5. Submit a questionnaire under a second advisor slug (e.g. Vanessa Sanchez) and confirm it still routes to that advisor's own TFA address.
6. Report final To/CC/BCC, attachment status, and send result.
