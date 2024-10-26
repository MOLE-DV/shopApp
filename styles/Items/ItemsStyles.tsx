import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  icon: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    flexDirection: "column-reverse",
    position: "absolute",
    top: 0,
  },
  scrollView: {
    paddingTop: Dimensions.get("window").width,
  },
  scrollViewContent: {
    paddingBottom: 500,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    margin: 10,
    zIndex: 0,
    textShadowColor: "rgb(0, 0, 0)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  info: {
    width: Dimensions.get("window").width,
    padding: 20,
    backgroundColor: "white",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    height: 50,
    width: Dimensions.get("window").width / 3 - 10,
    marginRight: 10,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "rgb(105, 64, 255)",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    height: 30,
    width: 30,
    tintColor: "white",
  },
  topNavBar: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topNavBarIcon: {
    tintColor: "white",
    height: 40,
    width: 40,
    marginHorizontal: 20,
  },
  topNavBarBackground: {
    backgroundColor: "rgba(40, 48, 68, 1)",
    position: "absolute",
    width: "100%",
    height: 60,
  },
  descriptionBackground: {
    backgroundColor: "white",
  },
  description: {
    padding: 20,
    backgroundColor: "#F5F5F5",
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#E6E6E6",
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },
  descriptionText: {
    color: "#333333",
    fontWeight: "bold",
    paddingLeft: 10,
    paddingRight: 10,
    lineHeight: 24,
    fontSize: 18,
  },
});
