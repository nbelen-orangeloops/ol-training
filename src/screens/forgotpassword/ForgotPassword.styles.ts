import {DynamicStyleSheet} from "../../style/darkMode";
import {variables} from "../../style/variables";

export const themedStyles = new DynamicStyleSheet({
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    justifyContent: "center",
    width: "90%",
    paddingHorizontal: 10,
    color: variables.blackColor,
  },
  buttonContainer: {
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
    width: "90%",
  },
  mainLogo: {
    marginTop: 20,
    marginBottom: 40,
    height: 120,
    width: "100%",
  },
  description: {
    ...variables.headingThree,
    color: variables.blackColor,
    paddingHorizontal: 10,
    width: "90%",
    marginBottom: 20,
  },
});
