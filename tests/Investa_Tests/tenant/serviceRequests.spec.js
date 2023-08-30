import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function investa_serviceRequests(page, baseURL, testName) {
    const { expect } = require("@playwright/test");

    await page.waitForLoadState('networkidle', { timeout: 60000 });
    page.setDefaultTimeout(30000);
    try {
        await page.getByText('Service requests').click();
    } catch (error) {
        console.log(error);
        let message =`${testName} - Service requests - Cannot find Service requests button`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1
    }
    const listApi = baseURL + "/tenant/api/v3/modules/data/list";
    try {
        const summaryResponse = await page.waitForResponse(res => res.url().startsWith(listApi));

        // Parse the response data and check if the API was fetched successful
        let responseStatusCode = summaryResponse.status();
        if (responseStatusCode >= 200 && responseStatusCode <= 299) {
            let message = `${testName} - Service Requests - service requests list page working`;
            console.log(message);
            await toPlaywrightReport(message);
        }
        else {
            const responseData = await summaryResponse.json();
            let message = `${testName} - Service Requests - API: ${listApi} ${JSON.stringify(responseData)}`;
            await sendAlertMessage(encodeURIComponent(message));
            message = JSON.stringify(message);
            console.error(`statusCode: ${responseStatusCode} ${message}`);
            await toPlaywrightReport(message);
            return -1;
        }
    } catch (error) {
        console.log(error);
        let message = `${testName} - Service Requests: could not find API ${encodeURIComponent(listApi)}`;
        await sendAlertMessage(message);
        console.log(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }

    try {
        await page.waitForSelector('.el-table');
        await page.waitForLoadState('networkidle', { timeout: 60000 });
        await page.locator('a').filter({ hasText: 'All requests' }).click();
        await page.waitForLoadState('networkidle', { timeout: 60000 });
    } catch (error) {
        console.log(error);
        let message = `${testName} - Service requests - could not find All requests filter`;
        await sendAlertMessage(message);
        console.log(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }

    const url = baseURL + '/tenant/service-requests/service-requests/openservicerequests/25689/overview';
    const formApi = baseURL + "/tenant/api/v2/pages/serviceRequest?id=25689";
    try {
        await page.goto(url);
        const response = await page.waitForResponse((res) => {
            if (res.url().includes(formApi)) {
                return res.url().startsWith(formApi);
            }
        });

        // Parse the response data and check if the API was fetched successful

        let responseStatusCode_Forms = response.status();
        if (responseStatusCode_Forms >= 200 & responseStatusCode_Forms <= 299) {
            let message = `${testName} - Service Requests - service requests summary page working`;
            console.log(message);
            await toPlaywrightReport(message);
        }
        else {
            const responseFormsData = await response.json();
            let message = `${testName} - Service Requests: ${formApi} ${JSON.stringify(responseFormsData)}`;
            await sendAlertMessage(encodeURIComponent(message));
            console.error(`statusCode: ${responseStatusCode_Forms} ${message}`);
            message = JSON.stringify(message);
            await toPlaywrightReport(message);
            return -1;
        }
    } catch (error) {
        console.log(error);
        let message = `${testName} - Service Requests: could not find API ${formApi}`;
        await sendAlertMessage(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    expect(page.url()).toBe(url);
    await page.waitForSelector('.sr-email-thread-widget');
};
