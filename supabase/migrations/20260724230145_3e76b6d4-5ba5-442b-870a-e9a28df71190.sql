ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_funnel_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_funnel_check CHECK (funnel IN ('protect', 'trust', 'newsletter'));