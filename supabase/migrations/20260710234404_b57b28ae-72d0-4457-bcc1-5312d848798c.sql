
CREATE POLICY "Authenticated can read resource files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'resource-library');

CREATE POLICY "Admins can upload resource files"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'resource-library' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update resource files"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'resource-library' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete resource files"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'resource-library' AND public.has_role(auth.uid(), 'admin'));
