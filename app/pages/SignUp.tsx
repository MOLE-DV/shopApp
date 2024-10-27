import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { isLoggedIn } from "../../components/UserAuthentication";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { useFonts } from "expo-font";

import LoginStyles from "../../styles/Login/LoginStyles";
import GlobalStyles from "../../styles/GlobalStyles";

import { signUp } from "../../components/UserAuthentication";
import ImageButton from "@/components/ImageButton";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
export default function SignUp() {
  const [loaded, setLoaded] = useState(true);

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
    setLoaded(false);
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
    setLoaded(true);
    if (response === true) {
      router.push("/pages/Profile");
    }
  };

  if (!fontsLoaded) return;

  return (
    <KeyboardAvoidingContainer>
      <ActivityIndicator
        size="large"
        style={GlobalStyles.activityIndicator}
        color="rgb(105, 64, 255)"
        animating={!loaded}
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
      <Text style={LoginStyles.loginText}>Sign up</Text>
      <View style={LoginStyles.inputContainer}>
        <Text style={LoginStyles.label}>First name</Text>
        <Image
          style={LoginStyles.inputIcon}
          source={require("../../assets/icons/png/user.png")}
        />
        <TextInput
          blurOnSubmit={false}
          style={LoginStyles.input}
          placeholder="Type your first name"
          placeholderTextColor={"rgb(165, 165, 165)"}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      <View style={LoginStyles.inputContainer}>
        <Text style={LoginStyles.label}>Surname</Text>
        <Image
          style={LoginStyles.inputIcon}
          source={require("../../assets/icons/png/users.png")}
        />
        <TextInput
          blurOnSubmit={false}
          style={LoginStyles.input}
          placeholder="Type your surname"
          placeholderTextColor={"rgb(165, 165, 165)"}
          onChangeText={(text) => setSurname(text)}
        />
      </View>
      <View style={LoginStyles.inputContainer}>
        <Text style={LoginStyles.label}>E-mail</Text>
        <Image
          style={LoginStyles.inputIcon}
          source={require("../../assets/icons/png/mail.png")}
        />
        <TextInput
          blurOnSubmit={false}
          style={LoginStyles.input}
          placeholder="Type your e-mail"
          placeholderTextColor={"rgb(165, 165, 165)"}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={LoginStyles.inputContainer}>
        <Text style={LoginStyles.label}>Password</Text>
        <Image
          style={LoginStyles.inputIcon}
          source={require("../../assets/icons/png/key.png")}
        />
        <TextInput
          style={LoginStyles.input}
          placeholder="Type your password"
          placeholderTextColor={"rgb(165, 165, 165)"}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        style={LoginStyles.loginButtonContainer}
        onPress={signUpHandler}
      >
        <Text style={LoginStyles.loginButtonText}>Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingContainer>
  );
}
