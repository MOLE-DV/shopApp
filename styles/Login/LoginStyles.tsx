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
  loginButtonContainer: {
    marginTop: 15,
    width:
      Dimensions.get("window").width -
      (Dimensions.get("window").width / 10) * 2,

    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(105, 64, 255)",
  },
  loginButtonText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 18,
    letterSpacing: 2,
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
