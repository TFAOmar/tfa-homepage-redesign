## Update: Omar Referral Prequalification — Step 1 changes

### 1. Simplify Step 1 (Referrer)

Remove these fields entirely:
- Company / agency (required today)
- License number
- NPN
- Relationship to client
- How should we credit you

Step 1 becomes just:
- Referrer type (Referral Partner / Licensed Agent or Advisor / Other)
- Full name (required)
- Email (required)
- Phone (required)
- Notes (optional, keep)

### 2. Add "handoff preference" option

New required question on Step 1:

**"How would you like Omar to handle this referral?"**
- **Full handoff** — Omar contacts the client, presents quotes, and manages the case end-to-end.
- **Quotes only** — Omar gathers quote options and sends them back to me; I'll present and share them with the client myself.

Behavior:
- Selection stored in `form_data.referrer.handoffPreference`.
- On Step 2 (Client Info), when "Quotes only" is selected, the client email/phone/preferred-contact fields become **optional** (still collected if the referrer wants to share) and a note appears: "Since you'll be presenting to the client, contact info is optional — Omar will send quotes to you directly."
- Review step shows the chosen preference prominently.

### 3. Email notification updates (`send-prequalification-notification`)

For `source === 'omar-referral'`:
- Add a **"Handoff preference"** banner at the top of the email to Omar + Miguelina:
  - Full handoff → "Contact client directly"
  - Quotes only → "Send quotes back to referrer — do NOT contact client"
- Subject line suffix: ` [Quotes Only]` when applicable, so Omar can spot it in the inbox.
- Referrer confirmation email reflects the chosen path in its intro paragraph.

### Files to edit
- `src/types/omarReferralPrequal.ts` — add `handoffPreference` to `ReferrerInfo`; drop unused fields from the type.
- `src/components/prequalification/omar-referral/OmarReferralWizard.tsx` — update Step 1 form fields, Step 2 conditional-optional logic, Step 7 review summary, and validation.
- `supabase/functions/send-prequalification-notification/index.ts` — add handoff banner + subject suffix in the Omar-referral branch.

No route, schema, or DB changes.
