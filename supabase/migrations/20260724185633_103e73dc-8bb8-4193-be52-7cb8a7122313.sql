
-- ============ SMS TEMPLATES ============
CREATE TABLE public.intake_sms_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_key text NOT NULL,
  language text NOT NULL CHECK (language IN ('en','es')),
  kind text NOT NULL DEFAULT 'intro' CHECK (kind IN ('intro','referrer_declined','opt_out_confirm')),
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (team_key, language, kind)
);

GRANT SELECT ON public.intake_sms_templates TO authenticated;
GRANT ALL ON public.intake_sms_templates TO service_role;
ALTER TABLE public.intake_sms_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff or admin can read templates"
  ON public.intake_sms_templates FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role writes templates"
  ON public.intake_sms_templates FOR ALL
  TO service_role USING (true) WITH CHECK (true);

CREATE TRIGGER trg_intake_sms_templates_updated
  BEFORE UPDATE ON public.intake_sms_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ TEAMS: Spanish scheduling URL ============
ALTER TABLE public.intake_teams
  ADD COLUMN IF NOT EXISTS scheduling_url_es text;

-- ============ LEADS: dispatch bookkeeping ============
ALTER TABLE public.intake_leads
  ADD COLUMN IF NOT EXISTS assigned_member_id uuid REFERENCES public.intake_team_members(id),
  ADD COLUMN IF NOT EXISTS intro_scheduled_for timestamptz,
  ADD COLUMN IF NOT EXISTS intro_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS intro_fallback boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS conversation_sid text;

-- routing_reason already exists in schema; ensure column present
ALTER TABLE public.intake_leads
  ADD COLUMN IF NOT EXISTS routing_reason text;

-- ============ SMS EVENTS: review queue ============
ALTER TABLE public.intake_sms_events
  ADD COLUMN IF NOT EXISTS severity text NOT NULL DEFAULT 'info',
  ADD COLUMN IF NOT EXISTS needs_review boolean NOT NULL DEFAULT false;

-- ============ Atomic member assignment ============
CREATE OR REPLACE FUNCTION public.intake_assign_member(p_team_key text, p_language text)
RETURNS TABLE(member_id uuid, member_name text, member_phone text, scheduling_link text, was_language_preferred boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
  v_lang_match boolean := true;
BEGIN
  -- Prefer language-capable, then lowest open_lead_count, then priority
  SELECT tm.id INTO v_id
  FROM public.intake_team_members tm
  WHERE tm.team_key = p_team_key
    AND tm.active = true
    AND p_language = ANY(tm.language_capabilities)
  ORDER BY tm.open_lead_count ASC, tm.priority ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;

  IF v_id IS NULL THEN
    v_lang_match := false;
    SELECT tm.id INTO v_id
    FROM public.intake_team_members tm
    WHERE tm.team_key = p_team_key
      AND tm.active = true
    ORDER BY tm.open_lead_count ASC, tm.priority ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED;
  END IF;

  IF v_id IS NULL THEN
    RETURN;
  END IF;

  UPDATE public.intake_team_members
     SET open_lead_count = open_lead_count + 1,
         updated_at = now()
   WHERE id = v_id;

  RETURN QUERY
  SELECT tm.id, tm.name, tm.phone_e164, tm.calendar_link, v_lang_match
  FROM public.intake_team_members tm
  WHERE tm.id = v_id;
END;
$$;

-- ============ Webhook trigger on new lead ============
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION public.intake_leads_after_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cron_secret text;
BEGIN
  IF NEW.status <> 'new' THEN
    RETURN NEW;
  END IF;

  -- Read CRON_SECRET from vault via current_setting if configured; otherwise use env-pinned value.
  -- We use a placeholder header — dispatch fn also accepts service-role via internal net.http_post.
  PERFORM net.http_post(
    url := 'https://cstkeblqqyjwlrbppucu.supabase.co/functions/v1/dispatch-group-sms',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-internal-source', 'db-webhook'
    ),
    body := jsonb_build_object('lead_id', NEW.id)
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_intake_leads_dispatch ON public.intake_leads;
CREATE TRIGGER trg_intake_leads_dispatch
  AFTER INSERT ON public.intake_leads
  FOR EACH ROW EXECUTE FUNCTION public.intake_leads_after_insert();
