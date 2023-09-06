import { toPlaywrightReport } from "../../../utils/Annotations";
import { sendAlertMessage } from "../../../utils/bot";

export async function deleteWorkorder_maintenance(page, baseURL, testName) {
  const { expect } = require("@playwright/test");
  page.setDefaultTimeout(30000);

  const workorderListApi = `${baseURL}/maintenance/api/v3/modules/workorder/view/open`;
  try {
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    await page.locator("#sidebar-icon-17052").click();
    const response = await page.waitForResponse((res) =>
      res.url().startsWith(workorderListApi)
    );
    const responseStatus = response.status();
    if (responseStatus < 200 || responseStatus > 299) {
      let message = `${testName} - WorkOrder - Response status code not successfull: ${responseStatus}`;
      console.log(message);
      await toPlaywrightReport(message);
    } else {
      let message = `${testName} - workorder - workorder list page working`;
      console.log(message);
      await toPlaywrightReport(message);
    }
  } catch (error) {
    console.log(error);
    let message = `${testName} - workorder - cannot find API: ${workorderListApi}`;
    console.log(message);
    await sendAlertMessage(message, "workorder");
    message = JSON.stringify(message);
    await toPlaywrightReport(message);
    return -1;
  }
  await page.waitForLoadState("networkidle");

  try {
    await page.waitForSelector(
      '//*[@id="q-app"]/div[1]/div[1]/div[2]/div/div[1]/main/div[1]/div/div[3]/div/div[1]/div/div[2]/div[2]/div[4]/div[2]/table/tbody/tr[1]/td[1]/div/label',
      { visible: true, timeout: 5000 }
    );
    await page.click(
      '//*[@id="q-app"]/div[1]/div[1]/div[2]/div/div[1]/main/div[1]/div/div[3]/div/div[1]/div/div[2]/div[2]/div[4]/div[2]/table/tbody/tr[1]/td[1]/div/label'
    );
    await page.getByRole("button", { name: "Delete" }).click();
    await page
      .locator("#vue-fdialog-default")
      .getByRole("button", { name: "Delete" })
      .click();
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
    await sendAlertMessage(message, "workorder");
    message = JSON.stringify(message);
    await toPlaywrightReport(message);
    return -1;
  }
}
