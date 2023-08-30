import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function facilioscript_onCreate(page, baseURL, testName) {
  page.setDefaultTimeout(30000);
  try {
    await page.waitForLoadState("networkidle");
    await page.goto(`${baseURL}/maintenance/helpcenter/servicerequest/all`);
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "New Service Request" }).click();
  } catch (error) {
    const message = `${testName} - facilioscript_onCreate - cannot find New service Request button`;
    console.error(error);
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
    return -1;
  }
  await page.waitForLoadState("networkidle");
  try {
    await page.waitForTimeout(2000);
    await page
      .locator(".fc-input-full-border2 > .el-input__inner")
      .first()
      .click();
    await page
      .locator(".fc-input-full-border2 > .el-input__inner")
      .first()
      .fill("Test SR");
    await page.getByPlaceholder("Select").first().click();
    await page
      .getByRole("listitem")
      .filter({ hasText: "deletenow" })
      .nth(1)
      .click();
    await page.getByPlaceholder("Select").nth(1).click();
    await page.getByRole("listitem").filter({ hasText: "Ayshvarya" }).click();
    await page.getByPlaceholder("Select").nth(3).click();
    await page.getByRole("listitem").filter({ hasText: "Not Urgent" }).click();
    await page.getByRole("button", { name: "Save" }).click();
  } catch (error) {
    const message = `${testName} - facilioscript_onCreate - cannot fill the form properly`;
    console.error(error);
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
    return -1;
  }
  const serviceRequestsApi = `${baseURL}/maintenance/api/v3/modules/serviceRequest`;
  try {
    const response = await page.waitForResponse((res) =>
      res.url().startsWith(serviceRequestsApi)
    );
    let statusCode = response.status();

    if (statusCode < 200 || statusCode > 299) {
      throw new Error(
        `${testName} - facilioscript_onCreate - Cannot create service requests`
      );
    }
  } catch (error) {
    console.error(error);
    const message = `${testName} - facilioscript_onCreate - cannot create service requests`;
    console.error(message);
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
    return -1;
  }
  try {
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    await page.getByRole("tab", { name: "Comments & Information" }).click();
    await page.getByText("Urgency Emergency").click();
    await page.getByText("UpdateField Updated field").click();
    const message = `${testName} - facilioscript_onCreate - facilio script field update working properly`;
    console.log(message);
    await toPlaywrightReport(message);
  } catch (error) {
    console.error(error);
    const message = `${testName} - facilioscript_onCreate - facilioscript not working properly`;
    console.error(message);
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
    return -1;
  }
}
