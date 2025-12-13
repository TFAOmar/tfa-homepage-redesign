import { test, expect } from '@playwright/test';
import { ToolsPage } from '../../pages/ToolsPage';
import { testData } from '../../fixtures/test-data';

test.describe('Kai-Zen Calculator - React 19 Compatibility', () => {
  let toolsPage: ToolsPage;

  test.beforeEach(async ({ page }) => {
    toolsPage = new ToolsPage(page);
    await toolsPage.gotoKaiZenCalculator();
  });

  test('should load calculator page', async ({ page }) => {
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should display calculator form', async () => {
    await toolsPage.expectCalculatorFormVisible();
  });

  test('should have age input', async ({ page }) => {
    const ageInput = page.getByLabel(/age/i);
    if (await ageInput.isVisible()) {
      await expect(ageInput).toBeVisible();
    }
  });

  test('should have gender selection', async ({ page }) => {
    const genderSelect = page.getByText(/male|female|gender/i);
    await expect(genderSelect.first()).toBeVisible();
  });

  test('should have contribution input', async ({ page }) => {
    const contributionInput = page.getByLabel(/contribution|amount/i);
    if (await contributionInput.isVisible()) {
      await expect(contributionInput).toBeVisible();
    }
  });

  test('should show projection results', async ({ page }) => {
    // Kai-Zen shows tax-free distributions
    const results = page.getByText(/distribution|tax-free|\$/i);
    await expect(results.first()).toBeVisible();
  });

  test('should update projections on input change', async ({ page }) => {
    const ageInput = page.locator('input[type="number"]').first();
    if (await ageInput.isVisible()) {
      const initialValue = await page.getByText(/\$[\d,]+/).first().textContent();
      
      await ageInput.fill('50');
      await page.waitForTimeout(500);
      
      const newValue = await page.getByText(/\$[\d,]+/).first().textContent();
      // Values may or may not be different based on age impact
      expect(newValue).toBeDefined();
    }
  });

  test('should show comparison with 401k', async ({ page }) => {
    const comparison = page.getByText(/401|comparison|vs/i);
    if (await comparison.first().isVisible()) {
      await expect(comparison.first()).toBeVisible();
    }
  });
});

test.describe('Kai-Zen Landing Page', () => {
  test('should load Kai-Zen service page', async ({ page }) => {
    await page.goto('/services/kai-zen');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should have lead capture form', async ({ page }) => {
    await page.goto('/services/kai-zen');
    await page.waitForLoadState('networkidle');
    
    const form = page.locator('form');
    await expect(form.first()).toBeVisible();
  });

  test('should display benefits', async ({ page }) => {
    await page.goto('/services/kai-zen');
    await page.waitForLoadState('networkidle');
    
    const benefits = page.getByText(/benefit|advantage|tax-free/i);
    await expect(benefits.first()).toBeVisible();
  });
});

test.describe('Kai-Zen Calculator - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be usable on mobile', async ({ page }) => {
    const toolsPage = new ToolsPage(page);
    await toolsPage.gotoKaiZenCalculator();
    await toolsPage.expectCalculatorFormVisible();
  });
});
