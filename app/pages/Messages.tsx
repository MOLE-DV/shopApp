import { View, Text, SafeAreaView } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles";

export default function Messages() {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <Text>Messages Tab</Text>
    </SafeAreaView>
  );
}
