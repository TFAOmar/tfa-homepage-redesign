
# Host Images for HTML Email Use

## Overview
Copy the TFA logo, Manny Soto's headshot, and 5 uploaded images to a new `public/email/` folder. This provides stable, predictable URLs that work in HTML emails (unlike `src/assets/` which gets hashed by Vite).

---

## Files to Copy

| Source | Destination | Final URL |
|--------|-------------|-----------|
| `src/assets/tfa-logo.png` | `public/email/tfa-logo.png` | `https://tfawealthplanning.lovable.app/email/tfa-logo.png` |
| `src/assets/leadership/manny-soto.jpg` | `public/email/manny-soto.jpg` | `https://tfawealthplanning.lovable.app/email/manny-soto.jpg` |
| `user-uploads://kick_off_2026.jpeg` | `public/email/kick-off-2026.jpg` | `https://tfawealthplanning.lovable.app/email/kick-off-2026.jpg` |
| `user-uploads://Joe_Frausto.jpeg` | `public/email/joe-frausto.jpg` | `https://tfawealthplanning.lovable.app/email/joe-frausto.jpg` |
| `user-uploads://image-9.png` | `public/email/jeff-osborne.png` | `https://tfawealthplanning.lovable.app/email/jeff-osborne.png` |
| `user-uploads://image-10.png` | `public/email/david-temko.jpg` | `https://tfawealthplanning.lovable.app/email/david-temko.jpg` |
| `user-uploads://image-11.png` | `public/email/ennkar-logo.png` | `https://tfawealthplanning.lovable.app/email/ennkar-logo.png` |

---

## Implementation Steps

1. **Create `public/email/` directory** by adding images to it
2. **Copy existing assets**:
   - TFA logo from `src/assets/tfa-logo.png`
   - Manny's headshot from `src/assets/leadership/manny-soto.jpg`
3. **Copy uploaded images** with clean, consistent filenames

---

## Final URLs for Your HTML Email

After implementation, use these URLs in your email:

```
https://tfawealthplanning.lovable.app/email/tfa-logo.png
https://tfawealthplanning.lovable.app/email/manny-soto.jpg
https://tfawealthplanning.lovable.app/email/kick-off-2026.jpg
https://tfawealthplanning.lovable.app/email/joe-frausto.jpg
https://tfawealthplanning.lovable.app/email/jeff-osborne.png
https://tfawealthplanning.lovable.app/email/david-temko.jpg
https://tfawealthplanning.lovable.app/email/ennkar-logo.png
```

---

## Why This Approach

- **Stable URLs**: Files in `public/` are served as-is without filename hashing
- **Predictable paths**: Easy to reference in external HTML emails
- **No bundling**: Unlike `src/assets/`, these won't change with each build
- **Production-ready**: Works on the published domain immediately after deployment
