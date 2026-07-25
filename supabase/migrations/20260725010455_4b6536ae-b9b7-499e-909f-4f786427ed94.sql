
-- Restrict stripe_price_id column exposure
REVOKE SELECT (stripe_price_id) ON public.sponsorship_tiers FROM anon, authenticated;

-- Admin-only RPC returning full tier rows including stripe_price_id
CREATE OR REPLACE FUNCTION public.admin_get_sponsorship_tiers()
RETURNS SETOF public.sponsorship_tiers
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  RETURN QUERY SELECT * FROM public.sponsorship_tiers ORDER BY display_order ASC;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_get_sponsorship_tiers() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_get_sponsorship_tiers() TO authenticated;

-- Tighten permissive RLS policies

-- Drop redundant service-role ALL policy on intake_sms_templates (service_role bypasses RLS)
DROP POLICY IF EXISTS "Service role writes templates" ON public.intake_sms_templates;

-- Tighten anonymous/authenticated lead inserts to require a resume_token
DROP POLICY IF EXISTS "anon can insert leads" ON public.leads;
DROP POLICY IF EXISTS "authenticated can insert leads" ON public.leads;

CREATE POLICY "anon can insert leads"
  ON public.leads FOR INSERT TO anon
  WITH CHECK (resume_token IS NOT NULL AND length(resume_token) >= 8);

CREATE POLICY "authenticated can insert leads"
  ON public.leads FOR INSERT TO authenticated
  WITH CHECK (resume_token IS NOT NULL AND length(resume_token) >= 8);

-- Tighten consent log inserts to require actual consent payload
DROP POLICY IF EXISTS "Anon can log consent" ON public.intake_consent_log;
DROP POLICY IF EXISTS "Authed can log consent" ON public.intake_consent_log;

CREATE POLICY "Anon can log consent"
  ON public.intake_consent_log FOR INSERT TO anon
  WITH CHECK (
    consent_type IS NOT NULL
    AND length(consent_type) > 0
    AND consent_text_snapshot IS NOT NULL
    AND length(consent_text_snapshot) > 0
    AND consent_text_version IS NOT NULL
    AND language IS NOT NULL
  );

CREATE POLICY "Authed can log consent"
  ON public.intake_consent_log FOR INSERT TO authenticated
  WITH CHECK (
    consent_type IS NOT NULL
    AND length(consent_type) > 0
    AND consent_text_snapshot IS NOT NULL
    AND length(consent_text_snapshot) > 0
    AND consent_text_version IS NOT NULL
    AND language IS NOT NULL
  );
