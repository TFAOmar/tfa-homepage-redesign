
-- 1. Add 'partner' to app_role enum (safe if already present)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'app_role' AND e.enumlabel = 'partner'
  ) THEN
    ALTER TYPE public.app_role ADD VALUE 'partner';
  END IF;
END $$;

-- 2. Link intake_referrers to an auth user (the partner account)
ALTER TABLE public.intake_referrers
  ADD COLUMN IF NOT EXISTS owner_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_intake_referrers_owner_user_id
  ON public.intake_referrers(owner_user_id);

-- 3. Helper: return the referrer id owned by the current user (if any)
CREATE OR REPLACE FUNCTION public.get_my_referrer_id()
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id
  FROM public.intake_referrers
  WHERE owner_user_id = auth.uid()
    AND active = true
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_my_referrer_id() TO authenticated;

-- 4. Allow partners to read their own referred leads
DROP POLICY IF EXISTS "Partners read own referred leads" ON public.intake_leads;
CREATE POLICY "Partners read own referred leads"
  ON public.intake_leads FOR SELECT
  TO authenticated
  USING (
    referrer_id IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.intake_referrers r
      WHERE r.id = intake_leads.referrer_id
        AND r.owner_user_id = auth.uid()
    )
  );
