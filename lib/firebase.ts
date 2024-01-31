"use client";
import {FirebaseOptions, initializeApp} from "firebase/app";
import {getAnalytics, isSupported} from "@firebase/analytics";

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
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

