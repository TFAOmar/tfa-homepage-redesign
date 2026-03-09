

## Plan: Add Kevin B. Walters Sr. — Advisor Profile, Landing Page & Troy, OH Location

### 1. Copy Headshot Image
- Copy `user-uploads://Kevin_Walters_Headshot.jpg` to `src/assets/advisors/kevin-walters.jpg`

### 2. Add to Advisors Data (`src/data/advisors.ts`)
- Import the headshot image
- Add Kevin as a new advisor entry:
  - **id**: `"kevin-walters"`
  - **name**: Kevin B. Walters Sr.
  - **title**: Insurance Agent & LEAP Practitioner
  - **type**: Advisor
  - **state**: Ohio
  - **city**: Troy
  - **region**: Midwest
  - **bio**: Based on the provided bio (30-year LEAP practitioner, founder of Walters Insurance Services, "declutter the American wallet" mission)
  - **specialties**: Life Insurance, Retirement Planning, Estate Planning, LEAP (Lifetime Economic Acceleration Process)
  - **licenses**: Life & Health
  - **email**: walterssrkevinb@gmail.com
  - **yearsOfExperience**: 30
  - **landingPage**: `/advisors/kevin-walters`

- Add "Ohio" to the states list (new state for the directory)

### 3. Add Troy, OH Location (`src/data/locations.ts`)
- New entry (id: 23):
  - **name**: Troy
  - **city**: Troy
  - **state**: OH
  - **address**: 1295 S Clay St, Bldg 2, Troy, OH 45373
  - **phone**: (937) 387-7426
  - **region**: Midwest (new region)
  - **coordinates**: approximate [-84.2033, 40.0395]

### 4. Update Location Count (`src/lib/seo/siteConfig.ts`)
- Increment `numberOfLocations` from 23 to 24

### 5. Create Landing Page (`src/pages/AdvisorKevinWalters.tsx`)
Following the established Neil Clark template pattern:
- **Hero**: Name, title badge, bio excerpt, Troy OH location, 30 years experience badge
- **About**: Full bio — LEAP practitioner story, "27 drawers" philosophy, career history (Jackson Fess, Columbus Financial Groups), mission at TFA
- **Services** (6 cards tailored to Kevin's specialties):
  - Life Insurance, LEAP Strategy, Retirement Planning, Estate Planning, Financial Organization, Wealth Building
- **Process**: 4 steps (Consultation → Assessment → Solutions → Support)
- **CTA**: All three conversion tools (Life Insurance App, Living Trust, Pre-Qual)
- **Modals**: ScheduleModal + ContactModal routed to `walterssrkevinb@gmail.com`

### 6. Add Route (`src/App.tsx`)
- Import `AdvisorKevinWalters`
- Add route: `/advisors/kevin-walters`

### Summary of Files Changed
| File | Change |
|------|--------|
| `src/assets/advisors/kevin-walters.jpg` | New (headshot) |
| `src/data/advisors.ts` | Add Kevin + import |
| `src/data/locations.ts` | Add Troy, OH location |
| `src/lib/seo/siteConfig.ts` | numberOfLocations → 24 |
| `src/pages/AdvisorKevinWalters.tsx` | New landing page |
| `src/App.tsx` | Add route |

