import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "diskhub-premium.firebaseapp.com",
  projectId: "diskhub-premium",
  storageBucket: "diskhub-premium.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase only if config is modified, otherwise export mock/helpers or check
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (e) {
  console.log("Firebase not configured yet. Running in local simulated mode.");
}

export { auth, db };
export default app;
