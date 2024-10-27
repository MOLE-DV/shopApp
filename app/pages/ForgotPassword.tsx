import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { isLoggedIn } from "../../components/UserAuthentication";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { useFonts } from "expo-font";

import LoginStyles from "../../styles/Login/LoginStyles";
import GlobalStyles from "../../styles/GlobalStyles";
import ItemsStyles from "@/styles/Items/ItemsStyles";

import { resetPassword } from "../../components/UserAuthentication";
import ImageButton from "@/components/ImageButton";

interface userInfo {
  loggedIn: boolean;
  email: string | null;
}
export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [fontsLoaded] = useFonts({
    ExtraDays: require("../../assets/fonts/extraDays.otf"),
    Oxford: require("../../assets/fonts/Oxford.ttf"),
    Zikketica: require("../../assets/fonts/Zikketica.ttf"),
  });

  const resetPasswordHandler = async () => {
    const response = (await resetPassword(email)) as unknown as
      | boolean
      | string;

    switch (response) {
      case "missing-email":
        Alert.alert("Please fill e-mail field!");
        break;
      case true:
        Alert.alert("Password reset link was sent to your e-mail");
        router.push("/pages/Login");
        break;
    }
  };

  if (!fontsLoaded) return;

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <View style={ItemsStyles.topNavBar}>
        <View style={[ItemsStyles.topNavBarBackground]} />
        <ImageButton
          style={{
            ...ItemsStyles.topNavBarIcon,
            tintColor: "rgba(0, 0, 0, 0.5)",
          }}
          image={require("../../assets/icons/png/left.png")}
          onPress={() => router.back()}
        />
      </View>
      <Text style={LoginStyles.loginText}>Password Reset</Text>
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
      <TouchableOpacity
        style={LoginStyles.loginButtonContainer}
        onPress={resetPasswordHandler}
      >
        <Text style={LoginStyles.loginButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
