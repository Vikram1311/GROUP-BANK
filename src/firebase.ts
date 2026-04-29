import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY?.trim() || '';
const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim() || '';
const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim() || '';
const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID?.trim() || '';

export const FIRESTORE_COLLECTION =
  import.meta.env.VITE_FIREBASE_COLLECTION?.trim() || 'shg-bank';
export const FIRESTORE_DOC_ID =
  import.meta.env.VITE_FIREBASE_DOC_ID?.trim() || 'state';

// isFirebaseConfigured validates the two fields strictly required to initialize
// the Firebase app and open a Firestore connection. AUTH_DOMAIN and APP_ID are
// optional for Firestore-only usage but are still forwarded when provided.
export const isFirebaseConfigured = (): boolean =>
  !!(FIREBASE_PROJECT_ID && FIREBASE_API_KEY && FIREBASE_APP_ID);

let _app: FirebaseApp | null = null;
let _db: Firestore | null = null;

export const getDb = (): Firestore | null => {
  if (_db) return _db;
  if (!isFirebaseConfigured()) return null;
  if (_app === null) {
    _app =
      getApps().length === 0
        ? initializeApp({
            apiKey: FIREBASE_API_KEY,
            authDomain: FIREBASE_AUTH_DOMAIN,
            projectId: FIREBASE_PROJECT_ID,
            appId: FIREBASE_APP_ID,
          })
        : getApps()[0];
  }
  _db = getFirestore(_app);
  return _db;
};
