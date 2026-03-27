

## Plan: Fix Sponsorship Form Submission Error

**Problem**: The insert into `sponsorship_leads` succeeds, but the chained `.select('id').single()` fails because the SELECT RLS policy only allows admins. Anonymous users can insert but cannot read back their own row.

**Fix**: Add an RLS policy that allows users to read the row they just inserted, scoped to the current request. The simplest approach: allow selecting rows where the inserter's session matches — but since there's no `user_id` column and submissions are anonymous, we need a different approach.

**Best approach**: Remove the `.select('id').single()` from the insert call and instead use the returned insert data differently, OR add a public SELECT policy scoped narrowly.

### Option chosen: Remove `.select().single()` dependency

**File: `src/components/sponsorship/GeneralSponsorshipForm.tsx`** (~line 145-158)

Change:
```typescript
const { data: insertedData, error } = await supabase.from('sponsorship_leads').insert({
  ...
}).select('id').single();
```

To:
```typescript
const { error } = await supabase.from('sponsorship_leads').insert({
  ...
});
```

Then for the payment flow (line 178), since we no longer have the lead ID, we skip setting `submittedLeadId` and instead always navigate to the success page. The Stripe checkout can be triggered from the success page or we pass enough info to create checkout without a lead ID.

**Actually, simpler**: Add a narrow RLS SELECT policy so the insert+select works:

### Database Migration

```sql
CREATE POLICY "Inserters can read own row"
  ON public.sponsorship_leads
  FOR SELECT
  TO public
  USING (true);
```

Wait — that exposes all leads publicly (contains PII). Bad idea.

### Final approach: Drop `.select('id').single()`, generate ID client-side

1. **`src/components/sponsorship/GeneralSponsorshipForm.tsx`**: Generate a UUID client-side before inserting, pass it as the `id` field in the insert, and use that directly as `submittedLeadId` — no need to read it back.

```typescript
const leadId = crypto.randomUUID();
const { error } = await supabase.from('sponsorship_leads').insert({
  id: leadId,
  company_name: data.companyName,
  // ... rest unchanged
});
if (error) throw error;

// Use leadId directly
if (data.preferredPackage !== 'undecided') {
  setSubmittedLeadId(leadId);
  // ...
}
```

This is a single-line-level change in one file. No migration needed. No RLS changes. No PII exposure.

