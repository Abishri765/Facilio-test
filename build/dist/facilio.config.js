const config = {
  credentials: {
    app: {
      baseURL: process.env.APP_BASE_URL || "https://app.facilio.com",
      username: process.env.APP_USERNAME || "system+democonnected@facilio.com",
      password: process.env.APP_PASSWORD || "Bnuy@2468#",
      samlPassword: process.env.APP_SAML_PASSWORD || "Test@1235",
    },
    occupantportal: {
      baseURL:
        process.env.OCCUPANTPORTAL_BASE_URL ||
        "https://7feb22.facilioportal.com",
      username:
        process.env.OCCUPANTPORTAL_USERNAME ||
        "hariprasad+maint_occupant@facilio.com",
      password: process.env.OCCUPANTPORTAL_PASSWORD || "Test@1235",
    },
    vendorportal: {
      baseURL:
        process.env.VENDORPORTAL_BASE_URL ||
        "https://7feb22.faciliovendors.com",
      username:
        process.env.VENDORPORTAL_USERNAME ||
        "hariprasad+maint_vendor@facilio.com",
      password: process.env.VENDORPORTAL_PASSWORD || "Test@1235",
    },
    tenantportal: {
      baseURL:
        process.env.TENANTPORTAL_BASE_URL ||
        "https://7feb22.faciliotenants.com",
      username:
        process.env.TENANTPORTAL_USERNAME ||
        "hariprasad+maint_tenant@facilio.com",
      password: process.env.TENANTPORTAL_PASSWORD || "Test@1235",
    },
    maintenance: {
      baseURL: process.env.MAINTENANCE_BASE_URL || "https://app.facilio.com",
      username: process.env.MAINTENANCE_USERNAME || "aruna+7feb23@facilio.com",
      password: process.env.MAINTENANCE_PASSWORD || "Test@1235",
    },
    stage2app: {
      baseURL: process.env.STAGE2APP_BASE_URL || "https://stage2.facilio.in",
      username:
        process.env.STAGE2APP_USERNAME || "mukundhan+sanity@facilio.com",
      password: process.env.STAGE2APP_PASSWORD || "Test@1235",
    },
    stage2maintenance: {
      baseURL:
        process.env.STAGE2MAINTENANCE_BASE_URL || "https://stage2.facilio.in",
      username:
        process.env.STAGE2MAINTENANCE_USERNAME || "aruna+7feb23@facilio.com",
      password: process.env.STAGE2MAINTENANCE_PASSWORD || "Test@1235",
      // samlPassword: process.env.STAGE2MAINTENANCE_SAML_PASSWORD || "Test@1235",
    },
    pre_app: {
      baseURL: process.env.APP_BASE_URL || "https://app.facilio.com",
      username: process.env.APP_USERNAME || "system+democonnected@facilio.com",
      password: process.env.APP_PASSWORD || "Bnuy@2468#",
      samlPassword: process.env.APP_SAML_PASSWORD || "Test@1235",
    },
    pilot_stage2: {
      baseURL:
        process.env.APP_BASE_URL || "https://pilot.stage2portal.facilio.in",
      username: process.env.APP_USERNAME || "aruna@facilio.com",
      password: process.env.APP_PASSWORD || "Test@1235",
    },
    app_au: {
      baseURL: process.env.APP_BASE_URL || "https://app-au.facilio.com",
      username: process.env.APP_USERNAME || "hariprasad+au@facilio.com",
      password: process.env.APP_PASSWORD || "Test@1235",
      samlPassword: process.env.APP_SAML_PASSWORD || "Test@1235",
    },

    stage2appWo: {
      baseURL: process.env.STAGE2APP_BASE_URL || "https://stage2.facilio.in",
      username:
        process.env.STAGE2APP_USERNAME || "abishek+demo@facilio.com",
      password: process.env.STAGE2APP_PASSWORD || "Test@1235",
    },
    stage2maintenanceWo: {
      baseURL:
        process.env.STAGE2MAINTENANCE_BASE_URL || "https://stage2.facilio.in",
      username:
        process.env.STAGE2MAINTENANCE_USERNAME ||
        "jeyakumar+woplaywright@facilio.com",
      password: process.env.STAGE2MAINTENANCE_PASSWORD || "Test@1235",
      samlPassword: process.env.STAGE2MAINTENANCE_SAML_PASSWORD || "Test@1235",
    },
    stage2TenantPortal: {
      baseURL:
        process.env.STAGE2APP_BASE_URL ||
        "https://woplaywright.stage2tenant.facilio.in",
      username:
        process.env.STAGE2APP_USERNAME ||
        "jeyakumar+tenantwoplaywright@facilio.com",
      password: process.env.STAGE2APP_PASSWORD || "Test@1235",
    },
    stage2OccupantPortal: {
      baseURL:
        process.env.STAGE2APP_BASE_URL ||
        "https://woplaywright.stage2portal.facilio.in",
      username:
        process.env.STAGE2APP_USERNAME ||
        "jeyakumar+occupantwoplaywright@facilio.com",
      password: process.env.STAGE2APP_PASSWORD || "Test@1235",
    },
    stage2VendorPortal: {
      baseURL:
        process.env.STAGE2APP_BASE_URL ||
        "https://woplaywright.stage2vendor.facilio.in",
      username:
        process.env.STAGE2APP_USERNAME ||
        "jeyakumar+vendorwoplaywright@facilio.com",
      password: process.env.STAGE2APP_PASSWORD || "Test@1235",
    },
    // stage2EmployeePortal: {
    //   baseURL:
    //     process.env.STAGE2APP_BASE_URL ||
    //     "https://sanity.stage2portal.facilio.in",
    //   username:
    //     process.env.STAGE2APP_USERNAME ||
    //     "jeyakumar+employeeplaywrite@facilio.com",
    //   password: process.env.STAGE2APP_PASSWORD || "Test@1235",
    // },
  },
};
module.exports = config;
