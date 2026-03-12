

## Plan: Replace Calendly with Contact Form on Brea Landing Page

### What Changes

**File: `src/pages/Brea.tsx`** — Remove the Calendly iframe in the booking section and replace it with an inline contact form that submits to the existing Pipedrive pipeline via `submitForm`.

### Form Fields

| Field | Type | Required |
|-------|------|----------|
| First Name | text | yes |
| Last Name | text | yes |
| Email | email | yes |
| Phone | PhoneInput | yes |
| Meeting Preference | select: "In-Person (Brea Office)" / "Over the Phone" / "Video Call" | yes |
| Best Time to Meet | select: "Morning (9am-12pm)" / "Afternoon (12pm-3pm)" / "Evening (3pm-6pm)" / "Flexible" | yes |
| Preferred Language | select: "English" / "Spanish" | optional |
| Message | textarea | optional |

### Technical Details

- Follow the exact pattern from `ServiceConsultationForm.tsx` — same form libraries (react-hook-form + zod), same `submitForm()` call, same honeypot integration, same toast feedback
- Use the `PhoneInput` component for formatted phone input
- Style the form to match the Brea page (card background, non-dark-theme since the booking section uses `bg-secondary`)
- Form name: `"Brea Office Consultation"` with tags `["Brea Office", "Consultation Request"]`
- Include meeting preference and best time in the `notes` field sent to Pipedrive
- Show success state with a confirmation message after submission
- Keep the "Prefer to speak with someone directly? Call (888) 350-5396" fallback below the form

