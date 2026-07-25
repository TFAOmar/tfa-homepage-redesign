
-- 1. Hierarchy + branding columns
ALTER TABLE public.intake_referrers
  ADD COLUMN IF NOT EXISTS parent_referrer_id uuid REFERENCES public.intake_referrers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS depth int NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS brand_logo_url text,
  ADD COLUMN IF NOT EXISTS brand_primary_hex text,
  ADD COLUMN IF NOT EXISTS brand_accent_hex text,
  ADD COLUMN IF NOT EXISTS brand_welcome_headline text,
  ADD COLUMN IF NOT EXISTS brand_welcome_body text,
  ADD COLUMN IF NOT EXISTS brand_support_email text;

CREATE INDEX IF NOT EXISTS idx_intake_referrers_parent ON public.intake_referrers(parent_referrer_id);

CREATE OR REPLACE FUNCTION public.intake_referrers_check_hierarchy()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE v_depth int := 0; v_current uuid := NEW.parent_referrer_id;
BEGIN
  IF NEW.parent_referrer_id IS NULL THEN NEW.depth := 0; RETURN NEW; END IF;
  IF NEW.parent_referrer_id = NEW.id THEN RAISE EXCEPTION 'A partner cannot be its own parent'; END IF;
  WHILE v_current IS NOT NULL LOOP
    v_depth := v_depth + 1;
    IF v_depth > 5 THEN RAISE EXCEPTION 'Partner hierarchy exceeds max depth of 5'; END IF;
    IF v_current = NEW.id THEN RAISE EXCEPTION 'Cycle detected in partner hierarchy'; END IF;
    SELECT parent_referrer_id INTO v_current FROM public.intake_referrers WHERE id = v_current;
  END LOOP;
  NEW.depth := v_depth;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_intake_referrers_hierarchy ON public.intake_referrers;
CREATE TRIGGER trg_intake_referrers_hierarchy
  BEFORE INSERT OR UPDATE OF parent_referrer_id ON public.intake_referrers
  FOR EACH ROW EXECUTE FUNCTION public.intake_referrers_check_hierarchy();

CREATE OR REPLACE FUNCTION public.intake_referrers_validate_branding()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.brand_primary_hex IS NOT NULL AND NEW.brand_primary_hex !~ '^#[0-9A-Fa-f]{6}$' THEN
    RAISE EXCEPTION 'brand_primary_hex must be #RRGGBB';
  END IF;
  IF NEW.brand_accent_hex IS NOT NULL AND NEW.brand_accent_hex !~ '^#[0-9A-Fa-f]{6}$' THEN
    RAISE EXCEPTION 'brand_accent_hex must be #RRGGBB';
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_intake_referrers_branding ON public.intake_referrers;
CREATE TRIGGER trg_intake_referrers_branding
  BEFORE INSERT OR UPDATE OF brand_primary_hex, brand_accent_hex ON public.intake_referrers
  FOR EACH ROW EXECUTE FUNCTION public.intake_referrers_validate_branding();

DROP POLICY IF EXISTS "Owners update branding" ON public.intake_referrers;
CREATE POLICY "Owners update branding"
ON public.intake_referrers FOR UPDATE TO authenticated
USING (owner_user_id = auth.uid())
WITH CHECK (owner_user_id = auth.uid());

-- 2. Attribution path on intake_leads
ALTER TABLE public.intake_leads
  ADD COLUMN IF NOT EXISTS attribution_path uuid[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS origin_referrer_id uuid;

CREATE INDEX IF NOT EXISTS idx_intake_leads_attribution ON public.intake_leads USING gin (attribution_path);
CREATE INDEX IF NOT EXISTS idx_intake_leads_origin ON public.intake_leads(origin_referrer_id);

CREATE OR REPLACE FUNCTION public.intake_leads_compute_attribution()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE v_path uuid[] := ARRAY[]::uuid[]; v_current uuid := NEW.referrer_id; v_guard int := 0;
BEGIN
  IF v_current IS NULL THEN
    NEW.attribution_path := ARRAY[]::uuid[];
    NEW.origin_referrer_id := NULL;
    RETURN NEW;
  END IF;
  WHILE v_current IS NOT NULL AND v_guard < 10 LOOP
    v_path := v_path || v_current;
    SELECT parent_referrer_id INTO v_current FROM public.intake_referrers WHERE id = v_current;
    v_guard := v_guard + 1;
  END LOOP;
  NEW.attribution_path := v_path;
  NEW.origin_referrer_id := v_path[array_length(v_path, 1)];
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_intake_leads_attribution ON public.intake_leads;
CREATE TRIGGER trg_intake_leads_attribution
  BEFORE INSERT OR UPDATE OF referrer_id ON public.intake_leads
  FOR EACH ROW EXECUTE FUNCTION public.intake_leads_compute_attribution();

UPDATE public.intake_leads
   SET attribution_path = ARRAY[referrer_id],
       origin_referrer_id = referrer_id
 WHERE referrer_id IS NOT NULL
   AND (attribution_path IS NULL OR array_length(attribution_path,1) IS NULL);

DROP POLICY IF EXISTS "Partners read own referred leads" ON public.intake_leads;
DROP POLICY IF EXISTS "Partners read attributed leads" ON public.intake_leads;
CREATE POLICY "Partners read attributed leads"
ON public.intake_leads FOR SELECT TO authenticated
USING (
  array_length(attribution_path, 1) IS NOT NULL
  AND EXISTS (
    SELECT 1 FROM public.intake_referrers r
    WHERE r.owner_user_id = auth.uid()
      AND r.id = ANY(intake_leads.attribution_path)
  )
);

-- 3. RPCs
DROP FUNCTION IF EXISTS public.admin_upsert_referrer(uuid, text, text, text, text, boolean, boolean);
CREATE OR REPLACE FUNCTION public.admin_upsert_referrer(
  p_id uuid, p_slug text, p_display_name text, p_phone_e164 text, p_avatar_url text,
  p_active boolean, p_sms_notify_optin boolean,
  p_parent_referrer_id uuid DEFAULT NULL,
  p_brand_logo_url text DEFAULT NULL, p_brand_primary_hex text DEFAULT NULL,
  p_brand_accent_hex text DEFAULT NULL, p_brand_welcome_headline text DEFAULT NULL,
  p_brand_welcome_body text DEFAULT NULL, p_brand_support_email text DEFAULT NULL
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_id uuid;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN RAISE EXCEPTION 'Not authorized'; END IF;
  IF p_id IS NULL THEN
    INSERT INTO public.intake_referrers(
      slug, display_name, phone_e164, avatar_url, active, sms_notify_optin,
      parent_referrer_id, brand_logo_url, brand_primary_hex, brand_accent_hex,
      brand_welcome_headline, brand_welcome_body, brand_support_email
    ) VALUES (
      p_slug, p_display_name, NULLIF(p_phone_e164,''), NULLIF(p_avatar_url,''),
      COALESCE(p_active,true), COALESCE(p_sms_notify_optin,false),
      p_parent_referrer_id, NULLIF(p_brand_logo_url,''), NULLIF(p_brand_primary_hex,''),
      NULLIF(p_brand_accent_hex,''), NULLIF(p_brand_welcome_headline,''),
      NULLIF(p_brand_welcome_body,''), NULLIF(p_brand_support_email,'')
    ) RETURNING id INTO v_id;
  ELSE
    UPDATE public.intake_referrers SET
      slug = p_slug, display_name = p_display_name,
      phone_e164 = NULLIF(p_phone_e164,''), avatar_url = NULLIF(p_avatar_url,''),
      active = COALESCE(p_active, active), sms_notify_optin = COALESCE(p_sms_notify_optin, sms_notify_optin),
      parent_referrer_id = p_parent_referrer_id,
      brand_logo_url = NULLIF(p_brand_logo_url,''),
      brand_primary_hex = NULLIF(p_brand_primary_hex,''),
      brand_accent_hex = NULLIF(p_brand_accent_hex,''),
      brand_welcome_headline = NULLIF(p_brand_welcome_headline,''),
      brand_welcome_body = NULLIF(p_brand_welcome_body,''),
      brand_support_email = NULLIF(p_brand_support_email,''),
      updated_at = now()
    WHERE id = p_id RETURNING id INTO v_id;
  END IF;
  RETURN v_id;
END; $$;

DROP FUNCTION IF EXISTS public.admin_list_referrers_with_owner();
CREATE OR REPLACE FUNCTION public.admin_list_referrers_with_owner()
RETURNS TABLE(
  id uuid, slug text, display_name text, phone_e164 text, avatar_url text,
  active boolean, sms_notify_optin boolean, agreement_signed_at timestamptz,
  owner_user_id uuid, owner_email text,
  leads_total bigint, leads_30d bigint,
  parent_referrer_id uuid, parent_slug text, depth int,
  brand_logo_url text, brand_primary_hex text, brand_accent_hex text,
  brand_welcome_headline text, brand_welcome_body text, brand_support_email text,
  created_at timestamptz, updated_at timestamptz
) LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN RAISE EXCEPTION 'Not authorized'; END IF;
  RETURN QUERY
  SELECT r.id, r.slug, r.display_name, r.phone_e164, r.avatar_url,
    r.active, r.sms_notify_optin, r.agreement_signed_at,
    r.owner_user_id, u.email::text,
    COALESCE((SELECT count(*) FROM public.intake_leads l WHERE r.id = ANY(l.attribution_path)), 0),
    COALESCE((SELECT count(*) FROM public.intake_leads l WHERE r.id = ANY(l.attribution_path) AND l.created_at > now() - interval '30 days'), 0),
    r.parent_referrer_id, p.slug, r.depth,
    r.brand_logo_url, r.brand_primary_hex, r.brand_accent_hex,
    r.brand_welcome_headline, r.brand_welcome_body, r.brand_support_email,
    r.created_at, r.updated_at
  FROM public.intake_referrers r
  LEFT JOIN auth.users u ON u.id = r.owner_user_id
  LEFT JOIN public.intake_referrers p ON p.id = r.parent_referrer_id
  ORDER BY r.created_at DESC;
END; $$;

CREATE OR REPLACE FUNCTION public.admin_bulk_upsert_referrers(p_rows jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_row jsonb; v_results jsonb := '[]'::jsonb; v_id uuid; v_parent_id uuid;
        v_owner_id uuid; v_status text; v_msg text; v_slug text;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN RAISE EXCEPTION 'Not authorized'; END IF;
  FOR v_row IN SELECT * FROM jsonb_array_elements(p_rows) LOOP
    v_status := 'ok'; v_msg := NULL; v_parent_id := NULL; v_owner_id := NULL; v_id := NULL;
    v_slug := lower(regexp_replace(trim(coalesce(v_row->>'slug','')), '[^a-z0-9]+', '-', 'g'));
    BEGIN
      IF v_slug = '' OR coalesce(trim(v_row->>'display_name'),'') = '' THEN
        v_status := 'error'; v_msg := 'slug and display_name required';
      ELSE
        IF coalesce(v_row->>'parent_slug','') <> '' THEN
          SELECT id INTO v_parent_id FROM public.intake_referrers
            WHERE slug = lower(trim(v_row->>'parent_slug')) LIMIT 1;
          IF v_parent_id IS NULL THEN
            v_status := 'warning'; v_msg := 'parent_slug not found; created without parent';
          END IF;
        END IF;

        SELECT id INTO v_id FROM public.intake_referrers WHERE slug = v_slug LIMIT 1;
        IF v_id IS NULL THEN
          INSERT INTO public.intake_referrers(
            slug, display_name, phone_e164, avatar_url, active, sms_notify_optin, parent_referrer_id
          ) VALUES (
            v_slug, trim(v_row->>'display_name'),
            NULLIF(trim(coalesce(v_row->>'phone_e164','')),''),
            NULLIF(trim(coalesce(v_row->>'avatar_url','')),''),
            COALESCE((v_row->>'active')::boolean, true),
            COALESCE((v_row->>'sms_notify_optin')::boolean, false),
            v_parent_id
          ) RETURNING id INTO v_id;
          IF v_status = 'ok' THEN v_msg := 'created'; END IF;
        ELSE
          UPDATE public.intake_referrers SET
            display_name = trim(v_row->>'display_name'),
            phone_e164 = NULLIF(trim(coalesce(v_row->>'phone_e164','')),''),
            avatar_url = NULLIF(trim(coalesce(v_row->>'avatar_url','')),''),
            active = COALESCE((v_row->>'active')::boolean, active),
            sms_notify_optin = COALESCE((v_row->>'sms_notify_optin')::boolean, sms_notify_optin),
            parent_referrer_id = COALESCE(v_parent_id, parent_referrer_id),
            updated_at = now()
          WHERE id = v_id;
          IF v_status = 'ok' THEN v_msg := 'updated'; END IF;
        END IF;

        IF coalesce(v_row->>'owner_email','') <> '' THEN
          SELECT id INTO v_owner_id FROM auth.users
            WHERE lower(email) = lower(trim(v_row->>'owner_email')) LIMIT 1;
          IF v_owner_id IS NULL THEN
            v_status := 'warning';
            v_msg := coalesce(v_msg,'') || '; owner email has no account (skipped link)';
          ELSE
            UPDATE public.intake_referrers SET owner_user_id = v_owner_id, updated_at = now() WHERE id = v_id;
            INSERT INTO public.user_roles(user_id, role) VALUES (v_owner_id, 'partner'::app_role)
              ON CONFLICT (user_id, role) DO NOTHING;
          END IF;
        END IF;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_status := 'error'; v_msg := SQLERRM;
    END;

    v_results := v_results || jsonb_build_object('slug', v_slug, 'id', v_id, 'status', v_status, 'message', v_msg);
  END LOOP;
  RETURN v_results;
END; $$;

CREATE OR REPLACE FUNCTION public.partner_list_children(p_referrer_id uuid DEFAULT NULL)
RETURNS TABLE(id uuid, slug text, display_name text, active boolean,
  leads_total bigint, leads_30d bigint, depth int)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_root uuid; v_is_admin boolean := public.has_role(auth.uid(), 'admin'::app_role);
BEGIN
  IF p_referrer_id IS NOT NULL THEN
    IF NOT v_is_admin THEN
      IF NOT EXISTS (SELECT 1 FROM public.intake_referrers WHERE id = p_referrer_id AND owner_user_id = auth.uid()) THEN
        RAISE EXCEPTION 'Not authorized';
      END IF;
    END IF;
    v_root := p_referrer_id;
  ELSE
    SELECT r.id INTO v_root FROM public.intake_referrers r
      WHERE r.owner_user_id = auth.uid() ORDER BY r.created_at ASC LIMIT 1;
  END IF;
  IF v_root IS NULL THEN RETURN; END IF;
  RETURN QUERY
  SELECT c.id, c.slug, c.display_name, c.active,
    COALESCE((SELECT count(*) FROM public.intake_leads l WHERE c.id = ANY(l.attribution_path)), 0),
    COALESCE((SELECT count(*) FROM public.intake_leads l WHERE c.id = ANY(l.attribution_path) AND l.created_at > now() - interval '30 days'), 0),
    c.depth
  FROM public.intake_referrers c
  WHERE c.parent_referrer_id = v_root
  ORDER BY c.display_name;
END; $$;

CREATE OR REPLACE FUNCTION public.get_my_partner_branding()
RETURNS TABLE(id uuid, slug text, display_name text,
  brand_logo_url text, brand_primary_hex text, brand_accent_hex text,
  brand_welcome_headline text, brand_welcome_body text, brand_support_email text,
  parent_referrer_id uuid, depth int)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT id, slug, display_name,
         brand_logo_url, brand_primary_hex, brand_accent_hex,
         brand_welcome_headline, brand_welcome_body, brand_support_email,
         parent_referrer_id, depth
  FROM public.intake_referrers
  WHERE owner_user_id = auth.uid() AND active = true
  ORDER BY created_at ASC LIMIT 1;
$$;

DROP FUNCTION IF EXISTS public.admin_partner_stats(uuid);
CREATE OR REPLACE FUNCTION public.admin_partner_stats(p_referrer_id uuid, p_include_descendants boolean DEFAULT false)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE v_is_admin boolean; v_is_owner boolean; v_result jsonb;
BEGIN
  v_is_admin := public.has_role(auth.uid(), 'admin'::app_role);
  v_is_owner := EXISTS (SELECT 1 FROM public.intake_referrers WHERE id = p_referrer_id AND owner_user_id = auth.uid());
  IF NOT (v_is_admin OR v_is_owner) THEN RAISE EXCEPTION 'Not authorized'; END IF;

  IF p_include_descendants THEN
    SELECT jsonb_build_object(
      'total', (SELECT count(*) FROM public.intake_leads WHERE p_referrer_id = ANY(attribution_path)),
      'last_30d', (SELECT count(*) FROM public.intake_leads WHERE p_referrer_id = ANY(attribution_path) AND created_at > now() - interval '30 days'),
      'last_7d', (SELECT count(*) FROM public.intake_leads WHERE p_referrer_id = ANY(attribution_path) AND created_at > now() - interval '7 days'),
      'appointments', (SELECT count(*) FROM public.intake_leads WHERE p_referrer_id = ANY(attribution_path) AND appointment_status IS NOT NULL AND appointment_status <> ''),
      'ghl_sent', (SELECT count(*) FROM public.intake_leads WHERE p_referrer_id = ANY(attribution_path) AND ghl_forward_status = 'sent'),
      'ghl_failed', (SELECT count(*) FROM public.intake_leads WHERE p_referrer_id = ANY(attribution_path) AND ghl_forward_status = 'failed'),
      'by_week', (SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.week_start), '[]'::jsonb) FROM (
          SELECT date_trunc('week', created_at)::date AS week_start, count(*)::int AS count
            FROM public.intake_leads WHERE p_referrer_id = ANY(attribution_path)
             AND created_at > now() - interval '84 days' GROUP BY 1) t),
      'by_service', (SELECT COALESCE(jsonb_object_agg(svc, cnt), '{}'::jsonb) FROM (
          SELECT unnest(services) AS svc, count(*)::int AS cnt FROM public.intake_leads
           WHERE p_referrer_id = ANY(attribution_path) GROUP BY 1) t),
      'by_language', (SELECT COALESCE(jsonb_object_agg(language, cnt), '{}'::jsonb) FROM (
          SELECT language, count(*)::int AS cnt FROM public.intake_leads
           WHERE p_referrer_id = ANY(attribution_path) GROUP BY 1) t),
      'by_status', (SELECT COALESCE(jsonb_object_agg(status, cnt), '{}'::jsonb) FROM (
          SELECT status, count(*)::int AS cnt FROM public.intake_leads
           WHERE p_referrer_id = ANY(attribution_path) GROUP BY 1) t)
    ) INTO v_result;
  ELSE
    SELECT jsonb_build_object(
      'total', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id),
      'last_30d', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id AND created_at > now() - interval '30 days'),
      'last_7d', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id AND created_at > now() - interval '7 days'),
      'appointments', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id AND appointment_status IS NOT NULL AND appointment_status <> ''),
      'ghl_sent', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id AND ghl_forward_status = 'sent'),
      'ghl_failed', (SELECT count(*) FROM public.intake_leads WHERE referrer_id = p_referrer_id AND ghl_forward_status = 'failed'),
      'by_week', (SELECT COALESCE(jsonb_agg(row_to_json(t) ORDER BY t.week_start), '[]'::jsonb) FROM (
          SELECT date_trunc('week', created_at)::date AS week_start, count(*)::int AS count
            FROM public.intake_leads WHERE referrer_id = p_referrer_id
             AND created_at > now() - interval '84 days' GROUP BY 1) t),
      'by_service', (SELECT COALESCE(jsonb_object_agg(svc, cnt), '{}'::jsonb) FROM (
          SELECT unnest(services) AS svc, count(*)::int AS cnt FROM public.intake_leads
           WHERE referrer_id = p_referrer_id GROUP BY 1) t),
      'by_language', (SELECT COALESCE(jsonb_object_agg(language, cnt), '{}'::jsonb) FROM (
          SELECT language, count(*)::int AS cnt FROM public.intake_leads
           WHERE referrer_id = p_referrer_id GROUP BY 1) t),
      'by_status', (SELECT COALESCE(jsonb_object_agg(status, cnt), '{}'::jsonb) FROM (
          SELECT status, count(*)::int AS cnt FROM public.intake_leads
           WHERE referrer_id = p_referrer_id GROUP BY 1) t)
    ) INTO v_result;
  END IF;
  RETURN v_result;
END; $$;
