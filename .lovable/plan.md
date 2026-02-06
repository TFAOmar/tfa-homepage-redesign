

# Fix American Way Health Email Template Issues

## Problems Identified

### Issue 1: Data Showing as Code in Partner Emails
The template variables are **escaped** (`\${...}`) instead of properly interpolated (`${...}`). This causes the email to display literal text like `${formData.first_name}` instead of the actual values like "John".

**Example from current code (line 681):**
```html
<td>...\${formData.first_name} \${formData.last_name}</td>
```
This outputs: `${formData.first_name} ${formData.last_name}` (literal text)

**Should be:**
```html
<td>...${formData.first_name} ${formData.last_name}</td>
```
This outputs: `John Smith` (actual data)

### Issue 2: Team Email Using Old Template
The `leads@tfainsuranceadvisors.com` address receives `teamHtml` (the generic template) instead of the new branded template. The code at line 833 sends the standard template to the team, while only the partner emails at line 874 use `generateAmericanWayHealthEmailHtml`.

---

## Solution

### Fix 1: Remove Escaped Backslashes from Template

Replace all `\${` with `${` throughout the `generateAmericanWayHealthEmailHtml` function to enable proper JavaScript template literal interpolation.

**Affected lines:** 681-791 (approximately 30+ occurrences)

### Fix 2: Use Branded Template for Team on Health Insurance Inquiries

Update the `sendEmails` function to detect "Health Insurance Inquiry" forms and use the branded template for the team email as well.

**File:** `supabase/functions/pipedrive-submit/index.ts`

**Before (line 833):**
```typescript
// Team always gets teamHtml
const teamResult = await resend.emails.send({
  to: [teamEmail],
  html: teamHtml,
});
```

**After:**
```typescript
// Use branded template for health insurance leads
const isHealthInsuranceLead = formData.form_name === "Health Insurance Inquiry";
const finalTeamHtml = isHealthInsuranceLead 
  ? generateAmericanWayHealthEmailHtml(formData, submissionId)
  : teamHtml;

const teamResult = await resend.emails.send({
  to: [teamEmail],
  html: finalTeamHtml,
});
```

---

## Variables to Fix in Template

All occurrences of escaped template literals need correction:

| Line | Current (Broken) | Fixed |
|------|------------------|-------|
| 681 | `\${formData.first_name}` | `${formData.first_name}` |
| 681 | `\${formData.last_name}` | `${formData.last_name}` |
| 685 | `\${formData.email}` | `${formData.email}` |
| 689-690 | `\${formData.phone}` | `${formData.phone}` |
| 693 | `\${zipCode}` | `${zipCode}` |
| 714 | `\${insuranceType}` | `${insuranceType}` |
| 718 | `\${dateOfBirth}` | `${dateOfBirth}` |
| 721-722 | `\${referredBy}` (conditional) | `${referredBy}` |
| 722 | `\${yearlyIncome}` | `${yearlyIncome}` |
| 724-728 | `\${referredBy}` (row) | `${referredBy}` |
| 736 | `\${formData.source_url}` | `${formData.source_url}` |
| 748-751 | Multiple UTM fields | Remove backslashes |
| 786 | `\${submittedDate}` | `${submittedDate}` |
| 791 | `\${submissionId}` | `${submissionId}` |

---

## Files to Modify

| File | Changes |
|------|---------|
| `supabase/functions/pipedrive-submit/index.ts` | Fix escaped template literals (~30 occurrences), update team email logic |

---

## Expected Result

After this fix:
- Partner emails (`info@health-market.com`, `info@awhealthllc.com`) will show actual data (e.g., "John Smith") instead of code (`${formData.first_name}`)
- Team email (`leads@tfainsuranceadvisors.com`) will receive the same branded template for Health Insurance Inquiry forms
- All three recipients will see identical, properly formatted emails with the teal/cyan branding and logo

