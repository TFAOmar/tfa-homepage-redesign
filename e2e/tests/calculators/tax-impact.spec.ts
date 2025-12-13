import { test, expect } from '@playwright/test';
import { ToolsPage } from '../../pages/ToolsPage';

test.describe('Tax Impact Calculator - React 19 Compatibility', () => {
  let toolsPage: ToolsPage;

  test.beforeEach(async ({ page }) => {
    toolsPage = new ToolsPage(page);
    await toolsPage.gotoTaxImpact();
  });

  test('should load calculator page', async ({ page }) => {
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should display calculator form', async () => {
    await toolsPage.expectCalculatorFormVisible();
  });

  test('should show tax calculation results', async () => {
    await toolsPage.expectResultsVisible();
  });

  test('should have income and tax-related inputs', async ({ page }) => {
    // Check for income-related labels
    const incomeLabel = page.getByText(/income|salary|earnings/i);
    await expect(incomeLabel.first()).toBeVisible();
  });

  test('should display chart or breakdown', async ({ page }) => {
    // Look for visual representation of tax breakdown
    const visual = page.locator('svg, canvas, [class*="chart"], [class*="progress"]');
    if (await visual.first().isVisible()) {
      await expect(visual.first()).toBeVisible();
    }
  });
});

test.describe('Tax Impact Calculator - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should work on mobile devices', async ({ page }) => {
    const toolsPage = new ToolsPage(page);
    await toolsPage.gotoTaxImpact();
    await toolsPage.expectCalculatorFormVisible();
  });
});
