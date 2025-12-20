-- Create a function to submit a life insurance application
-- This bypasses RLS to properly handle the status transition from 'draft' to 'submitted'
CREATE OR REPLACE FUNCTION public.submit_life_insurance_application(application_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE life_insurance_applications
  SET status = 'submitted',
      updated_at = now()
  WHERE id = application_id
    AND status = 'draft';
    
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found or already submitted';
  END IF;
END;
$$;