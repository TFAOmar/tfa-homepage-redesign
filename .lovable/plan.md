

# Enhance American Way Health Form Notifications

## Overview

This plan addresses three requirements:
1. **Add "Referred by" field** to the form
2. **Create a visually enhanced email template** specifically for American Way Health submissions
3. **Add additional email recipient** (info@health-market.com)

---

## Changes Summary

### File 1: `src/components/health-insurance/AmericanWayHealthForm.tsx`

**Add "Referred by" field:**
- Add `referredBy` to the Zod schema (optional string, max 100 characters)
- Add form field after the Insurance Type selector
- Include the referred by value in the notes payload

**Schema update:**
```typescript
referredBy: z.string().max(100).optional(),
```

**Notes payload update:**
```typescript
const notes = [
  `Insurance Type: ${insuranceTypeLabels[data.insuranceType]}`,
  `Date of Birth: ${dateOfBirth}`,
  `Yearly Income: ${incomeLabel}`,
  `ZIP Code: ${data.zipCode}`,
  data.referredBy && `Referred By: ${data.referredBy}`,
  `Partner: American Way Health`,
  `Terms Accepted: Yes`,
].filter(Boolean).join("\n");
```

---

### File 2: `supabase/functions/pipedrive-submit/index.ts`

**Create custom email template for American Way Health:**
- Add new function `generateAmericanWayHealthEmailHtml()` with a professional, visually appealing design
- Template will display all form fields in a structured table format with clear labels
- Use branded colors (blue/green accents for health insurance theme)

**Add additional recipient:**
- Modify the `sendEmails()` function to detect "Health Insurance Inquiry" forms
- Send an additional email to `info@health-market.com` for American Way Health submissions

**New email template structure:**
```text
┌────────────────────────────────────────────────────┐
│  🏥  NEW HEALTH INSURANCE LEAD                     │
│  American Way Health                               │
├────────────────────────────────────────────────────┤
│                                                    │
│  CONTACT INFORMATION                               │
│  ┌──────────────────┬─────────────────────────┐   │
│  │ Name             │ John Smith              │   │
│  │ Email            │ john@example.com        │   │
│  │ Phone            │ (555) 123-4567          │   │
│  │ ZIP Code         │ 90210                   │   │
│  └──────────────────┴─────────────────────────┘   │
│                                                    │
│  INSURANCE DETAILS                                 │
│  ┌──────────────────┬─────────────────────────┐   │
│  │ Insurance Type   │ Individual Health       │   │
│  │ Date of Birth    │ 06/15/1985              │   │
│  │ Yearly Income    │ $50K - $75K             │   │
│  │ Referred By      │ Jane Doe                │   │
│  └──────────────────┴─────────────────────────┘   │
│                                                    │
│  ATTRIBUTION                                       │
│  Source URL: https://tfawealthplanning...          │
│  UTM Source: facebook                              │
│                                                    │
├────────────────────────────────────────────────────┤
│  Submitted: Feb 6, 2026 at 3:45 PM                │
│  Submission ID: abc-123-def                        │
└────────────────────────────────────────────────────┘
```

---

## Technical Implementation

### Form Schema Changes

**Before:**
```typescript
const formSchema = z.object({
  // ... existing fields
  insuranceType: z.string().min(1, "..."),
  termsAccepted: z.literal(true, {...}),
});
```

**After:**
```typescript
const formSchema = z.object({
  // ... existing fields
  insuranceType: z.string().min(1, "..."),
  referredBy: z.string().max(100).optional(),  // NEW
  termsAccepted: z.literal(true, {...}),
});
```

### Email Routing Logic

In the `sendEmails()` function, after sending to the team and advisor:

```typescript
// 3. Send to American Way Health partner for health insurance leads
if (formData.form_name === "Health Insurance Inquiry") {
  try {
    const partnerHtml = generateAmericanWayHealthEmailHtml(formData, submissionId);
    const partnerResult = await resend.emails.send({
      from: "TFA Insurance Advisors <notifications@tfainsuranceadvisors.com>",
      to: ["info@health-market.com"],
      subject: `New Health Insurance Lead - ${formData.first_name} ${formData.last_name}`,
      html: partnerHtml,
    });
    // ... handle result
  } catch (e) {
    // ... error handling
  }
}
```

---

## Email Template Design Features

The new template will include:

1. **Header with gradient** - Green/teal health insurance branding
2. **Partner logos placeholder** - Professional header treatment
3. **Two-column data tables** - Clear label/value pairs
4. **Separate sections** for:
   - Contact Information (name, email, phone, ZIP)
   - Insurance Details (type, DOB, income, referred by)
   - Attribution Data (source URL, UTM parameters)
5. **Footer** with timestamp and submission ID
6. **Mobile-responsive** design with proper viewport handling

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/health-insurance/AmericanWayHealthForm.tsx` | Add `referredBy` field to schema, form, and notes payload |
| `supabase/functions/pipedrive-submit/index.ts` | Add custom email template and additional recipient logic |

---

## Expected Outcome

After implementation:
- Form will include an optional "Referred By" field
- Submissions will trigger a professionally styled email notification
- Three recipients will receive notifications:
  - `leads@tfainsuranceadvisors.com` (TFA team)
  - `info@health-market.com` (American Way Health partner) - **NEW**
  - Any assigned advisor (if applicable)
- All form data will be clearly displayed in the email with proper formatting

