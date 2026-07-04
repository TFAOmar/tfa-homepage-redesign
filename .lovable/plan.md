## Changes to `src/components/about/Leadership.tsx`

**1. Omar Sanchez LinkedIn**
- Update `linkedin: "https://linkedin.com/in/omarsanchez"` → `"https://www.linkedin.com/in/omarsito/"`

**2. Add `expertise` to Ravven Murphy** (using the list you provided):
Program Management, Cross-Functional Leadership, Business Development, Customer Retention, Process Improvement, Employee Engagement, Internal Communications, Customer Success, Relationship Management, Event Planning & Coordination, Community Engagement

**3. Add `expertise` to Omar Sanchez** (you asked me to decide — derived from his existing bio/role as COO & Managing Partner):
Operations & Executive Leadership, Advisor Development & Training, National Expansion Strategy, Financial Planning Systems, Digital Client Experience, Strategic Partnerships, Business Process Design, Latino Community Financial Education

**4. Replace Manny Soto's photo**
- Upload the provided `Manny_Soto_2.jpg` via `lovable-assets` to CDN.
- Write pointer to `src/assets/leadership/manny-soto.jpg.asset.json`.
- Delete the old `src/assets/leadership/manny-soto.jpg` binary.
- Update the import in `Leadership.tsx` to consume the new `.asset.json` (`import mannySotoAsset from ".../manny-soto.jpg.asset.json"` and use `mannySotoAsset.url`).

No other files touched; scope is About page only. If you want different expertise items for Omar, tell me and I'll swap them.