import { test } from '@playwright/test';
const os = require('os');

test('Record Build Number', async ({ page }) => {

  if (os.hostname().includes('ip-') && process.env.AWS_EXECUTION_ENV) {
    try {
      const buildNumber = process.env.CODEBUILD_BUILD_NUMBER;
      console.log("Build Number:", buildNumber);

      await page.goto('https://app.facilio.com/identity/login?redirect=%2F');
      await page.getByPlaceholder('Enter your email address').fill('hariprasad@facilio.com');
      await page.getByRole('button', { name: 'Next' }).click();
      await page.getByPlaceholder('Enter password').fill('cpC7AbPFQ9N9iPu');
      await page.getByRole('button', { name: 'Sign in', exact: true }).click();
      await page.waitForTimeout(2000);
      await page.waitForLoadState('networkidle');

      // Code to be executed if codebuildNumber is fetched
      await page.locator('.fc-avatar.fc-avatar-md').first().click();
      await page.waitForLoadState('networkidle');
      await page.getByText('Facilio Inc').click();
      await page.waitForTimeout(2000);
      await page.waitForLoadState('networkidle');
      await page.goto('https://app.facilio.com/app/ca/modules/custom_test/all');
      await page.waitForTimeout(2000);
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: 'New playright' }).click();
      let name = `Playwright - ${buildNumber}`;
      await page.locator('#dsm-form-name').getByRole('textbox').click();
      await page.locator('#dsm-form-name').getByRole('textbox').fill(name);
      await page.getByPlaceholder('Select Site').click();
      await page.locator('div').filter({ hasText: 'Facilio Inc.' }).nth(1).click();
      await page.locator('#dsm-form-build_id_custom_test').getByRole('textbox').click();
      await page.locator('#dsm-form-build_id_custom_test').getByRole('textbox').fill(`${buildNumber}`);
      await page.getByRole('button', { name: 'Submit' }).click();
    } catch (error) {
      console.error(error);
      console.log('Cannot update Build in facilio.Inc portal');
    }
  } else {
    console.log('This is not an aws machine');
  }
});
