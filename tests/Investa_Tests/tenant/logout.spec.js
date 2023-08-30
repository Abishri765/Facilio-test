import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function investa_logout_tenants(page, testName) {
  try {
    await page.waitForLoadState("networkidle", { timeout: 60000 });
    let isElementVisible = false;
    while (!isElementVisible) {
      if (await page.isVisible("text=Logout")) {
        const element = await page.waitForSelector("text=Logout");
        await element.click();
        isElementVisible = true;
      } else {
        const menuElement = await page.locator(".fc-avatar.fc-avatar-lg").first();
        await menuElement.hover();
        await page.waitForLoadState("networkidle", { timeout: 60000 });
      }
    }
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle", { timeout: 60000 });
    let message = "Tenant portal: Logged out successfully"
    console.log(message);
    await toPlaywrightReport(message);
  } catch (error) {
    console.log(error);
    let message = `${testName} - Logout - could not able to logout`
    console.log(message)
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
    return -1;
  }
}
