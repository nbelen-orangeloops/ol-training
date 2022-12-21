import {useDarkModeContext} from "./context";
import {DynamicStyleSheet, NormalizeStyles} from "./DynamicStyleSheet";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function useDynamicStyleSheet<T>(dynamicStyleSheet: DynamicStyleSheet<T>): NormalizeStyles<T> {
  const mode = useDarkModeContext();
  return dynamicStyleSheet[mode];
}
