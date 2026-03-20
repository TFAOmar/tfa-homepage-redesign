-- Create sponsorship_events table
CREATE TABLE public.sponsorship_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  timing text NOT NULL,
  event_date date,
  attendees text NOT NULL DEFAULT '100+',
  atmosphere text,
  status text NOT NULL DEFAULT 'available',
  icon text NOT NULL DEFAULT 'Rocket',
  gradient text NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.sponsorship_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active events" ON public.sponsorship_events
  FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Admins can manage events" ON public.sponsorship_events
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create sponsorship_tiers table
CREATE TABLE public.sponsorship_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_id text NOT NULL UNIQUE,
  name text NOT NULL,
  price integer NOT NULL,
  price_note text NOT NULL DEFAULT 'per event',
  stripe_price_id text,
  features text[] NOT NULL DEFAULT '{}',
  highlight text,
  is_popular boolean DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.sponsorship_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active tiers" ON public.sponsorship_tiers
  FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Admins can manage tiers" ON public.sponsorship_tiers
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));