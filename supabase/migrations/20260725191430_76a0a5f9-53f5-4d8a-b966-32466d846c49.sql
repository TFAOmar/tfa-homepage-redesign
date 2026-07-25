
-- 1. Ensure Minh partner exists
INSERT INTO public.intake_referrers (slug, display_name, active, sms_notify_optin)
VALUES ('minh', 'Minh Nguyen', true, false)
ON CONFLICT (slug) DO NOTHING;

-- 2. Add partner_slug columns
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS partner_slug text;
CREATE INDEX IF NOT EXISTS idx_leads_partner_slug ON public.leads(partner_slug);

ALTER TABLE public.form_submissions ADD COLUMN IF NOT EXISTS partner_slug text;
CREATE INDEX IF NOT EXISTS idx_form_submissions_partner_slug ON public.form_submissions(partner_slug);

-- 3. Backfill existing Minh-attributed leads
UPDATE public.leads
   SET partner_slug = 'minh'
 WHERE partner_slug IS NULL
   AND (referral_source = 'minh'
        OR funnel IN ('protect','trust','newsletter'));

-- 4. Helper: does the caller own a partner with this slug?
CREATE OR REPLACE FUNCTION public.is_my_partner_slug(_slug text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.intake_referrers
    WHERE owner_user_id = auth.uid()
      AND active = true
      AND slug = _slug
  );
$$;

-- 5. RLS: partners can read leads matching their partner_slug (admins/staff already covered by existing policies)
DROP POLICY IF EXISTS "Partners can view their partner_slug leads" ON public.leads;
CREATE POLICY "Partners can view their partner_slug leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (partner_slug IS NOT NULL AND public.is_my_partner_slug(partner_slug));

DROP POLICY IF EXISTS "Partners can view their partner_slug submissions" ON public.form_submissions;
CREATE POLICY "Partners can view their partner_slug submissions"
  ON public.form_submissions FOR SELECT
  TO authenticated
  USING (partner_slug IS NOT NULL AND public.is_my_partner_slug(partner_slug));

-- 6. Partner-scoped list RPCs
CREATE OR REPLACE FUNCTION public.partner_list_my_leads()
RETURNS SETOF public.leads
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT l.*
  FROM public.leads l
  WHERE l.partner_slug IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.intake_referrers r
      WHERE r.owner_user_id = auth.uid()
        AND r.active = true
        AND r.slug = l.partner_slug
    )
  ORDER BY l.created_at DESC
  LIMIT 500;
$$;

CREATE OR REPLACE FUNCTION public.partner_list_my_form_submissions()
RETURNS SETOF public.form_submissions
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT s.*
  FROM public.form_submissions s
  WHERE s.partner_slug IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.intake_referrers r
      WHERE r.owner_user_id = auth.uid()
        AND r.active = true
        AND r.slug = s.partner_slug
    )
  ORDER BY s.created_at DESC
  LIMIT 500;
$$;

-- 7. Helper for notification emails to CC the partner owner
CREATE OR REPLACE FUNCTION public.get_partner_owner_email_by_slug(_slug text)
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT u.email::text
  FROM public.intake_referrers r
  JOIN auth.users u ON u.id = r.owner_user_id
  WHERE r.slug = _slug
    AND r.active = true
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.is_my_partner_slug(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.partner_list_my_leads() TO authenticated;
GRANT EXECUTE ON FUNCTION public.partner_list_my_form_submissions() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_partner_owner_email_by_slug(text) TO service_role;
