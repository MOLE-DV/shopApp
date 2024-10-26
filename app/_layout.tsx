import { Stack } from "expo-router";
import Header from "@/components/Header";
import { View } from "react-native";

const RootLayout = () => {
  const settings = {
    headerShown: false,
  };
  return (
    <View>
      <Stack>
        <Stack.Screen name="index" options={settings} />
        <Stack.Screen name="pages/Catalog" options={settings} />
        <Stack.Screen name="pages/Followed" options={settings} />
        <Stack.Screen name="pages/Login" options={settings} />
        <Stack.Screen name="pages/Messages" options={settings} />
        <Stack.Screen name="pages/Profile" options={settings} />
      </Stack>
      <Header />
    </View>
  );
};

export default RootLayout;
