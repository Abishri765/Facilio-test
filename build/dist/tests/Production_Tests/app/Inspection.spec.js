export async function appInspection(page) {
  //playwright test to create Inspection template.
  const fs = require("fs");
  try {
    const data = fs.readFileSync("tests/siteData.json", "utf8");
    // parse the JSON data
    const siteData = JSON.parse(data);
    // get the siteId value
    const appsiteId = siteData.appSiteId;
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    await page.getByRole("link", { name: "Inspection" }).click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    await page.getByRole("button", { name: "NEW INSPECTION TEMPLATE" }).click();
    await page.getByRole("textbox", { name: "Select" }).first().click();
    await page.getByRole("listitem").filter({ hasText: "Single" }).click();
    await page.getByRole("textbox", { name: "Select" }).nth(1).click();
    await page.getByRole("listitem").filter({ hasText: "Site1" }).click();
    await page.locator("div:nth-child(9) > .el-form-item > .el-form-item__content > .f-lookup-chooser > .el-select > .el-input > .el-input__prefix > .flRight").click();
    await page.waitForLoadState("networkidle");
    await page.getByRole("cell", { name: appsiteId }).click();
    await page.waitForLoadState("networkidle");
    await page.locator("form div").filter({hasText:"Inspection Details NameDescriptionCategoryComplianceCondition AssessmentInspecti",}).getByRole("textbox").first().click();
    await page.locator("form div").filter({hasText:"Inspection Details NameDescriptionCategoryComplianceCondition AssessmentInspecti",}).getByRole("textbox").first().fill("DemoSite1Inspection");
    await page.getByPlaceholder("Type your  Description").click();
    await page.getByPlaceholder("Type your  Description").fill("For testing purpose only");
    await page.getByRole("textbox", { name: "Select" }).nth(3).click();
    await page.getByRole("listitem").filter({ hasText: "Inspection" }).nth(2).click();
    await page.getByRole("textbox", { name: "Select" }).nth(4).click();
    await page.getByRole("listitem").filter({ hasText: "Low" }).click();
    const teamStaffElement = page.locator('[data-test-selector="Team/Staff"]');
    await teamStaffElement.click();
    await page.getByText("Staff Unassigned").click();
    await page.getByText("Demo Connected").click();
    await page.getByRole("button", { name: "Add Trigger" }).click();
    await page.getByRole("button", { name: "SAVE", exact: true }).click();
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Save" }).click();
    console.log('App: Inspection Template created successfully');
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Q & A Builder" }).click();
    await page.waitForTimeout(2000);
    await page.waitForLoadState("networkidle");
    const source = await page.getByText("Short Answer");
    const destination = await page.locator(".questions-drag");
    const srcBound = await source.boundingBox();
    const dstBount = await destination.boundingBox();
    await page.mouse.move(srcBound.x + srcBound.width / 2, srcBound.y + srcBound.height / 2);
    await page.mouse.down();
    await page.mouse.move(dstBount.x + dstBount.width / 2, dstBount.y + dstBount.height / 2);
    await page.mouse.down();
    await page.mouse.up();
    await page.waitForLoadState("networkidle");
    await page.locator("input.el-input__inner").nth(0).click();
    await page.locator("input.el-input__inner").nth(0).fill("Done cleaning?");
    await page.locator("textarea.el-textarea__inner").click();
    await page.locator("textarea.el-textarea__inner").fill("For testing purpose only");
    await page.locator('button:has-text("Save")').click();
    await page.getByText("Done").click();
    await page.pause();
    await page.locator('span.el-dropdown-link.el-dropdown-selfdefine').click();
    await page.getByText("Execute Now").click();
  } catch (error) {
    console.log(error);
  }
}
