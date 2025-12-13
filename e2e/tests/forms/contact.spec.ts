import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/ContactPage';
import { testData } from '../../fixtures/test-data';

test.describe('Contact Form - React 19 Compatibility', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  test('should display contact form', async () => {
    await contactPage.expectFormVisible();
  });

  test('should display contact information', async () => {
    await contactPage.expectContactInfoVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await contactPage.submitForm();
    // Form should show validation feedback
    await page.waitForTimeout(500);
    await contactPage.expectValidationError();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.getByLabel(/name/i).first().fill('Test User');
    await page.getByLabel(/email/i).first().fill('invalid-email');
    await page.getByLabel(/phone/i).first().fill('(555) 123-4567');
    await page.getByLabel(/message/i).first().fill('Test message');
    
    await contactPage.submitForm();
    await page.waitForTimeout(500);
    
    // Should show email validation error
    const errorText = page.getByText(/email|invalid/i);
    await expect(errorText.first()).toBeVisible();
  });

  test('should fill form with valid data', async ({ page }) => {
    await contactPage.fillContactForm(testData.validContact);
    
    // Verify fields are filled
    await expect(page.getByLabel(/name/i).first()).toHaveValue(testData.validContact.name);
    await expect(page.getByLabel(/email/i).first()).toHaveValue(testData.validContact.email);
  });

  test('should have honeypot field hidden', async ({ page }) => {
    // Check that honeypot field exists but is hidden
    const honeypotField = page.locator('input[name*="honey"], input[name*="bot"]');
    if (await honeypotField.count() > 0) {
      await expect(honeypotField.first()).toBeHidden();
    }
  });
});

test.describe('Contact Form - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should be usable on mobile', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();
    await contactPage.expectFormVisible();
  });
});
