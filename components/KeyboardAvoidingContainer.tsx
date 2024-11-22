import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import GlobalStyles from "@/styles/GlobalStyles";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const KeyboardAvoidingContainer = ({ children }: React.PropsWithChildren) => {
  let headerPadding = 80;
  let bottomPadding = 70;
  const [padding, setPadding] = useState(headerPadding);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setPadding(0);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setPadding(headerPadding);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 35,
        paddingBottom: padding,
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: bottomPadding,
          }}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;
