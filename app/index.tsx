import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { router, useRootNavigationState } from "expo-router";
import { useState, useEffect } from "react";

import GlobalStyles from "../styles/GlobalStyles";
import MainStyles from "../styles/Main/MainStyles";

import Header from "../components/Header";
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

  useEffect(() => {
    const fetchData = async () => {
      const items = await Fetch();
      if (items) {
        setData(items);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <View style={MainStyles.searchBarContainer}>
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
      </View>
      <FlatList
        numColumns={2}
        style={MainStyles.itemsList}
        contentContainerStyle={MainStyles.flatListContainerStyle}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={MainStyles.listItem}
            onPress={() =>
              router.push({
                pathname: `/pages/items/${item.id}`,
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
              {item.title}{" "}
              <Text style={MainStyles.listItemTextPrice}>{item.price}</Text>
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
