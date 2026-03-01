

# Privacy Policy & Terms of Service Pages (A2P 10DLC Compliant)

## Overview
Create two new pages -- Privacy Policy and Terms & Conditions -- written to pass US A2P 10DLC registration requirements. Update the footer links to point to these pages instead of `/contact`.

## What Gets Built

### 1. New Page: `src/pages/PrivacyPolicy.tsx` (`/privacy-policy`)
A full privacy policy page covering:
- What personal data is collected (name, email, phone, financial info submitted via forms)
- How data is used (to provide financial services, respond to inquiries, send appointment reminders)
- **Explicit statement that data will NOT be shared with third parties for marketing purposes**
- Data retention and security practices
- User rights (access, correction, deletion requests)
- Contact information for privacy inquiries
- Cookie usage disclosure
- Last updated date

### 2. New Page: `src/pages/TermsOfService.tsx` (`/terms-of-service`)
A full terms & conditions page including all A2P 10DLC required elements:
- **Program name**: The Financial Architects SMS Communications
- **Program description**: Appointment reminders, service updates, and requested information delivery
- **Message and data rates may apply** (prominently stated)
- **Message frequency**: Description of expected message volume
- **Support contact**: info@tfainsuranceadvisors.com / (888) 350-5396
- **Opt-out instructions**: Text **STOP** to unsubscribe (bold)
- **Help instructions**: Text **HELP** for assistance (bold)
- Standard terms covering use of website, intellectual property, disclaimers, limitation of liability, and governing law (California)

### 3. Update Footer (`src/components/Footer.tsx`)
- Change "Privacy Policy" link from `/contact` to `/privacy-policy`
- Change "Terms of Service" link from `/contact` to `/terms-of-service`

### 4. Update Routing (`src/App.tsx`)
- Import both new pages
- Add routes: `/privacy-policy` and `/terms-of-service`

## Files Changed
| File | Action |
|------|--------|
| `src/pages/PrivacyPolicy.tsx` | New -- A2P compliant privacy policy |
| `src/pages/TermsOfService.tsx` | New -- A2P compliant terms with SMS program details |
| `src/components/Footer.tsx` | Update links to new pages |
| `src/App.tsx` | Add two new routes |

