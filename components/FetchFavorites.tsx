import { FIREBASE_DB } from "@/FirebaseConfig";
import { query, collection, where, getDocs, updateDoc } from "firebase/firestore";

const Fetch = async (email: string) => {
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
};

const addToFavorites = async (email: string, itemId: string){
  try {
    console.log(`Adding element of id ${itemId} to favorites, email: ${email}`);
    updateDoc()

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

export default Fetch;
