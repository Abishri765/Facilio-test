import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function isCreateRequestWorking(page, baseURL, testName){
    page.setDefaultTimeout(30000);

    try{
        await page.waitForLoadState('networkidle');
        await page.getByText('CREATE REQUEST').click();
        await page.waitForSelector('#q-app > div:nth-child(1) > div > div > div.height-100 > div.height-100 > div.f-webform-container > form');
    }catch(error){
        console.error(error);
        const message = `${testName} - Create Request - cannot find create request page`;
        console.error(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }

}