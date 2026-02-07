import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Bug, ChevronRight, LogOut, Moon, Sun } from "lucide-react-native";
import React, { useMemo, useRef, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../src/store/auth.store";

import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Title from "../components/Title";

import * as ImagePicker from "expo-image-picker";

const Setting = () => {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bugImage, setBugImage] = useState<string | null>(null);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["70%"], []);

  const openBugSheet = () => {
    bottomSheetRef.current?.present();
  };

  const pickBugImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setBugImage(result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4 flex-1">
        <Title title="Settings" />

        {/* Profile Section */}
        <View className="items-center mt-8">
          <Image
            source={{ uri: user?.UserImageUrl }}
            style={{ width: 96, height: 96, borderRadius: 50 }}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
          <View className="items-center justify-center border border-gray-200 px-4 py-4 mt-4 rounded-xl">
            <Text className="text-xl font-bold text-black">
              {user?.Name || "Student Name"}
            </Text>
            <Text className="text-gray-500 mt-1 text-base">
              {user?.Department || "Course Name"}
            </Text>
          </View>
        </View>

        {/* Settings Options */}
        <View className="mt-10 space-y-4">
          {/* Theme Toggle */}
          <View className="flex-row items-center justify-between border border-gray-200  mb-2 bg-gray-50 p-4 rounded-xl">
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-100 p-2 rounded-full">
                {isDarkMode ? (
                  <Moon size={20} color="#F97217" />
                ) : (
                  <Sun size={20} color="#F97217" />
                )}
              </View>
              <Text className="text-base font-semibold text-black">
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: "#E5E7EB", true: "#F97217" }}
              thumbColor={"#fff"}
              className="transition-all duration-300"
            />
          </View>

          {/* Bug Report */}
          <TouchableOpacity
            onPress={openBugSheet}
            className="flex-row items-center justify-between border border-gray-200  mb-2 bg-gray-50 p-4 rounded-xl"
          >
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-100 p-2 rounded-full">
                <Bug size={20} color="#F97217" />
              </View>
              <Text className="text-base font-semibold text-black">
                Report a Bug
              </Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-between bg-red-50 p-4 rounded-xl mt-4"
          >
            <View className="flex-row items-center gap-3">
              <View className="bg-red-100 p-2 rounded-full">
                <LogOut size={20} color="#EF4444" />
              </View>
              <Text className="text-base font-semibold text-red-500">
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              pressBehavior="close"
            />
          )}
        >
          <BottomSheetView className="p-5 flex-1 bg-white">
            <Text className="text-2xl text-center font-bold mb-6 text-black">
              Report Bug
            </Text>

            {/* USER INFO */}
            <View className="flex-row flex-wrap justify-between gap-y-4">
              <View className="w-[48%] p-3 bg-gray-50 rounded-xl">
                <Text className="text-gray-500 text-sm mb-1">Name</Text>
                <Text
                  className="text-black font-semibold text-lg"
                  numberOfLines={1}
                >
                  {user?.Name?.includes(":")
                    ? user?.Name?.split(":")[0].trim()
                    : user?.Name || "N/A"}
                </Text>
              </View>

              <View className="w-[48%] p-3 bg-gray-50 rounded-xl">
                <Text className="text-gray-500 text-sm mb-1">ID</Text>
                <Text
                  className="text-black font-semibold text-lg"
                  numberOfLines={1}
                >
                  {user?.Name?.includes(":")
                    ? user?.Name?.split(":")[1].trim()
                    : "N/A"}
                </Text>
              </View>

              <View className="w-[48%] p-3 bg-gray-50 rounded-xl">
                <Text className="text-gray-500 text-sm mb-1">Category</Text>
                <Text
                  className="text-black font-semibold text-lg"
                  numberOfLines={1}
                >
                  {user?.Category || "N/A"}
                </Text>
              </View>

              <View className="w-[48%] p-3 bg-gray-50 rounded-xl">
                <Text className="text-gray-500 text-sm mb-1">Department</Text>
                <Text
                  className="text-black font-semibold text-lg"
                  numberOfLines={2}
                >
                  {user?.Department || "N/A"}
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-gray-500 text-sm mb-2 font-medium ml-1">
                Bug Description
              </Text>
              <BottomSheetTextInput
                placeholder="Describe the issue in detail..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={6}
                style={{
                  minHeight: 120,
                  textAlignVertical: "top",
                }}
                className="border border-gray-200 rounded-xl p-4 bg-gray-50 text-black text-base"
              />
            </View>

            <View className="mt-5">
              <Text className="text-gray-500 text-sm mb-2 font-medium ml-1">
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
                  className="border border-dashed border-gray-300 rounded-xl p-4 items-center justify-center bg-gray-50"
                >
                  <Text className="text-gray-600 font-medium">
                    + Add Screenshot
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity className="bg-orange-500 py-3 rounded-xl mt-6">
              <Text className="text-white text-center font-semibold text-lg">
                Send Bug Report
              </Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
