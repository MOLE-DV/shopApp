import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { isLoggedIn } from "../../components/UserAuthentication";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { useFonts } from "expo-font";

import LoginStyles from "../../styles/Login/LoginStyles";
import GlobalStyles from "../../styles/GlobalStyles";

import { logIn } from "../../components/UserAuthentication";
import ImageButton from "@/components/ImageButton";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";

interface userInfo {
  loggedIn: boolean;
  email: string | null;
}
export default function Login() {
  const [userInfo, setUserInfo] = useState<userInfo | {}>({});
  const [loaded, setLoaded] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    ExtraDays: require("../../assets/fonts/extraDays.otf"),
    Oxford: require("../../assets/fonts/Oxford.ttf"),
    Zikketica: require("../../assets/fonts/Zikketica.ttf"),
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const userStatus = await isLoggedIn();
      setUserInfo(userStatus as userInfo);
    }

    fetchUserInfo();
  }, []);

  const loginbuttonHandler = async () => {
    setLoaded(false);
    const response = await logIn(email, password);

    switch (response) {
      case "invalid-credential":
        Alert.alert("Wrong password", "Wrong password! Please try again.");
        break;
      case "empty-data":
        Alert.alert("Empty fields", "Please fill in all the fields!");
        break;
      case "invalid-email":
        Alert.alert("Invalid e-mail", "Invalid e-mail! Please try again.");
        break;
      case "missing-password":
        Alert.alert("Missing password", "Password field is required");
        break;
    }
    setLoaded(true);
    if (response === true) {
      router.back();
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
      <Text style={LoginStyles.loginText}>Login</Text>
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
        style={LoginStyles.forgotPasswordContainer}
        onPress={() => router.push("/pages/SignUp")}
      >
        <Text style={LoginStyles.forgotPasswordText}>
          I don't have an account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={LoginStyles.forgotPasswordContainer}
        onPress={() => router.push("/pages/ForgotPassword")}
      >
        <Text style={LoginStyles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={LoginStyles.loginButtonContainer}
        onPress={loginbuttonHandler}
      >
        <Text style={LoginStyles.loginButtonText}>Sign in</Text>
      </TouchableOpacity>
    </KeyboardAvoidingContainer>
  );
}
