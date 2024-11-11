import { StyleSheet, Dimensions } from "react-native";

const CreateNewStyles = StyleSheet.create({
  importButton: {
    height: 200,
    width: 200,
    borderWidth: 1,
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 30,
  },
  importButtonText: {
    bottom: 40,
    fontSize: 15,
  },
  importButtonImage: {
    height: 50,
    width: 50,
  },
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
    width: Dimensions.get("window").width,
    paddingHorizontal: Dimensions.get("window").width / 10,
    marginTop: 0,
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    color: "black",
    fontFamily: "Zikketica",
  },
  input: {
    height: 200,
    fontSize: 12,
    marginBottom: 20,
    paddingHorizontal: 40,
    paddingTop: 20,
    borderColor: "rgb(165, 165, 165)",
    borderWidth: 1,
    borderRadius: 2.5,
    fontFamily: "Zikketica",
    textAlignVertical: "top",
  },
  inputIcon: {
    position: "absolute",
    height: 25,
    width: 25,
    top: 45.5,
    left: Dimensions.get("window").width / 10 + 7,
    tintColor: "rgb(165, 165, 165)",
  },
  priceInputContainer: {
    width: Dimensions.get("window").width,
    paddingHorizontal: Dimensions.get("window").width / 10,
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
});

export default CreateNewStyles;
