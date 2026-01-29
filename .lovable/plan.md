

# Fix Elena Esquivel's Email Address

## Summary
Update Elena Esquivel's email from `eeesquivel@tfainsuranceadvisors.com` (incorrect - 3 e's) to `eesquivel@tfainsuranceadvisors.com` (correct - 2 e's).

---

## Files to Modify

### 1. `src/data/advisors.ts`
**Line 93**: Update email in advisor directory entry
```typescript
// BEFORE
email: "eeesquivel@tfainsuranceadvisors.com"

// AFTER
email: "eesquivel@tfainsuranceadvisors.com"
```

### 2. `src/pages/AdvisorElenaEsquivel.tsx`
Update 4 occurrences:

| Line | Location | Change |
|------|----------|--------|
| 180 | Hero mailto link | `eeesquivel` → `eesquivel` |
| 182 | Hero display text | `eeesquivel` → `eesquivel` |
| 354 | ScheduleModal advisorEmail | `eeesquivel` → `eesquivel` |
| 362 | ContactModal advisorEmail | `eeesquivel` → `eesquivel` |

---

## After Implementation

All form submissions and contact links will route to Elena's correct email address: `eesquivel@tfainsuranceadvisors.com`

