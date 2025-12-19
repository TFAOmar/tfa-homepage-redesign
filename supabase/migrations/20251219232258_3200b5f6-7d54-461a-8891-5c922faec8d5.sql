-- Add resume_token and resume_email columns to life_insurance_applications
ALTER TABLE public.life_insurance_applications 
ADD COLUMN resume_token TEXT UNIQUE,
ADD COLUMN resume_email TEXT;

-- Create index for faster resume token lookups
CREATE INDEX idx_life_insurance_applications_resume_token 
ON public.life_insurance_applications(resume_token) 
WHERE resume_token IS NOT NULL;