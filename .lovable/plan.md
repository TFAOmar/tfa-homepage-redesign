
# Add Additional Email Recipient for American Way Health Notifications

## Overview

Add `info@awhealthllc.com` to receive the same branded health insurance notification emails that are currently sent to `info@health-market.com`.

---

## Changes

### File: `supabase/functions/pipedrive-submit/index.ts`

**Location:** Line 864

**Before:**
```typescript
to: ["info@health-market.com"],
```

**After:**
```typescript
to: ["info@health-market.com", "info@awhealthllc.com"],
```

**Update log message (line 873):**
```typescript
console.log("[Email Sent - Partner] info@health-market.com, info@awhealthllc.com");
```

---

## Result

After this change, all "Health Insurance Inquiry" form submissions will send the branded notification email to:

| Recipient | Purpose |
|-----------|---------|
| `leads@tfainsuranceadvisors.com` | TFA Team inbox |
| `info@health-market.com` | American Way Health partner |
| `info@awhealthllc.com` | American Way Health LLC (NEW) |

All three recipients will receive the same custom email template with the teal/cyan gradient header, structured data tables, and attribution footer.
