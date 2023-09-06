// const { test, expect, devices }=  require('@playwright/test');
// const { credentials } = require('../../app.config');

// test.use({
//   ...devices['iPhone 11'],
// });

// test('workq', async ({ page }) => {

//   await page.goto(credentials.workq.baseURL+'/auth/login');

//   await page.getByPlaceholder('Enter your email address').click();
//   await page.getByPlaceholder('Enter your email address').fill(credentials.workq.username);

//   await page.getByPlaceholder('Enter your email address').press('Enter');

//   await page.getByPlaceholder('Enter your password').fill(credentials.workq.password);
//   await page.getByPlaceholder('Enter your password').press('Enter');

//   await expect(page).toHaveURL(/.maintenance/);
//   await expect(page).not.toHaveURL('error');

// });