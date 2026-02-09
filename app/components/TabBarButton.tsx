import { FolderLock, School, Settings, UserRound } from "lucide-react-native";
import React, { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const icons: Record<string, (props: any) => React.ReactNode> = {
  UniGrp: (props) => <School size={24} {...props} />,
  PersonalGrp: (props) => <FolderLock size={24} {...props} />,
  PersonaChat: (props) => <UserRound size={24} {...props} />,
  Setting: (props) => <Settings size={24} {...props} />,
};

interface TabBarButtonProps {
  onPress: () => void;
  onLongPress?: () => void;
  isFocused: boolean;
  routeName: string;
}

import { useColorScheme } from "nativewind";

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
}: TabBarButtonProps) {
  const Icon = icons[routeName];
  const { colorScheme } = useColorScheme();

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 },
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    return {
      transform: [{ scale: scaleValue }],
    };
  });

  const iconColor = isFocused
    ? "#fff"
    : colorScheme === "dark"
      ? "#9CA3AF"
      : "#222";

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 items-center justify-center p-2 gap-1 rounded-xl"
    >
      <Animated.View style={animatedIconStyle}>
        {Icon && <Icon color={iconColor} />}
      </Animated.View>
    </Pressable>
  );
}
