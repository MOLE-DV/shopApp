import { StyleSheet, Dimensions } from "react-native";

const CustomButtonStyles = StyleSheet.create({
  customButtonContainer: {
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
  customButtonText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 18,
    letterSpacing: 2,
  },
});

export default CustomButtonStyles;
