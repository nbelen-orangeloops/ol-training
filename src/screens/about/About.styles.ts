import {DynamicStyleSheet} from "../../style/darkMode";
import {variables} from "../../style/variables";

export const themedStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
  },
  itemContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: variables.lightGreyColor,
    padding: 15,
  },
  chevronDefault: {
    width: 15,
    height: 20,
    color: variables.primaryColor,
    flex: 1,
    alignSelf: "center",
  },
  textStyle: {
    ...variables.headingThree,
    letterSpacing: 0,
    color: variables.primaryColor,
  },
});
