self.__WB_DISABLE_DEV_LOGS = true

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    if (payload.data && payload.data.title && payload.data.body) {
        // Customize notification here
        const notificationTitle = payload.data.title;
        const notificationOptions = {
            body: payload.data.body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
        };
        self.registration.showNotification(notificationTitle, notificationOptions);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
});