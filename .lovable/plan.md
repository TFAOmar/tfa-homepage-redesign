

## Plan: Fix Sponsorship Email Pricing

### Problem

The `send-sponsorship-notification` edge function has hardcoded `packageLabels` with outdated prices and `eventLabels` with outdated timing/attendee info.

**Current (wrong):**
- Title Sponsor — $4,000/event
- Supporting Sponsor — $2,000/event
- Community Sponsor — $500/event

**Correct (from DB tiers):**
- Title Sponsor — $5,000/event
- Supporting Sponsor — $2,500/event
- Community Sponsor — $1,000/event

Event labels also need updating (e.g., Kick Off was January, Crash Courses timing, etc.).

### Fix — `supabase/functions/send-sponsorship-notification/index.ts`

Update the two hardcoded lookup objects:

```typescript
const packageLabels = {
  title: "Title Sponsor — $5,000/event",
  supporting: "Supporting Sponsor — $2,500/event",
  community: "Community Sponsor — $1,000/event",
  undecided: "Package TBD — Needs consultation"
};

const eventLabels = {
  'kickoff': { name: 'Kick Off', timing: 'January 2026', attendees: '200+' },
  'crash-courses': { name: 'Crash Courses', timing: 'May 31, 2026', attendees: '75+' },
  'leadership-summit': { name: 'Leadership Summit', timing: 'April 23, 2026', attendees: '100+' },
  'summer-sizzler': { name: 'Summer Sizzler', timing: 'August 16, 2026', attendees: '150+' },
  'christmas-party': { name: 'Christmas Party', timing: 'December 12, 2026', attendees: '200+' }
};
```

Single file change, then redeploy the edge function.

