

## Plan: Add Escobar Realty Partner Email Notification

**What**: Send a copy of the lead notification email to `heiner@escorealtygroup.com` whenever the Escobar Realty Living Trust form is submitted.

**How**: Add a new partner email block in the `sendEmails` function in `supabase/functions/pipedrive-submit/index.ts`, mirroring the existing Health Insurance partner pattern (step 3). When `form_name` matches `"Living Trust Inquiry - Escobar Realty Group"`, send the team notification HTML to Heiner's email.

### Changes

**`supabase/functions/pipedrive-submit/index.ts`** — In the `sendEmails` function, after the existing Health Insurance partner block (~line 897), add a new block:

```typescript
// 4. Send to Escobar Realty partner for their living trust leads
if (formData.form_name === "Living Trust Inquiry - Escobar Realty Group") {
  try {
    const partnerResult = await resend.emails.send({
      from: "TFA Insurance Advisors <notifications@tfainsuranceadvisors.com>",
      to: ["heiner@escorealtygroup.com"],
      subject: `New Living Trust Lead - ${formData.first_name} ${formData.last_name}`,
      html: teamHtml,
    });
    if (partnerResult.error) {
      errors.push(`Escobar partner email: ${partnerResult.error.message}`);
    } else {
      partnerSent = true;
    }
  } catch (e) {
    errors.push(`Escobar partner email exception: ${e instanceof Error ? e.message : "Unknown error"}`);
  }
}
```

Then redeploy the `pipedrive-submit` edge function.

