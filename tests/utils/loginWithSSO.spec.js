import { toPlaywrightReport } from "./Annotations";

export async function loginWithSSO(page, baseURL, username, samlPassword, testname) {

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
    let message = "invalid username"
    console.log(message);
    await toPlaywrightReport(message);
    return responseCode;
  } else {
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    await page.getByRole('link', { name: 'Sign in using SAML' }).click();
    await page.waitForSelector("#username");
    await page.click("#username");
    await page.fill("#username", username);

    await page.waitForSelector("#password");
    await page.click("#password");
    await page.fill("#password", samlPassword);

    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.waitForLoadState("networkidle");
    const isElementVisible = await page.isVisible('#error-element-password');
    await page.waitForLoadState("networkidle");
    if (isElementVisible) {
      let message = testname+' : Wrong email or password'
      console.log(message);
      await toPlaywrightReport(message);
      return 2;
    }
    else {
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
      await page.waitForLoadState("networkidle");
      let domain = new URL(baseURL).hostname;
      const urlPattern = new RegExp(`.*${domain}`);
      await expect(page).toHaveURL(urlPattern);
      await page.getByRole("navigation", { name: "Portfolio" }).click();
      await page.waitForLoadState("networkidle");
      let message = `${testname} - Authentication - Logged in successfully`;
      console.error(message);
      await toPlaywrightReport(message);
      return 0;
    }
  }
}
