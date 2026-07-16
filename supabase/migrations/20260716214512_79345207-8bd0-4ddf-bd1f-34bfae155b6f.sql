CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  funnel TEXT NOT NULL CHECK (funnel IN ('protect', 'trust')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'closed', 'dead')),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  state TEXT,
  referral_source TEXT DEFAULT 'minh',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  user_agent TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_complete BOOLEAN NOT NULL DEFAULT false,
  last_step INT DEFAULT 0,
  admin_notes TEXT,
  consent_text TEXT,
  consent_at TIMESTAMPTZ
);

GRANT INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can insert leads"
  ON public.leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "authenticated can insert leads"
  ON public.leads FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "admins can select leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins can delete leads"
  ON public.leads FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX leads_funnel_idx ON public.leads (funnel);
CREATE INDEX leads_status_idx ON public.leads (status);
CREATE INDEX leads_email_idx ON public.leads (email);

CREATE TRIGGER leads_set_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;