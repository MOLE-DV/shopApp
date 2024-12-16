import { useEffect, useState } from "react";
import { FIREBASE_APP, FIREBASE_DB } from "../FirebaseConfig";
import { query, limit, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import Constants from "expo-constants";
import { ImageSourcePropType } from "react-native";

const DEFAULT_IMAGE_URL = `https://firebasestorage.googleapis.com/v0/b/shopapplication-57342.appspot.com/o/images%2Fdefault.jpeg?alt=media&token=644adfe7-b744-4f80-a9d7-6604b47e27b6`;

interface Item {
  id: string;
  title: string;
  description: string;
  icon: string;
  categoryIndex: number;
  price: string;
}

const Fetch = async () => {
  let items: Item[] = [];

  try {
    const itemQuery = query(collection(FIREBASE_DB, "items"), limit(15));
    const querySnapshot = await getDocs(itemQuery);

    const itemPromises = querySnapshot.docs.map(async (doc) => {
      const itemData = doc.data() as Item;

      const storage = getStorage(FIREBASE_APP);
      const imagePath = `items/${doc.id}_0`;

      let imageURL = DEFAULT_IMAGE_URL;

      try {
        const imageRef = ref(storage, imagePath);
        imageURL = await getDownloadURL(imageRef);
      } catch (error) {
        console.log(
          `⚠️ Image not found for ID ${doc.id} [ imagePath: ${imagePath} ], using default image.`
        );
      }

      return { ...itemData, icon: imageURL };
    });

    items = await Promise.all(itemPromises);
    return items;
  } catch (ex) {
    console.error("❌ Error fetching items:", ex);
  }
};

export default Fetch;
