
# Agent Event Submission Landing Page

## Overview
Create a landing page where TFA agents can submit their event details for inclusion on the company events calendar. The form will collect all necessary event information including name, description, location, date/time, images, and RSVP settings, then store submissions for admin review.

---

## Form Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| **Submitter Info** | | | |
| Agent Name | Text | Yes | Auto-populate if agent is known |
| Agent Email | Email | Yes | For confirmation/follow-up |
| Agent Phone | Phone | No | Optional contact |
| **Event Details** | | | |
| Event Name | Text | Yes | What is the name of your event? |
| Description | Textarea | Yes | Full event description |
| Short Description | Textarea | Yes | Used where full description doesn't fit |
| Location | Text | Yes | Where is the event taking place? |
| Start Date/Time | DateTime | Yes | When does the event start? |
| End Date/Time | DateTime | Yes | When does the event end? |
| **Images** | | | |
| Primary Image | File Upload | Yes | Main display image |
| Thumbnail Image | File Upload | No | Optional thumbnail |
| **RSVP Settings** | | | |
| Enable RSVP | Toggle | Yes | Whether attendees can RSVP |
| RSVP Contact Email | Email | Conditional | Where RSVPs should be sent |
| Max Attendees | Number | No | Optional capacity limit |

---

## Technical Implementation

### 1. Database Schema
Create a new `event_submissions` table:

```sql
CREATE TABLE event_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Agent info
  agent_name TEXT NOT NULL,
  agent_email TEXT NOT NULL,
  agent_phone TEXT,
  -- Event details
  event_name TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  location TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  -- Images
  primary_image_url TEXT,
  thumbnail_url TEXT,
  -- RSVP settings
  enable_rsvp BOOLEAN DEFAULT true,
  rsvp_email TEXT,
  max_attendees INTEGER,
  -- Metadata
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 2. Storage Bucket
Create a new `event-images` storage bucket for:
- Primary event images
- Thumbnail images

### 3. New Files to Create

| File | Purpose |
|------|---------|
| `src/pages/SubmitEvent.tsx` | Main page component |
| `src/components/events/EventSubmissionForm.tsx` | Form component |
| `src/components/events/EventSubmissionHero.tsx` | Hero section |
| `supabase/functions/send-event-notification/index.ts` | Email notification edge function |

### 4. Form Features
- **Date/Time Pickers**: Use native datetime-local inputs
- **Image Upload**: Drag-and-drop upload zone with preview (same pattern as SponsorApplicationForm)
- **Validation**: Zod schema for all fields
- **Honeypot**: Bot protection
- **Real-time Preview**: Show how the event will appear

### 5. Submission Flow
```text
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Agent fills    │────▶│  Images upload  │────▶│  Save to DB     │
│  form           │     │  to storage     │     │  (pending)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Agent sees     │◀────│  Email sent to  │◀────│  Edge function  │
│  success page   │     │  admin team     │     │  triggered      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 6. Admin Notification Email
Send email to `events@tfainsuranceadvisors.com` (or configurable) containing:
- All event details
- Links to uploaded images
- Link to approve/manage in admin

---

## Route Configuration

Add route to `App.tsx`:
```typescript
<Route path="/submit-event" element={<SubmitEvent />} />
```

---

## Page Design

### Hero Section
- Headline: "Submit Your Event"
- Subheadline: "Share your upcoming event with the TFA community"
- TFA branding consistent with other landing pages

### Form Section
- Clean card layout (matching CareersInquiryForm pattern)
- Grouped sections: Agent Info → Event Details → Images → RSVP
- Progress indication for large form
- Mobile-responsive

### Success State
- Confirmation message
- Summary of submitted event
- Next steps information

---

## Security Considerations

1. **RLS Policies**: Allow anonymous inserts, admin-only read/update/delete
2. **File Validation**: Max 5MB, image types only (JPG, PNG, WebP)
3. **Input Sanitization**: Zod validation with length limits
4. **Honeypot**: Bot protection field
5. **Rate Limiting**: Apply to edge function

---

## Integration with Event Calendar App

The current Events page uses an external Event Calendar App widget. After an event submission is approved:
- Admin manually adds approved events to the Event Calendar App dashboard
- OR future enhancement: API integration to auto-publish approved events
