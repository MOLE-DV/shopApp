import { StyleSheet } from "react-native";

const CreateNewStyles = StyleSheet.create({
  importButton: {
    height: 250,
    width: 250,
    borderColor: "rgb(105, 64, 255)",
    borderWidth: 1,
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  importButtonText: {
    bottom: 60,
    fontSize: 18,
    color: "rgb(105, 64, 255)",
  },
  importButtonImage: {
    height: 70,
    width: 70,
    tintColor: "rgb(105, 64, 255)",
  },
  title: {
    color: "rgb(105, 64, 255)",
    height: 40,
    width: 300,
    marginTop: 20,
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
});

export default CreateNewStyles;
