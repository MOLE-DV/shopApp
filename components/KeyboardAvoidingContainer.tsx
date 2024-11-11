import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import GlobalStyles from "@/styles/GlobalStyles";

const KeyboardAvoidingContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 35, paddingBottom: 80 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;
