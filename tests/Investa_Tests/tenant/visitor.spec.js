import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function investa_visitor(page, baseURL, testName) {
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  page.setDefaultTimeout(30000);
  try {
    await page.getByText('Visitor', { exact: true }).click();
  } catch (error) {
    let message = `${testName} - Visitor - Cannot find Visitor button`;
    console.error(message);
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
    return -1
  }
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  const listApi = baseURL + "/tenant/api/v3/modules/data/list?fetchOnlyViewGroupColumn=true&moduleName=invitevisitor&viewname=allinvites&page=1&perPage=50&viewName=allinvites&withoutCustomButtons=true";
  try {
    await page.getByRole('link', { name: 'Invites' }).click();
    const summaryResponse = await page.waitForResponse((res) => {
      if (res.url().includes(listApi)) {
        return res.url().startsWith(listApi);
      }
    });

    // Parse the response data and check if the API was fetched successful
    let responseStatusCode = summaryResponse.status();
    if (responseStatusCode >= 200 && responseStatusCode <= 299) {
      let message = `${testName} - Invites - Invites list page working`;
      console.log(message);
      await toPlaywrightReport(message);
    }
    else {
      const responseData = await summaryResponse.json();
      let message = `${testName} - Invites - API: ${listApi} ${JSON.stringify(responseData)}`;
      await sendAlertMessage(encodeURIComponent(message));
      console.error(`statusCode: ${responseStatusCode} ${message}`);
      message = JSON.stringify(message);
      await toPlaywrightReport(message);
      return -1;
    }
  } catch (error) {
    console.log(error);
    let message = `${testName} - Invites - could not find API: ${encodeURIComponent(listApi)}`;
    await sendAlertMessage(message);
    console.error(message);
    message = JSON.stringify(message);
    await toPlaywrightReport(message);
    return -1;
  }
  await page.waitForSelector('div.module-list-container');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  const visitsListApi = baseURL + "/tenant/api/v3/modules/data/list?fetchOnlyViewGroupColumn=true&moduleName=visitorlog&viewname=allviews&page=1&perPage=50&viewName=allviews&withoutCustomButtons=true";
  try {
    await page.getByRole('link', { name: 'Visits' }).click();

    const summaryResponse = await page.waitForResponse((res) => {
      if (res.url().includes(visitsListApi)) {
        return res.url().startsWith(visitsListApi);
      }
    });

    // Parse the response data and check if the API was fetched successful
    let responseStatusCode = summaryResponse.status();
    if (responseStatusCode >= 200 && responseStatusCode <= 299) {
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      let message = `${testName} - Visitor - Visits list page working`;
      console.log(message);
      await toPlaywrightReport(message);
    }
    else {
      const responseData = await summaryResponse.json();
      let message = `${testName} - Visits - API: ${visitsListApi} ${JSON.stringify(responseData)}`;
      await sendAlertMessage(encodeURIComponent(message));
      console.error(`statusCode: ${responseStatusCode} ${message}`);
      message = JSON.stringify(message);
      await toPlaywrightReport(message);
      return -1;
    }
  } catch (error) {
    console.error(error);
    let message = `${testName} - Visits: could not find API ${encodeURIComponent(visitsListApi)}`;
    await sendAlertMessage(message);
    console.error(message);
    message = JSON.stringify(message);
    await toPlaywrightReport(message);
    return -1;
  }
  await page.waitForSelector('.el-table');
  await page.waitForLoadState('networkidle');
};
