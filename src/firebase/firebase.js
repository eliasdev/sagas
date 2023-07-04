// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:
    'AIzaSyDr-BS4yHE1RBx4p2jTz2G63qZhiDvHbHI' ||
    process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:
    'sagas-24491.firebaseapp.com' || process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: 'sagas-24491' || process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:
    'sagas-24491.appspot.com' || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    '491182041156' || process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    '1:491182041156:web:17ae688e7d98105994f411' ||
    process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Authentication
export const auth = getAuth(app);
// Initialize Cloud Firestore
export const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
