## End-to-End Test: Life Insurance Application Notifications

Run a Playwright script against the live preview to verify that submitting a life insurance application triggers all three notifications (advisor, leads inbox, applicant) for both the medical and non-medical flows.

### Scenarios to cover

1. **Medical Life Insurance – attributed via advisor slug**
   - Navigate to `/life-insurance-application?advisor=patricia-serafin`
   - Fill all 9 wizard steps with test data (applicant: `qa+patricia@tfainsuranceadvisors.com`)
   - Submit and capture the network response from `send-life-insurance-notification`

2. **Non-Medical Life Insurance – no advisor**
   - Navigate to `/non-medical-life-application`
   - Complete the wizard with test data (applicant: `qa+nonmed@tfainsuranceadvisors.com`)
   - Submit and capture the notification response

### Verification steps

- Screenshot the final "submitted" screen for each flow.
- Query `life_insurance_applications` for the two new rows and confirm:
  - `status = 'submitted'`
  - `advisor_email` populated correctly (Patricia for #1, null for #2)
  - `admin_notification_sent_at` and `advisor_notification_sent_at` populated
- Query `email_send_log` (deduplicated by `message_id`) filtered to the two applicant addresses to confirm `sent` status for advisor, leads, and applicant emails.
- If any row shows `admin_notification_sent_at IS NULL` after 30s, manually invoke `retry-missed-life-insurance-notifications` and re-check.

### Deliverable

Short report to the user with: submitted app IDs, notification timestamps, email log statuses per recipient, and screenshots. Flag any missing emails with the exact row that failed and the retry outcome.

No code changes are expected — this is a verification run. If a gap is found, I'll come back with a follow-up plan before editing.
