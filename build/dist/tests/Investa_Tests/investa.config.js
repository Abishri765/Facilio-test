const config = {
    investa_credentials: {
        app: {
            baseURL: process.env.APP_BASE_URL || 'https://app-au.facilio.com',
            username: process.env.APP_USERNAME || 'hariprasad+investa@facilio.com',
            password: process.env.APP_PASSWORD || 'Test@1235',
        },
        vendorportal: {
            baseURL: process.env.VENDORPORTAL_BASE_URL || 'https://investa.faciliovendors.com',
            username: process.env.VENDORPORTAL_USERNAME || 'dhineshkumar+email@facilio.com',
            password: process.env.VENDORPORTAL_PASSWORD || '1234',
        },
        tenantsportal: {
            baseURL: process.env.VENDORPORTAL_BASE_URL || 'https://investa.faciliotenants.com',
            username: process.env.VENDORPORTAL_USERNAME || 'mithun+investatenant@facilio.com',
            password: process.env.VENDORPORTAL_PASSWORD || '1234',
        },
    }
};
module.exports = config;