import React, { useState } from "react";
import { useFocusEffect } from "expo-router";
import { Image, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";

import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

import ImageButton from "../../../components/ImageButton";

import ItemsStyles from "../../../styles/Items/ItemsStyles";
import {
  Fetch,
  addToFavorites,
  removeFromFavorites,
} from "@/components/FavoritesManager";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import categories from "@/assets/categories";

interface User {
  loggedIn: boolean;
  email: null | string;
  displayName: null | string;
}

export default function Item() {
  let { itemId, title, icon, price, categoryIndex, description } =
    useLocalSearchParams();

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
    <View style={{ flex: 1, position: "relative", backgroundColor: "white" }}>
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
      <Image style={ItemsStyles.icon} source={{ uri: changedIcon }} />
      <KeyboardAvoidingContainer NavBarPadding={false}>
        <View style={ItemsStyles.info}>
          <View style={ItemsStyles.infoLeft}>
            <Text style={ItemsStyles.title}>{title}</Text>
            <Text
              style={[ItemsStyles.price, { fontSize: 25 - 0.5 * price.length }]}
            >
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(Number(price))}
            </Text>
          </View>
          <View style={ItemsStyles.infoRight}>
            <Text style={ItemsStyles.categoryLabel}>Category:</Text>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <Image
                style={ItemsStyles.categoryIcon}
                source={categories[Number(categoryIndex)].image}
              />
              <Text style={ItemsStyles.category}>
                {categories[Number(categoryIndex)].value}
              </Text>
            </View>
          </View>
        </View>
        <View style={ItemsStyles.descriptionBackground}>
          <View style={ItemsStyles.description}>
            <Text style={ItemsStyles.descriptionText}>{description}</Text>
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
}
