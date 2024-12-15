import { FIREBASE_DB } from "@/FirebaseConfig";
import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export async function Fetch(email: string) {
  try {
    console.log(`Fetching favorited items of user ${email}...`);
    const favoritesQuery = query(
      collection(FIREBASE_DB, "favoritedItems"),
      where("email", "==", email)
    );

    const favoritesSnapshot = await getDocs(favoritesQuery);

    const farovitesPromise = favoritesSnapshot.docs.map(async (doc) => {
      return doc.data();
    });

    console.log(`Fetched succesfuly.`);
    return await Promise.all(farovitesPromise);
  } catch (er) {
    console.error("Couldn't fetch favorites ", er);
    return null;
  }
}

export async function addToFavorites(email: string, itemId: string) {
  try {
    console.log(`Adding element of id ${itemId} to favorites, email: ${email}`);

    const favoritesQuery = query(
      collection(FIREBASE_DB, "favoritedItems"),
      where("email", "==", email)
    );

    const favoritesSnapshot = await getDocs(favoritesQuery);

    favoritesSnapshot.forEach(async (docSnapshot) => {
      const docRef = docSnapshot.ref;

      await updateDoc(docRef, {
        items: arrayUnion(itemId.toString()),
      });
    });

    console.log(`Added succesfuly.`);
    return true;
  } catch (er) {
    console.error("Couldn't add to favorites ", er);
    return null;
  }
}

export async function removeFromFavorites(email: string, itemId: string) {
  try {
    console.log(
      `Removing element of id ${itemId} from favorites, email: ${email}`
    );

    const favoritesQuery = query(
      collection(FIREBASE_DB, "favoritedItems"),
      where("email", "==", email)
    );

    const favoritesSnapshot = await getDocs(favoritesQuery);

    favoritesSnapshot.forEach(async (docSnapshot) => {
      const docRef = docSnapshot.ref;

      await updateDoc(docRef, {
        items: arrayRemove(itemId.toString()),
      });
    });

    console.log(`Removed succesfuly.`);
    return true;
  } catch (er) {
    console.error("Couldn't remove from favorites ", er);
    return null;
  }
}
