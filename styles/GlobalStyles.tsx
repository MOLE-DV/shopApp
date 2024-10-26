import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export default StyleSheet.create({
  androidSafeArea: {
    alignItems: "center",
    backgroundColor: "white",
    height: Dimensions.get("window").height,
    marginTop: 35,
  },
});
