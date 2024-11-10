import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import GlobalStyles from "../../styles/GlobalStyles";
import ImageButton from "@/components/ImageButton";
import CreateNewStyles from "@/styles/CreateNew/CreateNewStyles";
import LoginStyles from "@/styles/Login/LoginStyles";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";

export default function CreateNew() {
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
      <TextInput style={CreateNewStyles.title} placeholder="Title" />
      <TextInput style={CreateNewStyles.title} placeholder="Price" />
      <TextInput
        multiline={true}
        style={{ ...CreateNewStyles.title, ...CreateNewStyles.description }}
        placeholder="Description"
      />
    </KeyboardAvoidingContainer>
  );
}
