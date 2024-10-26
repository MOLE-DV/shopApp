import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { isLoggedIn } from "../../components/Users";
import { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import { useFonts } from "expo-font";

import LoginStyles from "../../styles/Login/LoginStyles";
import GlobalStyles from "../../styles/GlobalStyles";

import Header from "../../components/Header";
import { logIn } from "../../components/Users";
export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    ExtraDays: require("../../assets/fonts/extraDays.otf"),
    Oxford: require("../../assets/fonts/Oxford.ttf"),
    Zikketica: require("../../assets/fonts/Zikketica.ttf"),
  });

  useEffect(() => {
    async function checkIfLoggedIn() {
      const loggedInStatus = await isLoggedIn();
      setLoggedIn(loggedInStatus);
    }
    checkIfLoggedIn();
  }, []);

  if (loggedIn) router.push("/pages/Profile");

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const loginbuttonHandler = () => {
    if (email.length == 0 || password.length == 0) {
      alert("Email and password cannot be empty!");
    }
    logIn(email, password);
  };

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
      <Header selected="profile" />
    </SafeAreaView>
  );
}
