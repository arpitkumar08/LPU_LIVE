import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { BackHandler, Keyboard } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

type BottomSheetProps = {
  snapPoints: string[]; // REQUIRED
  children: React.ReactNode;
};

const AppBottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ snapPoints, children }, ref) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const currentIndexRef = useRef(0);
    const lastIndex = memoizedSnapPoints.length - 1;

    useEffect(() => {
      const onBackPress = () => {
        if (!ref || typeof ref === "function" || !ref.current) {
          return false;
        }

        // If keyboard is visible, dismiss it first
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
          return true;
        }

        // FULL → COLLAPSE
        if (currentIndexRef.current === lastIndex) {
          ref.current.snapToIndex(0);
          return true;
        }

        // COLLAPSED → DISMISS
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
        detached={true}
        bottomInset={0}
        ref={ref}
        index={0} // start collapsed (60%)
        snapPoints={memoizedSnapPoints}
        enablePanDownToClose
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        onChange={(index) => {
          currentIndexRef.current = index;
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView className="flex-1 bg-white p-5">
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default AppBottomSheet;
