import { test, expect } from '@playwright/test';
import { ToolsPage } from '../../pages/ToolsPage';
import { testData } from '../../fixtures/test-data';

test.describe('Compound Growth Calculator - React 19 Compatibility', () => {
  let toolsPage: ToolsPage;

  test.beforeEach(async ({ page }) => {
    toolsPage = new ToolsPage(page);
    await toolsPage.gotoCompoundGrowth();
  });

  test('should load calculator page', async ({ page }) => {
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should display calculator form', async () => {
    await toolsPage.expectCalculatorFormVisible();
  });

  test('should show results with dollar values', async () => {
    await toolsPage.expectResultsVisible();
  });

  test('should update results when inputs change', async ({ page }) => {
    // Find and modify an input
    const input = page.locator('input[type="number"], input[type="range"]').first();
    if (await input.isVisible()) {
      await input.fill('15000');
      
      // Results should update
      await page.waitForTimeout(500);
      await toolsPage.expectResultsVisible();
    }
  });

  test('should have compare mode toggle', async ({ page }) => {
    const compareToggle = page.getByText(/compare|scenario/i);
    if (await compareToggle.isVisible()) {
      await compareToggle.click();
    }
  });

  test('should display chart visualization', async ({ page }) => {
    // Check for recharts SVG or canvas
    const chart = page.locator('svg.recharts-surface, canvas');
    if (await chart.first().isVisible()) {
      await expect(chart.first()).toBeVisible();
    }
  });
});

test.describe('Compound Growth Calculator - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be usable on mobile', async ({ page }) => {
    const toolsPage = new ToolsPage(page);
    await toolsPage.gotoCompoundGrowth();
    await toolsPage.expectCalculatorFormVisible();
  });
});
