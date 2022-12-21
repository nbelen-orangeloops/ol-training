import {useColorScheme} from "react-native";

export function useDarkMode(): boolean {
  return useColorScheme() === "dark";
}
