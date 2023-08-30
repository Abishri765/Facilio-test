import { errors } from "playwright";
import { toPlaywrightReport } from "../../../utils/Annotations";
import { sendAlertMessage } from "../../../utils/bot";

export async function attend_Inspection(page, baseURL, testName) {
    page.setDefaultTimeout(30000);
    try {
        await page.waitForLoadState('networkidle', { timeout: 0 });
        await page.getByRole('link', { name: 'Inspection' }).click();
        await page.waitForLoadState('networkidle');
        await page.goto(baseURL + '/app/inspection/template/all/summary/318');
        await page.waitForLoadState('networkidle', { timeout: 0 });
        await page.waitForSelector("#menu");
        await page.click("#menu");
    } catch (error) {
        console.log(error);
        let message = `${testName} - attend Inspection - cannot find /app/inspection/template/all/summary/318`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    const inspectionApi = baseURL + "/newapp/api/v3/qanda/template/execute?moduleName=inspectionTemplate&id=318"
    try {
        await page.getByText('Execute Now').click();
        const responseInspectionTrigger = await page.waitForResponse((res) => {
            if (res.url().includes(inspectionApi)) {
                return res.url().startsWith(inspectionApi);
            }
        });

        // Parse the response data and check if the execution was successful
        let inspectionTriggerddata = await responseInspectionTrigger.json();
        let code = inspectionTriggerddata.code;
        if (code != 0) {
            let message = `${testName} - Attend Inspection - Inspection cannot be triggered`;
            console.error(message);
            await sendAlertMessage(message);
            await toPlaywrightReport(message);
        }
    } catch (error) {
        console.error(error);
        let message = `${testName} - attend Inspection: could not find API ${encodeURIComponent(inspectionApi)}`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');
    const inspectionResponseApi = baseURL + "/newapp/api/v3/modules/inspectionResponse?page=1&perPage=10&withCount=true&filters=%7B%22parent%22%3A%7B%22operatorId%22%3A36%2C%22value%22%3A%5B%22318%22%5D%7D%7D&moduleName=inspectionResponse"
    try {
        await page.getByRole('tab', { name: 'History' }).click();
        const responseInspectionId = await page.waitForResponse((res) => {
            if (res.url().includes(inspectionResponseApi)) {
                return res.url().startsWith(inspectionResponseApi);
            }
        });

        // Parse the response data and fetch the inspection ID
        let inspectionIdData = await responseInspectionId.json();
        let inspectionId = inspectionIdData.data.inspectionResponse[0].id;
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        await page.goto(baseURL + '/app/inspection/individual/all/summary/' + inspectionId);

        await page.waitForTimeout(2000);
        await page.waitForLoadState('networkidle');
        await page.getByRole('button', { name: 'Conduct Inspection' }).click();
        await page.waitForSelector('div.questions-section');
        await page.waitForLoadState('networkidle');
        await page.getByRole('radio', { name: 'Yes' }).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Submit' }).click();
        const responseInspectionStatus = await page.waitForResponse((res) => {
            if (res.url().includes(baseURL + "/newapp/api/v3/modules/inspectionResponse/" + inspectionId)) {
                return res.url().startsWith(baseURL + "/newapp/api/v3/modules/inspectionResponse/" + inspectionId);
            }
        });

        // Parse the response data and check if the status is 'completed'
        let inspectionStatusData = await responseInspectionStatus.json();
        let inspectionStatus = inspectionStatusData.data.inspectionResponse.moduleState.status;

        if (inspectionStatus == 'completed') {
            let message = `${testName} - Attend Inspection - Inspection completed successfully`;
            console.log(message);
            await toPlaywrightReport(message);
        }
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        await page.goto(baseURL + '/app/inspection/individual/all/summary/' + inspectionId);
        await page.waitForTimeout(2000);
        await page.waitForLoadState('networkidle', { timeout: 0 });
        await page.getByRole('button', { name: 'Close' }).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
    } catch (error) {
        console.error(error);
        let message = `${testName} - attend Inspection: could not find API ${encodeURIComponent(inspectionResponseApi)}`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
};
