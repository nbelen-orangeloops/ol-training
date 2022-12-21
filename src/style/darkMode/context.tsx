import React, {createContext, ReactNode, useContext} from "react";
import {useColorScheme} from "react-native";

import {Mode} from "./DynamicStyleSheet";

/**
 * Used when `useColorScheme` returns undefined.
 */
const DEFAULT_MODE: Mode = "light";

export const DarkModeContext = createContext<Mode>(null as any);
DarkModeContext.displayName = "DarkModeContext";

export type DarkModeProviderProps = {
  mode?: Mode;
  children: ReactNode;
};

export function DarkModeProvider({children, mode}: DarkModeProviderProps) {
  const colorScheme = useColorScheme();

  return <DarkModeContext.Provider value={(mode || colorScheme) ?? DEFAULT_MODE}>{children}</DarkModeContext.Provider>;
}

export function useDarkModeContext(): Mode {
  const context = useContext(DarkModeContext);
  return context;
}
