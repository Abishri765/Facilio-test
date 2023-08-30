import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function serviceRequests_maintenance(page, baseURL, testName) {
    const { expect } = require("@playwright/test");
    page.setDefaultTimeout(30000);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    try {
        await page.getByRole('link', { name: 'help Center' }).click();
        await page.waitForSelector('.el-table');
        let message = `${testName} - Service Requests - service requests list page working`
        console.log(message);
        await toPlaywrightReport(message);
    } catch (error) {
        console.log(error);
        const message = `${testName} - Service Requests - list page not working`
        console.log(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    try {
        await page.getByRole('button', { name: 'New Service Request' }).click();
        await page.locator('.fc-input-full-border2 > .el-input__inner').click();
        await page.locator('.fc-input-full-border2 > .el-input__inner').fill('Test');
        await page.getByPlaceholder('Type your  Description').click();
        await page.getByPlaceholder('Type your  Description').fill('for testing purpose');
        await page.getByPlaceholder('Select').first().click();
        await page.getByRole('listitem').filter({ hasText: 'facilio' }).nth(1).click();
        await page.getByPlaceholder('Select').nth(1).click();
        await page.getByRole('listitem').filter({ hasText: 'abishek' }).click();
        await page.locator('div:nth-child(6) > .el-form-item > .el-form-item__content > .f-lookup-chooser > .el-select > .el-input > .el-input__prefix > .flRight').click();
        await page.getByRole('cell', { name: '1755251' }).click();
        await page.locator('div.fc-border-input-div2').click();
        await page.getByText('Unassigned').nth(1).click();
        await page.getByText('aruna').nth(3).click();
        await page.getByPlaceholder('Select').nth(3).click();
        await page.getByRole('listitem').filter({ hasText: 'Not Urgent' }).click();
        await page.getByRole('button', { name: 'Save' }).click();
        const selector = "p.el-message__content";
        const text = "Service Request created successfully";
        await page.waitForSelector(selector);

        // Get the text content of the element
        const message = await page.$eval(selector, (el) => el.textContent.trim());

        // Check that the message matches the expected value
        expect(message).toBe(text);
    } catch (error) {
        console.log(error);
        let message = `${testName} - Service Requests - cannot create service requests`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    try {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('.sr-email-thread-widget');
        let message = `${testName} - Service Requests - service requests created successfully`;
        console.log(message);
        await toPlaywrightReport(message);
    } catch (error) {
        console.log(error);
        let message = `${testName} - Service Requests - cannot view summary page`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
}