import { TouchableOpacity, Text } from "react-native";
import CustomButtonStyles from "@/styles/CustomButton/CustomButtonStyles";

interface CustomButtonI {
  Text?: string;
  Style?: any;
  OnPress?: () => void;
}

const CustomButton = (props: any) => {
  return (
    <TouchableOpacity
      style={[CustomButtonStyles.customButtonContainer, props.Style]}
      onPress={props.OnPress}
    >
      <Text style={CustomButtonStyles.customButtonText}>{props.Text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
