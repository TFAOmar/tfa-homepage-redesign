CREATE OR REPLACE FUNCTION public.create_agent_onboarding_draft()
RETURNS TABLE(id uuid, resume_token text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_id uuid; v_token text;
BEGIN
  INSERT INTO public.agent_onboarding_applications(status, form_data)
  VALUES ('draft', '{}'::jsonb)
  RETURNING agent_onboarding_applications.id, agent_onboarding_applications.resume_token
  INTO v_id, v_token;
  RETURN QUERY SELECT v_id, v_token;
END;
$$;

REVOKE ALL ON FUNCTION public.create_agent_onboarding_draft() FROM public;
GRANT EXECUTE ON FUNCTION public.create_agent_onboarding_draft() TO anon, authenticated;