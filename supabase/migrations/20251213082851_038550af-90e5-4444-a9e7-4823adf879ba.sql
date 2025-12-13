-- Create the advisor-photos storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'advisor-photos',
  'advisor-photos',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- RLS Policy: Anyone can upload photos (for onboarding form)
CREATE POLICY "Anyone can upload advisor photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'advisor-photos');

-- RLS Policy: Anyone can view photos (public bucket)
CREATE POLICY "Anyone can view advisor photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'advisor-photos');

-- RLS Policy: Only admins can delete photos
CREATE POLICY "Admins can delete advisor photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'advisor-photos' AND public.has_role(auth.uid(), 'admin'));

-- RLS Policy: Only admins can update photos
CREATE POLICY "Admins can update advisor photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'advisor-photos' AND public.has_role(auth.uid(), 'admin'));