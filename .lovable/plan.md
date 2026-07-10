# TFA Resource Library

A simple, advisor-only document library at `/resources` with an admin UI for uploading and managing PDFs across three starter categories: **Presentation**, **Estate Planning**, **Questionnaires** (extensible).

## User-facing (`/resources`)

- Protected route (logged-in users only) via existing `ProtectedRoute`.
- Added to `standalonePages` — keeps clean layout; uses site Header for nav back.
- Page structure:
  - Hero: "Resource Library" + short intro + search input.
  - Category tabs / filter chips: All · Presentation · Estate Planning · Questionnaires (dynamic).
  - Grid of document cards (PDF icon, title, description, category badge, file size, updated date, **Download** and **Preview** buttons).
  - Empty state per category.
- Search filters by title/description across all categories.
- Preview opens PDF in new tab; Download forces file download.

## Admin (`/admin/resources`)

- Protected route with `requireAdmin`.
- Linked from `AdminDashboard` as a new card ("Resource Library").
- Upload form: Title, Description (optional), Category (select, with "+ New category" inline), File (PDF, max 20MB).
- Table of existing resources: title, category, size, updated, actions (Edit metadata, Replace file, Delete).
- Category management: simple inline add; delete disabled if resources still assigned.

## Data model

Two new tables:

**`resource_categories`**
- `name` (unique), `slug` (unique), `display_order`

**`resources`**
- `title`, `description`, `category_id` (FK), `file_path` (storage key), `file_name`, `file_size`, `mime_type`, `uploaded_by` (auth.uid), `created_at`, `updated_at`

RLS:
- `resource_categories`: SELECT for `authenticated`; INSERT/UPDATE/DELETE for admins (`has_role`).
- `resources`: SELECT for `authenticated`; INSERT/UPDATE/DELETE for admins.
- Standard GRANTs on both tables.

Seed the three starter categories in the migration.

## Storage

- New **private** bucket `resource-library`.
- RLS on `storage.objects`:
  - SELECT: any authenticated user (for signed URL generation).
  - INSERT/UPDATE/DELETE: admins only.
- Downloads/previews use `supabase.storage.from('resource-library').createSignedUrl(path, 60*60)`.

## Files to add/change

**New**
- `supabase/migrations/*` — tables, policies, seed categories, bucket policies (via storage tool + migration).
- `src/pages/Resources.tsx` — advisor-facing library page.
- `src/pages/AdminResources.tsx` — admin management page.
- `src/components/resources/ResourceCard.tsx`
- `src/components/resources/ResourceFilters.tsx`
- `src/components/resources/ResourceUploadDialog.tsx`
- `src/components/resources/CategoryManager.tsx`
- `src/hooks/useResources.ts` — CRUD + signed URL helpers.

**Edited**
- `src/App.tsx` — add `/resources` (protected) and `/admin/resources` (admin) routes; add both to `standalonePages`.
- `src/pages/AdminDashboard.tsx` — add link card.
- `src/components/Header.tsx` — add "Resources" link visible only when logged in (small addition, no layout change).

## Out of scope (can add later)

- Public-facing subset, external sharing links, versioning history, non-PDF file types, per-role visibility, download analytics.
