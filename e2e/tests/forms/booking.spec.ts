import { test, expect } from '@playwright/test';

test.describe('Booking Flow - React 19 Compatibility', () => {
  test('should load booking page', async ({ page }) => {
    await page.goto('/book-consultation');
    await page.waitForLoadState('networkidle');
    
    // Check page loaded
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should display booking information', async ({ page }) => {
    await page.goto('/book-consultation');
    await page.waitForLoadState('networkidle');
    
    // Check for what to expect section or similar content
    const content = page.getByText(/consultation|booking|schedule/i);
    await expect(content.first()).toBeVisible();
  });

  test('should have working CTA from homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Click Book Consultation
    await page.getByRole('link', { name: /book consultation/i }).first().click();
    
    await expect(page).toHaveURL(/book-consultation/);
  });
});

test.describe('Thank You Page', () => {
  test('should display thank you content', async ({ page }) => {
    await page.goto('/thank-you');
    await page.waitForLoadState('networkidle');
    
    // Should show confirmation message
    const thankYouText = page.getByText(/thank you|submitted|received/i);
    await expect(thankYouText.first()).toBeVisible();
  });
});
