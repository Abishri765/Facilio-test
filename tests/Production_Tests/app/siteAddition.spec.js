export async function appSiteAddition(page, baseURL) {
  //playwright test to create test site
  const { expect } = require("@playwright/test");
  const fs = require("fs");

  try {
    await page.waitForTimeout(3000);
    await page.waitForLoadState("networkidle");
    await page.getByRole("navigation", { name: "Portfolio" }).click();
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Add" }).click();
    await page.waitForTimeout(1000);
    await page.getByText("New Site").click();
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    await page.locator('input[type="text"]').first().fill("Site1");
    await page.getByPlaceholder("Type your  Description").click();
    await page.getByPlaceholder("Type your  Description").fill("demo site");
    await page.getByRole("dialog", { name: "Site" }).locator("svg").click();
    await page.getByRole("dialog", { name: "Location Picker" }).locator("div").filter({ hasText: "To navigate, press the arrow keys." }).first()     .click();
    await page.getByRole("button", { name: "Done" }).click();
    await page.getByPlaceholder("Select").first().click();
    await page.locator("span").filter({ hasText: "Demo Connected" }).click();
    await page.getByPlaceholder("Select").nth(1).click();
    await page.click('[data-test-selector="siteType_Office"]');
    await page.locator(".form-two-column > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").first().click();
    await page.locator(".form-two-column > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").first().fill("90000");
    await page.locator("div:nth-child(8) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").click();
    await page.locator("div:nth-child(8) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").fill("100000");
    await page.locator("div:nth-child(9) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").click();
    await page.locator("div:nth-child(9) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").fill("25");
    await page.locator("div:nth-child(10) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").click();
    await page.locator("div:nth-child(10) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").fill("25");
    await page.locator("div:nth-child(11) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").click();
    await page.locator("div:nth-child(11) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").fill("25");
    await page.getByPlaceholder("Select").nth(2).click();
    await page.getByText("(UTC+05:30) Delhi, India").click();
    await page.locator("div:nth-child(13) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").click();
    await page.locator("div:nth-child(13) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner").fill("10");
    // click submit button to save the site
    await page.click('button.el-button[data-test-submit=""]');
    const responseSiteId = await page.waitForResponse(baseURL+'/newapp/api/v3/modules/site');

    let siteJson=await responseSiteId.json();
    let siteid=siteJson.data.site.id;

    // write the site ID to the siteData.json file
    const data = JSON.stringify({ appSiteId: siteid });
    fs.writeFileSync("tests/siteData.json", data);
    // Wait for the element to appear
    const selector = "p.el-message__content";
    const text = "Site created successfully";
    await page.waitForSelector(selector, { text });

    // Get the text content of the element
    const message = await page.$eval(selector, (el) => el.textContent.trim());

    // Check that the message matches the expected value
    expect(message).toBe("Site created successfully");
    console.log("Site1 created successfully");
    return 0;
  } catch (error) {
    console.log("Error Occurred: ", error);
    return 2;
  }
}
