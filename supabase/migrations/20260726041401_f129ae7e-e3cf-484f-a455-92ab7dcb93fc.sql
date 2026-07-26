
CREATE OR REPLACE FUNCTION public.admin_list_partner_leads(p_slug text)
RETURNS SETOF public.leads
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT l.*
  FROM public.leads l
  WHERE public.has_role(auth.uid(), 'admin'::app_role)
    AND l.partner_slug = p_slug
  ORDER BY l.created_at DESC
  LIMIT 1000;
$$;

CREATE OR REPLACE FUNCTION public.admin_list_partner_form_submissions(p_slug text)
RETURNS SETOF public.form_submissions
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT s.*
  FROM public.form_submissions s
  WHERE public.has_role(auth.uid(), 'admin'::app_role)
    AND s.partner_slug = p_slug
  ORDER BY s.created_at DESC
  LIMIT 1000;
$$;

GRANT EXECUTE ON FUNCTION public.admin_list_partner_leads(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_partner_form_submissions(text) TO authenticated;
