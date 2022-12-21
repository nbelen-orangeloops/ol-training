import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {getLuminance, hsl, parseToHsl} from "polished";
import * as React from "react";
import {Platform, StatusBar as RNStatusBar, StatusBarProps as RNStatusBarProps} from "react-native";
import changeNavigationBarColor from "react-native-navigation-bar-color";

import {useDarkMode} from "../../style/darkMode";

const isAndroid = Platform.OS === "android";

export type StatusBarProps = RNStatusBarProps;

export const StatusBar: React.FC<StatusBarProps> = (props) => {
  if (isAndroid) {
    const isDark = useDarkMode();

    React.useLayoutEffect(() => {
      const color = hsl(parseToHsl(isDark ? DarkTheme.colors.background : DefaultTheme.colors.background));
      const isLight = getLuminance(color) > 0.179;
      changeNavigationBarColor(color, isLight, false);
    }, [isDark]);
  }

  return <RNStatusBar {...props} />;
};
