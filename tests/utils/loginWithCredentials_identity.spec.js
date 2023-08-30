import { toPlaywrightReport } from "./Annotations";
import { sendAlertMessage } from "./bot";

export async function loginWithCredentials_identity(page, baseURL, username, password, testName) { //uses /identity/ instead of /auth/

    const { expect } = require("@playwright/test");
    // Navigate to the login page of the web application
    await page.goto(baseURL + "/identity/login", {
        waitUntil: "networkidle",
    });
    try {
        // Fill in the username field with the corresponding value from the configuration file
        await page.waitForSelector("#username");
        await page.click("#username");
        await page.fill("#username", username);

        await page.waitForSelector("#password");
        await page.click("#password");
        await page.fill("#password", password);
    }
    catch (error) {
        let message = `${testName} - Authentication (identity auth) - Cannot enter username and password`;
        console.log(error);
        console.log(message);
        await toPlaywrightReport(message);
        await sendAlertMessage(message);
        return -1;
    }

    const domain = baseURL + "/identity/api/login/domain"
    try {
        await page.locator('//*[@id="app"]/main/section/div/div/div/form/div[2]/button').click();
        const response = await page.waitForResponse(res => res.url().startsWith(domain));
        let statusCode = response.status();

        if (statusCode < 200 || statusCode > 299) {
            throw new Error(`${testName} - Authentication (identity auth) - Invalid Username or Password`);
        }
    } catch (error) {
        let message = `${testName} - Authentication (identity auth) - Invalid Username or Password`
        console.log(message);
        await toPlaywrightReport(message);
        await sendAlertMessage(message);
        return -1;
    }
    try {
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(2000);
        await page.waitForLoadState("networkidle");
        let domain = new URL(baseURL).hostname;
        const urlPattern = new RegExp(`.*${domain}`);
        await expect(page).toHaveURL(urlPattern);
        await page.waitForLoadState('networkidle');
        let message = `${testName} - Authentication (identity auth) - Logged in successfully`;
        console.log(message);
        await toPlaywrightReport(message);
    } catch (error) {
        console.log(error);
        let message = `${testName} - Authentication (identity auth)- Web content not loaded properly`
        console.log(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
}
