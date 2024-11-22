import { Dimensions, StyleSheet } from "react-native";

const ImageButtonPickerStyles = StyleSheet.create({
  imageContainerStyle: {
    flexDirection: "row",
  },
  imagesScroll: {
    width: 250,
    height: 250,
    flexDirection: "row",
    marginBottom: 30,
    marginTop: 80,
  },
  image: {
    height: 250,
    width: 250,
    position: "absolute",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgb(165, 165, 165)",
  },
  importButton: {
    height: 250,
    width: 250,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderColor: "rgb(165, 165, 165)",
  },
  importButtonText: {
    bottom: 40,
    fontSize: 15,
  },
  importButtonImage: {
    height: 50,
    width: 50,
  },
  slider: {
    position: "absolute",
    width: 250,
    bottom: 5,
    zIndex: 2,
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: "50%",
    backgroundColor: "white",
  },
});

export default ImageButtonPickerStyles;
