

# Add Landing Page Link to Israel Castaneda's Advisor Card

## Summary
Add the `landingPage` property to Israel Castaneda's advisor data entry so his card in the directory displays a "View Full Profile" button linking to his new dedicated landing page.

---

## Current State
Israel Castaneda's entry in `src/data/advisors.ts` has all core fields but is missing the `landingPage` property that triggers the "View Full Profile" button in the advisor card.

## Change Required

**File:** `src/data/advisors.ts`

Add `landingPage` property to Israel Castaneda's entry (line 77):

```typescript
{
  id: "israel-castaneda",
  name: "Israel Castaneda",
  title: "Partner",
  type: "Advisor",
  state: "California",
  city: "Fresno",
  region: "West",
  bio: "Israel helps families build generational security...",
  specialties: ["Bilingual • Bilingue", "Life Insurance", ...],
  licenses: ["Life & Health (Lic# 0I35205)"],
  image: israelCastanedaImg,
  email: "israel@tfainsuranceadvisors.com",
  landingPage: "/advisors/israel-castaneda"  // ADD THIS LINE
}
```

---

## How It Works

The `AdvisorCard` component already checks for the `landingPage` property:

```typescript
{('landingPage' in advisor && advisor.landingPage) && (
  <Link to={advisor.landingPage} className="w-full">
    <Button variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10">
      View Full Profile
    </Button>
  </Link>
)}
```

Once the property is added, Israel's card will automatically display the "View Full Profile" button above the "Meet Israel" scheduling button.

---

## After Implementation

Israel Castaneda's advisor card in the `/advisors` directory will show:
- **View Full Profile** button → Links to `/advisors/israel-castaneda`
- **Meet Israel** button → Opens scheduling modal

This matches the pattern used by other advisors with dedicated pages (Manuel Soto, Conrad Olvera, etc.).

