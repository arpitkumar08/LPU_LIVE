import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Bug, ChevronRight, LogOut, Moon, Sun } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppBottomSheet from "../components/AppBottomSheet";
import { InfoBox } from "../components/InfoCard";
import { useTheme } from "../components/ThemeProvider";
import Title from "../components/Title";
import { useAuthStore } from "../src/store/auth.store";

const Setting = () => {
  const { logout, user } = useAuthStore();
  const { isDark, toggleThemeWithAnimation } = useTheme();
  const router = useRouter();

  const [bugImage, setBugImage] = useState<string | null>(null);
  const [bugDescription, setBugDescription] = useState("");
  const [bugSuccess, setBugSuccess] = useState(false);

  const bugSheetRef = useRef<BottomSheetModal>(null);

  const pickBugImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setBugImage(result.assets[0].uri);
    }
  };

  const handleReportBug = () => {
    if (!bugDescription.trim()) return;

    setBugSuccess(true);
    setTimeout(() => {
      bugSheetRef.current?.dismiss();
      setBugSuccess(false);
      setBugDescription("");
      setBugImage(null);
    }, 1500);
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#101927]">
      <View className="flex-1 px-4 pt-4 bg-white dark:bg-[#101927]">
        <Title title="Settings" />

        {/* PROFILE */}
        <View className="items-center mt-8">
          <Image
            source={{ uri: user?.UserImageUrl }}
            style={{ width: 96, height: 96, borderRadius: 50 }}
            contentFit="cover"
          />

          <View className="items-center mt-4 border border-gray-200 dark:border-gray-700 px-4 py-4 rounded-xl">
            <Text className="text-xl font-bold text-black dark:text-white">
              {user?.Name || "Student Name"}
            </Text>
            <Text className="text-gray-500 dark:text-gray-300 mt-1 text-base">
              {user?.Department || "Course Name"}
            </Text>
          </View>
        </View>

        {/* OPTIONS */}
        <View className="mt-10 space-y-4">
          {/* DARK MODE */}
          <View className="flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl">
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-100 p-2 rounded-full">
                {isDark ? (
                  <Moon size={20} color="#F97217" />
                ) : (
                  <Sun size={20} color="#F97217" />
                )}
              </View>
              <Text className="text-base font-semibold text-black dark:text-white">
                Dark Mode
              </Text>
            </View>

            <Switch
              value={isDark}
              onValueChange={toggleThemeWithAnimation}
              trackColor={{ false: "#E5E7EB", true: "#F97217" }}
              thumbColor="#fff"
            />
          </View>

          {/* REPORT BUG */}
          <TouchableOpacity
            onPress={() => bugSheetRef.current?.present()}
            className="flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 mt-2 rounded-xl"
          >
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-100 p-2 rounded-full">
                <Bug size={20} color="#F97217" />
              </View>
              <Text className="text-base font-semibold text-black dark:text-white">
                Report a Bug
              </Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* LOGOUT */}
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.85}
            className="
              flex-row items-center p-4 rounded-xl mt-4
              bg-red-50 dark:bg-[#2a1414]
              border border-red-200 dark:border-red-800
            "
          >
            <View className="bg-red-100 dark:bg-red-900 p-2 rounded-full mr-3">
              <LogOut size={20} color="#EF4444" />
            </View>
            <Text className="text-base font-semibold text-red-600 dark:text-red-400">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BOTTOM SHEET */}
      <AppBottomSheet ref={bugSheetRef} snapPoints={["65%", "85%"]}>
        {bugSuccess ? (
          <View className="flex-1 justify-center items-center px-6">
            <View className="bg-green-50 border border-green-200 rounded-2xl px-6 py-8 items-center w-full">
              <Text className="text-2xl font-bold text-green-700">
                ✓ Report Sent
              </Text>
              <Text className="text-gray-600 mt-2 text-center">
                Thanks for reporting the issue.
              </Text>
            </View>
          </View>
        ) : (
          <BottomSheetScrollView keyboardShouldPersistTaps="handled">
            <Text className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
              Report Bug
            </Text>

            <View className="flex-row flex-wrap justify-between gap-y-4">
              <InfoBox
                label="Name"
                value={user?.Name ? user.Name.split(":")[0].trim() : "N/A"}
              />
              <InfoBox
                label="ID"
                value={
                  user?.Name?.includes(":")
                    ? user.Name.split(":")[1].trim()
                    : "N/A"
                }
              />
              <InfoBox label="Category" value={user?.Category} />
              <InfoBox label="Department" value={user?.Department} />
            </View>

            <View className="mt-4">
              <BottomSheetTextInput
                value={bugDescription}
                onChangeText={setBugDescription}
                onFocus={() => bugSheetRef.current?.snapToIndex(1)}
                placeholder="Describe the issue..."
                placeholderTextColor="#9CA3AF"
                multiline
                className="
      border border-gray-200 dark:border-gray-700
      bg-gray-50 dark:bg-gray-800
      text-black dark:text-white
      rounded-xl p-4 mt-2
    "
                style={{
                  minHeight: 120,
                  textAlignVertical: "top", // 👈 this fixes it
                }}
              />
            </View>

            <View className="mt-5">
              <Text className="text-gray-500 text-sm mb-2 ml-1 dark:text-gray-400">
                Screenshot (optional)
              </Text>

              {bugImage ? (
                <View className="relative">
                  <Image
                    source={{ uri: bugImage }}
                    style={{ height: 160, borderRadius: 12 }}
                    contentFit="cover"
                  />
                  <TouchableOpacity
                    onPress={() => setBugImage(null)}
                    className="absolute top-2 right-2 bg-black/60 px-3 py-1 rounded-full"
                  >
                    <Text className="text-white text-xs">Remove</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={pickBugImage}
                  className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 items-center dark:bg-gray-800 dark:border-gray-700"
                >
                  <Text className="text-gray-600 font-medium dark:text-gray-400">
                    + Add Screenshot
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              disabled={!bugDescription.trim()}
              onPress={handleReportBug}
              className="bg-orange-500 py-3 rounded-xl mt-6 mb-4 disabled:bg-gray-400"
            >
              <Text className="text-white text-center font-semibold text-lg">
                Send Bug Report
              </Text>
            </TouchableOpacity>
          </BottomSheetScrollView>
        )}
      </AppBottomSheet>
    </SafeAreaView>
  );
};

export default Setting;
