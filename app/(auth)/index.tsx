import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const AuthScreen = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

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
                placeholder="Enter your ID"
                keyboardType="number-pad"
                className="border border-gray-300 rounded-xl px-4 py-3 text-base"
              />
            </View>

            <View className="mt-4">
              <Text className="text-base font-bold mb-2">Password</Text>
              <TextInput
                placeholder="Enter your password"
                secureTextEntry
                className="border border-gray-300 rounded-xl px-4 py-3 text-base"
              />
            </View>

            {/* Button */}
            <TouchableOpacity className="bg-[#F97217] py-4 rounded-xl mt-8">
              <Text className="text-white text-center text-lg font-semibold">
                Sign In
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;
