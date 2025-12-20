INSERT INTO public.system_settings (key, value, description)
VALUES (
  'manny_pipedrive_user_id',
  '20563685',
  'Default Pipedrive User ID for Manny Soto - used for lead routing when no specific advisor is matched'
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();