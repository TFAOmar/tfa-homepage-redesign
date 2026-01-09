-- Add Braihyra Medellin to dynamic_advisors table
INSERT INTO public.dynamic_advisors (
  name,
  slug,
  email,
  phone,
  title,
  city,
  state,
  region,
  bio,
  specialties,
  licenses,
  years_of_experience,
  status,
  type
) VALUES (
  'Braihyra Medellin',
  'braihyra-medellin',
  'bri@tfainsuranceadvisors.com',
  '(562) 250-8704',
  'Financial Strategist & Licensed Realtor',
  'Whittier',
  'CA',
  'Southern California',
  'Braihyra Medellin specializes in the synergy between Real Estate and Living Trust planning at Big Moves Financial. She helps families protect their assets and plan for the future.',
  ARRAY['Living Trust', 'Estate Planning', 'Real Estate', 'Life Insurance'],
  ARRAY['Life Insurance', 'Real Estate'],
  3,
  'published',
  'Advisor'
);