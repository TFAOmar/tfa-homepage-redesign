-- Create enums for advisor status and type
CREATE TYPE advisor_status AS ENUM ('pending', 'published', 'hidden', 'archived');
CREATE TYPE advisor_type AS ENUM ('Advisor', 'Broker');

-- Create dynamic_advisors table
CREATE TABLE public.dynamic_advisors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  type advisor_type NOT NULL DEFAULT 'Advisor',
  email text NOT NULL,
  phone text NOT NULL,
  state text NOT NULL,
  city text NOT NULL,
  region text NOT NULL,
  bio text NOT NULL,
  passionate_bio text,
  specialties text[] NOT NULL DEFAULT '{}',
  licenses text[] NOT NULL DEFAULT '{}',
  years_of_experience int NOT NULL DEFAULT 0,
  image_url text,
  scheduling_link text,
  status advisor_status NOT NULL DEFAULT 'pending',
  display_priority int,
  rejection_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create admin_settings table
CREATE TABLE public.admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.dynamic_advisors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for dynamic_advisors
-- Anyone can submit an advisor profile (onboarding)
CREATE POLICY "Anyone can submit advisor profile"
ON public.dynamic_advisors
FOR INSERT
WITH CHECK (true);

-- Anyone can view published advisors
CREATE POLICY "Anyone can view published advisors"
ON public.dynamic_advisors
FOR SELECT
USING (status = 'published');

-- Admins can view all advisors
CREATE POLICY "Admins can view all advisors"
ON public.dynamic_advisors
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Admins can update advisors
CREATE POLICY "Admins can update advisors"
ON public.dynamic_advisors
FOR UPDATE
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Admins can delete advisors
CREATE POLICY "Admins can delete advisors"
ON public.dynamic_advisors
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- RLS policies for admin_settings
-- Admins can view settings
CREATE POLICY "Admins can view settings"
ON public.admin_settings
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Admins can update settings
CREATE POLICY "Admins can update settings"
ON public.admin_settings
FOR UPDATE
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Admins can insert settings
CREATE POLICY "Admins can insert settings"
ON public.admin_settings
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Anyone can read admin settings (for homepage advisor display)
CREATE POLICY "Anyone can read homepage settings"
ON public.admin_settings
FOR SELECT
USING (key IN ('homepage_advisor_ids', 'homepage_advisor_count'));

-- Seed default admin settings
INSERT INTO public.admin_settings (key, value) VALUES 
  ('admin_approval_enabled', 'false'),
  ('homepage_advisor_ids', '[]'),
  ('homepage_advisor_count', '3');

-- Create trigger for updated_at
CREATE TRIGGER update_dynamic_advisors_updated_at
BEFORE UPDATE ON public.dynamic_advisors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at
BEFORE UPDATE ON public.admin_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();