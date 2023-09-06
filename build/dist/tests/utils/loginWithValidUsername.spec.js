import { toPlaywrightReport } from "./Annotations";
import { sendAlertMessage } from "./bot";

export async function loginWithValidUsername(page, baseURL, username, password, testname) {
  page.setDefaultTimeout(30000);

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
  const loginUsernameApi = baseURL + "/api/integ/lookup"
  let responseCode = 0
  try {
    const response = await page.waitForResponse((res) => {
      if (res.url().includes(loginUsernameApi)) {
        return res.url().startsWith(loginUsernameApi);
      }
    });

    // Parse the response data and check if the username is valid
    const responsedata = await response.json();
    responseCode = responsedata.responseCode;
  } catch (error) {
    let message = `${testname} - Authentication - cannot find API: ${loginUsernameApi}`
    console.log(message);
    await toPlaywrightReport(message);
    await sendAlertMessage(message);
    return -1;
  }

  if (responseCode != 0) {
    console.log(responseCode);
    console.log("invalid username");
    let message = `${testname} - Authentication - Invalid username`
    await sendAlertMessage(message);
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
    let response;
    const loginPasswordApi = baseURL + "/api/integ/loginWithPasswordAndDigest"
    try {
      response = await page.waitForResponse((res) => {
        if (res.url().includes(loginPasswordApi)) {
          return res.url().startsWith(loginPasswordApi);
        }
      });
    } catch (error) {
      console.log(error);
      let message = `${testname} - Authentication - cannot find API: ${loginPasswordApi}`
      console.log(message);
      await sendAlertMessage(message);
      return -1;
    }

    // Parse the response data and check if the login was successfull
    try {
      let responsedataPassword = await response.json();
      let responseCodePassword = responsedataPassword.responseCode;
      if (responseCodePassword != 0) {
        const message = responsedataPassword.jsonresponse.message
        let reportMessage = `${testname} - Authentication - ${message}`;
        console.log(reportMessage);
        await sendAlertMessage(reportMessage);
        return responseCodePassword;
      }
    } catch (error) { //returns unnecessary error
     }
    try {
      const message = `${testname} - Authentication - Logged in successfully`;
      console.log(message);
      await toPlaywrightReport(message);
      await page.waitForLoadState("networkidle", { timeout: 30000 });
      await page.waitForTimeout(2000);
      await page.waitForLoadState("networkidle");
      let domain = new URL(baseURL).hostname;
      const urlPattern = new RegExp(`.*${domain}`);
      await expect(page).toHaveURL(urlPattern);
      await page.getByRole("navigation", { name: "Portfolio" }).click();
      await page.waitForLoadState("networkidle");
      return 0;
    } catch (error) {
      console.log(error);
      let message = `${testname} - Authentication - Web content not loaded properly`
      console.log(message);
      await sendAlertMessage(message);
      await toPlaywrightReport(message);
      return -1;
    }
  }
}
