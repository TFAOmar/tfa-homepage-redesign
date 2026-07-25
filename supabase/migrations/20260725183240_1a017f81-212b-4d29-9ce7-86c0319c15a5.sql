-- Admin RPCs for partner management

CREATE OR REPLACE FUNCTION public.admin_list_referrers_with_owner()
RETURNS TABLE(
  id uuid,
  slug text,
  display_name text,
  phone_e164 text,
  avatar_url text,
  active boolean,
  sms_notify_optin boolean,
  agreement_signed_at timestamptz,
  owner_user_id uuid,
  owner_email text,
  leads_total bigint,
  leads_30d bigint,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  RETURN QUERY
  SELECT
    r.id,
    r.slug,
    r.display_name,
    r.phone_e164,
    r.avatar_url,
    r.active,
    r.sms_notify_optin,
    r.agreement_signed_at,
    r.owner_user_id,
    u.email::text AS owner_email,
    COALESCE((SELECT count(*) FROM public.intake_leads l WHERE l.referrer_id = r.id), 0) AS leads_total,
    COALESCE((SELECT count(*) FROM public.intake_leads l WHERE l.referrer_id = r.id AND l.created_at > now() - interval '30 days'), 0) AS leads_30d,
    r.created_at,
    r.updated_at
  FROM public.intake_referrers r
  LEFT JOIN auth.users u ON u.id = r.owner_user_id
  ORDER BY r.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_link_referrer_owner(p_referrer_id uuid, p_email text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT id INTO v_user_id FROM auth.users WHERE lower(email) = lower(p_email) LIMIT 1;
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'No user account exists for %', p_email;
  END IF;

  UPDATE public.intake_referrers
     SET owner_user_id = v_user_id, updated_at = now()
   WHERE id = p_referrer_id;

  INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, 'partner'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;

  RETURN v_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_unlink_referrer_owner(p_referrer_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_other_count integer;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT owner_user_id INTO v_user_id FROM public.intake_referrers WHERE id = p_referrer_id;

  UPDATE public.intake_referrers
     SET owner_user_id = NULL, updated_at = now()
   WHERE id = p_referrer_id;

  IF v_user_id IS NOT NULL THEN
    SELECT count(*) INTO v_other_count
      FROM public.intake_referrers
     WHERE owner_user_id = v_user_id;
    IF v_other_count = 0 THEN
      DELETE FROM public.user_roles
       WHERE user_id = v_user_id AND role = 'partner'::app_role;
    END IF;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_upsert_referrer(
  p_id uuid,
  p_slug text,
  p_display_name text,
  p_phone_e164 text,
  p_avatar_url text,
  p_active boolean,
  p_sms_notify_optin boolean
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  IF p_id IS NULL THEN
    INSERT INTO public.intake_referrers (slug, display_name, phone_e164, avatar_url, active, sms_notify_optin)
    VALUES (p_slug, p_display_name, NULLIF(p_phone_e164,''), NULLIF(p_avatar_url,''), COALESCE(p_active,true), COALESCE(p_sms_notify_optin,false))
    RETURNING id INTO v_id;
  ELSE
    UPDATE public.intake_referrers
      SET slug = p_slug,
          display_name = p_display_name,
          phone_e164 = NULLIF(p_phone_e164,''),
          avatar_url = NULLIF(p_avatar_url,''),
          active = COALESCE(p_active, active),
          sms_notify_optin = COALESCE(p_sms_notify_optin, sms_notify_optin),
          updated_at = now()
      WHERE id = p_id
      RETURNING id INTO v_id;
  END IF;
  RETURN v_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_delete_referrer(p_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  SELECT count(*) INTO v_count FROM public.intake_leads WHERE referrer_id = p_id;
  IF v_count > 0 THEN
    RAISE EXCEPTION 'Cannot delete: partner has % lead(s). Deactivate instead.', v_count;
  END IF;
  DELETE FROM public.intake_referrers WHERE id = p_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_partner_stats(p_referrer_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_admin boolean;
  v_is_owner boolean;
  v_result jsonb;
BEGIN
  v_is_admin := public.has_role(auth.uid(), 'admin'::app_role);
  v_is_owner := EXISTS (
    SELECT 1 FROM public.intake_referrers
     WHERE id = p_referrer_id AND owner_user_id = auth.uid()
  );
  IF NOT (v_is_admin OR v_is_owner) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT jsonb_build_object(
    'total', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id),
    'last_30d', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id AND created_at > now() - interval '30 days'),
    'last_7d', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id AND created_at > now() - interval '7 days'),
    'appointments', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id AND appointment_status IS NOT NULL AND appointment_status <> ''),
    'ghl_sent', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id AND ghl_forward_status = 'sent'),
    'ghl_failed', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id AND ghl_forward_status = 'failed'),
    'by_week', (
      SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.week_start), '[]'::jsonb) FROM (
        SELECT date_trunc('week', created_at)::date AS week_start, count(*)::int AS count
          FROM public.intake_leads
         WHERE referrer_id = p_referrer_id AND created_at > now() - interval '84 days'
         GROUP BY 1
      ) t
    ),
    'by_service', (
      SELECT COALESCE(jsonb_object_agg(svc, cnt), '{}'::jsonb) FROM (
        SELECT unnest(services) AS svc, count(*)::int AS cnt
          FROM public.intake_leads
         WHERE referrer_id = p_referrer_id
         GROUP BY 1
      ) t
    ),
    'by_language', (
      SELECT COALESCE(jsonb_object_agg(language, cnt), '{}'::jsonb) FROM (
        SELECT language, count(*)::int AS cnt
          FROM public.intake_leads
         WHERE referrer_id = p_referrer_id
         GROUP BY 1
      ) t
    ),
    'by_status', (
      SELECT COALESCE(jsonb_object_agg(status, cnt), '{}'::jsonb) FROM (
        SELECT status, count(*)::int AS cnt
          FROM public.intake_leads
         WHERE referrer_id = p_referrer_id
         GROUP BY 1
      ) t
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_list_referrers_with_owner() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_link_referrer_owner(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_unlink_referrer_owner(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_upsert_referrer(uuid, text, text, text, text, boolean, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_referrer(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_partner_stats(uuid) TO authenticated;

CREATE INDEX IF NOT EXISTS idx_intake_leads_referrer_created ON public.intake_leads(referrer_id, created_at DESC);