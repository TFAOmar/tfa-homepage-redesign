

# TFA Event Sponsorship Landing Page

## Summary
Create a high-conversion, mobile-first landing page at `/events/sponsorship` for general sponsorship inquiries across all TFA annual events. The page will feature FOMO-inducing elements, showcase all 5 events, highlight sponsor benefits, and capture leads for any upcoming event sponsorship.

---

## TFA Annual Events

| Event | Timing | Focus |
|-------|--------|-------|
| Kick Off | January | Goal-setting, strategy alignment for the year |
| Crash Courses | Spring | Training, education, skill development |
| Leadership Summit | Summer | Leadership development, networking |
| Summer Sizzler | Mid-Year | Team building, celebration, momentum |
| Christmas Party | December | Year-end celebration, recognition |

---

## Page Structure

### 1. Hero Section (FOMO-Heavy)
- Scarcity badge: "Only 12 Sponsor Spots Per Event"
- Headline: "Sponsor a TFA Event"
- Subheadline: "Get your brand in front of 200+ agents, brokers, and clients at our high-energy live events. 5 events. 5 opportunities. Don't miss your moment."
- Quick benefits bar: Stage time, Booth traffic, VIP access, Social exposure
- CTA: "Reserve Your Spot"
- Animated countdown or "Next Event" badge for urgency

### 2. Events Overview Section
- Visual grid/carousel of all 5 events
- Each card shows: Event name, timing, audience size, atmosphere
- "Sponsor This Event" CTA on each card
- Badge showing "Selling Fast" or "Few Spots Left" on upcoming events

### 3. Sponsor Benefits Section (Enhanced)
| Benefit | Description |
|---------|-------------|
| Brand Authority | Build credibility with the TFA community |
| On-Stage Spotlight | Share your value proposition directly |
| Lead Generation | Capture leads at your booth |
| VIP Networking | Connect with top performers |
| Social Media Amplification | Featured across TFA channels |
| Year-Round Visibility | Multi-event packages available |

### 4. Social Proof Section (NEW)
- "Past sponsors have included..." logos
- Testimonial quotes from previous sponsors
- Stats: "50+ sponsors in 2025", "1,000+ attendees annually"

### 5. Sponsorship Tiers Section
- Same 3-tier structure: Title ($4,000), Supporting ($2,000), Community ($500)
- "Per Event" pricing clarity
- Multi-event discount callout: "Sponsor 3+ events and save 15%"

### 6. Lead Capture Form
- Simplified inquiry form (not immediate payment)
- Fields: Company, Contact, Email, Phone, Industry, Events Interested In (multi-select), Preferred Package, Message
- Routes to leads@tfainsuranceadvisors.com
- TFA team follows up to finalize

### 7. FAQ Section
- Tailored for general sponsorship questions
- When are events scheduled?
- Can I sponsor multiple events?
- How do I choose which event fits my audience?

### 8. Final CTA Section
- "Spots Fill Fast. Secure Yours Today."
- Urgency messaging: "2025 events sold out quickly"
- Primary CTA: "Inquire Now"

---

## FOMO Elements

| Element | Implementation |
|---------|----------------|
| Scarcity | "Only 12 sponsor slots per event" badge |
| Urgency | "Next Event: Kick Off — January 2026" countdown |
| Social Proof | "50+ sponsors trusted us in 2025" |
| Loss Aversion | "Don't let your competitors get there first" |
| Exclusivity | "Limited VIP + Title sponsor availability" |
| Fast-Selling | "Selling Fast" badges on popular events |

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/pages/EventSponsorship.tsx` | CREATE | Main landing page |
| `src/components/sponsorship/GeneralSponsorshipHero.tsx` | CREATE | FOMO-focused hero |
| `src/components/sponsorship/EventsShowcase.tsx` | CREATE | 5-event grid |
| `src/components/sponsorship/SocialProof.tsx` | CREATE | Past sponsors + stats |
| `src/components/sponsorship/GeneralSponsorshipForm.tsx` | CREATE | Multi-event inquiry form |
| `src/components/sponsorship/GeneralSponsorshipFAQ.tsx` | CREATE | Updated FAQ |
| `src/App.tsx` | MODIFY | Add route `/events/sponsorship` |

---

## Technical Implementation

### Event Data Structure
```typescript
const events = [
  {
    id: 'kickoff',
    name: 'Kick Off',
    timing: 'January',
    description: 'Start the year with strategy, skills, and bold goals',
    attendees: '200+',
    atmosphere: 'High-energy goal-setting',
    status: 'selling-fast' // or 'available', 'few-spots'
  },
  {
    id: 'crash-courses',
    name: 'Crash Courses',
    timing: 'Spring',
    description: 'Deep-dive training and professional development',
    attendees: '150+',
    atmosphere: 'Intensive learning',
    status: 'available'
  },
  // ... more events
];
```

### Form Schema
```typescript
const formSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  industry: z.string().min(1),
  eventsInterested: z.array(z.string()).min(1, "Select at least one event"),
  preferredPackage: z.enum(['title', 'supporting', 'community', 'undecided']),
  message: z.string().optional(),
});
```

### Route Configuration
```typescript
// In App.tsx
<Route path="/events/sponsorship" element={<EventSponsorship />} />
```

---

## Mobile-First Design

- Single-column layout on mobile
- Touch-friendly event cards with full-width CTAs
- Sticky inquiry button at bottom of screen
- Compressed hero with essential FOMO elements visible above the fold
- Horizontal scroll for event cards on mobile
- Large touch targets (min 44px) on all buttons

---

## SEO Configuration

| Element | Value |
|---------|-------|
| Title | Sponsor a TFA Event - The Financial Architects |
| Description | Sponsor TFA events and get on-stage exposure, booth traffic, and VIP access. 5 annual events, limited sponsor spots. Inquire today. |
| Canonical | /events/sponsorship |
| Keywords | TFA event sponsorship, financial services sponsorship, insurance industry events, sponsor booth |

---

## Email Notification

Form submissions will:
1. Store lead in `sponsorship_leads` table with `event_type = 'general'`
2. Send notification to leads@tfainsuranceadvisors.com
3. Include all form data + events interested in
4. TFA team follows up manually to assign specific event + process payment

---

## After Implementation

- General sponsorship inquiry page at `/events/sponsorship`
- Visitors can inquire about any or all 5 annual events
- FOMO elements create urgency without being pushy
- Mobile-optimized for on-the-go inquiries
- Lead capture without immediate payment barrier
- Existing event-specific pages (Kick Off) remain for direct conversions

