CREATE TABLE public.advisor_email_routing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_slug text NOT NULL UNIQUE,
  advisor_name text,
  approved_email text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.advisor_email_routing TO authenticated;
GRANT ALL ON public.advisor_email_routing TO service_role;

ALTER TABLE public.advisor_email_routing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage advisor email routing"
  ON public.advisor_email_routing FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_advisor_email_routing_updated_at
  BEFORE UPDATE ON public.advisor_email_routing
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.notification_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid,
  submission_type text NOT NULL DEFAULT 'estate_planning',
  advisor_slug text,
  advisor_name text,
  requested_email text,
  resolved_recipient text,
  to_recipients text[] NOT NULL DEFAULT '{}',
  cc_recipients text[] NOT NULL DEFAULT '{}',
  bcc_recipients text[] NOT NULL DEFAULT '{}',
  provider_message_id text,
  pdf_status text NOT NULL DEFAULT 'not_generated',
  delivery_status text NOT NULL DEFAULT 'pending',
  is_resend boolean NOT NULL DEFAULT false,
  triggered_by uuid,
  error_details text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_notification_audit_submission ON public.notification_audit_log (submission_id);
CREATE INDEX idx_notification_audit_created_at ON public.notification_audit_log (created_at DESC);

GRANT SELECT ON public.notification_audit_log TO authenticated;
GRANT ALL ON public.notification_audit_log TO service_role;

ALTER TABLE public.notification_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read notification audit log"
  ON public.notification_audit_log FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.advisor_email_routing (advisor_slug, advisor_name, approved_email, notes)
VALUES ('conrad-olvera', 'Conrad Olvera', 'colvera@tfainsuranceadvisors.com',
        'Approved TFA business email. Personal Gmail must never be used as a submission recipient.');