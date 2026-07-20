
-- 1. Add resume_token to leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS resume_token text;

UPDATE public.leads
SET resume_token = gen_random_uuid()::text
WHERE resume_token IS NULL;

ALTER TABLE public.leads
  ALTER COLUMN resume_token SET NOT NULL,
  ALTER COLUMN resume_token SET DEFAULT gen_random_uuid()::text;

CREATE UNIQUE INDEX IF NOT EXISTS leads_resume_token_key ON public.leads (resume_token);

-- 2. Replace submit_agent_onboarding_application to require resume_token
DROP FUNCTION IF EXISTS public.submit_agent_onboarding_application(uuid, text);

CREATE OR REPLACE FUNCTION public.submit_agent_onboarding_application(
  p_application_id uuid,
  p_resume_token   text,
  p_signature      text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF p_resume_token IS NULL OR length(p_resume_token) < 8 THEN
    RAISE EXCEPTION 'Invalid resume token';
  END IF;

  UPDATE public.agent_onboarding_applications
  SET status = 'submitted',
      signature = p_signature,
      signed_at = now(),
      submitted_at = now(),
      updated_at = now()
  WHERE id = p_application_id
    AND status = 'draft'
    AND resume_token = p_resume_token;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found, already submitted, or token mismatch';
  END IF;
END;
$function$;
