import { View, Text, Image, TextInput } from "react-native";
import TextInputIconStyles from "@/styles/TextInputIcon/TextInputIconStyles";

const TextInputIcon = (props: any) => {
  return (
    <View
      style={{ ...TextInputIconStyles.inputContainer, ...props.containerStyle }}
    >
      <Text style={{ ...TextInputIconStyles.label, ...props.labelStyle }}>
        {props.labelText}
      </Text>
      <Image
        style={{ ...TextInputIconStyles.inputIcon, ...props.iconStyle }}
        source={props.image}
      />
      <TextInput
        style={{ ...TextInputIconStyles.input, ...props.inputStyle }}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        multiline={props.multiline}
        value={props.value}
        keyboardType={props.keyboardType}
      />
      <View
        style={{
          ...TextInputIconStyles.divider,
          display:
            props.dividerVisible || props.dividerVisible === undefined
              ? "flex"
              : "none",
        }}
      ></View>
    </View>
  );
};

export default TextInputIcon;
