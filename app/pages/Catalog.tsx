import { View, Text, SafeAreaView } from "react-native";
import GlobalStyles from "../../styles/GlobalStyles";

import Header from "../../components/Header";

export default function Catalog() {
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <Text>Hello World!</Text>
      <Header selected="search" />
    </SafeAreaView>
  );
}
