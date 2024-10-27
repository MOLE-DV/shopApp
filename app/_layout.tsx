import { Stack } from "expo-router";
import Header from "../components/Header";
import { Dimensions, SafeAreaView } from "react-native";
import GlobalStyles from "@/styles/GlobalStyles";
const RootLayout = () => {
  const settings = {
    headerShown: false,
  };
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={settings} />
        <Stack.Screen name="pages/Catalog" options={settings} />
        <Stack.Screen name="pages/Followed" options={settings} />
        <Stack.Screen name="pages/Login" options={settings} />
        <Stack.Screen name="pages/SignUp" options={settings} />
        <Stack.Screen name="pages/ForgotPassword" options={settings} />
        <Stack.Screen name="pages/Messages" options={settings} />
        <Stack.Screen name="pages/Profile" options={settings} />
        <Stack.Screen name="pages/items/[id]" options={settings} />
      </Stack>
      <SafeAreaView
        style={{
          height: Dimensions.get("window").height + 35,
          width: Dimensions.get("window").width,
          position: "absolute",
        }}
      >
        <Header />
      </SafeAreaView>
    </>
  );
};

export default RootLayout;
