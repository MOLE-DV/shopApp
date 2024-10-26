import * as SecureStore from "expo-secure-store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

export async function logIn(email: string, password: string) {
  try {
    const response = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    const user = response.user;

    if (user) {
      await SecureStore.setItemAsync("userToken", user.uid);
    }
    return true;
  } catch (err) {
    console.error("Failed to log in", err);
    return false;
  }
}

export async function signUp(email: string, password: string) {
  try {
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    const user = response.user;

    if (user) {
      await SecureStore.setItemAsync("userToken", user.uid);
    }
    console.log("Successfully logged in");
    return true;
  } catch (err) {
    console.error("Failed to sign up", err);
    return false;
  }
}

export async function logOut() {
  await signOut(FIREBASE_AUTH);
  await SecureStore.deleteItemAsync("userToken");
}

export async function isLoggedIn() {
  const userToken = await SecureStore.getItemAsync("userToken");
  return !!userToken;
}
