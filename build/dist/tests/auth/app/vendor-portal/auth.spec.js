// import { test, expect } from '@playwright/test';
// import { credentials } from '../../app.config';

// test('vendor', async ({ page }) => {
//   await page.goto(credentials.vendorportal.baseURL+'/auth/login');

//   await page.getByPlaceholder('Enter your email address').click();
//   await page.getByPlaceholder('Enter your email address').fill(credentials.vendorportal.username);

//   await page.getByPlaceholder('Enter your password').click();
//   await page.getByPlaceholder('Enter your password').fill(credentials.vendorportal.password);
//   await page.getByRole('button', { name: 'Sign in' }).click();

//   await page.waitForLoadState('networkidle');
//   await expect(page).toHaveURL(/.*pilot.stage2vendor.facilio.in/);
//   await expect(page).not.toHaveURL('error');
//   await page.getByRole('link', { name: 'workorder' }).click();

// });

