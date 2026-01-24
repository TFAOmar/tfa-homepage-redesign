-- Drop the overly-broad policy that blocks ALL anonymous uploads
DROP POLICY IF EXISTS "Anonymous users cannot upload to advisor photos" ON storage.objects;