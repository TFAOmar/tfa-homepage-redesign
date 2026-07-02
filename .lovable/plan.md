Add a contact block for Mariah Lorenzen to the `/homeowner-protection` footer, above the existing copyright line.

**Content shown**
- Name: Mariah Lorenzen
- Email: mariah@tfainsuranceadvisors.com (mailto link)
- Phone: (949) 514-5296 (tel link)
- License: CA Life & Health Lic# 0F93770

**Where**
`src/pages/HomeownerProtection.tsx` — inside the existing `<footer>`, rendered just above the current `© … Privacy Policy` line.

**Style**
- Uses the same footer palette (muted text, gold on hover — the page's existing `.tfa-hp a:hover` rule already handles link color).
- Name in navy, slightly bolder; contact + license in muted gray.
- Stacked on mobile, inline `·` separators on wider screens; centered to match the footer.
- No changes to advisors.ts, other pages, or the form logic.