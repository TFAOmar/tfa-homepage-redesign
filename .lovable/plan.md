## Goal

Make every lead from Minh's pages belong to a single "Minh" partner account, visible only to him (and admins/staff) in `/concierge`, and add a "View in your Partner Dashboard" link to the notification emails he receives.

## Pages in scope

- `/whatsamortgage-newsletter` (MinhNewsletter) — writes to `leads`
- `/protect` (Protect) — writes to `leads`
- `/homeowner-protection` (HomeownerProtection) — writes to `leads`
- `/trust` (Trust) — writes to `leads`
- `/start` (Start wizard) — writes to `intake_leads` (already supports `?ref=` referrer)

## 1. Create Minh's partner record

Migration + seed:
- Insert into `intake_referrers`: `slug='minh'`, `display_name='Minh Nguyen'`, `active=true`. `owner_user_id` left NULL until he signs up.
- Once Minh creates an account at `/auth` with `minhwin80@gmail.com`, admin runs the existing `admin_link_referrer_owner('minh-id','minhwin80@gmail.com')` from `/admin/partners` (already built) to link ownership and grant the `partner` role.

## 2. Tag `leads`-table submissions with the partner

Schema change (migration on `public.leads`):
- Add `partner_slug text` column, index it.
- Backfill: `UPDATE leads SET partner_slug='minh' WHERE referral_source='minh' OR funnel IN ('protect','trust','newsletter','homeowner_protection')` (scoped so existing Minh-attributed leads are captured).
- RLS: new SELECT policy — a partner may read a lead when their owned `intake_referrers.slug` equals `leads.partner_slug` (via a security-definer helper `is_my_partner_slug(text)`).
- New RPC `partner_list_my_leads()` returning the caller's leads for their owned referrer slugs.

Frontend change on the four landing pages: pass `partner_slug: 'minh'` in the insert payload alongside the existing `referral_source`. `/start` already writes `referrer_id` to `intake_leads`, no change needed beyond ensuring the marketing links use `?ref=minh`.

## 3. Show Minh's leads in `/concierge`

- New `src/components/concierge/PartnerNewsletterLeadsPanel.tsx` — calls `partner_list_my_leads()`, renders a table matching the visual style of `ReferralLeadsPanel` (date, funnel, name, contact, status, complete/incomplete).
- `src/pages/Concierge.tsx`: for `partner` role, render this new panel in addition to the existing `intake_leads` view. For admin/staff, add it as a second tab so all Minh's `leads` submissions are visible too.

## 4. Add partner-dashboard link to notification emails

- `supabase/functions/notify-lead/index.ts`: if `lead.partner_slug` is set, append a "View this lead in your Partner Dashboard" button linking to `https://tfawealthplanning.com/concierge`. Look up the partner's owner email via service-role query and add it to the `to` array (dedup with existing recipients).
- `supabase/functions/send-form-notification/index.ts` (and any Minh-page notifier that uses it): same treatment — append the dashboard CTA when a partner slug is present.
- Copy: "View this lead in your Partner Dashboard" button in Navy/Gold, plus a plaintext link fallback.

## 5. Marketing/QR links

Document that Minh's outbound links (QR codes, email sigs) should include `?ref=minh` so `/start` attributes to his referrer automatically; the four landing pages hardcode the partner slug regardless.

## Technical notes

- No changes to `intake_leads` schema; it already has `referrer_id` and hierarchy attribution.
- `is_my_partner_slug(slug text)` is a `SECURITY DEFINER` SQL function returning boolean, used only inside the new RLS policy on `leads`.
- Grants: keep existing `leads` grants; the new SELECT policy widens read access to owning partner only.
- Notification emails continue to send to `leads@tfainsuranceadvisors.com` and `minhwin80@gmail.com`; the owner lookup will typically match the latter (deduped).

## Out of scope

- Building a per-lead deep-link page (dashboard link goes to the list view).
- Migrating the `leads` table into `intake_leads` — kept separate to avoid disrupting existing funnels.
