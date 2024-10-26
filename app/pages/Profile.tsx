import { View, Text, SafeAreaView, Image } from "react-native";

import ProfileStyles from "../../styles/Profile/ProfileStyles";
import GlobalStyles from "../../styles/GlobalStyles";

import Header from "../../components/Header";

export default function Profile() {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <View style={ProfileStyles.welcomeHeader}>
        <View style={ProfileStyles.profileIconContainer}>
          <Image
            style={ProfileStyles.profileIcon}
            source={require("../../assets/icons/png/user.png")}
          />
        </View>
        <Text style={ProfileStyles.welcomeText}>Welcome User!</Text>
      </View>
      <Header selected="profile" />
    </SafeAreaView>
  );
}
