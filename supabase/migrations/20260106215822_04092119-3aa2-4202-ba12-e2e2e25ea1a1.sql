-- Drop and recreate get_advisor_by_slug to include email for life insurance application routing
DROP FUNCTION IF EXISTS public.get_advisor_by_slug(text);

CREATE FUNCTION public.get_advisor_by_slug(advisor_slug text)
 RETURNS TABLE(id uuid, name text, title text, image_url text, scheduling_link text, email text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT 
    da.id,
    da.name,
    da.title,
    da.image_url,
    da.scheduling_link,
    da.email
  FROM public.dynamic_advisors da
  WHERE da.slug = advisor_slug
    AND da.status = 'published'
  LIMIT 1;
$function$;