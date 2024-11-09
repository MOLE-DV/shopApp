import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export default StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    marginTop: 0,
  },
  activityIndicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
