

# Route Sponsorship Notifications to events@tfainsuranceadvisors.com

## Summary
Update the `send-sponsorship-notification` Edge Function to send internal admin notifications to `events@tfainsuranceadvisors.com` instead of the current `leads@tfainsuranceadvisors.com`. This routes sponsorship inquiries to the dedicated events inbox for better team workflow.

---

## Current State

| Email | Recipient |
|-------|-----------|
| Internal admin notification | leads@tfainsuranceadvisors.com |
| Sponsor confirmation | Sponsor's email address |

---

## Proposed Change

| Email | New Recipient |
|-------|---------------|
| Internal admin notification | events@tfainsuranceadvisors.com |
| Sponsor confirmation | Sponsor's email address (no change) |

---

## File to Modify

**File:** `supabase/functions/send-sponsorship-notification/index.ts`

**Change:** Line 71

```typescript
// Current
to: ["leads@tfainsuranceadvisors.com"],

// Updated
to: ["events@tfainsuranceadvisors.com"],
```

---

## Technical Note

The sponsor's confirmation email (line 154-257) will continue to direct them to contact `leads@tfainsuranceadvisors.com` for questions. You may also want this changed to `events@tfainsuranceadvisors.com` for consistency — I can include that update as well if desired.

---

## After Implementation

- All general sponsorship inquiries from `/events/sponsorship` will notify `events@tfainsuranceadvisors.com`
- All specific event sponsorship inquiries (TFA 2026 Kick Off) will also notify `events@tfainsuranceadvisors.com`
- Sponsors will receive confirmation emails with updated contact information

