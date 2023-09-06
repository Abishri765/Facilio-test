import { toPlaywrightReport } from "../utils/Annotations";
import { sendAlertMessage } from "../utils/bot";

export async function workorderList(page, baseURL, testName,appType) {
    const workorderPostApi = `${baseURL}/${appType}/api/v3/modules/workorder`;
  try {
    const response = await page.waitForResponse((res) =>
      res.url().startsWith(workorderPostApi)
    );
    const responseStatus = response.status();
    if (responseStatus < 200 || responseStatus > 299) {
      let message = `${testName} - `;
      await toPlaywrightReport(message);
      console.log(`Response status code not successfull: ${responseStatus}`);
    } else {
      let message = `${testName} - workorder - workorder edited successfully`;
      console.log(message);
      await toPlaywrightReport(message);
    }
  } catch (error) {
    console.log(error);
    let message = `${testName} - workorder - cannot find API: ${workorderPostApi}`;
    console.log(message);
    await sendAlertMessage(message);
    message = JSON.stringify(message);
    await toPlaywrightReport(message);
    return -1;
  }
  await page.waitForLoadState("networkidle");
}