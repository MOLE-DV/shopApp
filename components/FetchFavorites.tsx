import { FIREBASE_DB } from "@/FirebaseConfig";
import { query, collection, where, getDocs } from "firebase/firestore";

const Fetch = async (email: string) => {
  try {
    const favoritesQuery = query(
      collection(FIREBASE_DB, "favoritedItems"),
      where("email", "==", email)
    );

    const favoritesSnapshot = await getDocs(favoritesQuery);

    const userFavorites = favoritesSnapshot.forEach((doc) => {
      return doc.data();
    });

    return userFavorites;
  } catch (er) {
    console.error("Couldn't fetch favorites ", er);
    return null;
  }
};

export default Fetch;
