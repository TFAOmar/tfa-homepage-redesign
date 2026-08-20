-- 1) Restrict resource library reads to admin/staff
DROP POLICY IF EXISTS "Authenticated can view resources" ON public.resources;
CREATE POLICY "Admins and staff can view resources"
  ON public.resources FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

DROP POLICY IF EXISTS "Authenticated can view resource categories" ON public.resource_categories;
DROP POLICY IF EXISTS "Authenticated can view categories" ON public.resource_categories;
CREATE POLICY "Admins and staff can view resource categories"
  ON public.resource_categories FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

DROP POLICY IF EXISTS "Authenticated can read resource files" ON storage.objects;
CREATE POLICY "Admins and staff can read resource files"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'resource-library'
    AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
  );

-- 2) Shared secret for the intake_leads -> forward-to-ghl trigger
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM vault.secrets WHERE name = 'ghl_trigger_secret') THEN
    PERFORM vault.create_secret('300dbeb50a89a1c80f5b26ca3783436b59009b8a26fb96ff25d3c7eb5ff22067', 'ghl_trigger_secret');
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.intake_leads_forward_to_ghl()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_secret text;
BEGIN
  SELECT decrypted_secret INTO v_secret
  FROM vault.decrypted_secrets WHERE name = 'ghl_trigger_secret' LIMIT 1;

  PERFORM net.http_post(
    url := 'https://cstkeblqqyjwlrbppucu.supabase.co/functions/v1/forward-to-ghl',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-internal-source', 'db-webhook',
      'x-internal-secret', coalesce(v_secret, '')
    ),
    body := jsonb_build_object('lead_id', NEW.id)
  );
  RETURN NEW;
END;
$$;