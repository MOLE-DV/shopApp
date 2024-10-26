import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAltGgHzUlJeTfEC9D707E0IJcEtFK8PaI",
  authDomain: "shopapplication-57342.firebaseapp.com",
  projectId: "shopapplication-57342",
  storageBucket: "shopapplication-57342.appspot.com",
  messagingSenderId: "255457622692",
  appId: "1:255457622692:web:71ea6318059f4b5e85c431",
  measurementId: "G-PPYHCVJK9L",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export { firebase };
