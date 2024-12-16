import {
  View,
  Text,
  Image,
  TextInput,
  ImageSourcePropType,
  KeyboardType,
} from "react-native";
import TextInputIconStyles from "@/styles/TextInputIcon/TextInputIconStyles";

interface propsI {
  containerStyle?: Record<string, any>;
  labelStyle?: Record<string, any>;
  iconStyle?: Record<string, any>;
  inputStyle?: Record<string, any>;
  placeholderTextColor?: string;
  labelText?: string;
  image?: ImageSourcePropType;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
  value?: string;
  keyboardType?: KeyboardType;
  maxLength?: number;
  dividerVisible?: boolean;
}

const TextInputIcon = (props: propsI) => {
  return (
    <View style={[TextInputIconStyles.inputContainer, props.containerStyle]}>
      <Text style={[TextInputIconStyles.label, props.labelStyle]}>
        {props.labelText}
      </Text>
      <Image
        style={[TextInputIconStyles.inputIcon, props.iconStyle]}
        source={props.image}
      />
      <TextInput
        style={[TextInputIconStyles.input, props.inputStyle]}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        multiline={props.multiline}
        value={props.value}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
      />
      <View
        style={[
          TextInputIconStyles.divider,
          {
            display:
              props.dividerVisible || props.dividerVisible === undefined
                ? "flex"
                : "none",
          },
        ]}
      />
    </View>
  );
};

export default TextInputIcon;
