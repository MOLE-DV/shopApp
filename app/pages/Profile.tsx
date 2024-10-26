import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";

import ProfileStyles from "../../styles/Profile/ProfileStyles";
import GlobalStyles from "../../styles/GlobalStyles";

import { isLoggedIn, logOut } from "@/components/Users";

import Header from "../../components/Header";

interface userInfo {
  loggedIn: boolean;
  email: string | null;
}

export default function Profile() {
  const [userInfo, setUserInfo] = useState<userInfo>({
    loggedIn: false,
    email: null,
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const userStatus = await isLoggedIn();
      setUserInfo(userStatus as userInfo);
    }

    fetchUserInfo();
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <View style={ProfileStyles.welcomeHeader}>
        <View style={ProfileStyles.profileIconContainer}>
          <Image
            style={ProfileStyles.profileIcon}
            source={require("../../assets/icons/png/user.png")}
          />
        </View>
        {userInfo.loggedIn ? (
          <Text style={ProfileStyles.welcomeText}>
            {`Welcome ${userInfo.email?.split("@")[0]}!`}
          </Text>
        ) : (
          <View style={ProfileStyles.loginContainer}>
            <TouchableOpacity
              style={ProfileStyles.loginButton}
              onPress={() => router.push("/pages/Login")}
            >
              <Text style={ProfileStyles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={ProfileStyles.separator}>/</Text>
            <TouchableOpacity style={ProfileStyles.loginButton}>
              <Text style={ProfileStyles.loginButtonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          logOut();
          router.push("/pages/Profile");
        }}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
