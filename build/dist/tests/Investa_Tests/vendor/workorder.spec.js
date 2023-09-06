import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function investa_workorder(page, baseURL, testName) {
    page.setDefaultTimeout(10000);
    try{
    await page.getByText('WorkOrders').click();
    }catch(error){
        console.error(error);
        let message = `${testName} - Workorder - Cannot find WorkOrder button`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1
    }
    const listApi = baseURL + "/vendor/api/v3/modules/data/list?fetchOnlyViewGroupColumn=true&moduleName=workorder&viewname=allopenadmin&page=1&perPage=50&viewName=allopenadmin&withoutCustomButtons=true";
    try {
        const summaryResponse = await page.waitForResponse((res) => {
            if (res.url().includes(listApi)) {
                return res.url().startsWith(listApi);
            }
        });

        // Parse the response data and check if the API was fetched successful
        let responseStatusCode = summaryResponse.status();
        if (responseStatusCode >= 200 && responseStatusCode <= 299) {
            //await page.waitForSelector('div.module-list-container');
            let message = `${testName} - Workorder - Workorder summary page working`;
            console.log(message);
            await toPlaywrightReport(message);
        }
        else {
            const responseData = await summaryResponse.json();
            let message = `${testName} - workorder - API: ${listApi} ${JSON.stringify(responseData)}`;
            await sendAlertMessage(encodeURIComponent(message));
            console.error(`statusCode: ${responseStatusCode} ${message}`);
            message = JSON.stringify(message);
            await toPlaywrightReport(message);
            return -1;
        }
    } catch (error) {
        console.error(error);
        let message = `${testName} - workorder: could not find API ${encodeURIComponent(listApi)}`;
        await sendAlertMessage(message);
        console.error(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }

    const formApi = baseURL + "/vendor/api/v2/forms/workorder?formId=1132&fetchFormRuleFields=true&forCreate=true";
    try {
        await page.getByRole('button', { name: 'New Work Orders' }).click();
        const response = await page.waitForResponse((res) => {
            if (res.url().includes(formApi)) {
                return res.url().startsWith(formApi);
            }
        });

        // Parse the response data and check if the API was fetched successful
        const responseFormsData = await response.json();
        let responseStatusCode_Forms = response.status();
        if (responseStatusCode_Forms >= 200 & responseStatusCode_Forms <= 299) {
            //await page.waitForSelector('div.form-data-creation');
            let message = `${testName} - Workorder - Create workorder page working`;
            console.log(message);
            await toPlaywrightReport(message);
        }
        else {
            let message = `${testName} - workorder: ${formApi} ${JSON.stringify(responseFormsData)}`;
            await sendAlertMessage(encodeURIComponent(message));
            console.error(`statusCode: ${responseStatusCode_Forms} ${message}`);
            message = JSON.stringify(message);
            await toPlaywrightReport(message);
            return -1;
        }
    } catch (error) {
        console.log(error);
        let message = `${testName} - workorder: could not find API ${formApi}`;
        await sendAlertMessage(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    } 
};
