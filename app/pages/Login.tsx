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
import TextInputIcon from "@/components/TextInputIcon";
import { isLoggedIn } from "../../components/UserAuthentication";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { useFonts } from "expo-font";

import LoginStyles from "../../styles/Login/LoginStyles";
import GlobalStyles from "../../styles/GlobalStyles";

import { logIn } from "../../components/UserAuthentication";
import ImageButton from "@/components/ImageButton";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import CustomButton from "@/components/CustomButton";
import { useApp } from "@/contexts/AppContext";

interface userInfo {
  loggedIn: boolean;
  email: string | null;
}
export default function Login() {
  const [userInfo, setUserInfo] = useState<userInfo | {}>({});
  const { setLoading, setHidden } = useApp();

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
    setLoading(true);
    setHidden(true);
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
    setLoading(false);
    setHidden(false);
    if (response === true) {
      router.back();
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
      <Text style={LoginStyles.loginText}>Login</Text>
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
        secureTextEntry={true}
      />
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
      <CustomButton Text="Login" OnPress={() => loginbuttonHandler()} />
    </KeyboardAvoidingContainer>
  );
}
