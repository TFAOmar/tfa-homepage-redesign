-- Add directory visibility and ordering settings
INSERT INTO admin_settings (key, value) VALUES 
  ('directory_hidden_ids', '[]'::jsonb),
  ('directory_advisor_order', '[]'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Add RLS policy for public read access to these new settings
CREATE POLICY "Anyone can read directory settings" 
ON admin_settings 
FOR SELECT 
USING (key = ANY (ARRAY['directory_hidden_ids'::text, 'directory_advisor_order'::text]));