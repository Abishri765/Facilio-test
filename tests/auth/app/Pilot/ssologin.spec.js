// const { test, expect } =require('@playwright/test');
// const { credentials } =require('../../app.config');

// test('occupant SSO', async ({ page }) => {
//   await page.goto(credentials.occupantportalSSO.baseURL+'/auth/login');

//   await page.getByRole('link', { name: 'Sign in using SAML' }).click();

//   await expect(page).toHaveURL(/closedeal.auth0.com/);


//   await page.locator('a').filter({ hasText: 'Sign in with Google' }).click();
//   await page.getByRole('textbox', { name: 'Email or phone' }).fill(credentials.occupantportalSSO.username);
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('textbox', { name: 'Enter your password' }).fill(credentials.occupantportalSSO.password);
//   await page.getByRole('textbox', { name: 'Enter your password' }).press('Enter');

//   await page.goto('https://pilot.stage2portal.facilio.in/service/home/dashboard');
  
//   await expect(page).toHaveURL(/dashboard/);
//   await expect(page).not.toHaveURL('error');

// });