CREATE OR REPLACE FUNCTION public.update_draft_application_by_token(
  p_resume_token text,
  p_form_data jsonb,
  p_current_step integer,
  p_applicant_name text DEFAULT NULL::text,
  p_applicant_email text DEFAULT NULL::text,
  p_applicant_phone text DEFAULT NULL::text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_id uuid;
BEGIN
  -- Pick exactly one draft for this token (latest updated)
  SELECT id
    INTO v_id
  FROM public.life_insurance_applications
  WHERE resume_token = p_resume_token
    AND status = 'draft'
  ORDER BY updated_at DESC, created_at DESC
  LIMIT 1;

  IF v_id IS NULL THEN
    RETURN NULL;
  END IF;

  UPDATE public.life_insurance_applications
  SET
    form_data = p_form_data,
    current_step = p_current_step,
    applicant_name = p_applicant_name,
    applicant_email = p_applicant_email,
    applicant_phone = p_applicant_phone,
    updated_at = now()
  WHERE id = v_id;

  RETURN v_id;
END;
$function$;
