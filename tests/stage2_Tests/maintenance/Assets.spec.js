import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function createAsset_maintenance_stage2(page, baseURL, testName) {
    page.setDefaultTimeout(30000);
    try {
        await page.waitForTimeout(3000);
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: 'Asset' }).click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('button', { name: 'New Assets' }).click();

    } catch (error) {
        console.log(error);
        const message = `${testName} - Asset Creation - Cannot find New Assets button`;
        console.error(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    try {
        await page.getByPlaceholder('Select').click();
        await page.getByRole('listitem').filter({ hasText: 'Cooling Tower' }).click();
        await page.getByRole('button', { name: 'CONFIRM' }).click();
    } catch (error) {
        console.log(error);
        const message = `${testName} - Asset Creation - Cannot select Asset category type`;
        console.error(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    const executeFormActionRulesApi = `${baseURL}/maintenance/api/v2/form/rule/executeFormActionRules`
    try {
        const response = await page.waitForResponse(res => res.url().startsWith(executeFormActionRulesApi));
        let statusCode = response.status();

        if (statusCode < 200 || statusCode > 299) {
            throw new Error(`${testName} - Asset Creation - Error status code occurred`);
        }
    } catch (error) {
        console.log(error);
        const message = `${testName} - Asset Creation - Cannot find API: ${executeFormActionRulesApi}`;
        console.error(message);
        await sendAlertMessage(encodeURIComponent(message));
        await toPlaywrightReport(message);
        return -1;
    }
    try {
        await page.waitForLoadState('networkidle');
        await page.locator('.fc-input-full-border2 > .el-input__inner').first().click();
        await page.locator('.fc-input-full-border2 > .el-input__inner').first().fill('TestAsset');
        await page.locator('.el-select > .el-input > .el-input__inner').first().click();
        await page.getByRole('listitem').filter({ hasText: 'facilio' }).nth(1).click();
        await page.getByRole('button', { name: 'Save' }).click();
    } catch (error) {
        console.log(error);
        const message = `${testName} - Asset Creation - Error occurred in creating Assets`;
        console.error(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    const assetApi = `${baseURL}/maintenance/api/v3/modules/asset`;
    try{
        const response = await page.waitForResponse(res => res.url().startsWith(assetApi));
        let statusCode = response.status();
        let assetData = await response.json();
        const assetId = assetData.data.asset.id;
        if(!(assetId>0)){
            throw new Error(`${testName} - Asset Creation - Cannot fetch asset ID`)
        }
        if (statusCode < 200 || statusCode > 299) {
            throw new Error(`${testName} - Asset Creation - Error status code occurred`);
        }
        const message = `${testName} - Asset Creation - Asset created successfully`;
        console.log(message);
        await toPlaywrightReport(message);
    }catch(error){
        console.log(error);
        const message = `${testName} - Asset Creation - Cannot find API: ${assetApi}`;
        console.error(message);
        await sendAlertMessage(encodeURIComponent(message));
        await toPlaywrightReport(message);
        return -1;
    }
};
