import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function investa_induction(page, baseURL, testName) {
    const { expect } = require("@playwright/test");
    page.setDefaultTimeout(10000);
    try {
        await page.getByText('Induction').click();
    } catch (error) {
        console.error(error);
        let message = `${testName} - Induction - Cannot find Induction button`;
        console.error(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1
    }
    const listApi = baseURL + "/vendor/api/v3/modules/data/list?fetchOnlyViewGroupColumn=true&moduleName=inductionResponse&viewname=allinduction&page=1&perPage=50&viewName=allinduction&withoutCustomButtons=true";
    try {
        const summaryResponse = await page.waitForResponse((res) => {
            if (res.url().includes(listApi)) {
                return res.url().startsWith(listApi);
            }
        });

        // Parse the response data and check if the API was fetched successful
        let responseStatusCode = summaryResponse.status();
        if (responseStatusCode >= 200 && responseStatusCode <= 299) {
            await page.waitForSelector('div.common-list-container');
            let message = `${testName} - Induction - Induction list page working`;
            console.log(message);
            await toPlaywrightReport(message);
        }
        else {
            const responseData = await summaryResponse.json();
            let message = `${testName} - Induction - API: ${listApi} ${JSON.stringify(responseData)}`;
            await sendAlertMessage(encodeURIComponent(message));
            console.error(`statusCode: ${responseStatusCode} ${message}`);
            message = JSON.stringify(message);
            await toPlaywrightReport(message);
            return -1;
        }
    } catch (error) {
        console.error(error);
        let message = `${testName} - Induction: could not find API ${encodeURIComponent(listApi)}`;
        await sendAlertMessage(message);
        console.error(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    await page.waitForTimeout(1000);
    const url = baseURL + '/vendor/induction/induction/allinduction/107178/overview';
    const formApi = baseURL + "/vendor/api/v2/pages/inductionResponse?id=107178";
    try {
        await page.goto(url);
        const response = await page.waitForResponse((res) => {
            if (res.url().includes(formApi)) {
                return res.url().startsWith(formApi);
            }
        });

        // Parse the response data and check if the API was fetched successful
        const responseFormsData = await response.json();
        let responseStatusCode_Forms = response.status();
        if (responseStatusCode_Forms >= 200 & responseStatusCode_Forms <= 299) {
            await page.waitForSelector('div.el-card__body');
            let message = `${testName} - Induction - Induction summary page working`;
            console.log(message);
            await toPlaywrightReport(message);
        }
        else {
            let message = `${testName} - Induction - API: ${formApi} ${JSON.stringify(responseFormsData)}`;
            await sendAlertMessage(encodeURIComponent(message));
            console.error(`statusCode: ${responseStatusCode_Forms} ${message}`);
            message = JSON.stringify(message);
            await toPlaywrightReport(message);
            return -1;
        }
    } catch (error) {
        console.error(error);
        let message = `${testName} - Induction: could not find API ${formApi}`;
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
