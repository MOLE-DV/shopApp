import * as SecureStore from "expo-secure-store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

export async function logIn(email: string, password: string) {
  console.log(`Logging in with email: ${email} and password: ${password}`);

  if (
    email.replace(/\s/g, "").length === 0 &&
    password.replace(/\s/g, "").length === 0
  ) {
    return "empty-data";
  }
  try {
    const response = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    const user = response.user;

    if (user) {
      await SecureStore.setItemAsync("userToken", user.uid);
      await SecureStore.setItemAsync("userData", JSON.stringify(user));
    }
    console.log(`Logged in as ${email}`);
    return true;
  } catch (err: any) {
    switch (err.toString().split("/")[1].replace(").", "")) {
      case "invalid-credential":
        return "invalid-credential";
      case "invalid-email":
        return "invalid-email";
      case "missing-password":
        return "missing-password";
    }

    console.error("Failed to log in", err);
    return false;
  }
}

export async function signUp(
  email: string,
  password: string,
  firstname: string,
  surname: string
) {
  console.log(`Signing up with email: ${email} and password: ${password}`);

  if (
    email.replace(/\s/g, "").length === 0 &&
    password.replace(/\s/g, "").length === 0
  ) {
    return "empty-data";
  }
  try {
    if (
      surname.replaceAll(/\s/g, "").length === 0 ||
      firstname.replaceAll(/\s/g, "").length === 0
    ) {
      return "empty-data";
    }

    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    const user = response.user;

    if (user) {
      await SecureStore.setItemAsync("userToken", user.uid);
    }

    await updateProfile(user, {
      displayName: `${firstname} ${surname}`,
    });

    console.log(`Created account of email: ${email}`);
    return true;
  } catch (err: any) {
    switch (err.toString().split("/")[1].replace(").", "")) {
      case "invalid-email":
        return "invalid-email";
      case "missing-password":
        return "missing-password";
      case "weak-password":
        return "weak-password";
      case "email-already-in-use":
        return "email-already-in-use";
    }

    console.error("Failed to sign up", err);
    return false;
  }
}

export async function logOut() {
  await signOut(FIREBASE_AUTH);
  await SecureStore.deleteItemAsync("userToken");
  await SecureStore.deleteItemAsync("userData");
}

import { getAuth, onAuthStateChanged } from "firebase/auth";

export async function isLoggedIn() {
  const auth = getAuth();

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({
          loggedIn: true,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        resolve({ loggedIn: false, email: null, displayName: null });
      }
    });
  });
}

export async function resetPassword(email: string) {
  try {
    const response = await sendPasswordResetEmail(FIREBASE_AUTH, email);

    console.log("Reset password email was sent");

    return true;
  } catch (err: any) {
    if (err.toString().split("/")[1].replace(").", "") == "missing-email") {
      return "missing-email";
    }

    console.error(
      "There was a problem with sending password reset email ",
      err
    );
    return false;
  }
}
