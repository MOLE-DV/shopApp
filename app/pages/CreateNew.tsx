import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import GlobalStyles from "../../styles/GlobalStyles";
import ImageButton from "@/components/ImageButton";
import CreateNewStyles from "@/styles/CreateNew/CreateNewStyles";
import LoginStyles from "@/styles/Login/LoginStyles";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import TextInputIcon from "@/components/TextInputIcon";

export default function CreateNew() {
  const [price, setPrice] = useState("");
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
      <ImageButton
        text="Add Images"
        image={require("../../assets/icons/png/plus.png")}
        buttonStyle={CreateNewStyles.importButton}
        style={CreateNewStyles.importButtonImage}
        textStyle={CreateNewStyles.importButtonText}
      />
      <View>
        <TextInputIcon
          placeholder="etc. white T-shirt"
          labelText="Title"
          containerStyle={LoginStyles.inputContainer}
          labelStyle={LoginStyles.label}
          iconStyle={LoginStyles.inputIcon}
          inputStyle={LoginStyles.input}
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
        />
        <TextInputIcon
          placeholder="4.99$"
          labelText="Price"
          containerStyle={CreateNewStyles.priceInputContainer}
          labelStyle={CreateNewStyles.priceLabel}
          iconStyle={LoginStyles.inputIcon}
          inputStyle={CreateNewStyles.priceInput}
          onChangeText={priceInputHandler}
          image={require("../../assets/icons/png/description.png")}
          value={price}
          keyboardType="numeric"
        />
      </View>
    </KeyboardAvoidingContainer>
  );
}
