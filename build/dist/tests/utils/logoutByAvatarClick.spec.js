import { toPlaywrightReport } from "./Annotations";
import { sendAlertMessage } from "./bot";

export async function logoutByAvatarClick(page, testName){
    await page.waitForLoadState('networkidle');
    try{
    await page.locator('.fc-avatar.fc-avatar-md').first().click();
    await page.waitForLoadState('networkidle');
    }catch(error){
        console.log(error);
        let message = `${testName} - Logout - could not find avatar`
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    try{
        await page.getByText('Logout').click();
    }catch(error){
        console.log(error);
        let message = `${testName} - Logout - could not find logout button`
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
    }
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    let message = `${testName} - Authentication - Logged out successfully`;
    console.log(message);
    await toPlaywrightReport(message);
}
