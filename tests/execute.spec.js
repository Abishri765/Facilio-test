var fs = require("fs");
const { test } = require("@playwright/test");
const {
  loginWithValidUsername_maintenance,
} = require("./Production_Tests/maintenance/loginWithValidUsername.spec");
const { credentials } = require("../facilio.config");
const {
  isInspectionTriggered,
} = require("./Production_Tests/app/InspectionTrigger.spec");
const { investa_credentials } = require("./Investa_Tests/investa.config");
const {
  investa_loginWithPassword_app,
} = require("./Investa_Tests/app/loginwithpassword.spec");
const { investa_logout_app } = require("./Investa_Tests/app/logout.spec");
const {
  investa_loginWithPassword_vendor,
} = require("./Investa_Tests/vendor/loginwithpassword.spec");
const { investa_logout_vendor } = require("./Investa_Tests/vendor/logout.spec");
const { investa_workorder } = require("./Investa_Tests/vendor/workorder.spec");
const { investa_induction } = require("./Investa_Tests/vendor/Induction.spec");
const { investa_swms } = require("./Investa_Tests/vendor/swms.spec");
const {
  investa_loginWithPassword_tenants,
} = require("./Investa_Tests/tenant/loginwithpassword.spec");
const {
  investa_logout_tenants,
} = require("./Investa_Tests/tenant/logout.spec");
const {
  investa_serviceRequests,
} = require("./Investa_Tests/tenant/serviceRequests.spec");
const { investa_visitor } = require("./Investa_Tests/tenant/visitor.spec");
const {
  investa_announcements,
} = require("./Investa_Tests/tenant/announcements.spec");
const { timestamp } = require("./timestamp.spec");
const { chromium } = require("playwright");
const {
  loginWithValidUsername,
} = require("./utils/loginWithValidUsername.spec");
const { logoutByAvatarClick } = require("./utils/logoutByAvatarClick.spec");
const { loginWithSSO } = require("./utils/loginWithSSO.spec");
const { loginWithCredentials } = require("./utils/loginWithCredentials.spec");
const { logoutByAvatarHover } = require("./utils/logoutByAvatarHover.spec");
const { checkFeeds } = require("./stage2_Tests/pilot/feeds.spec");
const { tutencredentials } = require("./stage2_Tests/tutenlabs/tuten.config");
import { logoutByAvatarClick_stage2Maintenance } from "./stage2_Tests/maintenance/logoutByAvatarClick.spec";
import { sendAlertMessage } from "./utils/bot";
import { vendorPickList } from "./Investa_Tests/vendor/vendorContacts.spec";
import { isFormRuleWorking_maintenance } from "./Production_Tests/maintenance/formRule.spec";
import { isStateFlowWorking_maintenance } from "./Production_Tests/maintenance/stateFlow.spec";
import { isWorkOrderPageWorking } from "./Production_Tests/vendor/workOrder.spec";
import { isCreateRequestWorking } from "./Production_Tests/tenant/createRequest.spec";
import { toPlaywrightReport } from "./utils/Annotations";
import { createAsset_maintenance } from "./Production_Tests/maintenance/Assets.spec";
import { loginWithSSO_identity } from "./utils/loginWithSSO_identity.spec";
import { loginWithValidUsername_identity } from "./utils/loginWithValidUsername_identity.spec";
import { loginWithCredentials_identity } from "./utils/loginWithCredentials_identity.spec";
import { loginWithValidUsername_maintenance_identity } from "./Production_Tests/maintenance/loginWithValidUsername_identity.spec";
import { investa_loginWithPassword_app_identity } from "./Investa_Tests/app/loginWithPassword_identity.spec";
import { investa_loginWithPassword_tenants_identity } from "./Investa_Tests/tenant/loginWithCredentials_identity.spec";
import { investa_loginWithPassword_vendor_identity } from "./Investa_Tests/vendor/loginWithCredentials_identity.spec";
import { loginWithValidUsername_stage2Maintenace_identity } from "./stage2_Tests/maintenance/loginWithValidUsername_identity.spec";
import { tutenlabs_login } from "./stage2_Tests/tutenlabs/tutenlogin.spec";
import { verify_pageload } from "./stage2_Tests/tutenlabs/verifypageload.spec";
// stage2 mainapp
import { createWorkorder_mainApp } from "./workorder_Tests/stage2_tests/app/createWorkorder.spec";
import { editWorkorder_mainApp } from "./workorder_Tests/stage2_tests/app/editWorkorder.spec";
import { deleteWorkorder_mainApp } from "./workorder_Tests/stage2_tests/app/deleteWorkorder.spec";

// stage2 maintenance
import { createWorkorder_maintenance_wo } from "./workorder_Tests/stage2_tests/maintenance/createWorkorder.spec";
import { editWorkorder_maintenance } from "./workorder_Tests/stage2_tests/maintenance/editWorkorder.spec";
import { deleteWorkorder_maintenance } from "./workorder_Tests/stage2_tests/maintenance/deleteWorkorder.spec";

// stage2 portals
// tenant portal
import { createWorkorder_tenantportal } from "./workorder_Tests/stage2_tests/tenant_portal/createWorkorder.spec";
import { editWorkorder_tenantportal } from "./workorder_Tests/stage2_tests/tenant_portal/editWorkorder.spec";
import { deleteWorkorder_tenantportal } from "./workorder_Tests/stage2_tests/tenant_portal/deleteWorkorder.spec";
// vendor portal
import { createWorkorder_vendorportal } from "./workorder_Tests/stage2_tests/vendor_portal/createWorkorder.spec";
import { editWorkorder_vendorportal } from "./workorder_Tests/stage2_tests/vendor_portal/editWorkorder.spec";
import { deleteWorkorder_vendorportal } from "./workorder_Tests/stage2_tests/vendor_portal/deleteWorkorder.spec";
// occupant portal
import { createWorkorder_occupantportal } from "./workorder_Tests/stage2_tests/occupant_portal/createWorkorder.spec";
import { editWorkorder_occupantportal } from "./workorder_Tests/stage2_tests/occupant_portal/editWorkorder.spec";
import { deleteWorkorder_occupantportal } from "./workorder_Tests/stage2_tests/occupant_portal/deleteWorkorder.spec";
// employee portal
import { createWorkorder_employeeportal } from "./workorder_Tests/stage2_tests/employee_portal/createWorkorder.spec";
import { editWorkorder_employeeportal } from "./workorder_Tests/stage2_tests/employee_portal/editWorkorder.spec";
import { deleteWorkorder_employeeportal } from "./workorder_Tests/stage2_tests/employee_portal/deleteWorkorder.spec";

import { workorderList } from "./utils/workOrderList.spec";
import { facilioscript_onCreate } from "./stage2_Tests/maintenance/facilioscript_onCreate.spec";
import { facilioscript_onFieldChange } from "./stage2_Tests/maintenance/facilioscript_onFieldChange.spec";

fs.writeFile("logs.json", '{"consoleLogs":[]}', function (err) {
  if (err) throw err;
  console.log("logs.json created");
});

test("timestamp", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await timestamp(page);
  } catch (error) {
    let message = "Error occurred in timestamp";
    console.log(message);
    console.log(error);
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("SSO app.facilio", async () => {
  const testname = "SSO app.facilio";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithSSO(
      page,
      credentials.app.baseURL,
      credentials.app.username,
      credentials.app.samlPassword,
      testname
    );
    await logoutByAvatarClick(page, testname);
  } catch (error) {
    console.log(error);
    let message = `${testname} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("SSO app.facilio identity", async () => {
  const testname = "SSO app.facilio";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithSSO_identity(
      page,
      credentials.app.baseURL,
      credentials.app.username,
      credentials.app.samlPassword,
      testname
    );
    await logoutByAvatarClick(page, testname);
  } catch (error) {
    console.log(error);
    let message = `${testname} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("app.facilio", async () => {
  const testname = "Main app";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithValidUsername(
      page,
      credentials.app.baseURL,
      credentials.app.username,
      credentials.app.password,
      testname
    );
    await isInspectionTriggered(page, testname);
    await logoutByAvatarClick(page, testname);
    await loginWithValidUsername_identity(
      page,
      credentials.app.baseURL,
      credentials.app.username,
      credentials.app.password,
      testname
    );
  } catch (error) {
    console.log(error);
    let message = `${testname} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("occupant portal", async () => {
  const testname = "Occupant portal";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.occupantportal.baseURL,
      credentials.occupantportal.username,
      credentials.occupantportal.password,
      testname
    );
    await isCreateRequestWorking(
      page,
      credentials.occupantportal.baseURL,
      testname
    );
    await logoutByAvatarHover(page, testname);
    await loginWithCredentials_identity(
      page,
      credentials.occupantportal.baseURL,
      credentials.occupantportal.username,
      credentials.occupantportal.password,
      testname
    );
  } catch (error) {
    console.log(error);
    let message = `${testname} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("vendor portal", async () => {
  const testname = "Vendor portal";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.vendorportal.baseURL,
      credentials.vendorportal.username,
      credentials.vendorportal.password,
      testname
    );
    await isWorkOrderPageWorking(
      page,
      credentials.vendorportal.baseURL,
      testname
    );
    await logoutByAvatarHover(page, testname);
    await loginWithCredentials_identity(
      page,
      credentials.occupantportal.baseURL,
      credentials.occupantportal.username,
      credentials.occupantportal.password,
      testname
    );
  } catch (error) {
    console.log(error);
    let message = `${testname} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("tenant portal", async () => {
  const testname = "Tenant portal";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.tenantportal.baseURL,
      credentials.tenantportal.username,
      credentials.tenantportal.password,
      testname
    );
    await isCreateRequestWorking(
      page,
      credentials.tenantportal.baseURL,
      testname
    );
    await logoutByAvatarHover(page, testname);
    await loginWithCredentials_identity(
      page,
      credentials.occupantportal.baseURL,
      credentials.occupantportal.username,
      credentials.occupantportal.password,
      testname
    );
  } catch (error) {
    console.log(error);
    let message = `${testname} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("maintenance", async () => {
  const testname = "Maintenance";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithValidUsername_maintenance(
      page,
      credentials.maintenance.baseURL,
      credentials.maintenance.username,
      credentials.maintenance.password,
      testname
    );
    await createAsset_maintenance(
      page,
      credentials.maintenance.baseURL,
      testname
    );
    await isFormRuleWorking_maintenance(
      page,
      credentials.maintenance.baseURL,
      testname
    );
    await isStateFlowWorking_maintenance(
      page,
      credentials.maintenance.baseURL,
      testname
    );
    await logoutByAvatarClick(page, testname);
    await loginWithValidUsername_maintenance_identity(
      page,
      credentials.maintenance.baseURL,
      credentials.maintenance.username,
      credentials.maintenance.password,
      testname
    );
  } catch (error) {
    console.log(error);
    let message = `${testname} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("Investa app.facilio", async () => {
  const testName = "Investa app.facilio";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await investa_loginWithPassword_app(
      page,
      investa_credentials.app.baseURL,
      investa_credentials.app.username,
      investa_credentials.app.password,
      testName
    );
    await investa_logout_app(page, testName);
    await investa_loginWithPassword_app_identity(
      page,
      investa_credentials.app.baseURL,
      investa_credentials.app.username,
      investa_credentials.app.password,
      testName
    );
  } catch (error) {
    console.log(error);
    let message = `${testName} - Unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("Investa vendor portal", async () => {
  const testName = "Investa vendor";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await investa_loginWithPassword_vendor(
      page,
      investa_credentials.vendorportal.baseURL,
      investa_credentials.vendorportal.username,
      investa_credentials.vendorportal.password,
      testName
    );
    await investa_workorder(
      page,
      investa_credentials.vendorportal.baseURL,
      testName
    );
    await vendorPickList(
      page,
      investa_credentials.vendorportal.baseURL,
      testName
    );
    await investa_swms(
      page,
      investa_credentials.vendorportal.baseURL,
      testName
    );
    await investa_induction(
      page,
      investa_credentials.vendorportal.baseURL,
      testName
    );
    await investa_logout_vendor(page, testName);
    await investa_loginWithPassword_vendor_identity(
      page,
      investa_credentials.vendorportal.baseURL,
      investa_credentials.vendorportal.username,
      investa_credentials.vendorportal.password,
      testName
    );
  } catch (error) {
    console.log(error);
    let message = `${testName} - Unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("Investa tenant portal", async () => {
  const testName = "Investa tenant";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await investa_loginWithPassword_tenants(
      page,
      investa_credentials.tenantsportal.baseURL,
      investa_credentials.tenantsportal.username,
      investa_credentials.tenantsportal.password,
      testName
    );
    await investa_serviceRequests(
      page,
      investa_credentials.tenantsportal.baseURL,
      testName
    );
    await investa_visitor(
      page,
      investa_credentials.tenantsportal.baseURL,
      testName
    );
    await investa_announcements(
      page,
      investa_credentials.tenantsportal.baseURL,
      testName
    );
    await investa_logout_tenants(page, testName);
    await investa_loginWithPassword_tenants_identity(
      page,
      investa_credentials.tenantsportal.baseURL,
      investa_credentials.tenantsportal.username,
      investa_credentials.tenantsportal.password,
      testName
    );
  } catch (error) {
    console.log(error);
    let message = `${testName} - Unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("Stage2 main app", async () => {
  const testName = "Stage2 main app";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithValidUsername(
      page,
      credentials.app.baseURL,
      credentials.app.username,
      credentials.app.password,
      testName
    );
    await isInspectionTriggered(page, testName);
    await logoutByAvatarClick(page, testName);
    await loginWithValidUsername_identity(
      page,
      credentials.app.baseURL,
      credentials.app.username,
      credentials.app.password,
      testName
    );
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("Stage2 maintenance app", async () => {
  const testName = "Stage2 maintenancea app";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithValidUsername_maintenance(
      page,
      credentials.stage2maintenance.baseURL,
      credentials.stage2maintenance.username,
      credentials.stage2maintenance.password,
      testName
    );
    await createAsset_maintenance(
      page,
      credentials.stage2maintenance.baseURL,
      testName
    );
    await isFormRuleWorking_maintenance(
      page,
      credentials.stage2maintenance.baseURL,
      testName
    );
    await isStateFlowWorking_maintenance(
      page,
      credentials.stage2maintenance.baseURL,
      testName
    );
    await facilioscript_onCreate(
      page,
      credentials.stage2maintenance.baseURL,
      testName
    );
    await facilioscript_onFieldChange(
      page,
      credentials.stage2maintenance.baseURL,
      testName
    );
    await logoutByAvatarClick(page, testName);
    await loginWithValidUsername_maintenance_identity(
      page,
      credentials.stage2maintenance.baseURL,
      credentials.stage2maintenance.username,
      credentials.stage2maintenance.password,
      testName
    );
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("Pre-app", async () => {
  const testname = "Pre-app";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithValidUsername(
      page,
      credentials.pre_app.baseURL,
      credentials.pre_app.username,
      credentials.pre_app.password,
      testname
    );
    await logoutByAvatarClick(page, testname);
    await loginWithValidUsername_identity(
      page,
      credentials.pre_app.baseURL,
      credentials.pre_app.username,
      credentials.pre_app.password,
      testname
    );
  } catch (error) {
    console.log(error);
    let message = `${testname} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

test("Pilot-stage2", async () => {
  const testname = "Pilot-stage2";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.pilot_stage2.baseURL,
      credentials.pilot_stage2.username,
      credentials.pilot_stage2.password,
      testname
    );
    await checkFeeds(page, credentials.pilot_stage2.baseURL, testname);
    await logoutByAvatarHover(page, testname);
    await loginWithCredentials_identity(
      page,
      credentials.pilot_stage2.baseURL,
      credentials.pilot_stage2.username,
      credentials.pilot_stage2.password,
      testname
    );
  } catch (error) {
    console.log(error);
    let message = `${testname} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

// test("Tutenlabs", async () => {
//   const testname = 'Tutenlabs';
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   let page = await context.newPage();
//   try {
//     await tutenlabs_login(page, tutencredentials.tutenlabs.baseURL, tutencredentials.tutenlabs.username, tutencredentials.tutenlabs.password, testname );
//     await verify_pageload(page, tutencredentials.tutenlabs.dashboard, testname );
//     await logoutByAvatarClick(page, testname);
//   } catch (error) {
//     let message = 'Tutenlabs Testcase failed';
//     console.log(message);
//     console.log(error);
//     await sendAlertMessage(message);
//     await toPlaywrightReport(message);
//   }
//   browser.close();
// });

test("app-au", async () => {
  const testName = "app-au";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithSSO_identity(
      page,
      credentials.app_au.baseURL,
      credentials.app_au.username,
      credentials.app_au.samlPassword,
      testName
    );
    await logoutByAvatarClick(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
  browser.close();
});

// stage2 mainapp

test("Stage2 wo main app", async () => {
  const testName = "Stage2 wo main app";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithValidUsername(
      page,
      credentials.stage2appWo.baseURL,
      credentials.stage2appWo.username,
      credentials.stage2appWo.password,
      testName
    );
    await workorderList(
      page,
      credentials.stage2appWo.baseURL,
      testName,
      "newapp",
      "all"
    );
    await createWorkorder_mainApp(
      page,
      credentials.stage2appWo.baseURL,
      testName
    );
    await logoutByAvatarClick(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

test("Stage2 edit wo main app", async () => {
  const testName = "Stage2 edit wo main app";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithValidUsername(
      page,
      credentials.stage2appWo.baseURL,
      credentials.stage2appWo.username,
      credentials.stage2appWo.password,
      testName
    );
    await workorderList(
      page,
      credentials.stage2appWo.baseURL,
      testName,
      "newapp",
      "all"
    );
    await createWorkorder_mainApp(
      page,
      credentials.stage2appWo.baseURL,
      testName
    );
    await editWorkorder_mainApp(
      page,
      credentials.stage2appWo.baseURL,
      testName
    );
    await logoutByAvatarClick(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

// test("Stage2 delete wo main app", async () => {
//   const testName = "Stage2 delete wo main app";
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   let page = await context.newPage();
//   try {
//     await loginWithValidUsername(
//       page,
//       credentials.stage2appWo.baseURL,
//       credentials.stage2appWo.username,
//       credentials.stage2appWo.password,
//       testName
//     );
//     await workorderList(
//       page,
//       credentials.stage2appWo.baseURL,
//       testName,
//       "newapp",
//       "all"
//     );
//     await createWorkorder_mainApp(
//       page,
//       credentials.stage2appWo.baseURL,
//       testName
//     );
//     await workorderList(
//       page,
//       credentials.stage2appWo.baseURL,
//       testName,
//       "newapp",
//       "all"
//     );
//     await deleteWorkorder_mainApp(
//       page,
//       credentials.stage2appWo.baseURL,
//       testName
//     );
//     await logoutByAvatarClick(page, testName);
//   } catch (error) {
//     console.log(error);
//     let message = `${testName} - unknown Error occurred - check build console logs`;
//     await sendAlertMessage(message);
//     await toPlaywrightReport(message);
//   }
// });

test("Stage2 wo maintenance app", async () => {
  const testName = "Stage2 wo maintenance app";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithValidUsername_stage2Maintenace_identity(
      page,
      credentials.stage2maintenanceWo.baseURL,
      credentials.stage2maintenanceWo.username,
      credentials.stage2maintenanceWo.password,
      testName
    );
    await workorderList(
      page,
      credentials.stage2app.baseURL,
      testName,
      "maintenance",
      "open"
    );
    await createWorkorder_maintenance_wo(
      page,
      credentials.stage2maintenanceWo.baseURL,
      testName
    );
    await logoutByAvatarClick_stage2Maintenance(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

test("Stage2 edit wo maintenance app", async () => {
  const testName = "Stage2 edit wo maintenance app";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithValidUsername_stage2Maintenace_identity(
      page,
      credentials.stage2maintenanceWo.baseURL,
      credentials.stage2maintenanceWo.username,
      credentials.stage2maintenanceWo.password,
      testName
    );
    await workorderList(
      page,
      credentials.stage2app.baseURL,
      testName,
      "maintenance",
      "open"
    );
    await createWorkorder_maintenance_wo(
      page,
      credentials.stage2maintenanceWo.baseURL,
      testName
    );
    await editWorkorder_maintenance(
      page,
      credentials.stage2maintenanceWo.baseURL,
      testName
    );
    await logoutByAvatarClick_stage2Maintenance(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

// test("Stage2 delete wo maintenance app", async () => {
//   const testName = "Stage2 delete wo maintenance app";
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   let page = await context.newPage();
//   try {
//     await loginWithValidUsername_stage2Maintenace_identity(
//       page,
//       credentials.stage2maintenanceWo.baseURL,
//       credentials.stage2maintenanceWo.username,
//       credentials.stage2maintenanceWo.password,
//       testName
//     );
//     await workorderList(
//       page,
//       credentials.stage2app.baseURL,
//       testName,
//       "maintenance",
//       "open"
//     );
//     await createWorkorder_maintenance_wo(
//       page,
//       credentials.stage2maintenanceWo.baseURL,
//       testName
//     );
//     await deleteWorkorder_maintenance(
//       page,
//       credentials.stage2maintenanceWo.baseURL,
//       testName
//     );
//     await logoutByAvatarClick_stage2Maintenance(page, testName);
//   } catch (error) {
//     console.log(error);
//     let message = `${testName} - unknown Error occurred - check build console logs`;
//     await sendAlertMessage(message);
//     await toPlaywrightReport(message);
//   }
// });

test("Stage2 wo tenant portal", async () => {
  const testName = "Stage2 wo tenant portal";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.stage2TenantPortal.baseURL,
      credentials.stage2TenantPortal.username,
      credentials.stage2TenantPortal.password,
      testName
    );
    await createWorkorder_tenantportal(
      page,
      credentials.stage2TenantPortal.baseURL,
      testName
    );
    await logoutByAvatarHover(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

test("Stage2 edit wo tenant portal", async () => {
  const testName = "Stage2 edit wo tenant portal";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.stage2TenantPortal.baseURL,
      credentials.stage2TenantPortal.username,
      credentials.stage2TenantPortal.password,
      testName
    );
    await createWorkorder_tenantportal(
      page,
      credentials.stage2TenantPortal.baseURL,
      testName
    );
    await editWorkorder_tenantportal(
      page,
      credentials.stage2TenantPortal.baseURL,
      testName
    );
    await logoutByAvatarHover(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

test("Stage2 delete wo tenant portal", async () => {
  const testName = "Stage2 delete wo tenant portal";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.stage2TenantPortal.baseURL,
      credentials.stage2TenantPortal.username,
      credentials.stage2TenantPortal.password,
      testName
    );
    await createWorkorder_tenantportal(
      page,
      credentials.stage2TenantPortal.baseURL,
      testName
    );
    await deleteWorkorder_tenantportal(
      page,
      credentials.stage2TenantPortal.baseURL,
      testName
    );
    await logoutByAvatarHover(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

test("Stage2 wo vendor portal", async () => {
  const testName = "Stage2 wo vendor portal";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.stage2VendorPortal.baseURL,
      credentials.stage2VendorPortal.username,
      credentials.stage2VendorPortal.password,
      testName
    );
    await createWorkorder_vendorportal(
      page,
      credentials.stage2VendorPortal.baseURL,
      testName
    );
    await logoutByAvatarHover(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

test("Stage2 edit wo vendor portal", async () => {
  const testName = "Stage2 edit wo vendor portal";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.stage2VendorPortal.baseURL,
      credentials.stage2VendorPortal.username,
      credentials.stage2VendorPortal.password,
      testName
    );
    await createWorkorder_vendorportal(
      page,
      credentials.stage2VendorPortal.baseURL,
      testName
    );
    await editWorkorder_vendorportal(
      page,
      credentials.stage2VendorPortal.baseURL,
      testName
    );
    await logoutByAvatarHover(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

// test("Stage2 delete wo vendor portal", async () => {
//   const testName = "Stage2 delete wo vendor portal";
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   let page = await context.newPage();
//   try {
//     await loginWithCredentials(
//       page,
//       credentials.stage2VendorPortal.baseURL,
//       credentials.stage2VendorPortal.username,
//       credentials.stage2VendorPortal.password,
//       testName
//     );
//     await createWorkorder_vendorportal(
//       page,
//       credentials.stage2VendorPortal.baseURL,
//       testName
//     );
//     await deleteWorkorder_vendorportal(
//       page,
//       credentials.stage2VendorPortal.baseURL,
//       testName
//     );
//     await logoutByAvatarHover(page, testName);
//   } catch (error) {
//     console.log(error);
//     let message = `${testName} - unknown Error occurred - check build console logs`;
//     await sendAlertMessage(message);
//     await toPlaywrightReport(message);
//   }
// });

test("Stage2 wo occupant portal", async () => {
  const testName = "Stage2 wo occupant portal";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.stage2OccupantPortal.baseURL,
      credentials.stage2OccupantPortal.username,
      credentials.stage2OccupantPortal.password,
      testName
    );
    await createWorkorder_occupantportal(
      page,
      credentials.stage2OccupantPortal.baseURL,
      testName
    );
    await logoutByAvatarHover(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

test("Stage2 edit wo occupant portal", async () => {
  const testName = "Stage2 edit wo occupant portal";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.stage2OccupantPortal.baseURL,
      credentials.stage2OccupantPortal.username,
      credentials.stage2OccupantPortal.password,
      testName
    );
    await createWorkorder_occupantportal(
      page,
      credentials.stage2OccupantPortal.baseURL,
      testName
    );
    await editWorkorder_occupantportal(
      page,
      credentials.stage2OccupantPortal.baseURL,
      testName
    );
    await logoutByAvatarHover(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

test("Stage2 delete wo occupant portal", async () => {
  const testName = "Stage2 delete wo occupant portal";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await loginWithCredentials(
      page,
      credentials.stage2OccupantPortal.baseURL,
      credentials.stage2OccupantPortal.username,
      credentials.stage2OccupantPortal.password,
      testName
    );
    await createWorkorder_occupantportal(
      page,
      credentials.stage2OccupantPortal.baseURL,
      testName
    );
    await deleteWorkorder_occupantportal(
      page,
      credentials.stage2OccupantPortal.baseURL,
      testName
    );
    await logoutByAvatarHover(page, testName);
  } catch (error) {
    console.log(error);
    let message = `${testName} - unknown Error occurred - check build console logs`;
    await sendAlertMessage(message);
    await toPlaywrightReport(message);
  }
});

// test("Stage2 wo employee portal", async () => {
//   const testName = "Stage2 wo employee portal";
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   let page = await context.newPage();
//   try {
//     await loginWithCredentials(
//       page,
//       credentials.stage2EmployeePortal.baseURL,
//       credentials.stage2EmployeePortal.username,
//       credentials.stage2EmployeePortal.password,
//       testName
//     );
//     await createWorkorder_employeeportal(
//       page,
//       credentials.stage2EmployeePortal.baseURL,
//       testName
//     );
//     await logoutByAvatarHover(page, testName);
//   } catch (error) {
//     console.log(error);
//     let message = `${testName} - unknown Error occurred - check build console logs`;
//     await sendAlertMessage(message);
//     await toPlaywrightReport(message);
//   }
// });

// test("Stage2 edit wo employee portal", async () => {
//   const testName = "Stage2 edit wo employee portal";
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   let page = await context.newPage();
//   try {
//     await loginWithCredentials(
//       page,
//       credentials.stage2EmployeePortal.baseURL,
//       credentials.stage2EmployeePortal.username,
//       credentials.stage2EmployeePortal.password,
//       testName
//     );
//     await createWorkorder_employeeportal(
//       page,
//       credentials.stage2EmployeePortal.baseURL,
//       testName
//     );
//     await editWorkorder_employeeportal(
//       page,
//       credentials.stage2VendorPortal.baseURL,
//       testName
//     );
//     await logoutByAvatarHover(page, testName);
//   } catch (error) {
//     console.log(error);
//     let message = `${testName} - unknown Error occurred - check build console logs`;
//     await sendAlertMessage(message);
//     await toPlaywrightReport(message);
//   }
// });
// test("Stage2 delete wo employee portal", async () => {
//   const testName = "Stage2 delete wo employee portal";
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   let page = await context.newPage();
//   try {
//     await loginWithCredentials(
//       page,
//       credentials.stage2EmployeePortal.baseURL,
//       credentials.stage2EmployeePortal.username,
//       credentials.stage2EmployeePortal.password,
//       testName
//     );
//     await createWorkorder_employeeportal(
//       page,
//       credentials.stage2EmployeePortal.baseURL,
//       testName
//     );
//     await deleteWorkorder_employeeportal(
//       page,
//       credentials.stage2EmployeePortal.baseURL,
//       testName
//     );
//     await logoutByAvatarHover(page, testName);
//   } catch (error) {
//     console.log(error);
//     let message = `${testName} - unknown Error occurred - check build console logs`;
//     await sendAlertMessage(message);
//     await toPlaywrightReport(message);
//   }
// });

test("------------------------- R E S U L T -------------------------", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let page = await context.newPage();
  try {
    await timestamp(page);

    // read the JSON data from the file
    const jsonData = fs.readFileSync("logs.json", "utf-8");

    // parse the JSON data into a JavaScript object
    const data = JSON.parse(jsonData);

    // do something with the data object
    data.consoleLogs.forEach((log) => {
      test.info().annotations.push({ type: "( ", description: log });
    });
  } catch (error) {
    console.log("Error occurred in timestamp");
    console.log(error);
    await sendAlertMessage("Error occurred in timestamp");
  }
  browser.close();
});

test.afterEach(async ({ page }, testInfo) => {
  try {
    let message = `-----------------------------Finished ${testInfo.title} with status:  ${testInfo.status}-----------------------------`;
    console.log(message);
    await toPlaywrightReport(message);

    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
  } catch (error) {
    let message = `Error occured in afterEach test Block`;
    console.error(message);
    console.error(error);
    await sendAlertMessage(message);
  }
});
