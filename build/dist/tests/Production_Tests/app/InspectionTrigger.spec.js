import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function isInspectionTriggered(page, testName) {
    try {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = currentDate.toLocaleString("default", { month: "short" });
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const formattedCurrentDate = `${day}-${month}-${year} ${hours}:${minutes}`;
        let triggerDate = `${day}-${month}-${year} 16:00`;
        const time1 = new Date(formattedCurrentDate).getTime();
        const time2 = new Date(triggerDate).getTime();

        const isPast = time1 > time2;
        if (isPast) {
            await page.waitForTimeout(2000);
            await page.waitForLoadState("networkidle");
            await page.goto("https://app.facilio.com/app/inspection/template/all/summary/368?tab=History");
            await page.waitForTimeout(2000);
            await page.waitForLoadState("networkidle");
            const element = await page.locator("td.el-table_1_column_2.is-left.el-table__cell").nth(0);
            const text = await element.innerText();

            if (text === triggerDate) {
                let message = `${testName} - Inspection - Inspection Triggered successfully`;
                console.log(message);
                await toPlaywrightReport(message);
            }
            else {
                let message = `${testName} - Inspection - Warning: Inspection Not Triggered`;
                console.log(message);
                await sendAlertMessage(`${testName} - Warning: Inspection Not Triggered`);
                await toPlaywrightReport(message);
                return -1;
            }
        }
        else{
            let message = `${testName} - Inspection - Trigger condition not satisfied`;
            console.log(message);
            await toPlaywrightReport(message);
        }
    }
    catch (error) {
        console.error(error);
        let message = `${testName} - unknown Error occurred - check build console logs`;
        console.error(message)
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
    }
};
