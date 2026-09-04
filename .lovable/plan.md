# Update "Free Quote" link on /protect

The "Free Quote" button in the top bar of the /protect page currently opens the general quotes site. It should open the term life quote page instead.

## Change
- `src/pages/Protect.tsx` (line 137): change the header CTA link from `https://quotes.tfawealthplanning.com` to `https://quotes.tfawealthplanning.com/quote/term`.

No other buttons or pages change.
