

## Plan: Move Logos to `public/` for Stable Hosted URLs

Images in `src/assets/` get hashed by Vite during build (e.g., `corebridge-D4f2x.png`), making URLs unpredictable and unusable in HTML emails. Moving them to `public/` gives them clean, permanent URLs.

### Changes

1. **Copy three images to `public/images/`**:
   - `src/assets/carriers/corebridge.png` → `public/images/corebridge.png`
   - `src/assets/carriers/north-american.png` → `public/images/north-american.png`
   - `src/assets/tfa-logo.png` → `public/images/tfa-logo.png`

2. **Resulting stable URLs** (usable in HTML emails):
   - `https://tfawealthplanning.lovable.app/images/corebridge.png`
   - `https://tfawealthplanning.lovable.app/images/north-american.png`
   - `https://tfawealthplanning.lovable.app/images/tfa-logo.png`

No code changes needed — existing component imports from `src/assets/` continue working independently. The `public/` copies are solely for external use in emails.

