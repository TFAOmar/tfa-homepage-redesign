-- Create a function to fetch public advisors (no PII exposed)
CREATE OR REPLACE FUNCTION public.get_public_advisors()
RETURNS TABLE (
  id uuid,
  name text,
  title text,
  type advisor_type,
  state text,
  city text,
  region text,
  bio text,
  passionate_bio text,
  specialties text[],
  licenses text[],
  years_of_experience integer,
  image_url text,
  scheduling_link text,
  status advisor_status,
  display_priority integer,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    name,
    title,
    type,
    state,
    city,
    region,
    bio,
    passionate_bio,
    specialties,
    licenses,
    years_of_experience,
    image_url,
    scheduling_link,
    status,
    display_priority,
    created_at,
    updated_at
  FROM public.dynamic_advisors
  WHERE status = 'published'
  ORDER BY name ASC;
$$;