import { toPlaywrightReport } from "../utils/Annotations";
import { sendAlertMessage } from "../utils/bot";

export async function workorderList(
  page,
  baseURL,
  testName,
  appName,
  viewName
) {
  page.setDefaultTimeout(30000);
  const workorderListApi = `${baseURL}/${appName}/api/v3/modules/workorder/view/${viewName}`;
  try {
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    switch (appName) {
      case "newapp":
        await page.getByRole("link", { name: "Maintenance" }).click();
        break;
      case "maintenance":
        await page
          .getByRole("listitem")
          .filter({ hasText: "Maintenance" })
          .click();
        break;
    }
    const response = await page.waitForResponse((res) =>
      res.url().startsWith(workorderListApi)
    );
    const responseStatus = response.status();
    if (responseStatus < 200 || responseStatus > 299) {
      let message = `${testName} - Create Workorder - Response status code not successfull : ${responseStatus}`;
      console.error(message);
      await sendAlertMessage(message);
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
    await sendAlertMessage(message);
    message = JSON.stringify(message);
    await toPlaywrightReport(message);
    return -1;
  }
  await page.waitForLoadState("networkidle");
}
