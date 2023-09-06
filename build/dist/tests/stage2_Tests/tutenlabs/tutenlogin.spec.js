import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";
export async function tutenlabs_login(page, baseURL, username, password, testname) {

    try {
        const { expect } = require("@playwright/test");
        await page.goto(baseURL, {
            waitUntil: "networkidle",
        });

        await page.getByPlaceholder('Enter your email address').click();
        await page.getByPlaceholder('Enter your email address').fill(username);
        await page.getByRole('button', { name: 'Next' }).click();
        await page.getByPlaceholder('Enter password').fill(password);
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(2000);
        await page.waitForLoadState("networkidle");


    } catch (error) {
        console.log(error);
        let message =  `${testname} - Authentication - Logged in successfully`;
        console.error(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
}