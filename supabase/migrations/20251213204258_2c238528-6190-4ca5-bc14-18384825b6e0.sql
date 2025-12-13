-- Fix storage bucket security: require authentication for uploads
-- Drop the insecure public upload policy
DROP POLICY IF EXISTS "Anyone can upload advisor photos" ON storage.objects;

-- Create secure policy requiring authentication for uploads
CREATE POLICY "Authenticated users can upload advisor photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'advisor-photos');

-- Add explicit DENY policy for anonymous uploads
CREATE POLICY "Anonymous users cannot upload to advisor photos"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (false);