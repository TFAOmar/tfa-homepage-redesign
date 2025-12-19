-- Create enum for application status
CREATE TYPE public.application_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'needs_info', 'rejected');

-- Create life insurance applications table
CREATE TABLE public.life_insurance_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  advisor_id TEXT,
  advisor_name TEXT,
  advisor_email TEXT,
  applicant_name TEXT,
  applicant_email TEXT,
  applicant_phone TEXT,
  status application_status NOT NULL DEFAULT 'draft',
  current_step INTEGER NOT NULL DEFAULT 1,
  form_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.life_insurance_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to submit applications (public form)
CREATE POLICY "Anyone can submit applications"
ON public.life_insurance_applications
FOR INSERT
WITH CHECK (true);

-- Create policy for admins to view all applications
CREATE POLICY "Admins can view all applications"
ON public.life_insurance_applications
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for admins to update applications
CREATE POLICY "Admins can update applications"
ON public.life_insurance_applications
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for admins to delete applications
CREATE POLICY "Admins can delete applications"
ON public.life_insurance_applications
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_life_insurance_applications_updated_at
BEFORE UPDATE ON public.life_insurance_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();