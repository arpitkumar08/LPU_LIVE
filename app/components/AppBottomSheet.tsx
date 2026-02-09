import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { BackHandler, Keyboard } from "react-native";
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
    const currentIndexRef = useRef(0);
    const lastIndex = memoizedSnapPoints.length - 1;

    useEffect(() => {
      const onBackPress = () => {
        if (!ref || typeof ref === "function" || !ref.current) return false;

        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
          return true;
        }

        if (currentIndexRef.current === lastIndex) {
          ref.current.snapToIndex(0);
          return true;
        }

        ref.current.dismiss();
        return true;
      };

      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => sub.remove();
    }, [lastIndex]);

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        detached
        enablePanDownToClose
        snapPoints={memoizedSnapPoints}
        keyboardBehavior="interactive"
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
        <BottomSheetView
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: isDark ? "#101927" : "#ffffff",
          }}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default AppBottomSheet;
