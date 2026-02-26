
CREATE TABLE public.prequalification_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL DEFAULT 'draft',
  advisor_id text,
  advisor_name text,
  advisor_email text,
  applicant_name text,
  applicant_email text,
  applicant_phone text,
  form_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  current_step integer NOT NULL DEFAULT 1,
  source_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  submitted_at timestamptz
);

ALTER TABLE public.prequalification_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit prequalification" ON public.prequalification_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view prequalification" ON public.prequalification_applications
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update prequalification" ON public.prequalification_applications
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete prequalification" ON public.prequalification_applications
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_prequalification_updated_at
  BEFORE UPDATE ON public.prequalification_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
