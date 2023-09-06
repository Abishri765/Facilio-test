import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";
import { dateNow } from "../../utils/dateNow";

export async function facilioscript_onFieldChange(page, baseURL, testName) {
  page.setDefaultTimeout(30000);
  const workOrderApi = `${baseURL}/maintenance/api/v3/modules/workorder/view/open`;
  let workOrderId = 0;
  try {
    await page.waitForTimeout(3000);
    await page.goto(`${baseURL}/maintenance/maintenance/workorder/open`);
    const response = await page.waitForResponse((res) =>
      res.url().startsWith(workOrderApi)
    );

    const responseData = await response.json();
    const modifiedTime = responseData.data.workorder[0].modifiedTime;
    workOrderId = responseData.data.workorder[0].id;
    let timesNow = await dateNow();
    timesNow = timesNow * 1000;
    const differenceInMinutes = (timesNow - modifiedTime) / (1000 * 60);

    // Compare if the timestamp is within the last 3 minutes
    const isRecent = differenceInMinutes <= 3;

    if (isRecent) {
      const message = `${testName} - facilioscript_onFieldChange - workorder created via script successfully`;
      console.log(message);
      await toPlaywrightReport(message);
    } else {
      const message = `${testName} - facilioscript_onFieldChange - cannot create workorder via script`;
      console.log(message);
      await toPlaywrightReport(message);
      await sendAlertMessage(message);
    }
  } catch (error) {
    console.error(error);
    const message = `${testName} - facilioscript_onFieldChange - cannot create workorder via script`;
    console.log(message);
    await toPlaywrightReport(message);
    await sendAlertMessage(message);
    return -1;
  }

  try {
    await page.waitForLoadState("networkidle");
    await page.goto(
      `${baseURL}/maintenance/maintenance/workorder/open/${workOrderId}/overview`
    );
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    await page.getByText("Edit").click();
    await page
      .locator(".f-lookup-chooser > .el-select > .el-input > .el-input__inner")
      .first()
      .click();
    await page.getByRole("listitem").filter({ hasText: "Electrical" }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.waitForTimeout(2000);
    await page.getByRole("tab", { name: "History" }).click();
    await page
      .getByText(
        "updated Priority from Low to Medium, Category from Electrical to Fire Safety"
      )
      .click();
    const message = `${testName} - facilioscript_onFieldChange - script working successfully on ON_EDIT criteria`;
    await toPlaywrightReport(message);
    console.log(message);
  } catch (error) {
    console.log(error);
    const message = `${testName} - facilioscript_onFieldChange - script NOT working on ON_EDIT criteria`;
    console.log(message);
    await toPlaywrightReport(message);
    await sendAlertMessage(message);
    return -1;
  }
}
