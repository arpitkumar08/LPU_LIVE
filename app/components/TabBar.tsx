import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import TabBarButton from "./TabBarButton";

export default function TabBar({ state, navigation }: MaterialTopTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = (dimensions.width - 40) / state.routes.length;

  const onTabbarLayout = (event: LayoutChangeEvent) => {
    setDimensions({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  // Sync indicator with active tab index (handles both press and swipe)
  useEffect(() => {
    tabPositionX.value = withSpring(state.index * buttonWidth, {
      duration: 1500,
    });
  }, [state.index, buttonWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View
      onLayout={onTabbarLayout}
      className="absolute bottom-5 mx-[60px] flex-row items-center justify-between rounded-[35px]  px-5 py-2.5 shadow-lg shadow-black/25 elevation-2 dark:bg-gray-900 dark:border dark:border-gray-800"
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            left: 20 + 25 / 2,
            height: dimensions.height - 15,
            width: buttonWidth - 25,
          },
        ]}
        className="absolute rounded-[20px] bg-[#FF8C00] dark:bg-orange-600"
      />
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
          />
        );
      })}
    </View>
  );
}
