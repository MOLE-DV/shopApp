import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { router, Href, useRootNavigationState } from "expo-router";

import GlobalStyles from "../styles/GlobalStyles";
import HeaderStyles from "../styles/Header/HeaderStyles";

import ImageButton from "../components/ImageButton";

export default function Header(props: any) {
  const [selected, setSelected] = useState<string>("main");

  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  let images = {
    house: require("../assets/icons/png/house.png"),
    houseOpen: require("../assets/icons/png/house_open.png"),
    catalog: require("../assets/icons/png/catalog.png"),
    catalogOpen: require("../assets/icons/png/catalog_open.png"),
    heart: require("../assets/icons/png/heart.png"),
    heartOpen: require("../assets/icons/png/heart_open.png"),
    mail: require("../assets/icons/png/mail.png"),
    mailOpen: require("../assets/icons/png/mail_open.png"),
    user: require("../assets/icons/png/user.png"),
    userOpen: require("../assets/icons/png/user_open.png"),
  };

  function pressHandler(buttonType: string, path: Href<string>) {
    router.push(path);
    setSelected(buttonType);
  }

  return (
    <View style={HeaderStyles.header}>
      <ImageButton
        image={selected === "main" ? images.houseOpen : images.house}
        style={
          selected === "main"
            ? HeaderStyles.imageButtonSelected
            : HeaderStyles.imageButton
        }
        onPress={() => pressHandler("main", "/")}
      />
      <ImageButton
        image={selected === "search" ? images.catalogOpen : images.catalog}
        style={
          selected === "search"
            ? HeaderStyles.imageButtonSelected
            : HeaderStyles.imageButton
        }
        onPress={() => pressHandler("search", "/pages/Catalog")}
      />
      <ImageButton
        image={selected === "followed" ? images.heartOpen : images.heart}
        style={
          selected === "followed"
            ? HeaderStyles.imageButtonSelected
            : HeaderStyles.imageButton
        }
        onPress={() => pressHandler("followed", "/pages/Followed")}
      />
      <ImageButton
        image={selected === "messages" ? images.mailOpen : images.mail}
        style={
          selected === "messages"
            ? HeaderStyles.imageButtonSelected
            : HeaderStyles.imageButton
        }
        onPress={() => pressHandler("messages", "/pages/Messages")}
      />
      <ImageButton
        image={selected === "profile" ? images.userOpen : images.user}
        style={
          selected === "profile"
            ? HeaderStyles.imageButtonSelected
            : HeaderStyles.imageButton
        }
        onPress={() => pressHandler("profile", "/pages/Profile")}
      />
    </View>
  );
}
