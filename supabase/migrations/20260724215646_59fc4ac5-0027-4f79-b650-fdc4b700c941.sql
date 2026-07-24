ALTER TABLE public.intake_leads
  ADD COLUMN IF NOT EXISTS ghl_forward_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS ghl_forward_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ghl_last_error text,
  ADD COLUMN IF NOT EXISTS ghl_forwarded_at timestamptz,
  ADD COLUMN IF NOT EXISTS preferred_contact_at timestamptz,
  ADD COLUMN IF NOT EXISTS hold_automation boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_intake_leads_ghl_status
  ON public.intake_leads (ghl_forward_status);

DROP FUNCTION IF EXISTS public.intake_leads_after_insert() CASCADE;

DO $$
DECLARE
  jid bigint;
BEGIN
  FOR jid IN
    SELECT jobid FROM cron.job
    WHERE command ILIKE '%dispatch-queued-sms%'
       OR command ILIKE '%dispatch-group-sms%'
  LOOP
    PERFORM cron.unschedule(jid);
  END LOOP;
EXCEPTION WHEN undefined_table THEN
  NULL;
END $$;

CREATE OR REPLACE FUNCTION public.intake_leads_forward_to_ghl()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://cstkeblqqyjwlrbppucu.supabase.co/functions/v1/forward-to-ghl',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-internal-source', 'db-webhook'
    ),
    body := jsonb_build_object('lead_id', NEW.id)
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS intake_leads_forward_to_ghl_trg ON public.intake_leads;
CREATE TRIGGER intake_leads_forward_to_ghl_trg
AFTER INSERT ON public.intake_leads
FOR EACH ROW
EXECUTE FUNCTION public.intake_leads_forward_to_ghl();