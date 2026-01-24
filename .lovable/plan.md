

# Update Contact Email on Sponsorship Success Page

## Summary
Update the contact email displayed at the bottom of the General Sponsorship Success page from `leads@tfainsuranceadvisors.com` to `events@tfainsuranceadvisors.com` for consistency with the sponsorship notification routing.

---

## File to Modify

**File:** `src/pages/GeneralSponsorshipSuccess.tsx`

**Change:** Lines 234-237

```typescript
// Current
<a 
  href="mailto:leads@tfainsuranceadvisors.com" 
  className="text-primary hover:underline font-medium"
>
  leads@tfainsuranceadvisors.com
</a>

// Updated
<a 
  href="mailto:events@tfainsuranceadvisors.com" 
  className="text-primary hover:underline font-medium"
>
  events@tfainsuranceadvisors.com
</a>
```

---

## After Implementation

All sponsorship-related communications will consistently reference `events@tfainsuranceadvisors.com`:
- Internal admin notifications
- Sponsor confirmation emails
- Success page contact link

