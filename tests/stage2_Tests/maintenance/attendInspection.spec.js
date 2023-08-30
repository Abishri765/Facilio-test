import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function attend_Inspection_maintenance(page, baseURL, testName) {
    page.setDefaultTimeout(30000);
    try {
        await page.waitForLoadState('networkidle', { timeout: 0 });
        await page.getByRole('link', { name: 'Inspection' }).click();
        await page.getByRole('link', { name: 'Inspection Templates' }).click();
        await page.waitForLoadState('networkidle');
        await page.goto(baseURL + '/maintenance/inspection/inspectiontemplates/all/836/overview/');
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
    const inspectionApi = baseURL + "/maintenance/api/v3/qanda/template/execute?moduleName=inspectionTemplate&id=836"
    try {
        await page.getByText('Execute Now').click();
        const responseInspectionTrigger = await page.waitForResponse((res) => {
            if (res.url().includes(inspectionApi)) {
                return res.url().startsWith(inspectionApi);
            }
        });

        // Parse the response data and check if the execution was successful
        const responseStatus = responseInspectionTrigger.status();
        if (responseStatus < 200 || responseStatus > 299) {
            let message = `${testName} - Inspection - Inspection cannot be triggered`;
            console.log(message);
            await toPlaywrightReport(message);
        }
    } catch (error) {
        console.log(error);
        let message = `${testName} - Inspection: could not find API ${encodeURIComponent(inspectionApi)}`;
        await sendAlertMessage(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }
    await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');
    const ResponseApi = `${baseURL}/maintenance/api/v3/modules/inspectionResponse`;
    try {
        await page.getByRole('tab', { name: 'History' }).click();
        await page.reload();
        const responseInspectionId = await page.waitForResponse((res) => {
            if (res.url().includes(ResponseApi)) {
                return res.url().startsWith(ResponseApi);
            }
        });

        // Parse the response data and fetch the inspection ID
        let inspectionIdData = await responseInspectionId.json();
        let inspectionId = inspectionIdData.data.inspectionResponse[0].id;
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        await page.goto(`${baseURL}/maintenance/inspection/inspection/all/${inspectionId}/overview`);

        await page.waitForTimeout(2000);
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        await page.getByRole('button', { name: 'Conduct Inspection' }).click();
        await page.waitForSelector('div.questions-section');
        await page.waitForLoadState('networkidle');
        await page.getByRole('radio', { name: 'Yes' }).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Submit' }).click();
        const inspectionResponseApi = `${baseURL}/maintenance/api/v3/modules/inspectionResponse/${inspectionId}`
        const responseInspectionStatus = await page.waitForResponse(res => res.url().startsWith(inspectionResponseApi));

        // Parse the response data and check if the status is 'completed'
        let inspectionStatusData = await responseInspectionStatus.json();
        let inspectionStatus = inspectionStatusData.data.inspectionResponse.moduleState.status;

        if (inspectionStatus == 'completed') {
            let message = `${testName} - Inspection - Inspection completed successfully`;
            console.log(message);
            await toPlaywrightReport(message);
        }
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        await page.goto(`${baseURL}/maintenance/inspection/inspection/all/${inspectionId}/overview/`);
        await page.waitForTimeout(2000);
        await page.waitForLoadState('networkidle', { timeout: 0 });
        await page.getByRole('button', { name: 'Close' }).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
    } catch (error) {
        console.log(error);
        let message = `${testName} - attend Inspection: could not find API ${encodeURIComponent(inspectionResponseApi)}`;
        await sendAlertMessage(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }
};
