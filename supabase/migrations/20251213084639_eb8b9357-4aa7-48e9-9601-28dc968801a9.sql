-- Create a secure view for public advisor data that excludes PII (email, phone)
CREATE OR REPLACE VIEW public.public_advisors AS
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
WHERE status = 'published';

-- Grant SELECT on the view to anonymous and authenticated users
GRANT SELECT ON public.public_advisors TO anon;
GRANT SELECT ON public.public_advisors TO authenticated;

-- Add a comment explaining the view's purpose
COMMENT ON VIEW public.public_advisors IS 'Secure public view of advisors excluding PII (email, phone). Use this view for all public-facing queries.';