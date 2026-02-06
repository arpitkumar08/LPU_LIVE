import React from "react";
import { Pressable, Text } from "react-native";
import "../../global.css";
interface ButtonProps {
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}

const Button = ({ title, onPress, icon }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 flex-row gap-2 rounded-2xl border border-orange-500 bg-[#FFECD4] py-3 mx-2 items-center justify-center active:opacity-80 active:bg-[#FFE0B2]"
    >
      {icon}
      <Text className="text-base font-bold text-[#FF740B]">{title}</Text>
    </Pressable>
  );
};

export default Button;
