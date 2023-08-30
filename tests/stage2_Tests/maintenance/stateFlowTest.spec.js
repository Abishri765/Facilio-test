import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function isStateFlowWorking(page, baseURL, testName) {
    const { expect } = require('@playwright/test');
    page.setDefaultTimeout(30000);

    try {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        await page.getByRole('link', { name: 'Maintenance' }).click();
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('//*[@id="q-app"]/div[1]/div[1]/div[2]/div/div[1]/main/div[1]/div/div[3]/div/div[1]');
        await page.getByRole('button', { name: 'New Work Order' }).click();
        await page.waitForLoadState('networkidle');
    } catch (error) {
        console.log(error);
        const message = `${testName} - StateFlow - cannot find New Workorder Button`
        console.log(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    try {
        await page.locator('.el-select > .el-input > .el-input__inner').first().click();
        await page.getByText('Playwright test').click();
        await page.locator('.fc-input-full-border2 > .el-input__inner').click();
        await page.locator('.fc-input-full-border2 > .el-input__inner').fill('playwright');
        await page.locator('.el-form-item__content > div > .el-select > .el-input > .el-input__inner').first().click();
        await page.getByRole('listitem').filter({ hasText: 'facilio' }).nth(1).click();
        await page.getByPlaceholder('Type your  Description').click();
        await page.getByPlaceholder('Type your  Description').fill('for testing purpose');
        await page.locator('.f-lookup-chooser > .el-select > .el-input > .el-input__inner').first().click();
        await page.getByRole('listitem').filter({ hasText: 'Energy' }).click();

        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        const element = page.locator('div:nth-child(6) > .el-form-item > .el-form-item__content > .f-lookup-chooser > .el-select > .el-input > .el-input__inner');
        await page.locator('div:nth-child(6) > .el-form-item > .el-form-item__content > .f-lookup-chooser > .el-select > .el-input > .el-input__inner').click();
        const maintenanceType = await element.getAttribute('placeholder');
        if (maintenanceType != 'Preventive') {
            const message = `${testName} - StateFlow - Maintenance field expected to have value as Preventive but got value as ${maintenanceType}`;
            await sendAlertMessage(message)
            await toPlaywrightReport(message);
            console.log(message);
        }

        const element2 = page.locator('.form-one-column > .el-form-item > .el-form-item__content > .f-lookup-chooser > .el-select > .el-input > .el-input__inner').first();
        const fieldIsEditable = await element2.isEditable();
        if (fieldIsEditable == true) {
            const message = `${testName} - StateFlow - Priority field expected to be disabled but is enabled`;
            await sendAlertMessage(message);
            await toPlaywrightReport(message);
            console.log(message);
        }

        await page.locator('div.fc-border-input-div2').click();
        await page.getByText('Unassigned').nth(1).click();
        await page.locator('div').filter({ hasText: 'aruna' }).nth(2).click();
        await page.getByRole('button', { name: 'Save' }).click();
        const selector = "p.el-message__content";
        let text = "Work Order created successfully";
        await page.waitForSelector(selector);

        // Get the text content of the element
        let message = await page.$eval(selector, (el) => el.textContent.trim());

        // Check that the message matches the expected value
        expect(message).toBe(text);
    } catch (error) {
        console.log(error);
        const message = `${testName} - StateFlow - Error: cannot create workorder, check build logs`;
        console.log(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    try {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'TO B' }).click();

        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'TO C' }).click();

        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'TO CLOSED' }).click();

        await page.waitForLoadState('networkidle');
        let message = `${testName} - StateFlow working normally`;
        console.log(message);
        await toPlaywrightReport(message);
    } catch (error) {
        console.log(error);
        const message = `${testName} - StateFlow - Error: StateFlow not working properly, check build logs`;
        console.log(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
};
