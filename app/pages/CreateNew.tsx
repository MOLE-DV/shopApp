import { View, ActivityIndicator } from "react-native";

import { useState } from "react";
import { router } from "expo-router";
import GlobalStyles from "../../styles/GlobalStyles";
import ImageButton from "@/components/ImageButton";
import ImageButtonPicker from "@/components/ImageButtonPicker";
import CreateNewStyles from "@/styles/CreateNew/CreateNewStyles";
import LoginStyles from "@/styles/Login/LoginStyles";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import TextInputIcon from "@/components/TextInputIcon";
import Dropdown from "@/components/Dropdown";

import categories from "@/assets/categories";

export default function CreateNew() {
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const priceInputHandler = (text: string) => {
    let price = text.replace(/[^0-9.]/g, "");
    price = price.replace(/(\..*)\./g, "$1");

    setPrice(price);
  };

  return (
    <KeyboardAvoidingContainer>
      <ActivityIndicator
        size="large"
        style={GlobalStyles.activityIndicator}
        color="rgb(105, 64, 255)"
        animating={false}
      />
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
        text="Add Images"
        image={require("../../assets/icons/png/plus.png")}
      />
      <View>
        <TextInputIcon
          placeholder="etc. white T-shirt"
          labelText="Title"
          image={require("../../assets/icons/png/pen.png")}
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
        />
      </View>
    </KeyboardAvoidingContainer>
  );
}
