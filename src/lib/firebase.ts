import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Diagnostic for Dev
if (typeof window !== "undefined" && !firebaseConfig.apiKey) {
  console.warn("⚠️ Firebase API Key is missing. Did you restart 'npm run dev' after adding .env?");
}

// Initialize Firebase services only if config is valid (Build Safety)
let app: any;
let auth: any;
let db: any;

if (firebaseConfig.apiKey) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  // Mock instances for build phase to prevent crashes
  auth = {} as any;
  db = {} as any;
}

// Analytics initialization (client-side only)
let analytics: any = null;

if (typeof window !== "undefined" && app) {
  (async () => {
    try {
      const { getAnalytics, isSupported } = await import("firebase/analytics");
      if (await isSupported()) {
        analytics = getAnalytics(app);
      }
    } catch (e) {
      console.warn("Analytics initialization skipped:", e);
    }
  })();
}

export { auth, db, analytics };
