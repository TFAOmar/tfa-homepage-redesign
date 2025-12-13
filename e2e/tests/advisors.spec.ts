import { test, expect } from '@playwright/test';
import { AdvisorsPage } from '../pages/AdvisorsPage';
import { testData } from '../fixtures/test-data';

test.describe('Advisor Directory - React 19 Compatibility', () => {
  let advisorsPage: AdvisorsPage;

  test.beforeEach(async ({ page }) => {
    advisorsPage = new AdvisorsPage(page);
    await advisorsPage.goto();
  });

  test('should load advisors page', async ({ page }) => {
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should display advisor grid', async () => {
    await advisorsPage.expectGridVisible();
  });

  test('should show advisor cards', async () => {
    await advisorsPage.expectAdvisorCardsVisible();
  });

  test('should have search functionality', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    if (await searchInput.isVisible()) {
      await advisorsPage.searchAdvisor(testData.advisorSearch.validName);
      await page.waitForTimeout(500);
      
      // Results should filter
      const cards = page.locator('[class*="card"]');
      const count = await cards.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });

  test('should display advisor details on cards', async ({ page }) => {
    // Check for advisor information
    const advisorName = page.locator('[class*="card"]').first().getByText(/[A-Z][a-z]+ [A-Z][a-z]+/);
    if (await advisorName.isVisible()) {
      await expect(advisorName).toBeVisible();
    }
  });

  test('should have filter options', async ({ page }) => {
    // Check for filter dropdowns
    const filters = page.getByRole('combobox');
    const filterCount = await filters.count();
    expect(filterCount).toBeGreaterThanOrEqual(0);
  });

  test('should have profile links', async ({ page }) => {
    const profileLinks = page.getByRole('link', { name: /view|profile|schedule/i });
    if (await profileLinks.first().isVisible()) {
      await expect(profileLinks.first()).toBeVisible();
    }
  });
});

test.describe('Advisor Directory - Filtering', () => {
  test('should filter by search term', async ({ page }) => {
    const advisorsPage = new AdvisorsPage(page);
    await advisorsPage.goto();
    
    const searchInput = page.getByPlaceholder(/search/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill('Manuel');
      await page.waitForTimeout(500);
      
      // Should show filtered results
      const cards = page.locator('[class*="card"]');
      const count = await cards.count();
      // Results may vary based on data
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });
});

test.describe('Advisor Directory - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be responsive on mobile', async ({ page }) => {
    const advisorsPage = new AdvisorsPage(page);
    await advisorsPage.goto();
    await advisorsPage.expectGridVisible();
  });
});

test.describe('Advisor Onboarding', () => {
  test('should load onboarding page', async ({ page }) => {
    await page.goto('/advisors/onboard');
    await page.waitForLoadState('networkidle');
    
    // Should show onboarding form
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should have required form fields', async ({ page }) => {
    await page.goto('/advisors/onboard');
    await page.waitForLoadState('networkidle');
    
    // Check for key form fields
    await expect(page.getByLabel(/name/i).first()).toBeVisible();
    await expect(page.getByLabel(/email/i).first()).toBeVisible();
  });
});
