UPDATE admin_settings 
SET value = '["0", "jose-estrada", "mariah-lorenzen"]'::jsonb,
    updated_at = now()
WHERE key = 'homepage_advisor_ids';