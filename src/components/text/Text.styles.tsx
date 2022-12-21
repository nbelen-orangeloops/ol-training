import {DynamicStyleSheet} from "../../style/darkMode";
import {variables} from "../../style/variables";

export const themedStyles = new DynamicStyleSheet({
  text: {
    ...variables.body,
  },
});
