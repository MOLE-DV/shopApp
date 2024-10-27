import { View, Text, SafeAreaView } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles";

export default function Catalog() {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <Text>Hello World!</Text>
    </SafeAreaView>
  );
}
