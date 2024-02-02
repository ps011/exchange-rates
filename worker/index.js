'use strict'

self.__WB_DISABLE_DEV_LOGS = true

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener("message", async (event) => {
//     const payload = event.data.payload;
//     switch (event.data.type) {
//         case "notification": {
//             const rates = await getExchangeRates();
//             const exchangeRate = calculateExchangeRate(rates, payload.sourceCurrency, payload.destinationCurrency);
//             const notificationOptions = {
//                 body: `${payload.sourceCurrency} 1 → ${payload.destinationCurrency} ${exchangeRate}`,
//                 icon: "icon-192.png",
//                 tag: "exchange-rate",
//                 data: {
//                     url: process.env.NEXT_PUBLIC_MODE === "development" ? "http://localhost:3000" : "https://exchange-rates-delta.vercel.app/",
//                 }
//             };
//
//             setInterval(() => {
//                 self.registration.showNotification("Exchange Rate", notificationOptions);
//             }, 1000*60*60*12);
//         }
//     }
//
//
// });
//
// const calculateExchangeRate = (exchangeRates, sourceCurrency, destinationCurrency) => {
//     return (parseFloat(((exchangeRates[destinationCurrency] / exchangeRates[sourceCurrency])).toFixed(2)));
// }
//
// const getExchangeRates = async () => {
//     const res = await fetch(`https://currencyapi.net/api/v1/rates?key=${process.env.NEXT_PUBLIC_API_KEY}`)
//     const data = await res.json();
//     return data.rates;
// }