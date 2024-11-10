import { Dimensions, StyleSheet } from "react-native";

const icon_size = 70;

export default StyleSheet.create({
  welcomeHeader: {
    overflow: "visible",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3.5,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  profileIconContainer: {
    marginLeft: 25,
    borderRadius: Dimensions.get("window").width * 0.65,
    borderColor: "white",
    borderWidth: 1,
    padding: icon_size - 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "rgb(105, 64, 255)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  headerBackground: {
    top: 0,
    width: "100%",
    height: Dimensions.get("window").height / 3.5 - icon_size / 2 - 25,
    position: "absolute",
    backgroundColor: "rgb(105, 64, 255)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 10,
    paddingBottom: 10,
    flexDirection: "row",
    gap: 10,
  },
  headerLoginButton: {
    color: "white",
    fontSize: 20,
  },
  profileIcon: {
    height: icon_size,
    width: icon_size,
    resizeMode: "contain",
    tintColor: "rgb(105, 64, 255)",
  },
  headerName: {
    bottom: 2,
    overflow: "visible",
    marginTop: 20,
    fontSize: 20,
    color: "white",
  },
  contentStyles: {
    width: Dimensions.get("window").width,
    padding: 30,
  },
  contentStylesButton: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderColor: "rgb(105, 64, 255)",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  contentStylesImage: {
    height: 40,
    width: 40,
    tintColor: "rgb(105, 64, 255)",
  },
  contentStylesText: {
    color: "rgb(105, 64, 255)",
    marginLeft: 10,
    fontSize: 16,
  },
});
