import { View, Text, Image, TextInput } from "react-native";

const TextInputIcon = (props: any) => {
  return (
    <View style={props.containerStyle}>
      <Text style={props.labelStyle}>{props.labelText}</Text>
      <Image style={props.iconStyle} source={props.image} />
      <TextInput
        blurOnSubmit={false}
        style={props.inputStyle}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        multiline={props.multiline}
        value={props.value}
        keyboardType={props.keyboardType}
      />
    </View>
  );
};

export default TextInputIcon;
