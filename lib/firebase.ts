import {FirebaseApp, FirebaseOptions, getApps, initializeApp} from "firebase/app";
import {Analytics, getAnalytics, logEvent} from "@firebase/analytics";
import {getMessaging, getToken, Messaging} from "@firebase/messaging";

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
    public token: string = null;

    constructor() {
        this.app = this.initializeFirebase();
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

    get messaging(): Messaging | null {
        if (!this.app) {
            this.app = this.initializeFirebase();
        }
        return getMessaging(this.app);
    }

    public async setMessagingToken(): Promise<void> {
        try {
            this.token = await getToken(this.messaging, {vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY});
        } catch (e) {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                this.token = await getToken(this.messaging, {vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY});
            } else {
                console.warn("Permission not granted");
            }
        }
        console.log("Token: ", this.token);
    }

    public logFirebaseEvent(eventName: string, eventParams: Record<string, string>): void {
        if (this.analytics) {
            logEvent(this.analytics, eventName, eventParams);
        }
    }

    private initializeFirebase(): FirebaseApp {
        if (typeof window !== "undefined") {
            if (!getApps().length) {
                return initializeApp(this.firebaseConfig);
            } else {
                return getApps()[0];
            }
        } else {
            console.warn("Firebase not initialized. Window is not defined");
        }
    }
}