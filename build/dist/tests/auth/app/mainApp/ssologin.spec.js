// const { test, expect } = require('@playwright/test');
// const { credentials } = require('../../app.config');


//   test('main-app SSO', async ({ page }) => {
//     await page.goto(credentials.app.baseURL+'/auth/login');

//     await page.getByPlaceholder('Enter your email address').click();
//     await page.getByPlaceholder('Enter your email address').fill('abirami+sso@facilio.com');
//     await page.getByRole('button', { name: 'Next' }).click();

//     await expect(page).toHaveURL(/.*auth0/);
    

//     await page.getByLabel('Email address').click();
//     await page.getByLabel('Email address').fill('abirami+sso@facilio.com');

//     await page.getByLabel('Password').click();
//     await page.getByLabel('Password').fill(credentials.appSSO.password);

//     await page.getByRole('button', { name: 'Continue', exact: true }).click();

    
//     await expect(page).toHaveURL(/.*stage2.facilio.in/);
//     const response = await page.waitForResponse((res) => {

//         if (res.url().includes("https://stage2.facilio.in/")) {
//           return res.url().startsWith("https://stage2.facilio.in/");
//         }
    
//       });
//   });
