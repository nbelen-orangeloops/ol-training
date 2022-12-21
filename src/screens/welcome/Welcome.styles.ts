import {DynamicStyleSheet} from "../../style/darkMode";
import {variables} from "../../style/variables";

export const themedStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    ...variables.headingOne,
    marginBottom: 100,

    textAlign: "center",
  },
  signUpButton: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "80%",
    width: 200,
  },
  signInHeading: {
    marginTop: 10,

    textAlign: "center",
  },
  signInButton: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
  },
  signInText: {
    ...variables.link,
    textAlign: "center",
  },
  forgotPasswordButton: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  forgotPasswordText: {
    ...variables.link,
    textAlign: "center",
  },
});
