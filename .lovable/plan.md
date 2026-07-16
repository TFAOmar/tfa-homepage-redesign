
# Referral Landing Pages + Lead Tracking

Two TFA-branded referral landing pages, a unified `leads` table, notification edge function, and a standalone admin dashboard for tracking submissions.

## Decisions locked in
- **Branding:** Fully TFA-branded per current brand guidelines (navy #1E3A5F / gold #C9A84C, Inter, existing Header/Footer). Not "unbranded" — spec's no-branding rule is overridden.
- **Admin:** Standalone `/admin/leads` + `/admin/leads/login` routes, separate from the existing `/admin` dashboard, but reusing the existing Supabase auth + `user_roles` admin role check via `ProtectedRoute requireAdmin`.
- **Blanks:** Stub TODO placeholders for quoter embed, Resend from-domain, and licensing footer text (user to fill in later).

## Routes
| Route | Purpose | Auth |
|---|---|---|
| `/protect` | Mortgage protection / term life + quoter embed + lead form | Public, TFA-branded |
| `/trust` | Living trust intake wizard (8 steps) | Public, TFA-branded |
| `/admin/leads` | Leads dashboard | Admin only |
| `/admin/leads/login` | Redirects to existing `/auth` | Public |

Neither `/protect` nor `/trust` is added to `standalonePages` — they use the standard TFA Header + Footer.

## Phase 1 — Database

New `leads` table with:
- `id`, `created_at`, `updated_at` (via trigger)
- `funnel` (protect | trust), `status` (new | contacted | in_progress | closed | dead)
- Contact: `first_name`, `last_name`, `email`, `phone`, `state`
- Attribution: `referral_source` (default 'minh'), `utm_source/medium/campaign`, `landing_page`, `user_agent`
- `payload jsonb`, `is_complete`, `last_step`, `admin_notes`
- TCPA compliance: `consent_text`, `consent_at`

**GRANTs + RLS** (following project convention):
- `GRANT INSERT ON public.leads TO anon` (form submissions)
- `GRANT SELECT, UPDATE ON public.leads TO authenticated` (admin dashboard)
- `GRANT ALL TO service_role` (edge function upserts)
- Policies: anon INSERT only; authenticated SELECT/UPDATE gated by `has_role(auth.uid(), 'admin')`.

Wizard partial-progress updates go through a `save-lead-progress` edge function using service role, keyed on `lead_id` returned on Step 1 insert (anon cannot UPDATE).

## Phase 2 — `/protect` page

TFA-branded, mobile-first, single page:
1. Hero — headline speaks to warm referral, primary CTA scrolls to quoter
2. 3-tile "what this is" explainer strip
3. Quoter embed container (`#quoter-embed`, isolated, reserved 720x600 to prevent CLS, TODO placeholder for shortcode)
4. Native lead capture form (7 fields max: first/last name, email, phone, state, mortgage balance range, best time) + TCPA consent checkbox (unchecked default, exact text stored)
5. FAQ accordion (5-6 questions)
6. Sticky mobile CTA bar (shows after hero, hides when form in view)
7. TFA Footer with licensing disclosure line (TODO placeholder)

**Attribution:** `useEffect` reads UTM params + `document.referrer`, persists to `sessionStorage`, submits with form.

**Submit:** insert with `funnel='protect'`, `is_complete=true` → invoke `notify-lead` → inline success ("You'll hear from someone within one business day").

## Phase 3 — `/trust` wizard

TFA-branded 8-step wizard with progress bar, back button, save-and-resume via `localStorage` lead_id:

1. About you (name, email, phone, state, marital status) — **inserts row here, returns lead_id**
2. Spouse/partner (conditional)
3. Children & dependents (repeatable)
4. Real estate (repeatable, "not sure" options)
5. Financial accounts (checkbox grid + ranges, no account numbers)
6. Successor trustee (+ alternate)
7. Guardians (conditional on minor children)
8. Distribution wishes + free-text notes, then review screen

Every step 2-8 calls `save-lead-progress` edge function with `{lead_id, last_step, payload}`. Only Step 8 completion fires `notify-lead` and sets `is_complete=true`. Visible "not legal advice / information-gathering worksheet" line near top.

## Phase 4 — Edge functions

**`notify-lead`** (verify_jwt=false):
- Reads lead by id via service role
- Sends Resend email to `minhwin80@gmail.com` + `leads@tfainsuranceadvisors.com`
- HTML-escapes payload values (per project security memory)
- From-domain: TODO placeholder using `noreply@tfainsuranceadvisors.com` per project convention
- CORS + rate limit (5/min per IP+lead_id, matching existing pattern)

**`save-lead-progress`** (verify_jwt=false):
- Validates `lead_id` (uuid) + `payload` (jsonb) + `last_step` (int) with Zod
- Service-role UPDATE on `leads` row
- Rate limit 30/min per IP+lead_id

Existing `RESEND_API_KEY` secret is already configured.

## Phase 5 — `/admin/leads` dashboard

Wrapped in existing `ProtectedRoute requireAdmin`. Reuses shadcn components matching admin style:
- **Stat cards:** total, this week, protect vs trust split, trust completion rate
- **Filter bar:** funnel, status, date range, search (name/email/phone)
- **Table:** date, name, funnel, contact, state, status, complete? + step badge, actions. Incomplete rows muted with "Step X of 8" badge
- **Detail drawer:** labeled payload sections (not raw JSON), editable status dropdown, admin_notes textarea (save on blur)
- **CSV export** respecting filters, flattens payload
- **Realtime** postgres_changes subscription on `leads` inserts (in `useEffect` with cleanup per project rule)

Added as button on existing AdminDashboard.

## Technical notes
- Honeypot: use existing `useHoneypot` hook on both public forms (project rule)
- IDs: use existing `generateUUID` for lead ids if needed client-side
- Pipedrive: **not** integrated for this build (user didn't request it; can add later)
- Nightly abandoned-wizard digest edge function: deferred to a follow-up — noted but not in this scope
- No changes to existing routes or admin

## Files
**New:**
- `supabase/migrations/<ts>_leads.sql` (via migration tool)
- `supabase/functions/notify-lead/index.ts`
- `supabase/functions/save-lead-progress/index.ts`
- `src/hooks/useLeads.ts`
- `src/pages/Protect.tsx`
- `src/pages/Trust.tsx`
- `src/pages/AdminLeads.tsx`
- `src/components/leads/ProtectHero.tsx`, `ProtectQuoter.tsx`, `ProtectLeadForm.tsx`, `ProtectFAQ.tsx`, `StickyMobileCTA.tsx`
- `src/components/leads/TrustWizard.tsx` + 8 step components + `TrustReview.tsx`
- `src/components/leads/admin/LeadsTable.tsx`, `LeadDetailDrawer.tsx`, `LeadsFilters.tsx`, `LeadsStats.tsx`

**Edited:**
- `src/App.tsx` — add 3 routes
- `supabase/config.toml` — verify_jwt=false for both new functions
- `src/pages/AdminDashboard.tsx` — add "Leads" button
