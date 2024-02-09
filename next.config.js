/** @type {import('next').NextConfig} */
const nextConfig = {
};

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    sw: "firebase-messaging-sw.js",
});


module.exports = withPWA(nextConfig);