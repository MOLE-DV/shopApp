import { StyleSheet, Dimensions } from "react-native";

const CreateNewStyles = StyleSheet.create({
  title: {
    color: "rgb(105, 64, 255)",
    height: 40,
    width: 300,
    borderColor: "rgb(105, 64, 255)",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  description: {
    height: 200,
    textAlignVertical: "top",
    padding: 10,
  },
  inputContainer: {
    width: Dimensions.get("window").width - Dimensions.get("window").width / 20,
    marginTop: 0,
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    color: "black",
    fontFamily: "Zikketica",
  },
  input: {
    fontSize: 12,
    marginBottom: 20,
    paddingLeft: 40,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: "rgb(165, 165, 165)",
    borderRadius: 2.5,
    fontFamily: "Zikketica",
    textAlignVertical: "top",
  },
  inputIcon: {
    position: "absolute",
    height: 25,
    width: 25,
    left: Dimensions.get("window").width / 40,
    tintColor: "rgb(165, 165, 165)",
  },
  priceInputContainer: {
    width: Dimensions.get("window").width - Dimensions.get("window").width / 20,
    marginTop: 0,
  },
  priceLabel: {
    fontSize: 15,
    marginBottom: 10,
    color: "black",
    fontFamily: "Zikketica",
  },
  priceInput: {
    height: 50,
    fontSize: 12,
    marginBottom: 20,
    paddingHorizontal: 40,
    borderColor: "rgb(165, 165, 165)",
    borderWidth: 1,
    borderRadius: 2.5,
    fontFamily: "Zikketica",
  },
  ListButton: {
    width: Dimensions.get("window").width - Dimensions.get("window").width / 20,
    position: "relative",
  },
});

export default CreateNewStyles;
