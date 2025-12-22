-- Create storage bucket for business card headshot uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('business-card-uploads', 'business-card-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload files to the bucket (for order submissions)
CREATE POLICY "Anyone can upload business card files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'business-card-uploads');

-- Allow public access to view uploaded files (for admin/design team)
CREATE POLICY "Business card files are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'business-card-uploads');