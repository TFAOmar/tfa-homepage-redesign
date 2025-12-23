-- Create enum for estate planning application status
CREATE TYPE estate_planning_status AS ENUM ('draft', 'submitted', 'in_review', 'completed');

-- Create estate_planning_applications table
CREATE TABLE public.estate_planning_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Applicant quick-access fields
  applicant_name TEXT,
  applicant_email TEXT,
  applicant_phone TEXT,
  spouse_name TEXT,
  
  -- Advisor routing
  advisor_id TEXT,
  advisor_name TEXT,
  advisor_email TEXT,
  
  -- Status
  status estate_planning_status NOT NULL DEFAULT 'draft',
  current_step INTEGER NOT NULL DEFAULT 1,
  
  -- Source tracking
  source_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.estate_planning_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can submit applications" ON public.estate_planning_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all applications" ON public.estate_planning_applications
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update applications" ON public.estate_planning_applications
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete applications" ON public.estate_planning_applications
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_estate_planning_applications_updated_at
  BEFORE UPDATE ON public.estate_planning_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();