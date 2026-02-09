import React from "react";
import { Text, View } from "react-native";

type InfoBoxProps = {
  label: string;
  value?: string;
};

export const InfoBox = ({ label, value }: InfoBoxProps) => {
  return (
    <View className="w-[48%] bg-gray-50 p-3 rounded-xl dark:bg-gray-800">
      <Text className="text-gray-500 text-sm mb-1 dark:text-gray-400">
        {label}
      </Text>
      <Text
        className="text-black font-semibold text-lg dark:text-white"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {value || "N/A"}
      </Text>
    </View>
  );
};
