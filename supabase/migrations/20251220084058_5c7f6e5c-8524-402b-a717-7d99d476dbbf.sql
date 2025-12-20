-- Fix Issue 1: Restrict advisor photos uploads to admin only
-- Drop the permissive authenticated policy
DROP POLICY IF EXISTS "Authenticated users can upload advisor photos" ON storage.objects;

-- Replace with admin-only upload policy
CREATE POLICY "Admins can upload advisor photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'advisor-photos' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Fix Issue 3: Remove email from get_advisor_by_slug function
-- First drop the existing function, then recreate without email
DROP FUNCTION IF EXISTS public.get_advisor_by_slug(text);

CREATE FUNCTION public.get_advisor_by_slug(advisor_slug text)
RETURNS TABLE (id uuid, name text, title text, image_url text, scheduling_link text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT 
    da.id,
    da.name,
    da.title,
    da.image_url,
    da.scheduling_link
  FROM public.dynamic_advisors da
  WHERE da.slug = advisor_slug
    AND da.status = 'published'
  LIMIT 1;
$$;