

## Plan: Sales Contest Landing Page + Downloadable PDF Flyer

### 1. Create PDF generator — `src/lib/salesContestPdf.ts`

Using jsPDF (same pattern as `brandGuidelinesPdf.ts`), generate a single-page flyer with TFA brand colors (Navy #1E3A5F, Gold #C9A84C):

- Navy background with gold accents
- Headline: "ARCHITECT YOUR BEST MONTH"
- Subheadline: "April 2026 Sales Competition"
- Body copy with two categories, prize details, contest period
- Bottom tagline: "Only 4 seats at the table. Make them yours."
- Footer: "The Financial Architects — Building Legacies Together"

### 2. Create landing page — `src/pages/SalesContest.tsx`

Internal-facing landing page with:
- Hero section with headline, subheadline, and animated elements
- Two category cards (Living Trust Sales / Life & Annuity)
- Prize details section highlighting the dinner + mastermind
- Contest period callout (April 1–30, 2026)
- "Download Flyer" button that generates and downloads the PDF
- Bottom CTA with the tagline
- SEO with noIndex (internal page, not for public search)

### 3. Register route — `src/App.tsx`

- Import `SalesContest`
- Add route: `/sales-contest`
- Add to `standalonePages` array (no global header/footer — focused experience)

### Files Changed

| File | Change |
|------|--------|
| `src/lib/salesContestPdf.ts` | New — jsPDF flyer generator |
| `src/pages/SalesContest.tsx` | New — sales contest landing page |
| `src/App.tsx` | Import + route + standalone registration |

