import { View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

import GlobalStyles from "../styles/GlobalStyles";
import HeaderStyles from "../styles/Header/HeaderStyles";

import ImageButton from "../components/ImageButton";

export default function Header(props: any) {
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

  return (
    <View style={HeaderStyles.header}>
      <ImageButton
        image={props.selected === "main" ? images.houseOpen : images.house}
        style={HeaderStyles.imageButton}
        onPress={() => router.push("/")}
      />
      <ImageButton
        image={
          props.selected === "search" ? images.catalogOpen : images.catalog
        }
        style={HeaderStyles.imageButton}
        onPress={() => router.push("/pages/Catalog")}
      />
      <ImageButton
        image={props.selected === "followed" ? images.heartOpen : images.heart}
        style={HeaderStyles.imageButton}
        onPress={() => router.push("/pages/Followed")}
      />
      <ImageButton
        image={props.selected === "messages" ? images.mailOpen : images.mail}
        style={HeaderStyles.imageButton}
        onPress={() => router.push("/pages/Messages")}
      />
      <ImageButton
        image={props.selected === "profile" ? images.userOpen : images.user}
        style={HeaderStyles.imageButton}
        onPress={() => router.push("/pages/Profile")}
      />
    </View>
  );
}
