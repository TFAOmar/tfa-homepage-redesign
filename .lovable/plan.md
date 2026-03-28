

## Plan: Add "Manage Subscription" Link to Footer

Add an external link to the Stripe customer portal in the footer's bottom bar, next to the existing "Agent Login" link.

### Change — `src/components/Footer.tsx`

After the "Agent Login" link (line 103), add:

```html
<a 
  href="https://pay.tfawealthplanning.com/p/login/7sI3cffBfcSI4Fi8ww"
  target="_blank"
  rel="noopener noreferrer"
  className="text-primary-foreground/60 hover:text-gold transition-colors"
>
  Manage Subscription
</a>
```

Single line addition. No other files changed.

