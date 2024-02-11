import {FirebaseApp, FirebaseOptions, getApps, initializeApp} from "firebase/app";
import {Analytics, getAnalytics, logEvent} from "@firebase/analytics";
import {getMessaging, getToken, Messaging} from "@firebase/messaging";
import {getDatabase, ref, set} from "firebase/database";

export class ExchangeRatesFirebase {
    private firebaseConfig: FirebaseOptions = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    };

    private app: FirebaseApp = null;

    constructor() {
        this.app = this.initializeFirebase();
    }

    get analytics(): Analytics | null {
        if (process.env.NODE_ENV !== "production") {
            return null;
        }
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

    get database() {
        if (!this.app) {
            this.app = this.initializeFirebase();
        }
        return getDatabase(this.app);
    }

    public async subscribeToNotifications({source, destination, timezoneOffset, subscribedAt}: {
        source: string,
        destination: string,
        timezoneOffset: number
        subscribedAt: string
    }): Promise<boolean> {
        let token = null;
        try {
            token = await getToken(this.messaging, {vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY});
            await set(ref(this.database, 'notifications/' + token), {
                source,
                destination,
                timezoneOffset,
                subscribedAt
            });
            return true;
        } catch (e) {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                token = await getToken(this.messaging, {vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY});
                await set(ref(this.database, 'notifications/' + token), {
                    source,
                    destination,
                    timezoneOffset,
                    subscribedAt
                });
                return true;
            } else {
                return false;
            }
        }
    }

    public logFirebaseEvent(eventName: string, eventParams?: Record<string, string>): void {
        if (process.env.NODE_ENV === "production" && this.analytics) {
            logEvent(this.analytics, eventName, eventParams);
        } else {
            console.log("Firebase event logging skipped: ", eventName, eventParams);
        }
    }

    private initializeFirebase(): FirebaseApp {
        if (typeof window !== "undefined") {
            if (!getApps().length) {
                return initializeApp(this.firebaseConfig);
            } else {
                return getApps()[0];
            }
        }
    }
}