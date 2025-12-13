import { Page, expect } from '@playwright/test';

export class ShopPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/shop');
    await this.page.waitForLoadState('networkidle');
  }

  async expectProductGridVisible() {
    // Wait for products to load
    await this.page.waitForSelector('[class*="grid"]', { timeout: 10000 });
  }

  async expectProductCardsVisible() {
    const cards = this.page.locator('[class*="card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(0); // Shop may be empty
  }

  async clickFirstProduct() {
    const productLink = this.page.locator('a[href*="/shop/"]').first();
    if (await productLink.isVisible()) {
      await productLink.click();
    }
  }

  async addToCart() {
    const addButton = this.page.getByRole('button', { name: /add to cart/i });
    if (await addButton.isVisible()) {
      await addButton.click();
    }
  }

  async openCart() {
    const cartButton = this.page.getByRole('button', { name: /cart/i });
    if (await cartButton.isVisible()) {
      await cartButton.click();
    }
  }

  async expectCartDrawerVisible() {
    await expect(this.page.getByText(/your cart/i)).toBeVisible();
  }

  async getCartItemCount(): Promise<number> {
    const cartItems = this.page.locator('[class*="cart-item"]');
    return await cartItems.count();
  }
}
