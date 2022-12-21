import {DynamicStyleSheet} from "../../style/darkMode";
import {variables} from "../../style/variables";

export const themedStyles = new DynamicStyleSheet({
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
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
  profilePicture: {
    width: 100,
    height: 100,
  },
  mainLogo: {
    marginTop: 20,
    marginBottom: 40,
    height: 120,
    width: "100%",
  },
});
