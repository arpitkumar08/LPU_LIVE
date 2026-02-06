import { View, Text } from "react-native";
import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <View className="ml-4 mt-4">
      <Text className="text-3xl font-extrabold">{title}</Text>
    </View>
  );
};

export default Title;
