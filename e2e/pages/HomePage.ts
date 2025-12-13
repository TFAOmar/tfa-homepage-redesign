import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async getHeroHeading() {
    return this.page.locator('section').first().locator('h1');
  }

  async clickBookConsultation() {
    await this.page.getByRole('link', { name: /book consultation/i }).first().click();
  }

  async expectHeroVisible() {
    await expect(this.page.locator('section').first()).toBeVisible();
  }

  async expectTrustStripVisible() {
    // Check for carrier logos section
    const carrierSection = this.page.locator('img[alt*="logo"], img[alt*="Logo"]').first();
    await expect(carrierSection).toBeVisible();
  }

  async expectServicesVisible() {
    await expect(this.page.getByText(/our services/i).first()).toBeVisible();
  }

  async expectProcessVisible() {
    await expect(this.page.getByText(/our process/i).first()).toBeVisible();
  }

  async expectAdvisorPreviewVisible() {
    await expect(this.page.getByText(/meet our advisors/i).first()).toBeVisible();
  }

  async expectFooterVisible() {
    await expect(this.page.locator('footer')).toBeVisible();
  }

  async scrollToSection(sectionText: string) {
    await this.page.getByText(sectionText).first().scrollIntoViewIfNeeded();
  }
}
