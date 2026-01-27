

# Fix Life Insurance Email Notification System

## Problem Summary
Fabian Serrano's client (Marvin Olivar) submitted a life insurance application on January 26th, but neither Fabian nor the admin team received email notifications. Investigation reveals:

1. **Application was successfully submitted** - Status is `submitted` with all data intact
2. **No edge function logs exist** - `send-life-insurance-notification` has zero invocation records
3. **Advisor email lookup fails for static advisors** - Fabian is not in the `dynamic_advisors` table

---

## Root Cause Analysis

The edge function has two issues:

### Issue 1: Advisor Email Lookup Fails for Static Advisors
The function tries to look up advisor email from `dynamic_advisors` table (lines 1287-1336), but:
- Fabian Serrano is a **static advisor** (defined in code, not database)
- The lookup by UUID fails (the `advisorId` passed is a slug like "fabian-serrano", not a UUID)
- The slug fallback lookup fails because Fabian isn't in the database
- **The function ignores the `advisor_email` already stored in the application record**

### Issue 2: Edge Function May Not Be Deployed
The lack of any logs (not even the initial "function invoked" log at line 1253) suggests the function may not be properly deployed or there's a silent failure during invocation.

---

## Solution

### Part 1: Use Stored advisor_email as Primary Source

Since the `advisor_email` is now stored directly in `life_insurance_applications` at submission time, the edge function should:

1. Fetch the stored `advisor_email` from the database using the `applicationId`
2. Use that email instead of doing dynamic lookups
3. Only fall back to `dynamic_advisors` lookup if no email is stored

**File to Modify:** `supabase/functions/send-life-insurance-notification/index.ts`

```typescript
// NEW: Fetch advisor_email from the application record first
let advisorEmail: string | undefined;

try {
  const { data: appData, error: appError } = await supabaseAdmin
    .from("life_insurance_applications")
    .select("advisor_email")
    .eq("id", data.applicationId)
    .single();
  
  if (appData?.advisor_email && !appError) {
    advisorEmail = appData.advisor_email;
    console.log("Found advisor email from application record:", advisorEmail);
  }
} catch (e) {
  console.error("Error fetching advisor email from application:", e);
}

// Only do dynamic_advisors lookup if email not found in application
if (!advisorEmail && data.advisorId) {
  // ... existing lookup logic as fallback
}
```

### Part 2: Deploy the Edge Function

After making the fix, deploy the function to ensure it's active:

```
supabase functions deploy send-life-insurance-notification
```

### Part 3: Resend Notification for Fabian's Application

Use the existing "Resend PDF to Advisor" feature from the Admin Dashboard to manually trigger the notification for:
- Application ID: `ce351ca6-d8f7-40b4-980f-c4f9baa248ae`
- Applicant: Marvin Olivar
- Advisor: Fabian Serrano (fabian@shftinsurance.com)

---

## Files to Modify

| File | Changes |
|------|---------|
| `supabase/functions/send-life-insurance-notification/index.ts` | Add database lookup for `advisor_email` from application record before dynamic_advisors fallback |

---

## Technical Details

### Current Flow (Broken)
```text
1. Frontend invokes edge function with advisorId="fabian-serrano"
2. Function tries UUID lookup in dynamic_advisors → FAILS
3. Function tries slug lookup in dynamic_advisors → FAILS  
4. advisorEmail = undefined
5. Admin gets email, advisor gets nothing
```

### Fixed Flow
```text
1. Frontend invokes edge function with applicationId
2. Function fetches advisor_email FROM application record → "fabian@shftinsurance.com"
3. Emails sent to admin AND advisor
```

---

## After Implementation

1. Redeploy the `send-life-insurance-notification` edge function
2. Manually resend the notification for Fabian's application using Admin Dashboard
3. Future submissions will use the stored `advisor_email` from the application record
4. All advisors (static and dynamic) will receive notifications

