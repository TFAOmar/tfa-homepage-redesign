-- Create sponsorship_leads table for storing sponsor applications
CREATE TABLE public.sponsorship_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website_social TEXT,
  sponsorship_package TEXT NOT NULL CHECK (sponsorship_package IN ('title', 'supporting', 'community')),
  industry TEXT NOT NULL,
  promotion_details TEXT,
  needs_power_internet BOOLEAN DEFAULT false,
  logo_url TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'declined')),
  source_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sponsorship_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Allow anonymous insert sponsorship_leads"
ON public.sponsorship_leads
FOR INSERT
WITH CHECK (true);

-- Only admins can view/update (using has_role function)
CREATE POLICY "Admins can view sponsorship_leads"
ON public.sponsorship_leads
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sponsorship_leads"
ON public.sponsorship_leads
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for sponsor logos
INSERT INTO storage.buckets (id, name, public) VALUES ('sponsor-logos', 'sponsor-logos', true);

-- Storage policies for sponsor logos
CREATE POLICY "Anyone can upload sponsor logos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'sponsor-logos');

CREATE POLICY "Anyone can view sponsor logos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'sponsor-logos');

-- Trigger for updated_at
CREATE TRIGGER update_sponsorship_leads_updated_at
BEFORE UPDATE ON public.sponsorship_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();