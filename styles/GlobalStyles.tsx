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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
