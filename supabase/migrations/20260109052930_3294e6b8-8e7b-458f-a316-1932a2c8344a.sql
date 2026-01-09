-- Update the check constraint on form_submissions to allow 'advisor_direct' routing result
ALTER TABLE public.form_submissions 
DROP CONSTRAINT IF EXISTS form_submissions_routing_result_check;

ALTER TABLE public.form_submissions 
ADD CONSTRAINT form_submissions_routing_result_check 
CHECK (routing_result IS NULL OR routing_result = ANY (ARRAY['advisor_match', 'default_manny', 'advisor_direct']));