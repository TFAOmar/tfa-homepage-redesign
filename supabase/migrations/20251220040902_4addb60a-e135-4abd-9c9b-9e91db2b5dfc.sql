-- Add SELECT policy for draft applications
CREATE POLICY "Anyone can view draft applications"
  ON life_insurance_applications
  FOR SELECT
  USING (status = 'draft');

-- Add UPDATE policy for draft applications
CREATE POLICY "Anyone can update draft applications"
  ON life_insurance_applications
  FOR UPDATE
  USING (status = 'draft')
  WITH CHECK (status IN ('draft', 'submitted'));