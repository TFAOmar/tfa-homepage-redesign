

## Plan: Fix favicon for WhatsApp/social sharing

### Problem
Your `favicon.svg` is already the TFA logo and works in browsers. However, WhatsApp and messaging apps don't use SVG favicons — they look for `apple-touch-icon` or PNG/ICO formats. Since those aren't declared in `index.html`, WhatsApp falls back to the Lovable heart icon.

### Solution
Add proper favicon references to `index.html` so messaging platforms pick up the TFA icon:

**File: `index.html`** — Add these lines alongside the existing SVG favicon:
```html
<link rel="icon" href="/favicon.ico" type="image/x-icon" />
<link rel="apple-touch-icon" href="/favicon.ico" />
```

The `favicon.ico` already exists in your `public/` folder. If that `.ico` file is still the Lovable heart (not TFA-branded), we'd need to replace it — but the SVG favicon you already have is TFA-branded, so we can also generate a PNG version from it to use as the apple-touch-icon.

### After deploying
You'll need to click **Update** in the publish dialog to push the change live. WhatsApp caches link previews aggressively, so you may need to wait or append a query parameter to the URL to see the updated icon.

