
-- ==================================================================
-- intake_referrers
-- ==================================================================
CREATE TABLE public.intake_referrers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  phone_e164 TEXT,
  avatar_url TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  sms_notify_optin BOOLEAN NOT NULL DEFAULT false,
  agreement_signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.intake_referrers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.intake_referrers TO authenticated;
GRANT ALL ON public.intake_referrers TO service_role;

ALTER TABLE public.intake_referrers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active referrers"
  ON public.intake_referrers FOR SELECT
  USING (active = true);

CREATE POLICY "Admins manage referrers"
  ON public.intake_referrers FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ==================================================================
-- intake_teams
-- ==================================================================
CREATE TABLE public.intake_teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE CHECK (key IN ('trust','life','retirement','multi')),
  name_en TEXT NOT NULL,
  name_es TEXT NOT NULL,
  twilio_projected_address TEXT,
  member_name TEXT,
  scheduling_url TEXT,
  language_capabilities TEXT[] NOT NULL DEFAULT ARRAY['en'],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.intake_teams TO authenticated;
GRANT ALL ON public.intake_teams TO service_role;

ALTER TABLE public.intake_teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff read teams"
  ON public.intake_teams FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage teams"
  ON public.intake_teams FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ==================================================================
-- intake_team_members
-- ==================================================================
CREATE TABLE public.intake_team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_key TEXT NOT NULL REFERENCES public.intake_teams(key) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone_e164 TEXT NOT NULL,
  language_capabilities TEXT[] NOT NULL DEFAULT ARRAY['en'],
  active BOOLEAN NOT NULL DEFAULT true,
  priority INTEGER NOT NULL DEFAULT 100,
  open_lead_count INTEGER NOT NULL DEFAULT 0,
  calendar_link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.intake_team_members TO authenticated;
GRANT ALL ON public.intake_team_members TO service_role;

ALTER TABLE public.intake_team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff read team members"
  ON public.intake_team_members FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage team members"
  ON public.intake_team_members FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_intake_team_members_routing
  ON public.intake_team_members(team_key, active, priority);

-- ==================================================================
-- intake_leads
-- ==================================================================
CREATE TABLE public.intake_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT NOT NULL CHECK (source IN ('consumer','concierge')),
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','abandoned','texted','scheduled','met','client','not_qualified','duplicate')),
  services TEXT[] NOT NULL DEFAULT '{}',
  primary_service TEXT,
  answers JSONB NOT NULL DEFAULT '{}',
  first_name TEXT,
  last_name TEXT,
  phone_e164 TEXT,
  phone_normalized TEXT GENERATED ALWAYS AS (regexp_replace(COALESCE(phone_e164,''), '\D', '', 'g')) STORED,
  email TEXT,
  email_normalized TEXT GENERATED ALWAYS AS (lower(COALESCE(email,''))) STORED,
  zip TEXT,
  timezone TEXT,
  language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en','es')),
  best_time TEXT,
  referrer_id UUID REFERENCES public.intake_referrers(id) ON DELETE SET NULL,
  referrer_in_thread BOOLEAN NOT NULL DEFAULT false,
  speaking_with TEXT,
  temperature TEXT CHECK (temperature IS NULL OR temperature IN ('hot','warm','nurture')),
  routing_team_key TEXT REFERENCES public.intake_teams(key) ON DELETE SET NULL,
  routing_overridden BOOLEAN NOT NULL DEFAULT false,
  routing_reason TEXT,
  staff_notes TEXT,
  appointment_status TEXT
    CHECK (appointment_status IS NULL OR appointment_status IN
      ('warm_transfer','scheduled','follow_up','not_qualified','duplicate')),
  appointment_at TIMESTAMPTZ,
  conversation_sid TEXT,
  sms_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (sms_status IN ('pending','queued_quiet_hours','sent','failed','skipped')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  resume_token TEXT NOT NULL DEFAULT encode(gen_random_bytes(24), 'hex')
);

GRANT INSERT ON public.intake_leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.intake_leads TO authenticated;
GRANT ALL ON public.intake_leads TO service_role;

ALTER TABLE public.intake_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can insert consumer leads"
  ON public.intake_leads FOR INSERT
  TO anon
  WITH CHECK (source = 'consumer');

CREATE POLICY "Staff can insert leads"
  ON public.intake_leads FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Staff read leads"
  ON public.intake_leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff update leads"
  ON public.intake_leads FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete leads"
  ON public.intake_leads FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_intake_leads_phone ON public.intake_leads(phone_normalized) WHERE phone_normalized <> '';
CREATE INDEX idx_intake_leads_email ON public.intake_leads(email_normalized) WHERE email_normalized <> '';
CREATE INDEX idx_intake_leads_status ON public.intake_leads(status);
CREATE INDEX idx_intake_leads_created ON public.intake_leads(created_at DESC);
CREATE INDEX idx_intake_leads_resume_token ON public.intake_leads(resume_token);

ALTER PUBLICATION supabase_realtime ADD TABLE public.intake_leads;

-- ==================================================================
-- intake_consent_log (append-only: no UPDATE/DELETE grants or policies)
-- ==================================================================
CREATE TABLE public.intake_consent_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.intake_leads(id) ON DELETE SET NULL,
  consent_type TEXT NOT NULL CHECK (consent_type IN ('tcpa_web','tcpa_verbal','referrer_inclusion','ca_senior_trust_disclosure')),
  consent_text_snapshot TEXT NOT NULL,
  consent_text_version TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  ip TEXT,
  user_agent TEXT,
  page_url TEXT,
  agent_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.intake_consent_log TO anon;
GRANT SELECT, INSERT ON public.intake_consent_log TO authenticated;
GRANT ALL ON public.intake_consent_log TO service_role;

ALTER TABLE public.intake_consent_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can log consent"
  ON public.intake_consent_log FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authed can log consent"
  ON public.intake_consent_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Staff read consent"
  ON public.intake_consent_log FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_intake_consent_lead ON public.intake_consent_log(lead_id);

-- ==================================================================
-- intake_sms_events
-- ==================================================================
CREATE TABLE public.intake_sms_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.intake_leads(id) ON DELETE SET NULL,
  conversation_sid TEXT,
  direction TEXT CHECK (direction IN ('inbound','outbound','system')),
  author TEXT,
  body TEXT,
  event_type TEXT,
  raw JSONB,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.intake_sms_events TO authenticated;
GRANT ALL ON public.intake_sms_events TO service_role;

ALTER TABLE public.intake_sms_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff read sms events"
  ON public.intake_sms_events FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_intake_sms_lead ON public.intake_sms_events(lead_id);

-- ==================================================================
-- intake_suppressions
-- ==================================================================
CREATE TABLE public.intake_suppressions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_e164 TEXT NOT NULL UNIQUE,
  reason TEXT NOT NULL DEFAULT 'stop',
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.intake_suppressions TO authenticated;
GRANT ALL ON public.intake_suppressions TO service_role;

ALTER TABLE public.intake_suppressions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff read suppressions"
  ON public.intake_suppressions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage suppressions"
  ON public.intake_suppressions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ==================================================================
-- updated_at triggers
-- ==================================================================
CREATE TRIGGER trg_intake_referrers_updated
  BEFORE UPDATE ON public.intake_referrers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_intake_teams_updated
  BEFORE UPDATE ON public.intake_teams
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_intake_team_members_updated
  BEFORE UPDATE ON public.intake_team_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_intake_leads_updated
  BEFORE UPDATE ON public.intake_leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==================================================================
-- Public RPC: look up referrer by slug (for /start?ref=...)
-- ==================================================================
CREATE OR REPLACE FUNCTION public.get_intake_referrer_by_slug(p_slug TEXT)
RETURNS TABLE(id UUID, slug TEXT, display_name TEXT, avatar_url TEXT)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT id, slug, display_name, avatar_url
  FROM public.intake_referrers
  WHERE slug = p_slug AND active = true
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_intake_referrer_by_slug(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_intake_referrer_by_slug(TEXT) TO anon, authenticated;
