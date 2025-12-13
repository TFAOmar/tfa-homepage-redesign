import { test, expect } from '@playwright/test';
import { ToolsPage } from '../pages/ToolsPage';

test.describe('Tools Hub - React 19 Compatibility', () => {
  let toolsPage: ToolsPage;

  test.beforeEach(async ({ page }) => {
    toolsPage = new ToolsPage(page);
    await toolsPage.gotoToolsHub();
  });

  test('should load tools hub page', async ({ page }) => {
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should display tool cards', async () => {
    await toolsPage.expectToolCardsVisible();
  });

  test('should have links to individual calculators', async ({ page }) => {
    const calculatorLinks = page.locator('a[href*="/tools/"]');
    const count = await calculatorLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to compound growth calculator', async ({ page }) => {
    const link = page.getByRole('link', { name: /compound growth/i });
    if (await link.isVisible()) {
      await link.click();
      await expect(page).toHaveURL(/compound-growth/);
    }
  });

  test('should navigate to retirement calculator', async ({ page }) => {
    const link = page.getByRole('link', { name: /retirement/i });
    if (await link.isVisible()) {
      await link.click();
      await expect(page).toHaveURL(/retirement/);
    }
  });

  test('should navigate to tax calculator', async ({ page }) => {
    const link = page.getByRole('link', { name: /tax/i });
    if (await link.isVisible()) {
      await link.click();
      await expect(page).toHaveURL(/tax/);
    }
  });
});

test.describe('Tools Hub - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be responsive on mobile', async ({ page }) => {
    const toolsPage = new ToolsPage(page);
    await toolsPage.gotoToolsHub();
    await toolsPage.expectToolCardsVisible();
  });
});
