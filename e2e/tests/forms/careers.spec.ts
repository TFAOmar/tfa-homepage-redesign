import { test, expect } from '@playwright/test';

test.describe('Careers Page - React 19 Compatibility', () => {
  test('should load careers page', async ({ page }) => {
    await page.goto('/careers');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should display career paths', async ({ page }) => {
    await page.goto('/careers');
    await page.waitForLoadState('networkidle');
    
    // Check for agent and franchise paths
    const agentPath = page.getByText(/agent|advisor/i);
    await expect(agentPath.first()).toBeVisible();
  });

  test('should have inquiry form', async ({ page }) => {
    await page.goto('/careers');
    await page.waitForLoadState('networkidle');
    
    // Check for form elements
    const form = page.locator('form');
    await expect(form.first()).toBeVisible();
  });
});

test.describe('Agent Recruitment Page', () => {
  test('should load agent recruitment page', async ({ page }) => {
    await page.goto('/careers/agent');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should have application form', async ({ page }) => {
    await page.goto('/careers/agent');
    await page.waitForLoadState('networkidle');
    
    const form = page.locator('form');
    await expect(form.first()).toBeVisible();
  });
});

test.describe('Franchise Recruitment Page', () => {
  test('should load franchise recruitment page', async ({ page }) => {
    await page.goto('/careers/franchise');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should have application form', async ({ page }) => {
    await page.goto('/careers/franchise');
    await page.waitForLoadState('networkidle');
    
    const form = page.locator('form');
    await expect(form.first()).toBeVisible();
  });
});
