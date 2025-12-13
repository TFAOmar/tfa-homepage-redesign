import { Page, expect } from '@playwright/test';

export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

export async function waitForHydration(page: Page) {
  // Wait for React to hydrate
  await page.waitForFunction(() => {
    return document.querySelector('#root')?.children.length > 0;
  });
}

export async function checkNoConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}

export async function fillInput(page: Page, selector: string, value: string) {
  await page.locator(selector).fill(value);
}

export async function clickButton(page: Page, text: string) {
  await page.getByRole('button', { name: text }).click();
}

export async function expectToBeVisible(page: Page, selector: string) {
  await expect(page.locator(selector)).toBeVisible();
}

export async function expectHeadingText(page: Page, text: string) {
  await expect(page.getByRole('heading', { name: text })).toBeVisible();
}

export async function scrollToBottom(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

export async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 0));
}

export async function checkAccessibility(page: Page) {
  // Basic accessibility checks
  const images = await page.locator('img').all();
  for (const img of images) {
    const alt = await img.getAttribute('alt');
    expect(alt).not.toBeNull();
  }
}

export async function waitForToast(page: Page, text?: string) {
  const toastSelector = text 
    ? `[data-sonner-toast]:has-text("${text}")`
    : '[data-sonner-toast]';
  await expect(page.locator(toastSelector)).toBeVisible({ timeout: 10000 });
}
