

# Add Sheila Rodriguez - New Advisor Profile

## Summary
Add Sheila Rodriguez as a new advisor to the directory and create her dedicated landing page. This is notable as the **first TFA advisor in Kansas**, expanding TFA's geographic reach to the Midwest region.

---

## Advisor Information

| Field | Value |
|-------|-------|
| Name | Sheila Rodriguez |
| Title | Financial Strategist |
| Location | Overland Park, KS |
| Region | Midwest |
| Email | sheila@tfainsuranceadvisors.com |
| Phone | (661) 816-1920 |
| Years of Experience | 25+ |
| Specialties | Investment Management, Retirement Planning, Risk Assessment, Tax Optimization, Estate Planning |

---

## Files to Create/Modify

### 1. Save Uploaded Image
- Copy `user-uploads://Sheila_Rodriguez.jpg` to `src/assets/advisors/sheila-rodriguez.jpg`

### 2. Update `src/data/advisors.ts`
Add import for the new image and add Sheila to the advisors array:

```typescript
// Add import
import sheilaRodriguezImg from "@/assets/advisors/sheila-rodriguez.jpg";

// Add to advisors array
{
  id: "sheila-rodriguez",
  name: "Sheila Rodriguez",
  title: "Financial Strategist",
  type: "Advisor",
  state: "Kansas",
  city: "Overland Park",
  region: "Midwest",
  bio: "With over 25 years of experience in the mortgage, banking, & financial services industry, Sheila specializes in crafting comprehensive financial plans tailored to each client's unique circumstances. Her holistic approach spans investment management, retirement planning, risk assessment, tax optimization, and estate planning.",
  specialties: ["Investment Management", "Retirement Planning", "Tax Optimization", "Estate Planning", "Risk Assessment"],
  licenses: ["Life & Health"],
  image: sheilaRodriguezImg,
  email: "sheila@tfainsuranceadvisors.com",
  phone: "(661) 816-1920",
  yearsOfExperience: 25,
  landingPage: "/advisors/sheila-rodriguez"
}
```

### 3. Create `src/pages/AdvisorSheilaRodriguez.tsx`
New landing page following the established pattern with:

**Hero Section**
- Professional headshot
- Name, title, location (Overland Park, KS)
- Phone and email links
- "Book a Consultation" and "Contact Me" buttons

**About Section**
- Full biography highlighting 25+ years of experience
- Mortgage, banking, and financial services background
- Holistic approach and client-first philosophy
- Specialty badges

**Services Section (6 cards)**
1. Investment Management
2. Retirement Planning
3. Risk Assessment
4. Tax Optimization
5. Estate Planning
6. Business Financial Strategy

**Process Section (4 steps)**
1. Discovery - Understanding goals and current situation
2. Analysis - Reviewing existing strategies and identifying opportunities
3. Strategy - Developing customized comprehensive plan
4. Implementation - Ongoing support and guidance

**CTA Section**
- Final call-to-action with contact options

**SEO**
- PersonSchema and LocalBusinessSchema for Overland Park, KS (zip: 66212)
- Meta title, description, keywords

### 4. Update `src/App.tsx`
Add import and route:

```typescript
// Add import
import AdvisorSheilaRodriguez from "./pages/AdvisorSheilaRodriguez";

// Add route (alphabetical with other advisors)
<Route path="/advisors/sheila-rodriguez" element={<AdvisorSheilaRodriguez />} />
```

---

## Technical Details

### Directory Entry Structure
The advisor will appear in the `/advisors` directory with:
- Filterable by State: Kansas
- Filterable by Region: Midwest
- "View Full Profile" button linking to `/advisors/sheila-rodriguez`

### Lead Routing
- ScheduleModal and ContactModal configured with `sheila@tfainsuranceadvisors.com`
- Notifications sent to both the advisor and `leads@tfainsuranceadvisors.com`

### SEO Schema
```typescript
// PersonSchema
name: "Sheila Rodriguez"
jobTitle: "Financial Strategist"
worksFor: "The Financial Architects"
image: sheilaRodriguezImg
areaServed: "Overland Park, KS"

// LocalBusinessSchema
city: "Overland Park"
state: "KS"
zip: "66212"
phone: "(661) 816-1920"
```

---

## Result

After implementation:
1. Sheila appears in the advisor directory at `/advisors`
2. Her dedicated landing page is accessible at `/advisors/sheila-rodriguez`
3. Contact forms route to `sheila@tfainsuranceadvisors.com`
4. TFA expands its presence to Kansas (Midwest region)

