## Add Anita Vega to Advisors

Add new advisor "Anita Vega" to the static advisors list on the /advisors page.

### Steps

1. **Upload photo as Lovable Asset**
   - Use `lovable-assets create` on `/mnt/user-uploads/Anita_Vega.jpg` → `src/assets/advisors/anita-vega.jpg.asset.json`

2. **Add advisor entry in `src/data/advisors.ts`**
   - Import the asset pointer
   - Append new `Advisor` object:
     - id: `"anita-vega"`
     - name: "Anita Vega"
     - title: "Financial Strategist"
     - type: "Advisor"
     - state: "California", city: "Long Beach", region: "West"
     - bio: The shorter first-person bio she provided ("I share practical financial strategies…")
     - specialties: ["Retirement Planning", "Life Insurance", "Estate Planning", "Legacy Planning"]
     - licenses: ["Life & Health (Lic# 4484117)"]
     - image: imported asset URL
     - phone: "310-930-4960"
     - yearsOfExperience: 25
     - schedulingLink: `https://calendly.com/anitavega007/30min`

### Not included (confirm if wanted)
- No dedicated `/advisors/anita-vega` landing page (existing advisors mostly have one, but many don't — skipping unless requested).
- No email address provided; omitting `email`.
- Longer 25-year bio can replace the short one — let me know which you'd prefer as the card bio.
