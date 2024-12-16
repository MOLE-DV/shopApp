import DropdownStyles from "@/styles/Dropdown/DropdownStyles";
import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ImageSourcePropType,
} from "react-native";

interface categoriesI {
  value: string;
  image: string;
  label: string;
}

interface propsI {
  dropdownStyle?: Record<string, any>;
  labelStyle?: Record<string, any>;
  buttonStyle?: Record<string, any>;
  iconStyle?: Record<string, any>;
  optionsStyle?: Record<string, any>;
  optionItemStyle?: Record<string, any>;
  optionItemTextStyle?: Record<string, any>;
  separatorStyle?: Record<string, any>;
  OnSelected?: (index: number) => void;
  image?: string;
  labelText?: string;
  data: categoriesI[];
}

const Dropdown = (props: propsI) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, selectIndex] = useState(0);

  const dropdownHandler = () => {
    setExpanded(!expanded);
  };

  const selectHandler = (index: number) => {
    if (props.OnSelected) {
      props.OnSelected(index);
    }

    selectIndex(index);
    setExpanded(false);
  };

  return (
    <View
      style={{ ...DropdownStyles.dropdownContainer, ...props.dropdownStyle }}
    >
      <Text style={{ ...DropdownStyles.label, ...props.labelStyle }}>
        {props.labelText}
      </Text>
      <TouchableOpacity
        onPress={dropdownHandler}
        style={{ ...DropdownStyles.buttonStyle, ...props.buttonStyle }}
      >
        <Image
          style={{ ...DropdownStyles.icon, ...props.iconStyle }}
          source={props.data[selectedIndex].image as ImageSourcePropType}
        />
        <Text>{props.data[selectedIndex].value}</Text>
      </TouchableOpacity>
      {expanded ? (
        <ScrollView
          horizontal={true}
          style={{ ...DropdownStyles.options, ...props.optionsStyle }}
        >
          <FlatList
            keyExtractor={(item, index) => props.data[index].value}
            data={props.data}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  ...DropdownStyles.optionItem,
                  ...props.optionItemStyle,
                }}
                onPress={() => selectHandler(index)}
                key={index}
              >
                <Image
                  style={{ ...DropdownStyles.icon, ...props.iconStyle }}
                  source={props.data[index].image as ImageSourcePropType}
                />
                <Text
                  style={{
                    ...DropdownStyles.optionItemText,
                    ...props.optionItemTextStyle,
                  }}
                >
                  {props.data[index].value}
                </Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{ ...DropdownStyles.separator, ...props.separatorStyle }}
              ></View>
            )}
          />
        </ScrollView>
      ) : null}
    </View>
  );
};

export default Dropdown;
