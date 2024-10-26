import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  searchBarContainer: {
    width: "80%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: 20,
  },
  searchBarInputContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#283044",
    display: "flex",
    flexDirection: "row",
  },
  searchBarInput: {
    color: "black",
    textAlignVertical: "center",
    height: "100%",
    width: "80%",
    fontSize: 20,
    paddingLeft: 10,
  },
  searchBarIcon: {
    height: 30,
    width: 30,
    position: "absolute",
    right: 10,
    top: "20%",
  },
  flatListContainerStyle: {
    paddingBottom: Dimensions.get("window").width / 2 - 10,
  },
  itemsList: {
    paddingTop: Dimensions.get("window").width / 2 - 100,
    zIndex: -1,
    flexGrow: 1,
  },
  listItem: {
    width: Dimensions.get("window").width / 2 - 10,
    height: Dimensions.get("window").width / 2 - 10 + 20,
    marginLeft: 2.5,
    marginBottom: 2.5,
    backgroundColor: "#F5F5F5",
    display: "flex",
    justifyContent: "flex-end",
    overflow: "hidden",
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1,
    borderRadius: 10,
  },
  listItemText: {
    color: "black",
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    fontSize: 15,
  },
  listItemTextPrice: {
    fontWeight: "bold",
  },
  listItemIcon: {
    width: Dimensions.get("window").width / 2 - 10,
    height: Dimensions.get("window").width / 2 - 10,
  },
});
