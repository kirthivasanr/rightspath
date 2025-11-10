// Firebase configuration
// You'll need to replace these with your actual Firebase config values
// Get these from your Firebase project settings

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGPw0chfR4pHVU-M95ZG8uk0wh4CgC38E",
  authDomain: "yourlawyer-2025.firebaseapp.com",
  projectId: "yourlawyer-2025",
  storageBucket: "yourlawyer-2025.firebasestorage.app",
  messagingSenderId: "1089333008382",
  appId: "1:1089333008382:web:32d41033b27e313d5c12af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
