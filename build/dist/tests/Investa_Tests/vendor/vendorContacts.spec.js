import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function vendorPickList(page, baseURL, testName) {
    page.setDefaultTimeout(30000);
    const url = 'https://investa.faciliovendors.com/vendor/workorder/workorders/allopenadmin/102698/overview'
    try {
        await page.waitForLoadState('networkidle');
        await page.goto(url);
        await page.waitForLoadState('networkidle');
    } catch (error) {
        console.log(error);
        let message = `${testName} - vendor contacts - url:${url} not available`;
        console.error(message);
        await sendAlertMessage(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }
    const vendorContacts = `${baseURL}/vendor/api/v3/picklist/vendorcontact`
    try {
        await page.getByRole('button', { name: '' }).click();
        await page.getByText('Reassign Worker').click();
        await page.waitForSelector('div.el-dialog__body');

        const vendorContactsResponse = await page.waitForResponse(res => res.url().startsWith(vendorContacts));
        const vendorContactsData = await vendorContactsResponse.json();
        const pickListCount = vendorContactsData.data.pickList.length;
        if (pickListCount == 0) {
            let message = `${testName} - vendor contacts - Lookup list page is empty`;
            await sendAlertMessage(message);
            await toPlaywrightReport(message);
            console.error(message);
        }
        await page.getByRole('button', { name: 'Cancel' }).click();
    } catch (error) {
        await page.getByRole('button', { name: 'Cancel' }).click();
        console.log(error);
        let message = `${testName} - vendor contacts - cannot fetch API: ${encodeURIComponent(vendorContacts)}`;
        console.error(message);
        await sendAlertMessage(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }
}
