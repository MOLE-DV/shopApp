import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  profileIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#333",
    overflow: "hidden",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileIcon: {
    height: 40,
    width: 40,
  },
  welcomeHeader: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    padding: 40,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  welcomeText: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 10,
    color: "black",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  loginButton: {
    padding: 10,
    backgroundColor: "rgb(105, 64, 255)",
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 17,
    color: "white",
  },
  separator: {
    fontSize: 17,
    marginLeft: 10,
    marginRight: 10,
  },
});
