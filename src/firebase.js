import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app = null;
let analyticsPromise = null;
let dbPromise = null;

if (import.meta.env.VITE_FIREBASE_API_KEY) {
  app = initializeApp(firebaseConfig);
} else {
  console.warn("Firebase API Key is missing. Analytics will not be initialized.");
}

/**
 * Lazily initialize Firebase Analytics. Only loads the analytics SDK when
 * actually needed, keeping it out of the initial JavaScript bundle.
 */
export async function getAnalyticsInstance() {
  if (!app || typeof window === "undefined") return null;
  if (!analyticsPromise) {
    analyticsPromise = import("firebase/analytics")
      .then(({ getAnalytics }) => getAnalytics(app));
  }
  return analyticsPromise;
}

/**
 * Lazily initialize Cloud Firestore. Only loads the Firestore SDK when a
 * component requests a database instance.
 */
export async function getDbInstance() {
  if (!app) return null;
  if (!dbPromise) {
    dbPromise = import("firebase/firestore")
      .then(({ getFirestore }) => getFirestore(app));
  }
  return dbPromise;
}

export { app };
export default app;
