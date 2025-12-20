-- Remove unused pipeline/stage columns from dynamic_advisors
ALTER TABLE public.dynamic_advisors 
DROP COLUMN IF EXISTS pipedrive_pipeline_id,
DROP COLUMN IF EXISTS pipedrive_stage_id;

-- Remove unused deal_id column from form_submissions
ALTER TABLE public.form_submissions 
DROP COLUMN IF EXISTS pipedrive_deal_id;

-- Remove unused system_settings entries
DELETE FROM public.system_settings 
WHERE key IN ('manny_pipedrive_pipeline_id', 'manny_pipedrive_stage_id');