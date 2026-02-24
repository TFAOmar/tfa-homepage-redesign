

# Use White Think Tax Solutions Logo on Dark Backgrounds

## Problem
The current Think Tax Solutions logo (dark/black version) doesn't look ideal on the dark sections of the page. The new white transparent logo will look great on dark backgrounds but will be invisible on the white header and footer.

## Solution
Save the new white logo as a second asset and use it specifically where it appears on dark backgrounds. Keep the existing dark logo for the white header and footer sections.

## Changes

### 1. Save the White Logo
- Copy `user-uploads://Think_Tax_Solutions.png` to `src/assets/partners/think-tax-solutions-white.png`

### 2. Update VanessaThinkTaxSolutions.tsx
- Import the white logo as `thinkTaxLogoWhite`
- **Header (line 92)**: Keep the dark `thinkTaxLogo` (white background)
- **Partnership section (line 182)**: Switch to `thinkTaxLogoWhite` (dark glassmorphic background)
- **Footer (line 261)**: Keep the dark `thinkTaxLogo` (white background)

## Files

| File | Action |
|------|--------|
| `src/assets/partners/think-tax-solutions-white.png` | Create (copy from upload) |
| `src/pages/VanessaThinkTaxSolutions.tsx` | Update partnership section logo import |

