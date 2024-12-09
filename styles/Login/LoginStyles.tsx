import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  loginText: {
    fontFamily: "ExtraDays",
    fontSize: 40,
    marginBottom: 30,
    marginTop: 80,
    marginLeft: 20,
    color: "black",
  },
  forgotPasswordContainer: {
    width: Dimensions.get("window").width,
    height: 30,
  },
  forgotPasswordText: {
    position: "absolute",
    fontFamily: "Zikketica",
    height: 40,
    right: 40,
  },
  topNavBar: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topNavBarIcon: {
    tintColor: "white",
    height: 40,
    width: 40,
    marginHorizontal: 20,
  },
  topNavBarBackground: {
    position: "absolute",
    width: "100%",
    height: 60,
  },
});
