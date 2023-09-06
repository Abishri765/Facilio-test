import { toPlaywrightReport } from "../../utils/Annotations";

export async function investa_loginWithPassword_app(page, baseURL, username, password, testName) {

  const { expect } = require("@playwright/test");
  // Navigate to the login page of the web application
  await page.goto(baseURL + "/auth/login", { timeout: 0 }, { waitUntil: "networkidle", });

  // Fill in the username field with the corresponding value from the configuration file
  await page.waitForSelector("#inputUsername");
  await page.click("#inputUsername");
  await page.fill("#inputUsername", username);

  await page.waitForSelector(
    ".fc-login-align > .fc-login-block > .pT27 > .fc-form-slide-in-left > .el-button"
  );

  // Click on the login button and wait for a response from the server
  await page.click(
    ".fc-login-align > .fc-login-block > .pT27 > .fc-form-slide-in-left > .el-button"
  );

  const response = await page.waitForResponse((res) => {
    if (res.url().includes(baseURL + "/api/integ/lookup")) {
      return res.url().startsWith(baseURL + "/api/integ/lookup");
    }
  });

  // Parse the response data and check if the username is valid
  const responsedata = await response.json();
  const responseCode = responsedata.responseCode;

  if (responseCode != 0) {
    console.log(responseCode);
    let message = `${testName} - Authentication - invalid username`
    console.log(message);
    await toPlaywrightReport(message);
    return responseCode;
  } else {

    // Fill in the password field with the corresponding value from the configuration file
    await page.waitForSelector("#inputPassword");
    await page.click("#inputPassword");
    await page.fill("#inputPassword", password);
    await page.waitForSelector(
      ".fc-login-align > .fc-login-block > .fade-in-lightbox > .fc-form-slide-in-next > .el-button"
    );

    // Click on the login button and wait for a response from the server
    await page.click(
      ".fc-login-align > .fc-login-block > .fade-in-lightbox > .fc-form-slide-in-next > .el-button"
    );

    try {
      const response = await page.waitForResponse((res) => {
        if (res.url().includes(baseURL + "/api/integ/loginWithPasswordAndDigest")) {
          return res.url().startsWith(baseURL + "/api/integ/loginWithPasswordAndDigest");
        }
      });

      // Parse the response data and check if the login was successful
      let responsedataPassword = await response.json();
      let responseCodePassword = responsedataPassword.responseCode;
      if (responseCodePassword != 0) {
        let message = responsedataPassword.jsonresponse.message
        console.log(`${testName} - Authentication - ${message}`);
        await toPlaywrightReport(`${testName} - Authentication - ${message}`);
        console.log(responseCodePassword);
        return responseCodePassword;
      }
    } catch (error) {
      //await page.waitForLoadState("networkidle", {timeout: 60000});
      await page.waitForTimeout(2000);
      await page.waitForLoadState("networkidle", { timeout: 0 });
      let domain = new URL(baseURL).hostname;
      const urlPattern = new RegExp(`.*${domain}`);
      await expect(page).toHaveURL(urlPattern);
      await page.getByText('Portfolio').click();
      await page.waitForLoadState("networkidle", { timeout: 60000 });
      let message = `${testName} - Authentication - Logged in successfully`;
      console.log(message);
      await toPlaywrightReport(message);
      return 0;
    }
  }
}
