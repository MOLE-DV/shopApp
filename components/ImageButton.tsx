import { Image, TouchableOpacity, Text } from "react-native";

const ImageButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...props.buttonStyle, alignItems: "center" }}
    >
      <Image source={props.image} style={props.style} />
      <Text
        style={{
          bottom: -10,
          position: "absolute",
          ...props.textStyle,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default ImageButton;
