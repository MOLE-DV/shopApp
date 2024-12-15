import React, { useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  ImageBackground,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

import ImageButton from "../../../components/ImageButton";

import GlobalStyles from "../../../styles/GlobalStyles";
import ItemsStyles from "../../../styles/Items/ItemsStyles";
import {
  Fetch,
  addToFavorites,
  removeFromFavorites,
} from "@/components/FavoritesManager";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";

interface User {
  loggedIn: boolean;
  email: null | string;
  displayName: null | string;
}

export default function Item() {
  const { itemId, title, icon, price, description } = useLocalSearchParams();
  const [user, setUser] = useState<User>({
    loggedIn: false,
    email: null,
    displayName: null,
  });
  const [isFavorite, setToFavorite] = useState(false);
  let changedIcon = icon.toString().replace(`items/`, `items%2F`);

  const heartIcons = {
    heart: require("../../../assets/icons/png/heart.png"),
    heart_open: require("../../../assets/icons/png/heart_open.png"),
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          const item = await SecureStore.getItemAsync("userData");
          if (item) {
            const parsedItem = JSON.parse(item);
            setUser({
              loggedIn: true,
              email: parsedItem.email,
              displayName: parsedItem.displayName,
            });
          }
        } catch (error) {
          console.error(error);
        }
        fetchFavorites();
      };
      fetchUser();

      const fetchFavorites = async () => {
        if (!user.loggedIn) return;

        const favorites = await Fetch(user.email as string);
        if (favorites) {
          const favoritedItems = favorites[0].items;
          setToFavorite(favoritedItems.includes(itemId.toString()));
        }
      };
    }, [user.email, user.loggedIn])
  );

  const favoriteButtonHandler = async () => {
    if (!user.loggedIn) {
      router.push("/pages/Login");
      return;
    }

    if (isFavorite) {
      await removeFromFavorites(user.email as string, itemId as string);
      setToFavorite(false);
    } else {
      await addToFavorites(user.email as string, itemId as string);
      setToFavorite(true);
    }
  };
  return (
    <>
      <View style={ItemsStyles.topNavBar}>
        <ImageButton
          style={ItemsStyles.topNavBarIcon}
          image={require("../../../assets/icons/png/left.png")}
          onPress={() => router.back()}
        />
        <ImageButton
          style={ItemsStyles.topNavBarIcon}
          image={isFavorite ? heartIcons.heart_open : heartIcons.heart}
          onPress={favoriteButtonHandler}
        />
      </View>
      <ImageBackground style={ItemsStyles.icon} source={{ uri: changedIcon }}>
        <Text style={ItemsStyles.title}>{title}</Text>
      </ImageBackground>
      <KeyboardAvoidingContainer>
        <View style={ItemsStyles.info}>
          <Text style={ItemsStyles.button}>{price}$</Text>
          <ImageButton
            image={require("../../../assets/icons/png/cart.png")}
            style={ItemsStyles.buttonIcon}
            buttonStyle={ItemsStyles.button}
          />
          <ImageButton
            image={require("../../../assets/icons/png/mail.png")}
            style={ItemsStyles.buttonIcon}
            buttonStyle={ItemsStyles.button}
          />
        </View>
        <View style={ItemsStyles.descriptionBackground}>
          <View style={ItemsStyles.description}>
            <Text style={ItemsStyles.descriptionText}>{description}</Text>
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </>
  );
}
