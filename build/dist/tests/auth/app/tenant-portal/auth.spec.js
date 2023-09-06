// const { test, expect } =require('@playwright/test');
// const { credentials } = require('../../app.config');


// test('tenant', async ({ page }) => {
//   await page.goto(credentials.tenantportal.baseURL+'/auth/login');

//   await page.getByPlaceholder('Enter your email address').click();
//   await page.getByPlaceholder('Enter your email address').fill(credentials.tenantportal.username);

//   await page.getByPlaceholder('Enter your password').click();
//   await page.getByPlaceholder('Enter your password').fill(credentials.tenantportal.password); 
//   await page.getByRole('button', { name: 'Sign in' }).click();

//   await page.waitForLoadState('networkidle');
//   await expect(page).toHaveURL(/.*altayer.stage2tenant.facilio.in/);
//   await expect(page).not.toHaveURL('error');
//   await page.getByRole('link', { name: 'Dashboard' }).click();

//   // const response = await page.waitForResponse((res) => {

//   //   if (res.url().includes("https://altayer.stage2tenant.facilio.in/")) {
//   //     return res.url().startsWith("https://altayer.stage2tenant.facilio.in/");
//   //   }
//   // });


// });