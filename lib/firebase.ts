"use client";
import {FirebaseOptions, initializeApp} from "firebase/app";
import {getAnalytics, isSupported} from "@firebase/analytics";

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);

// export const messaging = getMessaging(firebaseApp);
export const analytics = isSupported().then(isSupported => {
    if (isSupported) {
        return getAnalytics(firebaseApp);
    }
    return null;
});

export default firebaseApp;

