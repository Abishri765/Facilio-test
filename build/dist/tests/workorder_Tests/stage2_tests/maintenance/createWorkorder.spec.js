import { toPlaywrightReport } from "../../../utils/Annotations";
import { sendAlertMessage } from "../../../utils/bot";

export async function createWorkorder_maintenance_wo(page, baseURL, testName) {
  const { expect } = require("@playwright/test");
  try {
    await page.getByRole("button", { name: "New Work Order" }).click();
    await page.locator(".fc-input-full-border2 > .el-input__inner").click();
    await page
      .locator(".fc-input-full-border2 > .el-input__inner")
      .fill("test wo");
    await page
      .locator(
        ".el-form-item__content > div > .el-select > .el-input > .el-input__inner"
      )
      .first()
      .click();
    await page
      .getByRole("listitem")
      .filter({ hasText: "playwrite site" })
      .nth(1)
      .click();
    await page.getByRole("button", { name: "Save" }).click();
    // const selector = "p.el-message__content";
    // const text = "Work Order created successfully";
    // await page.waitForSelector(selector,{ timeout: 5000 });

    // // Get the text content of the element
    // const message = await page.$eval(selector, (el) => el.textContent.trim());

    // // Check that the message matches the expected value
    // expect(message).toBe(text);
  } catch (error) {
    console.log(error);
    const message = `${testName} - workorder - cannot create workorder`;
    console.log(message);
    await sendAlertMessage(message, "workorder");
    await toPlaywrightReport(message);
    return -1;
  }

  const workorderPostApi = `${baseURL}/maintenance/api/v3/modules/workorder`;
  try {
    const response = await page.waitForResponse((res) =>
      res.url().startsWith(workorderPostApi)
    );
    const responseStatus = response.status();
    console.log(responseStatus);
    if (responseStatus < 200 || responseStatus > 299) {
      let message = `${testName} - WorkOrder - Response status code not successfull: ${responseStatus}`;
      console.log(message);
      message = JSON.stringify(message);
      await toPlaywrightReport(message);
    } else {
      let message = `${testName} - workorder - workorder created successfully`;
      console.log(message);
      await toPlaywrightReport(message);
    }
  } catch (error) {
    console.log(error);
    let message = `${testName} - workorder - cannot find API: ${workorderPostApi}`;
    console.log(message);
    await sendAlertMessage(message, "workorder");
    message = JSON.stringify(message);
    await toPlaywrightReport(message);
    return -1;
  }
  await page.waitForLoadState("networkidle");
}
