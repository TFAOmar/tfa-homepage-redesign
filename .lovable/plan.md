

# Fix Event Notification Email

## Issue Found
The event submission notification email is not being sent because:

1. **Missing JWT Configuration**: The `send-event-notification` function is not registered in `supabase/config.toml`. This means it defaults to `verify_jwt = true`, which blocks all unauthenticated requests from the frontend.

2. **Wrong "From" Email Address**: The function uses `notifications@tfainsuranceadvisors.com`, but TFA's verified Resend domain uses `noreply@tfainsuranceadvisors.com`. Using an unverified sender address causes Resend to reject emails to external recipients.

---

## Fix Plan

### 1. Add Function to Config
Add JWT bypass configuration for the edge function:

| File | Change |
|------|--------|
| `supabase/config.toml` | Add `[functions.send-event-notification]` with `verify_jwt = false` |

### 2. Fix "From" Email Address
Update the sender to use TFA's verified domain:

| Current | Fixed |
|---------|-------|
| `TFA Events <notifications@tfainsuranceadvisors.com>` | `TFA Events <noreply@tfainsuranceadvisors.com>` |

### 3. Redeploy Edge Function
The edge function will automatically redeploy with these changes.

---

## Technical Details

### Config.toml Addition
```toml
[functions.send-event-notification]
verify_jwt = false
```

### Email Sender Change (Line 54-56 and 92-94)
```typescript
// Before
from: "TFA Events <notifications@tfainsuranceadvisors.com>",

// After
from: "TFA Events <noreply@tfainsuranceadvisors.com>",
```

---

## After Implementation
- Admin notifications will be sent to `events@tfainsuranceadvisors.com`
- Agent confirmation emails will be sent to the agent's email address
- Both emails will come from `TFA Events <noreply@tfainsuranceadvisors.com>`

