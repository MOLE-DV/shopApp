import { View, Text, SafeAreaView } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles";

import Header from "../../components/Header";

export default function Followed() {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <Text>Followed tab</Text>
    </SafeAreaView>
  );
}
