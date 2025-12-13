import { Page, expect } from '@playwright/test';

export class AdvisorsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/advisors');
    await this.page.waitForLoadState('networkidle');
  }

  async expectGridVisible() {
    await expect(this.page.locator('[class*="grid"]').first()).toBeVisible();
  }

  async expectAdvisorCardsVisible() {
    const cards = this.page.locator('[class*="card"]');
    await expect(cards.first()).toBeVisible();
  }

  async searchAdvisor(name: string) {
    const searchInput = this.page.getByPlaceholder(/search/i);
    await searchInput.fill(name);
  }

  async filterByState(state: string) {
    const stateFilter = this.page.getByRole('combobox').filter({ hasText: /state/i });
    if (await stateFilter.isVisible()) {
      await stateFilter.click();
      await this.page.getByRole('option', { name: state }).click();
    }
  }

  async filterBySpecialty(specialty: string) {
    const specialtyFilter = this.page.getByRole('combobox').filter({ hasText: /specialty/i });
    if (await specialtyFilter.isVisible()) {
      await specialtyFilter.click();
      await this.page.getByRole('option', { name: specialty }).click();
    }
  }

  async getAdvisorCount(): Promise<number> {
    const cards = this.page.locator('[class*="card"]');
    return await cards.count();
  }

  async clickFirstAdvisorProfile() {
    await this.page.getByRole('link', { name: /view|profile/i }).first().click();
  }
}
