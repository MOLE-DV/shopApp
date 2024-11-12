import { StyleSheet, Dimensions } from "react-native";

const DropdownStyles = StyleSheet.create({
  dropdownContainer: {
    width: Dimensions.get("window").width,
    paddingHorizontal: Dimensions.get("window").width / 10,
    marginTop: 0,
    display: "flex",
    flexDirection: "column",
  },
  buttonStyle: {
    height: 50,
    fontSize: 12,
    marginBottom: 5,
    borderColor: "rgb(165, 165, 165)",
    borderWidth: 1,
    borderRadius: 2.5,
    fontFamily: "Zikketica",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    color: "black",
    fontFamily: "Zikketica",
    left: 0,
  },
  optionItem: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    height: 4,
  },
  options: {
    width: "100%",
    flexDirection: "column",
    borderColor: "rgb(165, 165, 165)",
    borderWidth: 1,
    borderRadius: 2.5,
  },
  icon: {
    height: 25,
    width: 25,
    margin: 8,
    tintColor: "rgb(165, 165, 165)",
  },
  optionItemText: {
    color: "rgb(129, 129, 129)",
    fontSize: 13,
  },
});

export default DropdownStyles;
