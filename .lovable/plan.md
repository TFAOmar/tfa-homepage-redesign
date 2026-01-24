

# Fix Event Submission - Storage Upload Issue

## Problem Identified
Event submissions are failing at the image upload step. The investigation revealed:

1. **Edge function works correctly** - When called directly, it sends emails successfully
2. **Database is empty** - No event submissions exist in the `event_submissions` table
3. **No images uploaded** - The `event-images` storage bucket is empty
4. **Root cause found**: A storage policy is blocking anonymous uploads

## Root Cause: Conflicting Storage Policy

There's a storage policy called **"Anonymous users cannot upload to advisor photos"** that has:
- `roles: {anon}` (applies to anonymous/unauthenticated users)  
- `with_check: false` (denies all inserts)

This blanket denial policy blocks ALL anonymous uploads to storage, including the `event-images` bucket, even though there's a separate policy "Anyone can upload event images".

When an unauthenticated user tries to submit the form:
1. They attempt to upload the event image → **BLOCKED** by the anon policy
2. Upload fails → Code throws an error
3. Database insert never happens
4. Edge function never gets called

---

## Fix Plan

### 1. Fix the Storage Policy (Database Migration)
Modify the problematic policy to only block anonymous uploads to the `advisor-photos` bucket specifically, not all buckets:

```sql
-- Drop the overly-broad policy
DROP POLICY IF EXISTS "Anonymous users cannot upload to advisor photos" 
ON storage.objects;

-- Recreate it with bucket-specific restriction
CREATE POLICY "Anonymous users cannot upload to advisor photos"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id != 'advisor-photos');
```

### 2. Alternative: Delete the Redundant Policy
Since authenticated admins already have their own upload policy for `advisor-photos`, and anonymous users are blocked by not having a policy that allows advisor-photos uploads, the anon denial policy may be redundant:

```sql
-- Simply remove the blocking policy
DROP POLICY IF EXISTS "Anonymous users cannot upload to advisor photos" 
ON storage.objects;
```

---

## Implementation

| Action | Description |
|--------|-------------|
| **Database migration** | Remove or fix the blocking storage policy |
| **Testing** | Submit an event to verify uploads work |
| **Verification** | Check that images appear in bucket and notifications are sent |

---

## Why This Happened
The original `advisor-photos` bucket was locked down to prevent anonymous uploads (correct behavior). However, the policy was written too broadly - it blocks ALL anonymous storage uploads instead of just the advisor-photos bucket.

---

## After Fix
1. Anonymous users can upload images to `event-images` bucket
2. Form submission completes successfully
3. Database record is created
4. Edge function is triggered
5. Email notifications are sent to admin and agent

