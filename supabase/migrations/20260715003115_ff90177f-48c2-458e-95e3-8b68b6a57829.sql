
-- Restrict INSERT on public storage buckets so anonymous uploaders can only
-- write to a random UUID-prefixed folder with an image extension. This
-- prevents overwriting existing objects (defacement) and blocks arbitrary
-- file uploads to well-known paths.

-- business-card-uploads
DROP POLICY IF EXISTS "Anyone can upload business card files" ON storage.objects;
CREATE POLICY "Anyone can upload business card files"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'business-card-uploads'
    AND (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    AND lower(name) ~ '\.(jpe?g|png|webp|gif|avif|heic|heif)$'
  );

-- event-images
DROP POLICY IF EXISTS "Anyone can upload event images" ON storage.objects;
CREATE POLICY "Anyone can upload event images"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'event-images'
    AND (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    AND lower(name) ~ '\.(jpe?g|png|webp|svg|gif|avif)$'
  );

-- sponsor-logos
DROP POLICY IF EXISTS "Anyone can upload sponsor logos" ON storage.objects;
CREATE POLICY "Anyone can upload sponsor logos"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'sponsor-logos'
    AND (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    AND lower(name) ~ '\.(jpe?g|png|webp|svg|gif|avif)$'
  );
