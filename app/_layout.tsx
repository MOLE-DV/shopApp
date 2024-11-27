import { Stack } from "expo-router";
import React from "react";
import Header from "../components/Header";
import { HeaderProvider } from "@/contexts/HeaderContext";

const RootLayout = () => {
  const settings = {
    headerShown: false,
  };

  return (
    <HeaderProvider>
      <Stack>
        <Stack.Screen name="index" options={settings} />
        <Stack.Screen name="pages/CreateNew" options={settings} />
        <Stack.Screen name="pages/Catalog" options={settings} />
        <Stack.Screen name="pages/Followed" options={settings} />
        <Stack.Screen name="pages/Login" options={settings} />
        <Stack.Screen name="pages/SignUp" options={settings} />
        <Stack.Screen name="pages/ForgotPassword" options={settings} />
        <Stack.Screen name="pages/Messages" options={settings} />
        <Stack.Screen name="pages/Profile" options={settings} />
        <Stack.Screen name="pages/items/[id]" options={settings} />
      </Stack>
      <Header />
    </HeaderProvider>
  );
};

export default RootLayout;
