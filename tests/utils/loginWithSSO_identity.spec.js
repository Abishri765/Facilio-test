import { toPlaywrightReport } from "./Annotations";

export async function loginWithSSO_identity(page, baseURL, username, samlPassword, testName) { //uses /identity/ instead of /auth/
    page.setDefaultTimeout(30000);

    const { expect } = require("@playwright/test");
    // Navigate to the login page of the web application
    await page.goto(baseURL + "/identity/login", {
        waitUntil: "networkidle",
    });

    const loginUsernameApi = baseURL + "/identity/api/login/lookup"

    try {
        // Fill in the username field with the corresponding value from the configuration file
        await page.waitForSelector("#username");
        await page.click("#username");
        await page.fill("#username", username);

        // Click on the next button and wait for a response from the server
        await page.locator('//*[@id="app"]/main/section/div/div/div/form/div[2]/button').click();
        const response = await page.waitForResponse(res => res.url().startsWith(loginUsernameApi));
        let statusCode = response.status();

        if (statusCode < 200 || statusCode > 299) {
            throw new Error(`${testName} - Authentication (identity auth) - Invalid username`);
        }
    } catch (error) {
        let message = `${testName} - Authentication (identity auth) - Invalid username`
        console.log(message);
        await toPlaywrightReport(message);
        await sendAlertMessage(message);
        return -1;
    }
    try {
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(2000);
        await page.waitForLoadState("networkidle");
        await page.getByRole('button', { name: 'Sign in with SAML' }).click();
        await page.waitForSelector("#username");
        await page.click("#username");
        await page.fill("#username", username);

        await page.waitForSelector("#password");
        await page.click("#password");
        await page.fill("#password", samlPassword);

        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.waitForLoadState("networkidle");
        const isElementVisible = await page.isVisible('#error-element-password');
        await page.waitForLoadState("networkidle");
        if (isElementVisible) {
            let message = testName + ' (identity auth) : Wrong email or password'
            console.log(message);
            await toPlaywrightReport(message);
            return -1;
        }
        else {
            await page.waitForLoadState("networkidle");
            await page.waitForTimeout(2000);
            await page.waitForLoadState("networkidle");
            let domain = new URL(baseURL).hostname;
            const urlPattern = new RegExp(`.*${domain}`);
            await expect(page).toHaveURL(urlPattern);
            await page.getByRole("navigation", { name: "Portfolio" }).click();
            await page.waitForLoadState("networkidle");
            let message = `${testName} - Authentication (identity) - Logged in successfully`;
            console.error(message);
            await toPlaywrightReport(message);
            return 0;
        }
    } catch (error) {
        console.log(error);
        let message = `${testName} - Authentication (identity auth)- Web content not loaded properly`
        console.log(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
}
