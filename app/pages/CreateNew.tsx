import { Alert, ImageSourcePropType, View } from "react-native";

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
  categoryIndex: number;
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
    categoryIndex: 0,
    price: "",
  });

  const priceInputHandler = (text: string) => {
    let price = text.replace(/[^0-9.]/g, "");
    price = price.replace(/(\..*)\./g, "$1");

    console.log(price);
    inputChange(price, "price");
    setPrice(price);
  };

  async function applyForm() {
    try {
      console.log("Price: ", parseFloat(price), price);
      if (
        formData.title.trim().length === 0 ||
        formData.description.trim().length === 0 ||
        Number(price) < 1 ||
        isNaN(Number(price)) ||
        formData.images.length === 0
      ) {
        if (Number(price) < 1) {
          Alert.alert("Couldn't list item", "Minimum selling price is 1 euro!");
        } else {
          Alert.alert(
            "Couldn't list item",
            "Please fill all the fields before listing!"
          );
        }
        return;
      }

      setLoading(true);
      setHidden(true);

      const storage = getStorage();
      const collectionRef = collection(FIREBASE_DB, "items");

      console.log(formData.categoryIndex);

      const docRef = await addDoc(collectionRef, {
        title: formData.title,
        description: formData.description,
        categoryIndex: formData.categoryIndex,
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
      router.back();
    } catch (ex) {
      console.log("There was an error while listing item: ", ex);
    } finally {
      setHidden(false);
      setLoading(false);
    }
  }

  const inputChange = (value: string | number, name: string) => {
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
              containerStyle={[CreateNewStyles.inputContainer]}
              labelStyle={CreateNewStyles.label}
              iconStyle={CreateNewStyles.inputIcon}
              inputStyle={CreateNewStyles.input}
              image={require("../../assets/icons/png/pen.png")}
              onChangeText={(text: string) => inputChange(text, "title")}
            />
            <TextInputIcon
              placeholder="White T-shirt, worn only once."
              labelText="Description"
              containerStyle={CreateNewStyles.inputContainer}
              labelStyle={CreateNewStyles.label}
              iconStyle={CreateNewStyles.inputIcon}
              inputStyle={[
                CreateNewStyles.input,
                {
                  height:
                    52 + (formData.description.match(/\n/g) || []).length * 12,
                },
              ]}
              image={require("../../assets/icons/png/description.png")}
              multiline={true}
              dividerVisible={false}
              onChangeText={(text: string) => inputChange(text, "description")}
            />
            <TextInputIcon
              placeholder="0 €"
              labelText="Price"
              containerStyle={CreateNewStyles.priceInputContainer}
              labelStyle={CreateNewStyles.priceLabel}
              inputStyle={CreateNewStyles.priceInput}
              iconStyle={CreateNewStyles.inputIcon}
              onChangeText={priceInputHandler}
              image={require("../../assets/icons/png/description.png")}
              value={price}
              keyboardType="numeric"
              maxLength={13}
              dividerVisible={false}
            />
            <Dropdown
              labelText="Category"
              data={categories}
              image={require("../../assets/icons/png/catalog.png")}
              OnSelected={(index) => inputChange(index, "categoryIndex")}
              dropdownStyle={CreateNewStyles.priceInputContainer}
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
