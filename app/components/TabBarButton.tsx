import { FolderLock, School, Settings, UserRound } from "lucide-react-native";
import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

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

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
}: TabBarButtonProps) {
  const Icon = icons[routeName];

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

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.tabbarItem]}
    >
      <Animated.View style={animatedIconStyle}>
        {Icon && <Icon color={isFocused ? "#fff" : "#222"} />}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: 5,
    borderRadius: 10,
  },
});
