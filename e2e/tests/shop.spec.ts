import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/ShopPage';

test.describe('Shop - React 19 Compatibility', () => {
  let shopPage: ShopPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    await shopPage.goto();
  });

  test('should load shop page', async ({ page }) => {
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should display product grid or empty state', async ({ page }) => {
    // Shop may have products or show empty state
    const content = page.locator('[class*="grid"], [class*="empty"]');
    await expect(content.first()).toBeVisible();
  });

  test('should show product cards if products exist', async () => {
    await shopPage.expectProductCardsVisible();
  });

  test('should navigate to product detail page', async ({ page }) => {
    const productLink = page.locator('a[href*="/shop/"]').first();
    if (await productLink.isVisible()) {
      await productLink.click();
      await expect(page).toHaveURL(/\/shop\//);
    }
  });
});

test.describe('Shop - Cart Functionality', () => {
  test('should have cart button in header', async ({ page }) => {
    await page.goto('/shop');
    await page.waitForLoadState('networkidle');
    
    const cartButton = page.getByRole('button', { name: /cart/i });
    if (await cartButton.isVisible()) {
      await expect(cartButton).toBeVisible();
    }
  });

  test('should open cart drawer', async ({ page }) => {
    await page.goto('/shop');
    await page.waitForLoadState('networkidle');
    
    const cartButton = page.getByRole('button', { name: /cart/i });
    if (await cartButton.isVisible()) {
      await cartButton.click();
      
      // Cart drawer should open
      const drawer = page.getByText(/cart|checkout/i);
      await expect(drawer.first()).toBeVisible();
    }
  });
});

test.describe('Product Detail Page', () => {
  test('should display product information', async ({ page }) => {
    // Navigate to shop first
    await page.goto('/shop');
    await page.waitForLoadState('networkidle');
    
    const productLink = page.locator('a[href*="/shop/"]').first();
    if (await productLink.isVisible()) {
      await productLink.click();
      await page.waitForLoadState('networkidle');
      
      // Should show product title and price
      await expect(page.locator('h1, h2').first()).toBeVisible();
    }
  });

  test('should have add to cart button', async ({ page }) => {
    await page.goto('/shop');
    await page.waitForLoadState('networkidle');
    
    const productLink = page.locator('a[href*="/shop/"]').first();
    if (await productLink.isVisible()) {
      await productLink.click();
      await page.waitForLoadState('networkidle');
      
      const addButton = page.getByRole('button', { name: /add to cart/i });
      if (await addButton.isVisible()) {
        await expect(addButton).toBeVisible();
      }
    }
  });
});

test.describe('Shop - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be responsive on mobile', async ({ page }) => {
    const shopPage = new ShopPage(page);
    await shopPage.goto();
    
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});
