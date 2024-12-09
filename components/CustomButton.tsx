import { TouchableOpacity, Text } from "react-native";
import CustomButtonStyles from "@/styles/CustomButton/CustomButtonStyles";

interface CustomButtonI {
  Text: string;
  OnPress: () => any;
}

const CustomButton = (props: CustomButtonI) => {
  return (
    <TouchableOpacity
      style={CustomButtonStyles.customButtonContainer}
      onPress={props.OnPress}
    >
      <Text style={CustomButtonStyles.customButtonText}>{props.Text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
