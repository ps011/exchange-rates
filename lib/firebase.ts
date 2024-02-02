import {FirebaseApp, FirebaseOptions, getApps, initializeApp} from "firebase/app";
import {Analytics, getAnalytics, logEvent} from "@firebase/analytics";

export class ExchangeRatesFirebase {
    private firebaseConfig: FirebaseOptions = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };

    private app: FirebaseApp = null;

    constructor() {
        this.app = this.initializeFirebase();
        if (this.app) {
            const a = getAnalytics(this.app);
            console.log("Analytics: ", a);
            logEvent(a, "test_event", {name: "PS"}, {global: true});
        }
    }

    get firebaseApp(): FirebaseApp {
        return this.app;
    }

    get analytics(): Analytics | null {
        if (!this.app) {
            this.app = this.initializeFirebase();
        }
        return getAnalytics(this.app);

    }

    private initializeFirebase(): FirebaseApp {
        if (typeof window !== "undefined") {
            if (!getApps().length) {
                console.log("Initializing Firebase");
                return initializeApp(this.firebaseConfig);
            } else {
                return getApps()[0];
            }
        } else {
            console.warn("Firebase not initialized. Window is not defined");
        }
    }
}