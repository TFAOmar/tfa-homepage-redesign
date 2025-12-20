-- Create system_settings table for Manny Soto defaults and other config
CREATE TABLE IF NOT EXISTS public.system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on system_settings
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for system_settings - admin only
CREATE POLICY "Admins can view system settings"
ON public.system_settings
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert system settings"
ON public.system_settings
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update system settings"
ON public.system_settings
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete system settings"
ON public.system_settings
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Allow edge functions to read system_settings (for Manny defaults)
CREATE POLICY "Service role can read system settings"
ON public.system_settings
FOR SELECT
USING (auth.role() = 'service_role');

-- Create pipedrive_custom_fields cache table
CREATE TABLE IF NOT EXISTS public.pipedrive_custom_fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL CHECK (entity_type IN ('person', 'deal', 'lead', 'organization')),
  field_name text NOT NULL,
  pipedrive_key text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(entity_type, field_name)
);

-- Enable RLS on pipedrive_custom_fields
ALTER TABLE public.pipedrive_custom_fields ENABLE ROW LEVEL SECURITY;

-- RLS policies for pipedrive_custom_fields
CREATE POLICY "Admins can view custom fields"
ON public.pipedrive_custom_fields
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage custom fields"
ON public.pipedrive_custom_fields
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can manage custom fields"
ON public.pipedrive_custom_fields
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Extend form_submissions with new columns
ALTER TABLE public.form_submissions 
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS preferred_language text,
ADD COLUMN IF NOT EXISTS state_location text,
ADD COLUMN IF NOT EXISTS source_url text,
ADD COLUMN IF NOT EXISTS utm_source text,
ADD COLUMN IF NOT EXISTS utm_medium text,
ADD COLUMN IF NOT EXISTS utm_campaign text,
ADD COLUMN IF NOT EXISTS utm_content text,
ADD COLUMN IF NOT EXISTS utm_term text,
ADD COLUMN IF NOT EXISTS advisor_slug text,
ADD COLUMN IF NOT EXISTS routing_result text CHECK (routing_result IS NULL OR routing_result IN ('advisor_match', 'default_manny')),
ADD COLUMN IF NOT EXISTS pipedrive_person_id integer,
ADD COLUMN IF NOT EXISTS pipedrive_org_id integer,
ADD COLUMN IF NOT EXISTS pipedrive_deal_id integer,
ADD COLUMN IF NOT EXISTS pipedrive_lead_id text,
ADD COLUMN IF NOT EXISTS pipedrive_owner_id integer,
ADD COLUMN IF NOT EXISTS error_message text;

-- Extend dynamic_advisors with Pipedrive fields
ALTER TABLE public.dynamic_advisors 
ADD COLUMN IF NOT EXISTS pipedrive_user_id integer,
ADD COLUMN IF NOT EXISTS pipedrive_pipeline_id integer,
ADD COLUMN IF NOT EXISTS pipedrive_stage_id integer;

-- Insert default Manny Soto settings (placeholder values - update these with real IDs)
INSERT INTO public.system_settings (key, value, description) VALUES
  ('manny_pipedrive_user_id', '"0"', 'Manny Soto Pipedrive User ID - UPDATE WITH REAL VALUE'),
  ('manny_pipedrive_pipeline_id', '"0"', 'Manny Soto default Pipeline ID - UPDATE WITH REAL VALUE'),
  ('manny_pipedrive_stage_id', '"0"', 'Manny Soto default Stage ID (New Lead) - UPDATE WITH REAL VALUE')
ON CONFLICT (key) DO NOTHING;

-- Create trigger for updated_at on system_settings
CREATE TRIGGER update_system_settings_updated_at
BEFORE UPDATE ON public.system_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for updated_at on pipedrive_custom_fields
CREATE TRIGGER update_pipedrive_custom_fields_updated_at
BEFORE UPDATE ON public.pipedrive_custom_fields
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();