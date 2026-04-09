

## Plan: Fix Category Boxes in PDF Flyer

### Problem

The trophy emoji (`🏆`) used in the category boxes won't render in jsPDF's built-in Helvetica font — emojis are unsupported and appear as blank or garbled text. The "CATEGORY" label text is also crammed into a 3mm ribbon, making it hard to read. Together, this breaks the visual formatting of the two-category section.

### Fix — `src/lib/salesContestPdf.ts`

1. **Replace emoji trophies** with a text-based symbol that Helvetica supports — use a bold gold star character (`★` or simply the text "★") or a decorative gold circle/diamond drawn with jsPDF shapes
2. **Increase box height** from 34mm to 40mm to give more breathing room
3. **Move "CATEGORY" labels** below the gold ribbon instead of inside it (or enlarge ribbon to 5mm)
4. **Add "Submitted Business" subtitle** to the Life & Annuity box to match the landing page copy
5. **Center the boxes** better — currently at x=22 and x=116, adjust to be symmetrically spaced on the 210mm page

### Files Changed

| File | Change |
|------|--------|
| `src/lib/salesContestPdf.ts` | Replace emoji with drawable gold star shape, increase box size, fix label positioning, add subtitle |

