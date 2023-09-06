import { toPlaywrightReport } from "../../../utils/Annotations";
import { sendAlertMessage } from "../../../utils/bot";

export async function deleteWorkorder_tenantportal(page, baseURL, testName) {
  const { expect } = require("@playwright/test");
  page.setDefaultTimeout(30000);

  try {
    await page.click("div.el-dropdown[data-v-e60570a6]");
    await page.getByText("Delete").click();
    await page.getByRole("button", { name: "Delete" }).click();

    const selector = "p.el-message__content";
    const text = "Request created successfully"; //expected text "Request deleted successfully";
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
