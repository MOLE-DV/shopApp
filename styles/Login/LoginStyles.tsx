import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  loginText: {
    fontFamily: "ExtraDays",
    fontSize: 40,
    marginBottom: 50,
    marginTop: 100,
    marginLeft: 20,
    color: "black",
  },
  inputContainer: {
    width: Dimensions.get("window").width,
    paddingHorizontal: Dimensions.get("window").width / 10,
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    color: "black",
    fontFamily: "Zikketica",
  },
  input: {
    height: 50,
    fontSize: 12,
    marginBottom: 20,
    paddingHorizontal: 40,
    borderBottomColor: "rgb(165, 165, 165)",
    borderBottomWidth: 1,
    fontFamily: "Zikketica",
  },
  inputIcon: {
    position: "absolute",
    height: 25,
    width: 25,
    bottom: 32.5,
    left: Dimensions.get("window").width / 10 + 7,
    tintColor: "rgb(165, 165, 165)",
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
});
