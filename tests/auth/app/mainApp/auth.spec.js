// const { test, expect } =require('@playwright/test');
// const {credentials} = require('../../app.config')

// test('main-app passwordLogin', async ({ page }) => {

//   await page.goto(credentials.app.baseURL+'/auth/login');

//   await page.getByPlaceholder('Enter your email address').click();
//   await page.getByPlaceholder('Enter your email address').fill(credentials.app.username);

//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByPlaceholder('Enter your password').fill(credentials.app.password);

//   await page.getByRole('button', { name: 'Sign in' }).click();
//   await expect(page).toHaveURL(/.*stage2.facilio.in/);
//   await expect(page).not.toHaveURL('error');

//   const response = await page.waitForResponse((res) => {

//     if (res.url().includes("https://stage2.facilio.in/")) {
//       return res.url().startsWith("https://stage2.facilio.in/");
//     }

//   });

// });