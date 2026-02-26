

# Create Advisor Profile for Cornelius "Neil" Clark

## Overview
Add Neil Clark as a new advisor to the TFA roster with a dedicated profile page, his uploaded headshot, and links to all three client tools. Based in Rancho Cucamonga, CA.

## What Gets Built

### 1. Advisor Photo
- Copy `Neil_Clark.jpg` to `src/assets/advisors/neil-clark.jpg`

### 2. Add to Advisor Directory (`src/data/advisors.ts`)
- id: `"neil-clark"`
- Name: `Cornelius "Neil" Clark`
- Title: "Insurance Agent & Protection Strategist"
- Location: Rancho Cucamonga, CA
- Email: his personal email (to be provided) or fallback TFA email
- Specialties: Life Insurance, Estate Planning, Executive Retention Packages, Financial Education
- License: Life & Health
- Landing page: `/advisors/neil-clark`

### 3. Dedicated Profile Page (`src/pages/AdvisorNeilClark.tsx`)
Following the established pattern (Hero, About, Services, Process, CTA):

- **Hero**: Photo, name ("Cornelius 'Neil' Clark"), title, tagline about planning for your future, badges for Rancho Cucamonga CA and Life & Health Licensed. CTA buttons: Book Consultation, Contact Me, Life Insurance Application, Living Trust Questionnaire, Pre-Qualification.
- **About**: 12 years as an insurance agent and protection strategist. Educates individuals and businesses on insurance as estate planning tool and executive retention packages. Keynote speaker -- especially proud of speaking at Etiwanda High School about financial literacy. Married 22 years, three children, enjoys sports and fitness.
- **Services** (6 cards): Life Insurance, Estate Planning, Executive Retention Packages, Financial Education, Business Insurance Solutions, Retirement Planning
- **Process** (4 steps): Standard consultation flow
- **CTA**: Bottom section with all tool links
- **Modals**: ScheduleModal and ContactModal routed to his email

### 4. Routing (`src/App.tsx`)
- Add route: `/advisors/neil-clark`
- Add lazy import for `AdvisorNeilClark`

### 5. No Additional Changes Needed
- Life Insurance App, Living Trust, and Pre-Qualification use dynamic routes with hybrid advisor lookup -- they auto-work once Neil is in the static advisors array

## Files Changed
| File | Action |
|------|--------|
| `src/assets/advisors/neil-clark.jpg` | Copy from upload |
| `src/data/advisors.ts` | Add new advisor entry |
| `src/pages/AdvisorNeilClark.tsx` | New profile page |
| `src/App.tsx` | Add route + import |

