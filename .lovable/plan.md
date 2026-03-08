

# Add Chatsworth Location & Update Hamlet's Profile

## Overview
Add the new Chatsworth office to the locations directory and update Hamlet Ohandjanian's profile to reflect that he runs this location.

## Changes

### 1. `src/data/locations.ts`
- Add Chatsworth as id 22 under "Southern California - LA Area" (near San Fernando):
  - Address: 21000 Devonshire St #113, Chatsworth, CA 91311
  - Coordinates: approximately [-118.5987, 34.2572]
  - Phone: (888) 350-5396 (default)
  - Region: "Southern California"

### 2. `src/lib/seo/siteConfig.ts`
- Update `numberOfLocations` from 21 to 22

### 3. `src/pages/AdvisorHamletOhandjanian.tsx`
- Update location display from "Granada Hills, California" to "Chatsworth, California" (or add Chatsworth as a second location)
- Update SEO description/keywords to reference Chatsworth
- Update the About section bio text to mention the Chatsworth office

### 4. `src/pages/Locations.tsx`
- Update SEO description text referencing "21 locations" to "22 locations"

### 5. `src/components/Locations.tsx` (homepage section)
- Update subtitle from "21 locations" to "22 locations"

