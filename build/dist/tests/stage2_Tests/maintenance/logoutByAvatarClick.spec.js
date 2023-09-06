import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function logoutByAvatarClick_stage2Maintenance(page, testName) {
    await page.waitForLoadState('networkidle');
    try {
        await page.locator('div.fc-avatar.fc-avatar-md').first().click();
        await page.waitForLoadState('networkidle');
    } catch (error) {
        console.log(error);
        let message = `${testName} - Logout - could not find avatar`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    try {
        await page.getByText('Logout').click();
    } catch (error) {
        console.log(error);
        let message = `${testName} - Logout - could not find logout button`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    let message = `${testName} - Logout - Logged out successfully`;
    console.log(message);
    await toPlaywrightReport(message);
}
