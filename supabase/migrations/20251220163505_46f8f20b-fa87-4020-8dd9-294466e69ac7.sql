-- Drop the vulnerable public draft viewing policies
DROP POLICY IF EXISTS "Anyone can view draft applications" ON life_insurance_applications;
DROP POLICY IF EXISTS "Anyone can update draft applications" ON life_insurance_applications;

-- Create a secure function to fetch draft by token (SECURITY DEFINER so it bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_draft_application_by_token(p_resume_token text)
RETURNS SETOF life_insurance_applications
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT *
  FROM public.life_insurance_applications
  WHERE resume_token = p_resume_token
    AND status = 'draft'
  LIMIT 1;
$$;

-- Create a secure function to update draft by token
CREATE OR REPLACE FUNCTION public.update_draft_application_by_token(
  p_resume_token text,
  p_form_data jsonb,
  p_current_step integer,
  p_applicant_name text DEFAULT NULL,
  p_applicant_email text DEFAULT NULL,
  p_applicant_phone text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  UPDATE life_insurance_applications
  SET 
    form_data = p_form_data,
    current_step = p_current_step,
    applicant_name = p_applicant_name,
    applicant_email = p_applicant_email,
    applicant_phone = p_applicant_phone,
    updated_at = now()
  WHERE resume_token = p_resume_token
    AND status = 'draft'
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$;