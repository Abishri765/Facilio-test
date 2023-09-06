// const { test, expect } =require('@playwright/test');
// const { credentials } = require('../../app.config');

// test('occupant passwordLogin', async ({ page }) => {
//   await page.goto(credentials.occupantportal.baseURL+'/auth/login');
// // Gets username and password
//   await page.getByPlaceholder('Enter your email address').fill(credentials.occupantportal.username);
//   await page.getByPlaceholder('Enter your password').click();
//   await page.getByPlaceholder('Enter your password').fill(credentials.occupantportal.password);

//   await page.getByRole('button', { name: 'Sign in' }).click();
//   await page.getByPlaceholder('Enter your password').press('Enter');

//   await page.waitForLoadState('networkidle');

//   await expect(page).toHaveURL(/.*pilot.stage2vendor.facilio.in/);

//   await expect(page).not.toHaveURL('error');

// });