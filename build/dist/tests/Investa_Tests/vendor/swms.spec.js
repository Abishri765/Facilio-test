import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function investa_swms(page, baseURL, testName) {
    const { expect } = require("@playwright/test");
    page.setDefaultTimeout(10000);
    try {
        await page.getByText('SWMS').click();
    } catch (error) {
        let message = `${testName} - SWMS - Cannot find SWMS button`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1
    }
    const listApi = baseURL + "/vendor/api/v3/modules/data/list";
    try {
        const summaryResponse = await page.waitForResponse((res) => {
            if (res.url().includes(listApi)) {
                return res.url().startsWith(listApi);
            }
        });

        // Parse the response data and check if the API was fetched successful
        let responseStatusCode = summaryResponse.status();
        if (responseStatusCode >= 200 && responseStatusCode <= 299) {
            //await page.waitForSelector('div.common-list-container');
            let message = `${testName} - SWMS - SWMS list page working`;
            console.log(message);
            await toPlaywrightReport(message);
        }
        else {
            const responseData = await summaryResponse.json();
            let message = `${testName} - SWMS - API: ${listApi} ${JSON.stringify(responseData)}`;
            await sendAlertMessage(encodeURIComponent(message));
            console.error(`statusCode: ${responseStatusCode} ${message}`);
            message = JSON.stringify(message);
            await toPlaywrightReport(message);
            return -1;
        }
    } catch (error) {
        console.error(error);
        let message = `${testName} - SWMS - could not find API ${encodeURIComponent(listApi)}`;
        await sendAlertMessage(message);
        console.error(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }

    const url = baseURL + '/vendor/swms/swms/allswms/2218151/overview';
    const formApi = baseURL + "/vendor/api/v2/pages/custom_swms?id=2218151";
    try {
        await page.waitForLoadState('networkidle', { timeout: 60000 });
        await page.waitForTimeout(1000);
        await page.goto(url);
        const response = await page.waitForResponse((res) => {
            if (res.url().includes(formApi)) {
                return res.url().startsWith(formApi);
            }
        });

        // Parse the response data and check if the API was fetched successful
        let responseStatusCode_Forms = response.status();
        if (responseStatusCode_Forms >= 200 & responseStatusCode_Forms <= 299) {
            //await page.waitForSelector('div.el-card__body');
            let message = `${testName} - SWMS - SWMS summary page working`;
            console.log(message);
            await toPlaywrightReport(message);
        }
        else {
            const responseFormsData = await response.json();
            let message = `${testName} - SWMS - API: ${formApi} ${JSON.stringify(responseFormsData)}`;
            await sendAlertMessage(encodeURIComponent(message));
            console.error(`statusCode: ${responseStatusCode_Forms} ${message}`);
            message = JSON.stringify(message);
            await toPlaywrightReport(message);
            return -1;
        }
    } catch (error) {
        console.log(error);
        let message = `${testName} - SWMS - could not find API: ${formApi}`
        await sendAlertMessage(message);
        console.error(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    expect(page.url()).toBe(url);
    await page.waitForLoadState('networkidle', { timeout: 60000 });
};
