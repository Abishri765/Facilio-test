const config = {
    tutencredentials: {
        tutenlabs: {
            baseURL: process.env.TUTENLABS_BASE_URL || 'https://rc2728.stage2.facilio.in/identity/login?redirect=%2Ftutenlabs',
            username: process.env.TUTENLABS_USERNAME || 'system+tutenlabs@facilio.com',
            password: process.env.TUTENLABS_PASSWORD || 'Test@1235',
            dashboard: process.env.TUTENLABS_DASHBOARD || 'https://rc2728.stage2.facilio.in/tutenlabs/dashboard/tsc-wo/supervisordashboard/'
        },
           
    }
};
module.exports = config;

