-- Drop the overly permissive RLS policy that exposes PII (email, phone)
-- Public access will continue through the secure public_advisors view and RPC functions
DROP POLICY IF EXISTS "Anyone can view published advisors" ON public.dynamic_advisors;