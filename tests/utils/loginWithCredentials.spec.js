import { toPlaywrightReport } from "./Annotations";

export async function loginWithCredentials(page, baseURL, username, password, testname) {

  const { expect } = require("@playwright/test");
  // Navigate to the login page of the web application
  await page.goto(baseURL + "/auth/login", {
    waitUntil: "networkidle",
  });

  // Fill in the username field with the corresponding value from the configuration file
  await page.waitForSelector("#inputUsername");
  await page.click("#inputUsername");
  await page.fill("#inputUsername", username);

  await page.waitForSelector("#inputPassword");
  await page.click("#inputPassword");
  await page.fill("#inputPassword", password);

  // Click on the login button and wait for a response from the server
  await page.click('button.el-button.btn.btn-primary.fc-login-btn.mT20.el-button--default');
  await page.waitForLoadState('networkidle');
  const loginApi = baseURL + "/api/integ/loginWithUserNameAndPassword"
  try {
    const response = await page.waitForResponse((res) => {
      if (res.url().includes(loginApi)) {
        return res.url().startsWith(loginApi);
      }
    });

    // Parse the response data and check if the login was successful
    let responsedataPassword = await response.json();
    let responseCodePassword = responsedataPassword.responseCode;
    if (responseCodePassword != 0) {
      let message = responsedataPassword.jsonresponse.message
      message = `${testname} - Authentication - ${message}`;
      console.log(message);
      await toPlaywrightReport(message);
      return responseCodePassword
    }
  } catch (error) {
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    let domain = new URL(baseURL).hostname;
    const urlPattern = new RegExp(`.*${domain}`);
    await expect(page).toHaveURL(urlPattern);
    await page.waitForLoadState('networkidle');
    let message =  `${testname} - Authentication - Logged in successfully`;
    console.log(message);
    await toPlaywrightReport(message);
  }
}
