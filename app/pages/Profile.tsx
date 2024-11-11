import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";

import ProfileStyles from "../../styles/Profile/ProfileStyles";
import GlobalStyles from "../../styles/GlobalStyles";

import { isLoggedIn, logOut } from "@/components/UserAuthentication";

interface userInfo {
  loggedIn: boolean;
  email: string | null;
  displayName: string | null;
}

export default function Profile() {
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState<userInfo>({
    loggedIn: false,
    email: null,
    displayName: null,
  });

  const [fontsLoaded] = useFonts({
    ExtraDays: require("../../assets/fonts/extraDays.otf"),
    Oxford: require("../../assets/fonts/Oxford.ttf"),
    Zikketica: require("../../assets/fonts/Zikketica.ttf"),
  });

  useFocusEffect(
    React.useCallback(() => {
      async function fetchUserInfo() {
        await SecureStore.getItemAsync("userData").then((userData) => {
          if (!userData) return;

          const user = JSON.parse(userData as string);

          setUserInfo({
            loggedIn: true,
            email: user.email,
            displayName: user.displayName,
          } as userInfo);
        });

        setLoaded(true);
      }

      fetchUserInfo();
    }, [])
  );

  if (!fontsLoaded) return;

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <ActivityIndicator
        size="large"
        style={GlobalStyles.activityIndicator}
        color="rgb(105, 64, 255)"
        animating={!loaded}
      />
      <View style={ProfileStyles.welcomeHeader}>
        <View style={ProfileStyles.headerBackground}>
          {userInfo.loggedIn ? (
            <Text
              style={{ ...ProfileStyles.headerName, fontFamily: "Zikketica" }}
            >
              {userInfo.displayName}
            </Text>
          ) : (
            <>
              <TouchableOpacity onPress={() => router.push("/pages/Login")}>
                <Text style={ProfileStyles.headerLoginButton}>Login</Text>
              </TouchableOpacity>
              <Text style={ProfileStyles.headerLoginButton}>/</Text>
              <TouchableOpacity onPress={() => router.push("/pages/SignUp")}>
                <Text style={ProfileStyles.headerLoginButton}>Sign up</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={ProfileStyles.profileIconContainer}>
          <Image
            style={ProfileStyles.profileIcon}
            source={require("../../assets/icons/png/user.png")}
          />
        </View>
      </View>
      <View style={ProfileStyles.contentStyles}>
        <TouchableOpacity
          style={ProfileStyles.contentStylesButton}
          onPress={() =>
            userInfo.loggedIn
              ? router.push("/pages/CreateNew")
              : router.push("/pages/Login")
          }
        >
          <Image
            style={ProfileStyles.contentStylesImage}
            source={require("../../assets/icons/png/plus.png")}
          />
          <Text style={ProfileStyles.contentStylesText}>List new item</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          logOut();
          router.push("/pages/Profile");
        }}
        style={{
          position: "absolute",
          bottom: 100,
        }}
      >
        <Text>Tymczasowy przycisk: wyloguj</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
