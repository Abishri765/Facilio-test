import { toPlaywrightReport } from "./Annotations";
import { sendAlertMessage } from "./bot";

export async function logoutByAvatarHover(page, testName) {
  try {
    await page.waitForLoadState("networkidle");
    let isElementVisible = false;
    while (!isElementVisible) {
      if (await page.isVisible("text=Logout")) {
        const element = await page.waitForSelector("text=Logout");
        await element.click();
        isElementVisible = true;
      } else {
        const menuElement = await page.locator(".fc-avatar.fc-avatar-lg").first();
        await menuElement.hover();
        await page.waitForLoadState("networkidle");
      }
    }
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    let message = `${testName} - Authentication - Logged out successfully`;
    console.log(message);
    await toPlaywrightReport(message);
  } catch (error) {
    console.log(error);
    let message = `${testName} - Authentication - could not able to logout`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
    return -1;
  }
}
