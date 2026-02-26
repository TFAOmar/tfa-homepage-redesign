

# Create Advisor Profile for Manolo Monter

## Overview
Add Manolo Monter as a new advisor to the TFA roster with a dedicated profile page, his uploaded headshot photo, and links to all three client tools (Life Insurance Application, Living Trust Questionnaire, Pre-Qualification).

## What Gets Built

### 1. Advisor Photo
- Copy the uploaded photo (`Manolo_Monter.jpg`) to `src/assets/advisors/manolo-monter.jpg`

### 2. Add to Advisor Directory (`src/data/advisors.ts`)
- New entry with id `"manolo-monter"`, based in Chino Hills, CA
- Title: "Life Insurance Agent & Pre-Need Specialist"
- Type: Advisor
- Bio: Based on the provided description (award-winning, 10+ years licensed in CA, 6 years in pre-need funeral planning)
- Specialties: Life Insurance, Pre-Need Funeral Planning, Final Expense, Estate Planning
- Bilingual badge (based on name/background)
- License: Life & Health
- Email: mmonter@tfainsuranceadvisors.com
- Landing page: `/advisors/manolo-monter`

### 3. Dedicated Profile Page (`src/pages/AdvisorManoloMonter.tsx`)
Following the established pattern (Hero, About, Services, Process, CTA):
- **Hero**: Photo, name, title, tagline about compassionate service, badges for Chino Hills CA and Life & Health Licensed, CTA buttons (Book Consultation, Contact Me, Start Life Insurance Application, Start Living Trust Questionnaire, Life Insurance Pre-Qualification)
- **About**: His background -- award-winning agent, decade of experience, six years in pre-need funeral planning, funeral home and field experience, devoted father of three
- **Services** (6 cards): Life Insurance, Pre-Need Funeral Planning, Final Expense Planning, Estate Planning, Family Protection, Retirement Planning
- **Process** (4 steps): Standard consultation flow
- **CTA**: Bottom section with all tool links
- **Modals**: ScheduleModal and ContactModal routed to `mmonter@tfainsuranceadvisors.com`

### 4. Routing (`src/App.tsx`)
- Add route: `/advisors/manolo-monter` pointing to the new page component
- Add lazy import for `AdvisorManoloMonter`

### 5. No Additional Changes Needed
- Life Insurance App, Living Trust Questionnaire, and Pre-Qualification all use dynamic routes (`/advisors/:advisorSlug/...`) with hybrid advisor lookup -- they will automatically work for `manolo-monter` once he's in the static advisors array
- Notifications will route to `mmonter@tfainsuranceadvisors.com` and CC `clients@tfainsuranceadvisors.com`
- No database or edge function changes required

## Files Changed
| File | Action |
|------|--------|
| `src/assets/advisors/manolo-monter.jpg` | Copy from upload |
| `src/data/advisors.ts` | Add new advisor entry + import |
| `src/pages/AdvisorManoloMonter.tsx` | New profile page |
| `src/App.tsx` | Add route + import |

