const withPWA = require("next-pwa");

module.exports = withPWA({
    env: {
        API_KEY: process.env.API_KEY,
        MODE: process.env.MODE
    },
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
    },
});