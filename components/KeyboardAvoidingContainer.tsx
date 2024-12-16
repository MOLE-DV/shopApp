import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { ReactNode, useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface propsI {
  children?: ReactNode;
  NavBarPadding?: boolean;
}

const KeyboardAvoidingContainer: React.FC<propsI> = ({
  children,
  NavBarPadding = true,
}) => {
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
        marginTop: NavBarPadding
          ? Platform.OS === "ios"
            ? 20
            : useSafeAreaInsets().top
          : 0,
        paddingBottom: padding,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          bounces={false}
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
