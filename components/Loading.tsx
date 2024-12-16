import { ActivityIndicator, Platform } from "react-native";
import GlobalStyles from "@/styles/GlobalStyles";
import { useApp } from "@/contexts/AppContext";

const LoadingIndicator = () => {
  const { loading, setHidden } = useApp();

  return (
    <ActivityIndicator
      size={Platform.OS === "ios" ? "large" : 60}
      style={{
        ...GlobalStyles.activityIndicator,
      }}
      color="rgb(105, 64, 255)"
      animating={loading}
    />
  );
};

export default LoadingIndicator;
