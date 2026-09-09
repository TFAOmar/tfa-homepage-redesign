# Preferred Partner Spotlight Page

A new page at `/preferred-partners` that showcases the professional categories TFA partners with, and lets new professionals apply to join the network.

## What the page includes

1. **Hero** — "Preferred Partner Network" headline, short intro about collaborating with trusted professionals to serve clients end-to-end. Two buttons: "Become a Partner" (scrolls to the form) and "Book a Consultation".

2. **Partner categories grid** — one card per category, each with an icon, name, and a short description of how that professional works with TFA clients:
   - Lenders / Mortgage Professionals
   - Realtors & Real Estate Professionals
   - Tax Professionals
   - CPAs & Accounting Firms
   - Property & Casualty Agents and Brokers
   - Business Insurance Brokers
   - Medicare & Health Insurance Agents and Brokers

   (No named partner companies yet — real partner cards can be added later.)

3. **Why partner with TFA** — a short value section: shared clients, warm two-way referrals, 300+ advisors across 33 offices, licensed specialists in life insurance, annuities, retirement and estate planning, co-branded events and marketing support.

4. **How it works** — three simple steps: apply, intro call and vetting, start exchanging referrals.

5. **Become a Preferred Partner form** — name, email, phone, company, profession category (dropdown of the seven types), states/areas served, website (optional), and a message box. Includes the standard spam trap and the optional SMS-consent checkbox used on other forms. Submissions go through the existing lead pipeline so they land in the leads inbox and CRM, tagged as a partner application.

6. **Closing call to action** — invitation to apply or book a call.

## Homepage and navigation

- New short section on the homepage between the advisor preview and testimonials: heading, one line of copy, the seven category names as small pills/icons, and a "Meet Our Preferred Partners" button linking to the new page.
- New menu entry "Preferred Partners" under Resources, alongside the existing "Partners" entry (which stays as the insurance carriers page).

## Technical notes

- New page `src/pages/PreferredPartners.tsx`; route `/preferred-partners` added in `src/App.tsx` (not a standalone page — keeps the global header/footer).
- New components under `src/components/preferred-partners/`: `PreferredPartnersHero`, `PartnerCategoryGrid` (data array of the seven categories with lucide icons), `PartnerBenefits`, `PartnerApplicationForm`.
- Homepage section `src/components/PreferredPartnersPreview.tsx`, rendered from `src/pages/Index.tsx`.
- Form uses `submitForm` from `src/lib/formSubmit.ts` with `form_name: "preferred_partner_application"`, `interest_category` set to the chosen profession, `useHoneypot`, and `SmsConsentCheckbox`. No new database tables or edge functions.
- SEO via the existing `SEOHead` + `JsonLd` helpers (WebPage + breadcrumb schema); page added to `public/sitemap.xml`.
- Styling uses the existing navy/gold tokens and `glass` card treatment used by `/partners`.
