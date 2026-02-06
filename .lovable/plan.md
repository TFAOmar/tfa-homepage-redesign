
# Fix: Reliable Life Insurance Email Notifications

## Problem

Life insurance application notifications are being missed because the edge function invocation can be aborted when the browser navigates to the thank-you page. This has happened for both Manuel Soto and Conrad Olvera applications.

## Solution

Implement a database-trigger-based approach to guarantee notifications are sent, with the client-side call as an optional optimization.

---

## Technical Approach

### Option A: Wait for Email Before Navigation (Quick Fix)

Modify `ApplicationWizard.tsx` to await the email function and only navigate after it completes (or times out after 10 seconds).

Changes:
- Remove the fire-and-forget pattern for email invocation
- Add a timeout wrapper so users aren't stuck waiting forever
- Only navigate to `/thank-you` after email completes or times out

```text
File: src/components/life-insurance-application/ApplicationWizard.tsx

Lines 1004-1031: Change email invocation from non-blocking to awaited with timeout

Current pattern (non-blocking):
  try {
    supabase.functions.invoke("send-life-insurance-notification", {...});
    // Don't await - just fire and forget
  } catch { /* log only */ }
  navigate("/thank-you"); // Navigates immediately

New pattern (await with timeout):
  await Promise.race([
    supabase.functions.invoke("send-life-insurance-notification", {...}),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000))
  ]).catch(err => console.error("Email notification issue:", err));
  navigate("/thank-you"); // Navigate after email completes or times out
```

### Option B: Database Webhook Trigger (Robust Fix)

Create a Supabase database trigger that fires when `life_insurance_applications.status` changes to `submitted`, automatically invoking the notification edge function server-side.

This approach guarantees notifications are sent regardless of client-side behavior.

Steps:
1. Create a new edge function `trigger-life-insurance-notification` that accepts the application ID
2. Create a database trigger on `life_insurance_applications` that fires on UPDATE when status changes to 'submitted'
3. Use `pg_net` or Supabase webhooks to call the edge function
4. Remove client-side email invocation (or keep as backup)

---

## Recommended Implementation

Start with **Option A** (quick fix) for immediate reliability improvement, then plan **Option B** for a bulletproof solution.

### Files to Modify

1. `src/components/life-insurance-application/ApplicationWizard.tsx`
   - Lines 1004-1031: Make email invocation awaited with 10-second timeout
   - Move navigation after the email promise settles

### Code Change Summary

```typescript
// Stage 4: Send email notifications (wait with timeout)
try {
  console.log("Sending life insurance notification emails...");
  
  const emailPromise = supabase.functions.invoke(
    "send-life-insurance-notification",
    {
      body: {
        applicationId,
        applicantName,
        applicantEmail,
        applicantPhone,
        advisorId: advisorId || null,
        advisorName: advisorName || null,
        formData: finalFormData,
      },
    }
  );
  
  // Wait up to 10 seconds for email to send
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error("Email notification timeout")), 10000)
  );
  
  await Promise.race([emailPromise, timeoutPromise]);
  console.log("Notification emails sent successfully");
} catch (emailError) {
  console.error("Email notification issue:", emailError);
  // Still proceed to success - application is saved
}

// Clear draft and navigate (after email attempt)
localStorage.removeItem("lifeInsuranceApplication");
fireConfetti({ ... });
toast({ ... });
setIsSubmitting(false);
navigate("/thank-you");
```

---

## Expected Outcome

After this change:
- Email notifications will complete before the browser navigates away
- If email takes longer than 10 seconds, user still gets success page (data is safe)
- No more missed notifications due to race conditions
- Admin can still use "Resend PDF" feature as backup
