
// todo: error handing in frontend according to if password is wrong or the feilds are empty


import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser } from "../src/services/auth.service";
import { useAuthStore } from "../src/store/auth.store";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";



const AuthScreen = () => {

  const { login, isAuthenticated } = useAuthStore();


  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();



  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardOpen(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardOpen(false)
    );

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);


  const handleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const data = await loginUser(username, password);
      await login(data);
      router.replace("/(tabs)/UniGrp");
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = username.trim() !== "" && password.trim() !== "";



  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: keyboardOpen ? "flex-start" : "center",
              paddingHorizontal: 24,
              paddingVertical: 32,
            }}
          >
            <View className="items-center">

              {/* Logo */}
              <Image
                source={require("@/assets/images/lpulogo.png")}
                style={{ width: 120, height: 120 }}
                contentFit="contain"
              />

              {/* Title */}
              <Text className="text-4xl font-extrabold mt-6">
                Welcome Back
              </Text>

              <Text className="text-lg text-gray-500 mt-2 text-center">
                Sign in to your account to continue
              </Text>
            </View>

            {/* Inputs */}
            <View className="mt-10">
              <Text className="text-base font-bold mb-2">ID</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your ID"
                keyboardType="number-pad"
                className="border border-gray-300 rounded-xl px-4 py-3 text-base"
              />
            </View>

            <View className="mt-4">
              <Text className="text-base font-bold mb-2">Password</Text>

              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  className="border border-gray-300 rounded-xl px-4 py-3 pr-12 text-base"
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>


            {/* Button */}
            <Pressable
              onPress={handleLogin}
              disabled={loading || !isFormValid}
              className={`py-4 rounded-xl mt-8 flex-row items-center justify-center ${loading || !isFormValid ? "bg-gray-400" : "bg-[#F97217]"
                }`}
            >
              {loading ? (
                <>
                  <ActivityIndicator color="#fff" />
                  <Text className="text-white text-lg font-semibold ml-2">
                    Signing in...
                  </Text>
                </>
              ) : (
                <Text className="text-white text-center text-lg font-semibold">
                  Sign In
                </Text>
              )}
            </Pressable>



          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;
