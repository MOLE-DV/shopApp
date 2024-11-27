import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    width: "100%",
    height: 80,
    backgroundColor: "white",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
    bottom: 0,
  },
  imageButton: {
    height: 40,
    width: 40,
    tintColor: "black",
  },
  imageButtonSelected: {
    height: 50,
    width: 50,
    tintColor: "rgb(105, 64, 255)",
  },
});
