import { toPlaywrightReport } from "../../utils/Annotations";
import { sendAlertMessage } from "../../utils/bot";

export async function loginWithValidUsername_maintenance(page, baseURL, username, password, testname) {

  const { expect } = require("@playwright/test");
  // Navigate to the login page of the web application
  await page.goto(baseURL + "/auth/login", {
    waitUntil: "networkidle",
  });

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
    let message = `${testname} - Authentication - Invalid Username`;
    await sendAlertMessage(message);
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
        let message = responsedataPassword.jsonresponse.message;
        message = `${testname} - Authentication - ${message}`;
        console.error(message)
        await sendAlertMessage(message);
        await toPlaywrightReport(message);
        return responseCodePassword;
      }
    } catch (error) {
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
      await page.waitForLoadState("networkidle");
      let domain = new URL(baseURL).hostname;
      const urlPattern = new RegExp(`.*${domain}`);
      await expect(page).toHaveURL(urlPattern);
      await page.getByRole("link", { name: "Portfolio" }).click();
      await page.waitForLoadState("networkidle");
      let message = `${testname} - Authentication - Logged in successfully`;
      console.log(message);
      await toPlaywrightReport(message);
      return 0;
    }
  }
}
