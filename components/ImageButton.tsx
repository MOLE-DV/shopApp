import { Image, TouchableOpacity } from "react-native";

const ImageButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.buttonStyle}>
      <Image source={props.image} style={props.style} />
    </TouchableOpacity>
  );
};

export default ImageButton;
