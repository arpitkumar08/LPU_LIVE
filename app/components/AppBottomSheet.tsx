import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { BackHandler, Keyboard, View, StyleSheet } from "react-native";
import { useThemeStore } from "../src/store/theme.store";

type BottomSheetProps = {
  snapPoints: string[];
  children: React.ReactNode;
};

const AppBottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ snapPoints, children }, ref) => {
    const { theme } = useThemeStore();
    const isDark = theme === "dark";

    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);
    
    // -1 means the sheet is closed/hidden
    const currentIndexRef = useRef(-1);

    useEffect(() => {
      const onBackPress = () => {
        // If sheet is closed, return false to let the system handle back (e.g., go back a screen)
        if (currentIndexRef.current === -1) {
          return false;
        }

        // 1. If keyboard is open, close keyboard first
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
          return true;
        }

        // 2. If sheet is at 90% (index 1 or higher), snap down to 75% (index 0)
        if (currentIndexRef.current > 0) {
          (ref as React.MutableRefObject<BottomSheetModal>).current?.snapToIndex(0);
          return true;
        }

        // 3. If sheet is at 75% (index 0), close it
        if (currentIndexRef.current === 0) {
          (ref as React.MutableRefObject<BottomSheetModal>).current?.dismiss();
          return true;
        }

        return false;
      };

      const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => sub.remove();
    }, [ref]);

    return (
      <BottomSheetModal
        ref={ref}
        index={0} 
        enablePanDownToClose
        snapPoints={memoizedSnapPoints}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        onChange={(index) => {
          currentIndexRef.current = index;
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
            opacity={isDark ? 0.6 : 0.4}
          />
        )}
        backgroundStyle={{
          backgroundColor: isDark ? "#101927" : "#ffffff",
        }}
        handleIndicatorStyle={{
          backgroundColor: isDark ? "#6b7280" : "#d1d5db",
        }}
      >
        <View style={styles.contentContainer}>
          {children}
        </View>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default AppBottomSheet;