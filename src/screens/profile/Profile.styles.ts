import {DynamicStyleSheet, DynamicValue} from "../../style/darkMode";
import {variables} from "../../style/variables";

export const themedStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: new DynamicValue("white", "rgba(255,255,255,.13)"),
    alignItems: "center",
    padding: 15,
  },
  profilePictureContainer: {
    width: 150,
    height: 150,
    backgroundColor: variables.secondaryColor,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: variables.tertiaryColor,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  badgeButton: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  editIcon: {
    alignSelf: "center",
    width: 20,
    height: 20,
    color: variables.secondaryColor,
  },
  nameText: {
    ...variables.headingTwo,
    margin: 10,
    letterSpacing: 0,
    color: variables.primaryColor,
  },
  emailText: {
    ...variables.headingThree,
    letterSpacing: 0,
    color: variables.secondaryColor,
  },
  profileInfoWrapper: {
    backgroundColor: new DynamicValue("white", "rgba(255,255,255,.13)"),
    alignItems: "center",
    marginVertical: 10,
  },
  profileInfoTitleContainer: {
    width: "90%",
    margin: 20,
  },
  profileInfoText: {
    ...variables.headingTwo,
    letterSpacing: 0,
    color: new DynamicValue(variables.blackColor, variables.whiteColor),
  },
  input: {
    justifyContent: "center",
    width: "90%",
    color: variables.blackColor,
    marginBottom: 10,
  },
  buttonContainer: {
    alignSelf: "center",
    marginBottom: 20,
    width: "90%",
  },
});
