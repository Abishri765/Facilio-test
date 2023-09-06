import { toPlaywrightReport } from "../../../utils/Annotations";
import { sendAlertMessage } from "../../../utils/bot";

export async function deleteWorkorder_mainApp(page, baseURL, testName) {
  const { expect } = require("@playwright/test");
    try {
      await page.getByRole('row', { name: 'test wo' }).locator('label span').nth(1).click();
      await page.getByRole('button', { name: 'Delete' }).click();
      await page.locator('#vue-fdialog-default').getByRole('button', { name: 'Delete' }).click();
      const selector = "p.el-message__content";
      const text = "Work Order deleted successfully!";
      await page.waitForSelector(selector);

      // Get the text content of the element
      const message = await page.$eval(selector, (el) => el.textContent.trim());

      // Check that the message matches the expected value
      expect(message).toBe(text);
    } catch (error) {
      console.log(error);
      let message = `${testName} - workorder - cannot delete workorder`;
      console.log(message);
      await sendAlertMessage(message);
      message = JSON.stringify(message);
      await toPlaywrightReport(message);
      return -1;
    }
  const workorderListApi = `${baseURL}/newapp/api/v3/modules/workorder/view/all`

    try {
        await page.waitForTimeout(2000);
        await page.waitForLoadState('networkidle');
        const response = await page.waitForResponse(res => res.url().startsWith(workorderListApi));
        const responseStatus = response.status();
        if (responseStatus < 200 || responseStatus > 299) {
            let message = `${testName} - Create Workorder - Response status code not successfull : ${responseStatus}`;
            console.error(message);
            await sendAlertMessage(message);
            await toPlaywrightReport(message);
        }
        else {
            let message = `${testName} - workorder - workorder list page working`;
            console.log(message);
            await toPlaywrightReport(message);
        }
    } catch (error) {
        console.error(error);
        let message = `${testName} - workorder - cannot find API: ${workorderListApi}`;
        console.error(message);
        await sendAlertMessage(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }
    await page.waitForLoadState('networkidle');
}
