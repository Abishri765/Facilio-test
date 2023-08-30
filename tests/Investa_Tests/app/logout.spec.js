import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function investa_logout_app(page, testName) {
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    page.setDefaultTimeout(10000);
    try {
        await page.locator('.fc-avatar.fc-avatar-md').click();
        await page.waitForLoadState('networkidle', { timeout: 60000 });
    } catch (error) {
        console.log(error);
        let message = `${testName} - Logout - cannot not find avatar`
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    try {
        await page.getByText('Logout').click();
    } catch (error) {
        console.log(error);
        let message = `${testName} - Logout - cannot not find logout button`
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle", { timeout: 60000 });
    let message = `${testName} - Authentication - Logged out successfully`;
    console.log(message);
    await toPlaywrightReport(message);
}
