import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

/**
 * Checks feeds on a webpage and makes an API call to retrieve the feed data.
 * @param {Page} page - The playwright page object.
 * @param {string} baseURL - The base URL of the API.
 * @param {string} testName - The name of the test.
 * @returns {Promise<number>} Returns -1 if an error occurs
 */

export async function checkFeeds(page, baseURL, testName) {
    await page.waitForLoadState('networkidle');
    try {
        await page.getByRole('link', { name: 'Feeds' }).click();
    }
    catch (error) {
        console.error(error);
        let message = `${testName} - Feeds - could not find feeds button`;
        console.error(message);
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return -1;
    }
    const api = `${baseURL}/service/api/v3/modules/newsandinformation/view/allfeeds?viewName=allfeeds&page=1&perPage=10&withCount=true&moduleName=newsandinformation`;
    try {
        // Make the API call to retrieve the feed data.
        const response = await page.waitForResponse((res) => {
            if (res.url().includes(api)) {
                return res.url().startsWith(api);
            }
        });

        // Parse the response data and check if the username is valid
        const responseData = await response.json();
        const statusCode = response.status();

        if (statusCode < 200 || statusCode > 299) {
            let message = `${testName} - Feeds - API: ${api} ${JSON.stringify(responseData)}`;
            await sendAlertMessage(encodeURIComponent(message));
            console.error(`statusCode: ${statusCode} ${message}`);
            message = JSON.stringify(message);
            await toPlaywrightReport(message);
            return -1;
        }
        else{
            let message = `${testName} - Feeds - Feeds page working Normally`;
            console.log(message);
            await toPlaywrightReport(message);
        }
    }
    catch (error) {
        console.error(error);
        let message = `${testName} - Feeds - could not find API ${encodeURIComponent(api)}`
        await sendAlertMessage(message);
        message = JSON.stringify(message);
        await toPlaywrightReport(message);
        return -1;
    }
}
