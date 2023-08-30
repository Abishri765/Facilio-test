import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function serviceRequests(page, baseURL, testName) {
    page.setDefaultTimeout(30000);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    try{
        await page.getByRole('complementary').getByRole('button', { name: '' }).click();
        await page.getByText('Help Center').click();
        await page.waitForSelector('.el-table');
        let message = `${testName} - Service Requests - service requests list page working`;
        console.log(message);
        await toPlaywrightReport(message);
    }catch(error){
        console.log(error);
        let message = `${testName} - Service Requests - list page not working`;
        console.log(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    try{
    await page.getByRole('button', { name: 'New Service Request' }).click();
    await page.locator('.fc-input-full-border2 > .el-input__inner').click();
    await page.locator('.fc-input-full-border2 > .el-input__inner').fill('Test');
    await page.getByPlaceholder('Type your  Description').click();
    await page.getByPlaceholder('Type your  Description').fill('for testing purpose');
    await page.locator('input.el-input__inner').nth(2).click();
    await page.getByRole('listitem').filter({ hasText: 'Yem' }).click();
    await page.locator('form').filter({ hasText: 'SubjectDescriptionSiteRequester abiramiAbirami sAravindAravindArunaarunaarunaaru' }).getByPlaceholder('Select').nth(1).click();
    await page.getByRole('listitem').filter({ hasText: 'abirami' }).first().click();
    await page.locator('div.fc-border-input-div2').click();
    await page.getByText('Unassigned').nth(1).click();
    await page.getByText('Mukundhan').nth(1).click();
    await page.locator('form').filter({ hasText: 'SubjectDescriptionSiteRequester abiramiAbirami sAravindAravindArunaarunaarunaaru' }).getByPlaceholder('Select').nth(3).click();
    await page.getByRole('listitem').filter({ hasText: 'Not Urgent' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    }catch(error){
        console.log(error);
        let message = `${testName} - Service Requests - cannot create service requests`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    try{
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.sr-email-thread-widget');
    let message = `${testName} - Service Requests - service requests created successfully`;
    console.log(message);
    await toPlaywrightReport(message);
    }catch(error){
        console.log(error);
        let message = `${testName} - Service Requests - cannot view summary page`;
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
}