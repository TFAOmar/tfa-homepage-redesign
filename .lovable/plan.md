

# Add American Way Health Logo to Email Template

## Overview

Add the American Way Health partner logo to the custom email notification template header for better partner branding and professional appearance.

---

## Changes

### Step 1: Copy Logo to Public Email Assets

**New File:** `public/email/american-way-health.png`

Copy the existing logo from `src/assets/partners/american-way-health.png` to `public/email/american-way-health.png` for stable URL access in HTML emails.

**Why?** Email clients require absolute URLs for images. Assets in `src/assets/` are bundled with hash filenames, making them unreliable for email templates. The `/public/email/` directory provides stable, non-hashed URLs.

**Public URL:** `https://tfawealthplanning.lovable.app/email/american-way-health.png`

---

### Step 2: Update Email Template Header

**File:** `supabase/functions/pipedrive-submit/index.ts`

**Location:** Lines 627-649 (Header section of `generateAmericanWayHealthEmailHtml`)

**Before:**
```html
<td style="padding: 35px 40px; background: linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #0284c7 100%);">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td>
        <p style="color: rgba(255,255,255,0.9); ...">
          🏥 New Health Insurance Lead
        </p>
        <h1 style="color: #ffffff; ...">
          American Way Health
        </h1>
      </td>
      <td style="text-align: right; vertical-align: middle;">
        <span style="background: rgba(255,255,255,0.2); ...">
          via TFA
        </span>
      </td>
    </tr>
  </table>
</td>
```

**After:**
```html
<td style="padding: 0;">
  <!-- Logo Banner -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td style="padding: 25px 40px; background-color: #ffffff; text-align: center; border-bottom: 1px solid #e2e8f0;">
        <img 
          src="https://tfawealthplanning.lovable.app/email/american-way-health.png" 
          alt="American Way Health" 
          style="max-width: 200px; height: auto;"
        />
      </td>
    </tr>
  </table>
  <!-- Gradient Header -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td style="padding: 25px 40px; background: linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #0284c7 100%);">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <p style="color: rgba(255,255,255,0.9); margin: 0 0 5px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;">
                🏥 New Health Insurance Lead
              </p>
              <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700;">
                Quote Request
              </h1>
            </td>
            <td style="text-align: right; vertical-align: middle;">
              <span style="background: rgba(255,255,255,0.2); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                via TFA
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</td>
```

---

## Visual Design

```text
┌─────────────────────────────────────────────────────┐
│                    [AWH LOGO]                       │  ← White background
│               American Way Health                   │     Partner logo centered
├─────────────────────────────────────────────────────┤
│  🏥 NEW HEALTH INSURANCE LEAD          ┌─────────┐ │  ← Teal/cyan gradient
│  Quote Request                          │ via TFA │ │     Updated title
│                                         └─────────┘ │
├─────────────────────────────────────────────────────┤
│  CONTACT INFORMATION                                │
│  ┌─────────────────┬───────────────────────────┐   │
│  │ Full Name       │ John Smith                │   │
│  │ Email Address   │ john@example.com          │   │
│  │ Phone Number    │ (555) 123-4567            │   │
│  │ ZIP Code        │ 90210                     │   │
│  └─────────────────┴───────────────────────────┘   │
│  ...                                                │
└─────────────────────────────────────────────────────┘
```

---

## Files to Modify

| File | Action |
|------|--------|
| `public/email/american-way-health.png` | Create (copy from src/assets/partners/) |
| `supabase/functions/pipedrive-submit/index.ts` | Update header template |

---

## Technical Notes

- The white background for the logo section follows the existing design pattern for co-branded pages (per memory context)
- Logo is centered with `max-width: 200px` for consistent sizing across email clients
- Absolute URL uses the published domain for reliable image loading
- The gradient header is preserved below the logo for visual continuity

