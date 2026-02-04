import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "../src/store/auth.store";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href={{ pathname: "/(tabs)/UniGrp" }} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
