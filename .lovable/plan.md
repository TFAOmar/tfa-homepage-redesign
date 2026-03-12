

## Problem

The Hero section and "What to Expect" cards appear blank because they use `animate-fade-in` with `opacity-0`, but only `animate-fade-in-up` is defined in the CSS. The animation never fires, so elements remain at `opacity: 0`.

## Fix

**File: `src/index.css`** — Add a `@keyframes fadeIn` and `.animate-fade-in` class:

```css
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

This is a single CSS addition. No other files need changes.

