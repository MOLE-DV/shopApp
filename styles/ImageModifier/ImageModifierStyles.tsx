import { Dimensions, StyleSheet } from "react-native";

const imageScale = 1;
const imageSize = Dimensions.get("window").width * imageScale;

const ImageModifierStyles = StyleSheet.create({
  container: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    flex: 1,
    zIndex: 999,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageMaskStyle: {
    flexDirection: "row",
  },
  mask: {
    flex: 1,
    backgroundColor: "transparent",
  },
  cropPicker: {
    top: 0,
    aspectRatio: 1,
    backgroundColor: "black",
  },
  image: {},
  imageBackground: {
    height: imageSize,
    position: "absolute",
    filter: [{ brightness: "25%" }],
  },
  toolbar: {
    height: 80,
    backgroundColor: "white",
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
    marginTop: 100,
    borderRadius: 10,
  },
  buttonStyle: {
    width: 80,
    justifyContent: "center",
  },
  buttonImage: {
    height: 35,
    width: 35,
    margin: 0,
  },
  buttonTextStyle: {
    fontSize: 10,
    position: "relative",
    bottom: 0,
  },
});

export default ImageModifierStyles;
