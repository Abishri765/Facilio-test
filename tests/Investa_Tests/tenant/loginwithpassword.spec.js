import { toPlaywrightReport } from "../../utils/Annotations";

export async function investa_loginWithPassword_tenants(page, baseURL, username, password, testName) {

    const { expect } = require("@playwright/test");
    // Navigate to the login page of the web application
    await page.goto(baseURL + "/auth/login", { timeout: 60000 }, {
        waitUntil: "networkidle",
    });

    // Fill in the username field with the corresponding value from the configuration file
    await page.waitForSelector("#inputUsername");
    await page.click("#inputUsername");
    await page.fill("#inputUsername", username);

    await page.waitForSelector("#inputPassword");
    await page.click("#inputPassword");
    await page.fill("#inputPassword", password);

    // Click on the login button and wait for a response from the server
    await page.click('button.el-button.btn.btn-primary.fc-login-btn.mT20.el-button--default');
    //await page.waitForLoadState('networkidle', {timeout: 60000});
    try {
        const response = await page.waitForResponse((res) => {
            if (res.url().includes(baseURL + "/api/integ/loginWithUserNameAndPassword")) {
                return res.url().startsWith(baseURL + "/api/integ/loginWithUserNameAndPassword");
            }
        });

        // Parse the response data and check if the login was successful
        let responsedataPassword = await response.json();
        let responseCodePassword = responsedataPassword.responseCode;
        if (responseCodePassword != 0) {
            let message = `${testName} - Authentication - Invalid Username or password`
            console.log(message);
            await toPlaywrightReport(message);
            console.log(responseCodePassword);
            return -1
        }
    } catch (error) {
        await page.waitForTimeout(2000);
        await page.waitForLoadState("networkidle", { timeout: 0 });
        let domain = new URL(baseURL).hostname;
        const urlPattern = new RegExp(`.*${domain}`);
        await expect(page).toHaveURL(urlPattern);
        await page.waitForLoadState('networkidle', { timeout: 60000 });
        let message = 'Tenant portal: Logged in successfully'
        console.log(message);
        await toPlaywrightReport(message);
    }
}
