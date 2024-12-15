import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { RelativePathString, router } from "expo-router";
import { useState, useEffect, useRef } from "react";

import GlobalStyles from "../styles/GlobalStyles";
import MainStyles from "../styles/Main/MainStyles";

import Fetch from "../components/FetchData";

interface Item {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
}
export default function App() {
  const [data, setData] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);
  let lastScroll = 0;

  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const animationDuration = 200;

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: -100,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const fetchData = async () => {
      const items = await Fetch();
      if (items) {
        setData(items);
        setLoaded(true);
      }
    };
    fetchData();
  }, []);

  const ScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let scroll = event.nativeEvent.contentOffset.y;

    if (scroll > lastScroll) {
      fadeOut();
    } else if (scroll < lastScroll) {
      fadeIn();
    }

    lastScroll = scroll;
  };

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <ActivityIndicator
        size="large"
        style={GlobalStyles.activityIndicator}
        color="rgb(105, 64, 255)"
        animating={!loaded}
      />
      <Animated.View
        style={{
          ...MainStyles.searchBarContainer,
          transform: [{ translateY: fadeAnimation }],
        }}
      >
        <TouchableOpacity
          style={MainStyles.searchBarInputContainer}
          onPress={() => router.push("/pages/Catalog")}
        >
          <Text style={MainStyles.searchBarInput}>Search</Text>
          <Image
            style={MainStyles.searchBarIcon}
            source={require("../assets/icons/png/search.png")}
          />
        </TouchableOpacity>
        <StatusBar style="auto" />
      </Animated.View>
      <FlatList
        numColumns={2}
        style={MainStyles.itemsList}
        contentContainerStyle={MainStyles.flatListContainerStyle}
        data={data}
        columnWrapperStyle={MainStyles.columnWrapperContainer}
        onScroll={ScrollHandler}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={MainStyles.listItem}
              onPress={() =>
                router.push({
                  pathname: `/pages/items/${item.id}` as RelativePathString,
                  params: {
                    itemId: item.id,
                    title: item.title,
                    price: item.price,
                    icon: item.icon,
                    description: item.description,
                  },
                })
              }
            >
              <Image
                style={MainStyles.listItemIcon}
                source={{ uri: item.icon }}
              />
              <Text style={MainStyles.listItemText}>
                {item.title}
                {"\n"}
                <Text style={MainStyles.listItemTextPrice}>{item.price}$</Text>
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
