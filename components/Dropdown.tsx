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

interface categoryI {
  image: ImageSourcePropType;
  value: string;
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
  OnSelected?: (selected: categoryI) => void;
  image?: string;
  labelText?: string;
  data: categoryI[];
}

const Dropdown = (props: propsI) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedElement, selectElement] = useState(props.data[0]);

  const dropdownHandler = () => {
    setExpanded(!expanded);
  };

  const selectHandler = (element: categoryI) => {
    if (props.OnSelected) {
      props.OnSelected(element);
    }

    selectElement(element);
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
          source={selectedElement.image}
        />
        <Text>{selectedElement.value}</Text>
      </TouchableOpacity>
      {expanded ? (
        <ScrollView
          horizontal={true}
          style={{ ...DropdownStyles.options, ...props.optionsStyle }}
        >
          <FlatList
            keyExtractor={(item) => item.value}
            data={props.data}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  ...DropdownStyles.optionItem,
                  ...props.optionItemStyle,
                }}
                onPress={() => selectHandler(item)}
                key={index}
              >
                <Image
                  style={{ ...DropdownStyles.icon, ...props.iconStyle }}
                  source={item.image}
                />
                <Text
                  style={{
                    ...DropdownStyles.optionItemText,
                    ...props.optionItemTextStyle,
                  }}
                >
                  {item.value}
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
