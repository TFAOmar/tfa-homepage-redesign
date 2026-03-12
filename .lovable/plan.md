

## Plan: Add Multi-Select Service Interests to Brea Contact Form

### Changes

**File: `src/components/brea/BreaContactForm.tsx`**

1. Add `interestCategories: z.array(z.string()).min(1, "Please select at least one service")` to the zod schema
2. Add default value `interestCategories: []`
3. Add a multi-select checkbox group (same pattern as `BookConsultation.tsx`) with these options:
   - Retirement Planning, Life Insurance, Investment Management, Tax Strategy, Estate Planning, Business Insurance
4. Each option renders as a styled label with a `Checkbox` — selected items get accent border/background
5. Update the `onSubmit` to include selected interests in `notes`, `tags`, and `interest_category` fields sent to Pipedrive
6. Place the interest selector between the Meeting Preference/Best Time row and the Preferred Language field

### Imports to add
- `Checkbox` from `@/components/ui/checkbox`
- `Controller` from `react-hook-form`

