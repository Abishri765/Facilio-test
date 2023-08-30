import { toPlaywrightReport } from "../../../utils/Annotations";
import { sendAlertMessage } from "../../../utils/bot";

export async function createWorkorder_vendorportal(page, baseURL, testName) {
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
    await page.getByRole("button", { name: "New Work Order" }).click();
    await page.locator(".el-input__inner").first().click();
    await page.locator(".el-input__inner").first().fill("test wo");
    await page
      .locator(".el-select > .el-input > .el-input__inner")
      .first()
      .click();
    await page
      .getByRole("listitem")
      .filter({ hasText: "playwrite site" })
      .click();
    await page
      .locator(
        "div:nth-child(13) > .el-form-item > .el-form-item__content > .f-lookup-chooser > .el-select > .el-input > .el-input__inner"
      )
      .click();
    await page.getByRole("listitem").filter({ hasText: "test vendor" }).click();
    await page.getByRole("button", { name: "Save" }).click();
    const selector = "p.el-message__content";
    const text = "Request created successfully";
    await page.waitForSelector(selector);

    // Get the text content of the element
    const message = await page.$eval(selector, (el) => el.textContent.trim());

    // Check that the message matches the expected value
    expect(message).toBe(text);
  } catch (error) {
    console.log(error);
    let message = `${testName} - workorder - cannot create request`;
    console.log(message);
    await sendAlertMessage(message, "workorder");
    message = JSON.stringify(message);
    await toPlaywrightReport(message);
    return -1;
  }
}
// getBotGroupIdFromModule
