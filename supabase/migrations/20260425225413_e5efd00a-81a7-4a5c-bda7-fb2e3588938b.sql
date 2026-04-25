ALTER TABLE public.life_insurance_applications
ADD COLUMN IF NOT EXISTS advisor_notification_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS admin_notification_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS notification_attempts INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_notification_error TEXT;

CREATE INDEX IF NOT EXISTS idx_life_ins_apps_missing_notif
ON public.life_insurance_applications (status, advisor_notification_sent_at, created_at DESC)
WHERE status = 'submitted' AND advisor_notification_sent_at IS NULL;