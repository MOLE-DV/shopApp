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

import { signUp } from "../../components/UserAuthentication";
import ImageButton from "@/components/ImageButton";

interface userInfo {
  loggedIn: boolean;
  email: string | null;
}
export default function SignUp() {
  const [userInfo, setUserInfo] = useState<userInfo | {}>({});

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

  const signUpHandler = async () => {
    const response = (await signUp(email, password)) as string | boolean;

    switch (response) {
      case "empty-data":
        Alert.alert("Please fill in all the fields!");
        break;
      case "missing-password":
        Alert.alert("Password field is required");
        break;
      case "invalid-email":
        Alert.alert(
          "Invalid e-mail! Email should look like this: example@example.com"
        );
        break;
      case "weak-password":
        Alert.alert(
          "Password should be at least 6 characters long, contain at least one uppercase letter, lowercase letter and special character"
        );
        break;
      case "email-already-in-use":
        Alert.alert("This e-mail is already in use!");
        break;
    }

    if (response === true) {
      router.push("/pages/Profile");
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
      <Text style={LoginStyles.loginText}>Sign up</Text>
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
    </SafeAreaView>
  );
}
