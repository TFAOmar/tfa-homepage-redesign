-- Remove the public SELECT policy from dynamic_advisors table
-- Public access should now go through the public_advisors view
DROP POLICY IF EXISTS "Anyone can view published advisors" ON public.dynamic_advisors;