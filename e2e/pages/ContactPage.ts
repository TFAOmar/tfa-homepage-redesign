import { Page, expect } from '@playwright/test';
import { testData } from '../fixtures/test-data';

export class ContactPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/contact');
    await this.page.waitForLoadState('networkidle');
  }

  async fillContactForm(data: typeof testData.validContact) {
    await this.page.getByLabel(/name/i).first().fill(data.name);
    await this.page.getByLabel(/email/i).first().fill(data.email);
    await this.page.getByLabel(/phone/i).first().fill(data.phone);
    await this.page.getByLabel(/message/i).first().fill(data.message);
  }

  async submitForm() {
    await this.page.getByRole('button', { name: /send|submit/i }).click();
  }

  async expectFormVisible() {
    await expect(this.page.getByLabel(/name/i).first()).toBeVisible();
    await expect(this.page.getByLabel(/email/i).first()).toBeVisible();
  }

  async expectValidationError() {
    await expect(this.page.getByText(/required|invalid|please/i).first()).toBeVisible();
  }

  async expectContactInfoVisible() {
    await expect(this.page.getByText(/888.*350.*5396/)).toBeVisible();
  }
}
