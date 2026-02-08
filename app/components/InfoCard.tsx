import React, { memo } from "react";
import { Text, View } from "react-native";

type InfoBoxProps = {
  label: string;
  value?: string;
};

export const InfoBox = ({ label, value }: InfoBoxProps) => {
  return (
    <View className="w-[48%] bg-gray-50 p-3 rounded-xl">
      <Text className="text-gray-500 text-sm mb-1">{label}</Text>
      <Text
        className="text-black font-semibold text-lg"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {value || "N/A"}
      </Text>
    </View>
  );
};

