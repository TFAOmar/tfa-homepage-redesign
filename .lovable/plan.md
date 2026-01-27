

# Display All Application Details in Agent Notification PDF

## Summary
Update the edge function PDF generator to show **every question answered** on the life insurance application without masking or hiding any information. Agents need complete visibility into all application data to process submissions effectively.

---

## Issues Found

| Issue | Current Behavior | Fix |
|-------|------------------|-----|
| Routing Number | Shows `***masked***` | Show full number |
| Account Number | Shows `****1234` (last 4 only) | Show full number |
| Permanent Resident Card | Not displayed | Add to PDF |
| Home/Work Phone | Only shown if provided | Always show (N/A if empty) |
| Job Duties | Only shown if provided | Always show (N/A if empty) |
| Industry | Only shown if provided | Always show (N/A if empty) |
| Years Employed | Only shown if defined | Always show (N/A if empty) |
| Household Income | Only shown if provided | Always show (N/A if empty) |
| Family Insurance fields | Only shown if provided | Always show (N/A if empty) |
| Medical questions | Only shown when TRUE | Always show Yes/No answers |

---

## File to Modify

**File:** `supabase/functions/send-life-insurance-notification/index.ts`

---

## Changes Required

### 1. Remove Masking Functions
Replace the masking functions with formatting functions that show full values:

```typescript
// BEFORE (lines 265-277)
const maskAccountNumber = (accountNum?: string): string => {
  if (!accountNum) return "N/A";
  const cleaned = accountNum.replace(/\D/g, "");
  if (cleaned.length >= 4) {
    return `****${cleaned.slice(-4)}`;
  }
  return "****";
};

const maskRoutingNumber = (routingNum?: string): string => {
  if (!routingNum) return "N/A";
  return "***masked***";
};

// AFTER
const formatAccountNumber = (accountNum?: string): string => {
  if (!accountNum) return "N/A";
  return accountNum;
};

const formatRoutingNumber = (routingNum?: string): string => {
  if (!routingNum) return "N/A";
  return routingNum;
};
```

### 2. Add Missing Step 1 Field (Permanent Resident Card)
After line 527 (visa expiration), add:

```typescript
if (step1.permanentResidentCard) {
  yPos = addPdfField(doc, "Permanent Resident Card #", formatPdfValue(step1.permanentResidentCard), yPos, margin, pageWidth);
}
```

### 3. Update Step 2 to Show All Fields (Not Just When Present)
Change conditional fields to always display (lines 553-589):

```typescript
// Contact - Always show all phone numbers
yPos = addPdfField(doc, "Email", formatPdfValue(step2.email), yPos, margin, pageWidth);
yPos = addPdfField(doc, "Mobile Phone", formatPdfValue(step2.mobilePhone || applicantPhone), yPos, margin, pageWidth);
yPos = addPdfField(doc, "Home Phone", formatPdfValue(step2.homePhone), yPos, margin, pageWidth);
yPos = addPdfField(doc, "Work Phone", formatPdfValue(step2.workPhone), yPos, margin, pageWidth);

// Employment - Always show all fields
yPos = addPdfField(doc, "Employer", formatPdfValue(step2.employerName), yPos, margin, pageWidth);
yPos = addPdfField(doc, "Occupation", formatPdfValue(step2.occupation), yPos, margin, pageWidth);
yPos = addPdfField(doc, "Industry", formatPdfValue(step2.industry), yPos, margin, pageWidth);
yPos = addPdfField(doc, "Job Duties", formatPdfValue(step2.jobDuties), yPos, margin, pageWidth);
yPos = addPdfField(doc, "Years Employed", formatPdfValue(step2.yearsEmployed), yPos, margin, pageWidth);

// Financials - Always show all fields
yPos = addPdfField(doc, "Annual Earned Income", formatCurrency(step2.annualEarnedIncome), yPos, margin, pageWidth);
yPos = addPdfField(doc, "Household Income", formatCurrency(step2.householdIncome), yPos, margin, pageWidth);
yPos = addPdfField(doc, "Net Worth", formatCurrency(step2.netWorth), yPos, margin, pageWidth);

// Family Insurance - Always show all fields
yPos = addPdfField(doc, "Spouse Insurance", formatCurrency(step2.spouseInsuranceAmount), yPos, margin, pageWidth);
yPos = addPdfField(doc, "Parents Insurance", formatCurrency(step2.parentsInsuranceAmount), yPos, margin, pageWidth);
yPos = addPdfField(doc, "Siblings Insurance", formatCurrency(step2.siblingsInsuranceAmount), yPos, margin, pageWidth);
```

### 4. Update Step 7 to Show All Yes/No Answers
Show all medical/lifestyle questions with their answers, not just the ones marked TRUE:

```typescript
// Show all questions with Yes/No answers
yPos = addPdfField(doc, "Used Tobacco (Last 5 Years)", step7.usedTobacco ? "Yes" : "No", yPos, margin, pageWidth);
if (step7.usedTobacco) {
  yPos = addPdfField(doc, "Tobacco Type", formatPdfValue(step7.tobaccoType), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Tobacco Frequency", formatPdfValue(step7.tobaccoFrequency), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Tobacco Last Used", formatPdfValue(step7.tobaccoLastUsed), yPos, margin, pageWidth);
}

yPos = addPdfField(doc, "Pilots Aircraft", step7.aviation ? "Yes" : "No", yPos, margin, pageWidth);
if (step7.aviation) {
  yPos = addPdfField(doc, "Aviation Details", formatPdfValue(step7.aviationDetails), yPos, margin, pageWidth);
}

yPos = addPdfField(doc, "Hazardous Sports", step7.hazardousSports ? "Yes" : "No", yPos, margin, pageWidth);
if (step7.hazardousSports) {
  yPos = addPdfField(doc, "Hazardous Sports Details", formatPdfValue(step7.hazardousSportsDetails), yPos, margin, pageWidth);
}

yPos = addPdfField(doc, "Foreign Travel Planned", step7.foreignTravel ? "Yes" : "No", yPos, margin, pageWidth);
if (step7.foreignTravel) {
  yPos = addPdfField(doc, "Foreign Travel Details", formatPdfValue(step7.foreignTravelDetails), yPos, margin, pageWidth);
}

yPos = addPdfField(doc, "Driving Violations (Last 5 Years)", step7.drivingViolations ? "Yes" : "No", yPos, margin, pageWidth);
if (step7.drivingViolations) {
  yPos = addPdfField(doc, "Driving Violations Details", formatPdfValue(step7.drivingViolationsDetails), yPos, margin, pageWidth);
}

yPos = addPdfField(doc, "Bankruptcy Filed", step7.bankruptcy ? "Yes" : "No", yPos, margin, pageWidth);
if (step7.bankruptcy) {
  yPos = addPdfField(doc, "Bankruptcy Details", formatPdfValue(step7.bankruptcyDetails), yPos, margin, pageWidth);
}

yPos = addPdfField(doc, "Criminal History", step7.criminalHistory ? "Yes" : "No", yPos, margin, pageWidth);
if (step7.criminalHistory) {
  yPos = addPdfField(doc, "Criminal History Details", formatPdfValue(step7.criminalHistoryDetails), yPos, margin, pageWidth);
}

yPos = addPdfField(doc, "Has Medical Conditions", step7.hasMedicalConditions ? "Yes" : "No", yPos, margin, pageWidth);
if (step7.hasMedicalConditions) {
  yPos = addPdfField(doc, "Medical Conditions Details", formatPdfValue(step7.medicalConditionsDetails), yPos, margin, pageWidth);
}
```

### 5. Update Step 8 to Show Full Bank Details
Update lines 840-845 to remove masking:

```typescript
if (step8.paymentMethod === "eft") {
  yPos = addPdfField(doc, "Bank Name", formatPdfValue(step8.bankName), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Routing Number", formatRoutingNumber(step8.routingNumber), yPos, margin, pageWidth);
  yPos = addPdfField(doc, "Account Number", formatAccountNumber(step8.accountNumber), yPos, margin, pageWidth);
  const accountType = step8.accountType === "checking" ? "Checking" : step8.accountType === "savings" ? "Savings" : formatPdfValue(step8.accountType);
  yPos = addPdfField(doc, "Account Type", accountType, yPos, margin, pageWidth);
}
```

---

## After Implementation

- **Full Visibility**: Agents will see every field from the application, including:
  - Complete routing and account numbers (unmasked)
  - All phone numbers and contact details
  - All employment and financial information
  - All Yes/No answers for medical/lifestyle questions
  - Permanent resident card number (if applicable)
- **No Blocked Information**: Every question answered on the form will appear in the PDF
- **Clear Answers**: Medical/lifestyle questions show explicit "Yes" or "No" instead of only appearing when true

---

## Security Note

The PDF is sent only to:
1. The assigned advisor (via their verified email)
2. The TFA admin inbox (leads@tfainsuranceadvisors.com)

Both recipients are authorized to view full application data for underwriting purposes. The email body will still mask SSNs for security, but the attached PDF will contain complete unmasked information.

