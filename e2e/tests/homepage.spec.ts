import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { waitForHydration } from '../utils/test-helpers';

test.describe('Homepage - React 19 Compatibility', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should load without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await homePage.goto();
    await waitForHydration(page);
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('404')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('should render hero section with heading', async ({ page }) => {
    const heading = await homePage.getHeroHeading();
    await expect(heading).toBeVisible();
  });

  test('should display trust strip with carrier logos', async () => {
    await homePage.expectTrustStripVisible();
  });

  test('should show services section', async () => {
    await homePage.expectServicesVisible();
  });

  test('should display process steps', async () => {
    await homePage.expectProcessVisible();
  });

  test('should show advisor preview section', async () => {
    await homePage.expectAdvisorPreviewVisible();
  });

  test('should have visible footer', async () => {
    await homePage.expectFooterVisible();
  });

  test('should navigate to book consultation on CTA click', async ({ page }) => {
    await homePage.clickBookConsultation();
    await expect(page).toHaveURL(/book-consultation/);
  });
});

test.describe('Homepage - Mobile Viewport', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should render correctly on mobile', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectHeroVisible();
  });

  test('should show mobile navigation menu', async ({ page }) => {
    await page.goto('/');
    const menuButton = page.getByRole('button', { name: /menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.getByRole('navigation')).toBeVisible();
    }
  });
});
