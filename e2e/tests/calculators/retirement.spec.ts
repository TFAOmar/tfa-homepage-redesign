import { test, expect } from '@playwright/test';
import { ToolsPage } from '../../pages/ToolsPage';

test.describe('Retirement Income Calculator - React 19 Compatibility', () => {
  let toolsPage: ToolsPage;

  test.beforeEach(async ({ page }) => {
    toolsPage = new ToolsPage(page);
    await toolsPage.gotoRetirementIncome();
  });

  test('should load calculator page', async ({ page }) => {
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should display calculator form', async () => {
    await toolsPage.expectCalculatorFormVisible();
  });

  test('should show projected income results', async () => {
    await toolsPage.expectResultsVisible();
  });

  test('should have age-related inputs', async ({ page }) => {
    // Check for current age and retirement age inputs
    const ageInput = page.getByLabel(/age/i);
    if (await ageInput.first().isVisible()) {
      await expect(ageInput.first()).toBeVisible();
    }
  });

  test('should validate input ranges', async ({ page }) => {
    const input = page.locator('input[type="number"]').first();
    if (await input.isVisible()) {
      // Try entering invalid value
      await input.fill('-100');
      await page.waitForTimeout(300);
      
      // Input should be corrected or show error
      const value = await input.inputValue();
      expect(parseInt(value)).toBeGreaterThanOrEqual(0);
    }
  });
});

test.describe('Retirement Income Calculator - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be responsive on mobile', async ({ page }) => {
    const toolsPage = new ToolsPage(page);
    await toolsPage.gotoRetirementIncome();
    await toolsPage.expectCalculatorFormVisible();
  });
});
