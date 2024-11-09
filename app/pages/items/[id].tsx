import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  ImageBackground,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

import ImageButton from "../../../components/ImageButton";

import GlobalStyles from "../../../styles/GlobalStyles";
import ItemsStyles from "../../../styles/Items/ItemsStyles";

export default function Item() {
  const { itemId, title, icon, price, description } = useLocalSearchParams();
  const [isFavorite, setToFavorite] = useState(false);
  const [favoritedItems, setFavoritedItems] = useState([]);

  let changedIcon = icon.toString().replace(`items/`, `items%2F`);

  const heartIcons = {
    heart: require("../../../assets/icons/png/heart.png"),
    heart_open: require("../../../assets/icons/png/heart_open.png"),
  };

  useEffect(() => {
    favoritedItems.forEach((item) => {
      switch (itemId === item.id) {
        case true:
          setToFavorite(true);
          break;
        default:
          break;
      }
    });
  }, []);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animationDuration = 150;

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const ScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    switch (event.nativeEvent.contentOffset.y > 80) {
      case true:
        fadeOut();
        break;
      case false:
        fadeIn();
        break;
    }
  };

  const favoriteButtonHandler = async () => {
    // try {
    //   switch (isFavorite) {
    //     case true:
    //       favoritedItems.splice(
    //         favoritedItems.indexOf({ id: itemId, title: title }),
    //         1
    //       );
    //       break;
    //     case false:
    //       favoritedItems.push({ id: itemId, title: title });
    //       break;
    //   }
    //   setToFavorite(!isFavorite);
    // } catch (error) {
    //   console.error("Failed to save item to favorites", error);
    // }
  };

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <View style={ItemsStyles.topNavBar}>
        <Animated.View
          style={[ItemsStyles.topNavBarBackground, { opacity: fadeAnim }]}
        />
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
      <ScrollView
        onScroll={ScrollHandler}
        scrollEventThrottle={16}
        style={ItemsStyles.scrollView}
        contentContainerStyle={ItemsStyles.scrollViewContent}
      >
        <View style={ItemsStyles.info}>
          <Text style={ItemsStyles.button}>{price}</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}
