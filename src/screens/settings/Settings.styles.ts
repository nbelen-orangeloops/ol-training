import {DynamicStyleSheet} from "../../style/darkMode";

export const themedStyles = new DynamicStyleSheet({
  wrapper: {
    flex: 1,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    marginTop: 30,
  },
  backLogo: {
    height: 1000,
    width: 1000,
  },
  backLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: -220,
    bottom: -150,
    height: 0,
    width: 0,
  },
  container: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 20,
    width: "100%",
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  biometrics: {
    fontSize: 16,
  },
});
