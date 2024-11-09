import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
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

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export { firebase };
