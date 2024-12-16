import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  searchBarContainer: {
    width: "80%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: 50,
    zIndex: 1,
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
    justifyContent: "center",
    flexGrow: 1,
    alignItems: "center",
    gap: 10,
  },
  columnWrapperContainer: {
    gap: 5,
  },
  itemsList: {
    paddingTop: Dimensions.get("window").width / 2 - 100,
    flexGrow: 1,
    width: Dimensions.get("window").width,
  },
  listItem: {
    backgroundColor: "#F5F5F5",
    display: "flex",
    justifyContent: "flex-end",
    overflow: "hidden",
    width: Dimensions.get("window").width / 2 - 10,
  },
  listItemInfo: {
    width: "100%",
    backgroundColor: "white",
    gap: 5,
  },
  listItemTextPrice: {
    fontSize: 15,
    color: "rgb(105, 64, 255)",
  },
  listItemIcon: {
    width: Dimensions.get("window").width / 2 - 10,
    height: Dimensions.get("window").width / 2 - 10,
  },
  listItemCategory: {
    tintColor: "rgba(105, 64, 255, .72)",
    height: 25,
    width: 25,
    marginRight: 5,
  },
  listItemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemTitle: {
    color: "rgb(105, 64, 255)",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
  },
});
