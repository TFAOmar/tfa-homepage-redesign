

# Add Fresno Office and Update Israel Castaneda's Profile

## Summary
Add the new Fresno office location to the locations list and update Israel Castaneda's advisor profile to reflect his association with this office.

---

## Changes Required

### 1. Add Fresno Office to Locations

**File:** `src/data/locations.ts`

Add a new entry to the locations array:

| Field | Value |
|-------|-------|
| id | 20 |
| name | Fresno |
| city | Fresno |
| state | CA |
| address | 7621 N Del Mar Ave, Unit 102, Fresno, CA 93711 |
| phone | (888) 350-5396 |
| hours | Mon-Fri: 9am-5pm |
| coordinates | [-119.7871, 36.8252] |
| region | Central California |

This creates a new "Central California" region for TFA's first office in the Central Valley.

### 2. Update Israel Castaneda's Profile

**File:** `src/data/advisors.ts`

Update Israel's profile (currently on line 65-78):

| Field | Current | New |
|-------|---------|-----|
| city | Madera | Fresno |
| Add office address to bio | n/a | Include office address in bio |

---

## Implementation Details

### Location Entry
```typescript
// Central California
{ 
  id: 20, 
  name: "Fresno", 
  city: "Fresno", 
  state: "CA", 
  address: "7621 N Del Mar Ave, Unit 102, Fresno, CA 93711", 
  phone: "(888) 350-5396", 
  hours: "Mon-Fri: 9am-5pm", 
  coordinates: [-119.7871, 36.8252], 
  region: "Central California" 
}
```

### Israel Castaneda Profile Update
```typescript
{
  id: "israel-castaneda",
  name: "Israel Castaneda",
  title: "Partner",
  type: "Advisor",
  state: "California",
  city: "Fresno",  // Updated from "Madera"
  region: "West",
  bio: "Israel helps families build generational security and long-term financial peace of mind. Specializing in life insurance, retirement planning, living trusts, and estate-protection strategies, he makes complex financial decisions easy to understand. Known for his clear communication and genuine care, Israel focuses on the 'why' behind every financial move, helping families protect what matters most and build a legacy for the next generation.",
  // ... rest of profile
}
```

---

## After Implementation
- The Fresno office will appear on the `/locations` page with full address, phone, and directions
- The new "Central California" region filter will be available
- Israel Castaneda's profile in the advisor directory will show "Fresno, California" as his location
- Map will show the new Fresno location marker

