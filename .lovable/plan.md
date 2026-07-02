## Fixes for /homeowner-protection

**1. Hidden honeypot field**
The visible white input at the top of the form is the honeypot — it's missing the hiding class. Update `src/pages/HomeownerProtection.tsx` to import `honeypotClassName` from `@/hooks/useHoneypot` and apply it:
```tsx
<input {...honeypotProps} className={honeypotClassName} />
```

**2. On-brand background (replace black)**
Swap the `#030406` black background for the TFA brand navy so the stacked logo (which has dark elements) reads properly and the page matches brand guidelines.

- Change page wrapper from `bg-[#030406]` to `bg-[#1E3A5F]` (TFA Navy).
- Keep gold (#C9A84C) accents and white text — contrast remains strong on navy.
- No other structural or copy changes.

That's it — minimal, presentation-only edits scoped to `src/pages/HomeownerProtection.tsx`.