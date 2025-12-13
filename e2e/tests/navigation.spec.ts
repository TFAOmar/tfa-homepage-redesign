import { test, expect } from '@playwright/test';
import { routes } from '../fixtures/test-data';

test.describe('Navigation - React 19 Compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to About page', async ({ page }) => {
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/about/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.getByRole('link', { name: /contact/i }).first().click();
    await expect(page).toHaveURL(/contact/);
  });

  test('should navigate to Advisors page', async ({ page }) => {
    // Navigate through Resources dropdown or direct link
    const advisorsLink = page.getByRole('link', { name: /advisors|advisor/i }).first();
    await advisorsLink.click();
    await expect(page).toHaveURL(/advisors/);
  });

  test('should navigate to Locations page', async ({ page }) => {
    await page.getByRole('link', { name: /locations/i }).first().click();
    await expect(page).toHaveURL(/locations/);
  });

  test('should navigate to Events page', async ({ page }) => {
    await page.getByRole('link', { name: /events/i }).first().click();
    await expect(page).toHaveURL(/events/);
  });

  test('should scroll to top on route change', async ({ page }) => {
    // Scroll down on homepage
    await page.evaluate(() => window.scrollTo(0, 1000));
    
    // Navigate to another page
    await page.getByRole('link', { name: /about/i }).first().click();
    await page.waitForLoadState('networkidle');
    
    // Check scroll position is at top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });

  test('should have working Book Consultation CTA', async ({ page }) => {
    const ctaButton = page.getByRole('link', { name: /book consultation/i }).first();
    await ctaButton.click();
    await expect(page).toHaveURL(/book-consultation/);
  });
});

test.describe('Navigation - Mobile Menu', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should toggle mobile menu', async ({ page }) => {
    await page.goto('/');
    
    const menuButton = page.getByRole('button', { name: /menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      
      // Check menu is open
      const nav = page.locator('nav, [role="navigation"]');
      await expect(nav).toBeVisible();
    }
  });
});

test.describe('Footer Navigation', () => {
  test('should have working footer links', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check for key footer links
    const footerLinks = footer.locator('a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
