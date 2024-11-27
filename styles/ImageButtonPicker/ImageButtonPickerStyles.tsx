import { Dimensions, StyleSheet } from "react-native";

const size = 300;

const ImageButtonPickerStyles = StyleSheet.create({
  imageContainerStyle: {
    flexDirection: "row",
  },
  imagesScroll: {
    flexDirection: "row",
    borderRadius: 10,
  },
  imageScrollUpperContainer: {
    width: size,
    height: size,
    marginBottom: 30,
    marginTop: 80,
  },
  image: {
    height: size,
    width: size,
  },
  importButton: {
    height: size,
    width: size,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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
  slider: {
    position: "absolute",
    width: size,
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
    backgroundColor: "rgb(216, 216, 216)",
  },
  SelectedDot: {
    height: 10,
    width: 10,
    borderRadius: "50%",
    backgroundColor: "white",
  },
});

export default ImageButtonPickerStyles;
