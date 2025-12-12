-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create form_submissions table for storing all form submissions
CREATE TABLE public.form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL,
  form_data jsonb NOT NULL,
  email text,
  name text,
  phone text,
  status text DEFAULT 'new',
  notes text,
  source text,
  partner text,
  advisor text,
  email_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (so forms work without auth)
CREATE POLICY "Anyone can submit forms"
ON public.form_submissions
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can read submissions (for future admin dashboard)
CREATE POLICY "Authenticated users can view submissions"
ON public.form_submissions
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update submissions
CREATE POLICY "Authenticated users can update submissions"
ON public.form_submissions
FOR UPDATE
TO authenticated
USING (true);

-- Create indexes for common queries
CREATE INDEX idx_form_submissions_form_type ON public.form_submissions(form_type);
CREATE INDEX idx_form_submissions_created_at ON public.form_submissions(created_at DESC);
CREATE INDEX idx_form_submissions_status ON public.form_submissions(status);
CREATE INDEX idx_form_submissions_advisor ON public.form_submissions(advisor);
CREATE INDEX idx_form_submissions_partner ON public.form_submissions(partner);

-- Create updated_at trigger
CREATE TRIGGER update_form_submissions_updated_at
BEFORE UPDATE ON public.form_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();