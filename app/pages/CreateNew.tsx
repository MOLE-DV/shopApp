import { ImageSourcePropType, View } from "react-native";

import { useState } from "react";
import { router } from "expo-router";
import ImageButton from "@/components/ImageButton";
import ImageButtonPicker from "@/components/ImageButtonPicker";
import CreateNewStyles from "@/styles/CreateNew/CreateNewStyles";
import LoginStyles from "@/styles/Login/LoginStyles";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import TextInputIcon from "@/components/TextInputIcon";
import Dropdown from "@/components/Dropdown";
import { ImagesProvider } from "@/contexts/ImagesContext";
import categories from "@/assets/categories";
import ImageModifier from "@/components/ImageModifier";
import CustomButton from "@/components/CustomButton";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/FirebaseConfig";
import { useApp } from "@/contexts/AppContext";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";

interface formDataI {
  title: string;
  description: string;
  category: string;
  images: string[];
  price: string;
}

export default function CreateNew() {
  const [price, setPrice] = useState("");
  const { setHidden, setLoading } = useApp();

  const [images, setImages] = useState<string[] | null>(null);
  const [formData, setFormData] = useState<formDataI>({
    title: "",
    description: "",
    images: [],
    category: "Electronics",
    price: "",
  });

  const priceInputHandler = (text: string) => {
    let price = text.replace(/[^0-9.]/g, "");
    price = price.replace(/(\..*)\./g, "$1");

    inputChange(price, "price");
    setPrice(price);
  };

  async function applyForm() {
    try {
      if (
        formData.title.trim().length === 0 ||
        formData.description.trim().length === 0 ||
        formData.category === "" ||
        parseFloat(price) <= 0 ||
        formData.images.length === 0
      )
        return;

      setLoading(true);
      setHidden(true);

      const storage = getStorage();
      const collectionRef = collection(FIREBASE_DB, "items");

      const docRef = await addDoc(collectionRef, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
      });

      await updateDoc(docRef, {
        id: docRef.id,
      });

      const uploadPromises = formData.images.map(
        async (image: string, index: number) => {
          try {
            const res = await fetch(image);
            const blob = await res.blob();

            const storageRef = ref(storage, `items/${docRef.id}_${index}`);
            await uploadBytes(storageRef, blob);
          } catch (ex) {
            console.error(`Error uploading image ${docRef.id}_${index}:`, ex);
            throw ex;
          }
        }
      );

      console.log("finished uploading");
      await Promise.all(uploadPromises);
    } catch (ex) {
      console.log("There was an error while listing item: ", ex);
    } finally {
      setHidden(false);
      setLoading(false);
      router.back();
    }
  }

  const inputChange = (value: string | string[], name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ImagesProvider>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingContainer>
          <View style={LoginStyles.topNavBar}>
            <View style={[LoginStyles.topNavBarBackground]} />
            <ImageButton
              style={{
                ...LoginStyles.topNavBarIcon,
                tintColor: "rgba(0, 0, 0, 0.5)",
              }}
              image={require("../../assets/icons/png/left.png")}
              onPress={() => router.back()}
            />
          </View>
          <ImageButtonPicker
            Text="Add Images"
            Image={require("../../assets/icons/png/plus.png")}
            FetchImages={(imgs: string[]) => setImages(imgs)}
            OnSelected={(imgs: string[]) => inputChange(imgs, "images")}
          />
          <View style={{ alignItems: "center" }}>
            <TextInputIcon
              placeholder="etc. white T-shirt"
              labelText="Title"
              image={require("../../assets/icons/png/pen.png")}
              onChangeText={(text: string) => inputChange(text, "title")}
            />
            <TextInputIcon
              placeholder="White T-shirt, worn only once. In good condition."
              labelText="Description"
              containerStyle={CreateNewStyles.inputContainer}
              labelStyle={CreateNewStyles.label}
              iconStyle={CreateNewStyles.inputIcon}
              inputStyle={CreateNewStyles.input}
              image={require("../../assets/icons/png/description.png")}
              multiline={true}
              dividerVisible={false}
              onChangeText={(text: string) => inputChange(text, "description")}
            />
            <TextInputIcon
              placeholder="4.99$"
              labelText="Price"
              containerStyle={CreateNewStyles.priceInputContainer}
              labelStyle={CreateNewStyles.priceLabel}
              inputStyle={CreateNewStyles.priceInput}
              onChangeText={priceInputHandler}
              image={require("../../assets/icons/png/description.png")}
              value={price}
              keyboardType="numeric"
            />
            <Dropdown
              labelText="Category"
              data={categories}
              image={require("../../assets/icons/png/catalog.png")}
              OnSelected={(selected: {
                value: string;
                label: string;
                image: ImageSourcePropType;
              }) => inputChange(selected.value, "category")}
            />
            <CustomButton
              Text="List Item"
              OnPress={applyForm}
              Style={CreateNewStyles.ListButton}
            />
          </View>
        </KeyboardAvoidingContainer>
        <ImageModifier />
      </View>
    </ImagesProvider>
  );
}
