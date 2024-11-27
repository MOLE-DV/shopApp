import { StyleSheet, Dimensions } from "react-native";

const TextInputIconStyles = StyleSheet.create({
  inputContainer: {
    width: Dimensions.get("window").width,
    paddingHorizontal: Dimensions.get("window").width / 10,
    marginTop: 0,
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    color: "black",
    fontFamily: "Zikketica",
    alignSelf: "left",
  },
  input: {
    height: 50,
    width: "100%",
    fontSize: 12,
    marginBottom: 20,
    paddingHorizontal: 40,
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
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgb(165, 165, 165)",
    bottom: 20,
    position: "absolute",
  },
});

export default TextInputIconStyles;
