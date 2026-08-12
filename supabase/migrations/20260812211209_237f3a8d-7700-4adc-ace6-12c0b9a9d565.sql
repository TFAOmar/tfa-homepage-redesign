GRANT INSERT ON public.prequalification_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.prequalification_applications TO authenticated;
GRANT ALL ON public.prequalification_applications TO service_role;

DROP POLICY IF EXISTS "Anyone can submit prequalification" ON public.prequalification_applications;
CREATE POLICY "Anyone can submit prequalification"
ON public.prequalification_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (status IN ('draft','submitted'));