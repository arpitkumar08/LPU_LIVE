import { useColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useThemeStore } from "../src/store/theme.store";

interface ThemeContextType {
  toggleThemeWithAnimation: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  toggleThemeWithAnimation: () => {},
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useThemeStore();
  const { setColorScheme } = useColorScheme();
  const { height } = Dimensions.get("window");

  const translateY = useSharedValue(height);
  const [isAnimating, setIsAnimating] = useState(false);
  const [curtainColor, setCurtainColor] = useState("#ffffff");

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  const toggleThemeWithAnimation = () => {
    if (isAnimating) return;

    // Determine color based on WHERE WE ARE GOING
    // If current is Light, we are going Dark -> curtain should be Dark (#101927)
    // If current is Dark, we are going Light -> curtain should be Light (#ffffff)
    const nextColor = theme === "light" ? "#101927" : "#ffffff";
    setCurtainColor(nextColor);
    setIsAnimating(true);

    // 1. Slide Up (Cover)
    translateY.value = withTiming(0, { duration: 500 }, (finished) => {
      if (finished) {
        // 2. Toggle Theme
        runOnJS(toggleTheme)();

        // 3. Slide Up (Exit)
        // Wait a small frame to ensure theme update renders behind curtain
        translateY.value = withTiming(
          -height,
          { duration: 500 },
          (finishedExit) => {
            if (finishedExit) {
              // Reset instantly to bottom
              translateY.value = height;
              runOnJS(setIsAnimating)(false);
            }
          },
        );
      }
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    backgroundColor: curtainColor,
  }));

  const value = {
    toggleThemeWithAnimation,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>
      <View style={{ flex: 1 }}>
        {children}
        {isAnimating && (
          <Animated.View
            style={[
              styles.curtain,
              animatedStyle,
              { height: height }, // Ensure full height
            ]}
            pointerEvents="none"
          />
        )}
      </View>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  curtain: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 9999,
  },
});
