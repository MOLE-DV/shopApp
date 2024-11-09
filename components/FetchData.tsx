import { useEffect, useState } from "react";
import { FIREBASE_APP, FIREBASE_DB } from "../FirebaseConfig";
import { query, limit, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import Constants from "expo-constants";

interface Item {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
}

const Fetch = async () => {
  let items: Item[] = [];

  try {
    const storageURL = Constants.expoConfig?.extra?.firebaseStorageUrl || "";
    console.log("⚙️ Fetching items...");

    const itemQuery = query(collection(FIREBASE_DB, "items"), limit(15));
    const querySnapshot = await getDocs(itemQuery);

    const itemPromises = querySnapshot.docs.map(async (doc) => {
      const itemData = doc.data() as Item;
      const itemId = itemData.id;

      const storage = getStorage(FIREBASE_APP);
      const imageRef = ref(storage, `items/${itemId}.jpeg`);
      let imageUrl = `https://firebasestorage.googleapis.com/v0/b/shopapplication-57342.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=644adfe7-b744-4f80-a9d7-6604b47e27b6`;

      try {
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.log(
          `⚠️ Image not found for ID ${itemId}, using default image.`
        );
      }

      return { ...itemData, icon: imageUrl };
    });

    items = await Promise.all(itemPromises);
  } catch (ex) {
    console.error("❌ Error fetching items:", ex);
  }

  console.log(`✅ Successfully fetched ${items.length} items`);
  return items;
};

export default Fetch;
