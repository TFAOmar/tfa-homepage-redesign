-- Add slug column to dynamic_advisors table
ALTER TABLE public.dynamic_advisors 
ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Create function to generate slug from name
CREATE OR REPLACE FUNCTION public.generate_advisor_slug(advisor_name text)
RETURNS text
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  RETURN lower(regexp_replace(trim(advisor_name), '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$;

-- Populate existing advisors with slugs based on their names
UPDATE public.dynamic_advisors 
SET slug = public.generate_advisor_slug(name)
WHERE slug IS NULL;

-- Make slug required going forward
ALTER TABLE public.dynamic_advisors 
ALTER COLUMN slug SET NOT NULL;

-- Create RPC function to fetch advisor by slug (returns email for application system)
CREATE OR REPLACE FUNCTION public.get_advisor_by_slug(advisor_slug text)
RETURNS TABLE (
  id uuid,
  name text,
  email text,
  title text,
  image_url text,
  scheduling_link text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT 
    da.id,
    da.name,
    da.email,
    da.title,
    da.image_url,
    da.scheduling_link
  FROM public.dynamic_advisors da
  WHERE da.slug = advisor_slug
    AND da.status = 'published'
  LIMIT 1;
$$;