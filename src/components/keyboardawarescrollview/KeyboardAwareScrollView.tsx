import {observer} from "mobx-react-lite";
import * as React from "react";
import {KeyboardAwareScrollView as RNKeyboardAwareScrollView, KeyboardAwareScrollViewProps as RNKeyboardAwareScrollViewProps} from "react-native-keyboard-aware-scroll-view";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export type KeyboardAwareScrollViewProps = RNKeyboardAwareScrollViewProps;

export const KeyboardAwareScrollView: React.FC<KeyboardAwareScrollViewProps> = observer((props) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <RNKeyboardAwareScrollView
      {...props}
      extraScrollHeight={typeof props.extraScrollHeight === "number" ? props.extraScrollHeight : -safeAreaInsets.bottom}
      extraHeight={typeof props.extraHeight === "number" ? props.extraHeight : 100}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
    />
  );
});
