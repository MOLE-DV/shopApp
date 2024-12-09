import { View, Text, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { useFonts } from "expo-font";
import TextInputIcon from "@/components/TextInputIcon";

import LoginStyles from "../../styles/Login/LoginStyles";
import GlobalStyles from "../../styles/GlobalStyles";

import { signUp } from "../../components/UserAuthentication";
import ImageButton from "@/components/ImageButton";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import CustomButton from "@/components/CustomButton";
import { useApp } from "@/contexts/AppContext";
export default function SignUp() {
  const { setLoading, setHidden } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [surname, setSurname] = useState("");

  const [fontsLoaded] = useFonts({
    ExtraDays: require("../../assets/fonts/extraDays.otf"),
    Oxford: require("../../assets/fonts/Oxford.ttf"),
    Zikketica: require("../../assets/fonts/Zikketica.ttf"),
  });

  const signUpHandler = async () => {
    setLoading(true);
    setHidden(true);

    const response = (await signUp(email, password, firstname, surname)) as
      | string
      | boolean;

    switch (response) {
      case "empty-data":
        Alert.alert("Empty fields", "Please fill in all the fields!");
        break;
      case "missing-password":
        Alert.alert("Missing password", "Password field is required");
        break;
      case "invalid-email":
        Alert.alert(
          "Invalid e-mail",
          "Invalid e-mail! Email should look like this: example@example.com"
        );
        break;
      case "weak-password":
        Alert.alert(
          "Weak password",
          "Password should be at least 6 characters long, contain at least one uppercase letter, lowercase letter and special character"
        );
        break;
      case "email-already-in-use":
        Alert.alert("Email already in use", "This e-mail is already in use!");
        break;
    }
    if (response === true) {
      router.push("/pages/Profile");
      setLoading(false);
      setHidden(false);
    }
  };

  if (!fontsLoaded) return;

  return (
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
      <Text style={LoginStyles.loginText}>Sign up</Text>
      <TextInputIcon
        placeholder="Type your first name"
        labelText="First name"
        onChangeText={(text: string) => setFirstName(text)}
        placeholderTextColor="rgb(165, 165, 165)"
        image={require("../../assets/icons/png/user.png")}
      />
      <TextInputIcon
        placeholder="Type your surname"
        labelText="Surname"
        onChangeText={(text: string) => setSurname(text)}
        placeholderTextColor="rgb(165, 165, 165)"
        image={require("../../assets/icons/png/users.png")}
      />
      <TextInputIcon
        placeholder="Type your e-mail"
        labelText="E-mail"
        onChangeText={(text: string) => setEmail(text)}
        placeholderTextColor="rgb(165, 165, 165)"
        image={require("../../assets/icons/png/mail.png")}
      />
      <TextInputIcon
        placeholder="Type your password"
        labelText="Password"
        onChangeText={(text: string) => setPassword(text)}
        placeholderTextColor="rgb(165, 165, 165)"
        image={require("../../assets/icons/png/key.png")}
      />
      <CustomButton Text="Sign Up" OnPress={() => signUpHandler()} />
    </KeyboardAvoidingContainer>
  );
}
