const config = {
    credentials: {
        app: {
            baseURL: process.env.APP_BASE_URL || 'https://stage2.facilio.in',
            username: process.env.APP_USERNAME || 'mukundhan+sanity@facilio.com',
            password: process.env.APP_PASSWORD || 'Test@1235',
        },
        appSSO:{
            username: process.env.APP_USERNAME || 'abirami+sso@facilio.com',
            password: process.env.APP_PASSWORD || 'Test@1235',
        },
        workq:{
            baseURL: process.env.APP_BASE_URL || 'https://stage2.facilio.in/maintenance',
            username: process.env.APP_USERNAME || 'mukundhan+sanity@facilio.com',
            password: process.env.APP_PASSWORD || 'Test@1235',
        },
        occupantportal: {
            baseURL: process.env.OCCUPANTPORTAL_BASE_URL || 'https://pilot.stage2vendor.facilio.in',
            username: process.env.OCCUPANTPORTAL_USERNAME || 'logeshkannan+sanity1@facilio.com',
            password: process.env.OCCUPANTPORTAL_PASSWORD || '1234',
        },
        occupantportalSSO:{
            baseURL: process.env.OCCUPANTPORTAL_BASE_URL ||   'https://pilot.stage2portal.facilio.in',
            username: process.env.OCCUPANTPORTAL_USERNAME || 'demossofacilio@gmail.com',
            password: process.env.OCCUPANTPORTAL_PASSWORD || 'Test@1235',
        },
        vendorportal: {
            baseURL: process.env.VENDORPORTAL_BASE_URL || 'https://pilot.stage2vendor.facilio.in',
            username: process.env.VENDORPORTAL_USERNAME || 'logeshkannan+sanity1@facilio.com',
            password: process.env.VENDORPORTAL_PASSWORD || '1234',
        },
         tenantportal: {
            baseURL: process.env.TENANTPORTAL_BASE_URL || 'https://altayer.stage2tenant.facilio.in',
            username: process.env.TENANTPORTAL_USERNAME || 'kamalakannan+altayer3@facilio.com',
            password: process.env.TENANTPORTAL_PASSWORD || 'Test@1235',
        }
    }
};
module.exports = config;