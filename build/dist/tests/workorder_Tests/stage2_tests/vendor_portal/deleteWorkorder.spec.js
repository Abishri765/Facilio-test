import { toPlaywrightReport } from "../../../utils/Annotations";
import { sendAlertMessage } from "../../../utils/bot";

export async function deleteWorkorder_vendorportal(page, baseURL, testName) {
  const { expect } = require("@playwright/test");
  page.setDefaultTimeout(30000);
  const workorderListApi = `${baseURL}/vendor/api/v3/modules/workorder/view/vendorWorkorder`;
  try {
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    await page.getByRole("listitem").filter({ hasText: "WorkOrders" }).click();
    const response = await page.waitForResponse((res) =>
      res.url().startsWith(workorderListApi)
    );
    const responseStatus = response.status();
    if (responseStatus < 200 || responseStatus > 299) {
      let message = `${testName} - Create Workorder - Response status code not successfull : ${responseStatus}`;
      console.error(message);
      await sendAlertMessage(message, "workorder");
      await toPlaywrightReport(message);
    } else {
      let message = `${testName} - workorder - workorder list page working`;
      console.log(message);
      await toPlaywrightReport(message);
    }
  } catch (error) {
    console.error(error);
    let message = `${testName} - workorder - cannot find API: ${workorderListApi}`;
    console.error(message);
    await sendAlertMessage(message, "workorder");
    message = JSON.stringify(message);
    await toPlaywrightReport(message);
    return -1;
  }
  await page.waitForLoadState("networkidle");
  try {
    await page.waitForSelector("tr.el-table__row.no-hover");
    await page.hover("tr.el-table__row.no-hover");
    await page.waitForTimeout(2000);
    await page.click(
      '//*[@id="q-app"]/div[1]/div/div/div[2]/div/div[2]/div/div[2]/div[4]/div[2]/table/tbody/tr[3]/td[10]/div/div/i[2]'
    );

    await page.getByRole("button", { name: "Delete" }).click();

    const selector = "p.el-message__content";
    const text = "Work Order updated successfully";
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
