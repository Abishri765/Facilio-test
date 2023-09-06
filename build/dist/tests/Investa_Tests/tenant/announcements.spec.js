import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function investa_announcements(page, baseURL, testName) {

  await page.waitForLoadState('networkidle', { timeout: 60000 });
  page.setDefaultTimeout(30000);
  try {
    await page.getByText('Broadcasts').click();
  } catch (error) {
    await sendAlertMessage(`${testName} - Annoucements Broadcasts - Cannot find Broadcasts button`);
    return -1
  }
  await page.waitForLoadState('networkidle');
  const listApi = baseURL + "/tenant/api/v3/modules/data/list";

  try {
    await page.getByRole('link', { name: 'Announcements' }).click();

    const summaryResponse = await page.waitForResponse((res) => {
      if (res.url().includes(listApi)) {
        return res.url().startsWith(listApi);
      }
    });

    // Parse the response data and check if the API was fetched successful
    let responseStatusCode = summaryResponse.status();
    if (responseStatusCode >= 200 && responseStatusCode <= 299) {
      let message = `${testName} - Annoucements - Annoucements list page working`;
      console.log(message);
      await toPlaywrightReport(message);
    }
    else {
      const responseData = await summaryResponse.json();
      let message = `${testName} - Announcements - API: ${listApi} ${JSON.stringify(responseData)}`;
      await sendAlertMessage(encodeURIComponent(message));
      console.error(`statusCode: ${responseStatusCode} ${message}`);
      message = JSON.stringify(message);
      await toPlaywrightReport(message);
      return -1;
    }
  } catch (error) {
    console.log(error);
    let message = `${testName} - Annoucements: could not find API ${encodeURIComponent(listApi)}`
    await sendAlertMessage(message);
    message = JSON.stringify(message);
    await toPlaywrightReport(message);
    return -1;
  }
  await page.waitForSelector('div.portal-layout-container');
};