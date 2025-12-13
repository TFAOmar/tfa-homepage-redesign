import { Page, expect } from '@playwright/test';

export class ToolsPage {
  constructor(private page: Page) {}

  async gotoToolsHub() {
    await this.page.goto('/tools');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoCompoundGrowth() {
    await this.page.goto('/tools/compound-growth');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoRetirementIncome() {
    await this.page.goto('/tools/retirement-income');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoTaxImpact() {
    await this.page.goto('/tools/tax-impact');
    await this.page.waitForLoadState('networkidle');
  }

  async gotoKaiZenCalculator() {
    await this.page.goto('/tools/kai-zen-calculator');
    await this.page.waitForLoadState('networkidle');
  }

  async expectToolCardsVisible() {
    const cards = this.page.locator('[class*="card"]');
    await expect(cards.first()).toBeVisible();
  }

  async expectCalculatorFormVisible() {
    await expect(this.page.locator('input[type="number"], input[type="range"]').first()).toBeVisible();
  }

  async expectResultsVisible() {
    await expect(this.page.getByText(/\$/)).toBeVisible();
  }

  async fillSliderValue(label: string, value: number) {
    const slider = this.page.getByLabel(label);
    if (await slider.isVisible()) {
      await slider.fill(value.toString());
    }
  }

  async fillInputValue(label: string, value: number) {
    const input = this.page.getByLabel(label);
    if (await input.isVisible()) {
      await input.fill(value.toString());
    }
  }

  async clickCalculate() {
    const button = this.page.getByRole('button', { name: /calculate/i });
    if (await button.isVisible()) {
      await button.click();
    }
  }
}
