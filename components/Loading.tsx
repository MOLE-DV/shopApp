import { ActivityIndicator } from "react-native";
import GlobalStyles from "@/styles/GlobalStyles";
import { useApp } from "@/contexts/AppContext";

const LoadingIndicator = () => {
  const { loading, setHidden } = useApp();

  return (
    <ActivityIndicator
      size="large"
      style={{
        ...GlobalStyles.activityIndicator,
        backgroundColor: loading ? "rgba(0, 0, 0, 0.8)" : "none",
      }}
      color="rgb(105, 64, 255)"
      animating={loading}
    />
  );
};

export default LoadingIndicator;
