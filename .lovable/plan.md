

# Update American Way Health Landing Page

## Changes Overview

1. **Update phone number** from `888-669-7553` to `321-356-3450` everywhere
2. **Remove green CTA button** from the hero section (keep the gold "Get Your Free Quote" button)
3. **Enlarge insurance carrier logos** (increase from `max-h-12` to `max-h-20` and card height from `h-24` to `h-32`)
4. **Move "Insurance Companies" section** to appear right before "Why Us?" section

---

## Files to Modify

### 1. `src/pages/AmericanWayHealth.tsx`

**Phone number update:**
- Line 23-24: Change constants from `888-669-7553` to `321-356-3450`
- Line 111: Update SEO description

**Remove green hero CTA:**
- Lines 192-199: Remove the green "Call: {PHONE_NUMBER}" button from the hero section

**Enlarge logos and move section:**
- Lines 358-370: Increase logo container height from `h-24` to `h-32` and logo max-height from `max-h-12` to `max-h-20`
- Move the entire "Insurance Companies" section (lines 346-381) to appear before "Why Us?" section (currently at line 265)

**Section order after change:**
1. Benefits Section
2. Insurance Plans Section
3. **Insurance Companies Section** (moved up)
4. **Why Us? Section** (now after Insurance Companies)
5. About Section
6. Partnership Section
7. Form Section
8. Footer/Disclaimer

### 2. `src/components/health-insurance/AmericanWayHealthForm.tsx`

**Phone number update:**
- Lines 28-29: Change constants from `888-669-7553` to `321-356-3450`

---

## Technical Details

```typescript
// Updated phone constants (both files)
const PHONE_NUMBER = "321-356-3450";
const PHONE_TEL = "tel:+13213563450";
```

```typescript
// Hero section - REMOVE this button (lines 192-199)
<a
  href={PHONE_TEL}
  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700..."
>
  <Phone className="w-5 h-5" />
  Call: {PHONE_NUMBER}
</a>
```

```typescript
// Larger logo cards (update classes)
// Before: className="... h-24 ..."
// After:  className="... h-32 ..."

// Before: className="max-h-12 max-w-full object-contain"
// After:  className="max-h-20 max-w-full object-contain"
```

---

## Expected Outcome

- All phone references show **321-356-3450**
- Hero section has only the gold "Get Your Free Quote" button (no green call button)
- Insurance carrier logos are larger and more prominent
- Section order: Benefits → Insurance Plans → **Insurance Companies** → **Why Us?** → About → Partnership → Form

