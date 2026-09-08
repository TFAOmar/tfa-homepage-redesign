# Add Miguelina Alvarez to Leadership

Add a fifth leadership profile on the About page, matching the existing card format used for Manuel, Omar, Ravven, and Kristin.

## What gets added

- **Name:** Miguelina Alvarez
- **Title:** Operations Administrator
- **Subtitle:** Insurance Operations • Agent Support • Licensing & Contracting
- **Photo:** the uploaded headshot, added as a hosted image like the other leaders
- **Intro:** her role at TFA plus her licensed life insurance work with Insurance Latino, and how she bridges advisors, clients, carriers, and internal teams
- **Key Achievements:** the eight bullets provided
- **Areas of Expertise:** the listed tags (Life Insurance, Insurance Operations, CRM & Platform Management, Agent Contracting, Licensing & Appointments, Agent Onboarding, Carrier Relations, Application Processing, Underwriting Coordination, Policy Administration, Client Service, Advisor Support, Process Improvement)
- **Closing:** the final two paragraphs condensed into one closing statement, matching the length of the other profiles
- No social links (none provided); the Contact button appears as it does on the other cards

She will be placed last in the leadership list, after Kristin Martin.

## Technical notes

- Upload the headshot via the assets CLI and reference the pointer, matching the pattern already used for Manuel Soto's photo.
- Add one entry to the `leaders` array in `src/components/about/Leadership.tsx`. No layout or component changes needed.
