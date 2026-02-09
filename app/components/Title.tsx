import React from "react";
import { Text, View } from "react-native";

const Title = ({ title }: { title: string }) => {
  return (
    <View className="ml-4 mt-4">
      <Text className="text-3xl font-extrabold dark:text-white">{title}</Text>
    </View>
  );
};

export default Title;
