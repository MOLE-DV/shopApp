import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { isLoggedIn } from "../../components/Users";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { useFonts } from "expo-font";

import LoginStyles from "../../styles/Login/LoginStyles";
import GlobalStyles from "../../styles/GlobalStyles";

import { logIn } from "../../components/Users";

interface userInfo {
  loggedIn: boolean;
  email: string | null;
}
export default function Profile() {
  const [userInfo, setUserInfo] = useState<userInfo>({
    loggedIn: false,
    email: null,
  });

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
    if (email.length == 0 || password.length == 0) {
      alert("Email and password cannot be empty!");
    }
    const response = await logIn(email, password);

    if (response && response !== "invalid-credential") {
      router.push("/pages/Profile");
    }

    if (response == "invalid-credential") {
      Alert.alert("Wrong e-mail or password!");
    }
  };

  if (!fontsLoaded) return;

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
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
        />
      </View>
      <TouchableOpacity style={LoginStyles.forgotPasswordContainer}>
        <Text style={LoginStyles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={LoginStyles.loginButtonContainer}
        onPress={loginbuttonHandler}
      >
        <Text style={LoginStyles.loginButtonText}>Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
