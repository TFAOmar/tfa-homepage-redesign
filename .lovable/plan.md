

# Include All Event Details in Notification Email

## Current State
The edge function only receives and displays a subset of the event data:
- Agent name, email
- Event name, location
- Start/end times
- Primary image URL

## Missing from Email
These fields are collected in the form but NOT sent to the edge function:
- Agent phone
- Full description
- Short description
- Thumbnail image URL
- RSVP settings (enabled, email, max attendees)

---

## Implementation Plan

### 1. Update Edge Function Interface
Expand the `EventNotificationRequest` interface to accept all fields:

| Field | Type | Notes |
|-------|------|-------|
| agentPhone | string (optional) | Agent's contact phone |
| description | string | Full event description |
| shortDescription | string | Brief summary |
| thumbnailUrl | string (optional) | Thumbnail image URL |
| enableRsvp | boolean | Whether RSVP is enabled |
| rsvpEmail | string (optional) | RSVP contact email |
| maxAttendees | number (optional) | Capacity limit |

### 2. Update Admin Email Template
Enhance the HTML email to include:
- Full description in a formatted section
- Short description labeled clearly
- Agent phone number (if provided)
- Thumbnail image (if uploaded)
- RSVP configuration details
- TFA logo branding

### 3. Update Form Submission
Modify `EventSubmissionForm.tsx` to pass all fields to the edge function.

---

## Email Template Design

```text
┌─────────────────────────────────────────────────┐
│  [TFA Logo]                                     │
│                                                 │
│  New Event Submission                           │
│  ─────────────────────────                      │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ Event Name                               │   │
│  │                                          │   │
│  │ Submitted by: Name (email) phone        │   │
│  │ Location: Address                        │   │
│  │ Start: Date/Time                         │   │
│  │ End: Date/Time                           │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Description                                    │
│  [Full event description text]                 │
│                                                 │
│  Short Description                              │
│  [Brief summary text]                          │
│                                                 │
│  ┌───────────┐  ┌───────────┐                  │
│  │ Primary   │  │ Thumbnail │ (if provided)   │
│  │ Image     │  │ Image     │                  │
│  └───────────┘  └───────────┘                  │
│                                                 │
│  RSVP Settings                                  │
│  Enabled: Yes/No                                │
│  RSVP Email: email@example.com                 │
│  Max Attendees: 50 (or "No limit")             │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ Next Steps: Review in Supabase...       │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `supabase/functions/send-event-notification/index.ts` | Add new fields to interface, enhance email HTML |
| `src/components/events/EventSubmissionForm.tsx` | Pass all form fields to edge function |

---

## Technical Details

### Edge Function Changes
```typescript
interface EventNotificationRequest {
  agentName: string;
  agentEmail: string;
  agentPhone?: string;           // NEW
  eventName: string;
  description: string;           // NEW
  shortDescription: string;      // NEW
  location: string;
  startTime: string;
  endTime: string;
  primaryImageUrl: string;
  thumbnailUrl?: string;         // NEW
  enableRsvp: boolean;           // NEW
  rsvpEmail?: string;            // NEW
  maxAttendees?: number;         // NEW
}
```

### Form Submission Update
```typescript
supabase.functions.invoke("send-event-notification", {
  body: {
    agentName: data.agentName,
    agentEmail: data.agentEmail,
    agentPhone: data.agentPhone || null,
    eventName: data.eventName,
    description: data.description,
    shortDescription: data.shortDescription,
    location: data.location,
    startTime: data.startTime,
    endTime: data.endTime,
    primaryImageUrl,
    thumbnailUrl,
    enableRsvp: data.enableRsvp,
    rsvpEmail: data.rsvpEmail || null,
    maxAttendees: data.maxAttendees ? parseInt(data.maxAttendees) : null,
  },
});
```

