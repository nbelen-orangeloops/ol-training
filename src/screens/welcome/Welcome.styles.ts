import {DynamicStyleSheet} from "../../style/darkMode";

export const themedStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  textWhite: {
    color: "#fff",
    paddingLeft: 5,
    fontFamily: "Robot",
    fontWeight: "400",
  },
  cleanButton: {
    maxWidth: "60%",
    width: 150,
    height: 35,
    backgroundColor: "#f00",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
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
  text: {
    fontSize: 40,
    fontWeight: "500",
  },
  listItem: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Arial",
    fontStyle: "italic",
  },
  row: {
    width: 420,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    height: 10,
    borderBottomWidth: 0.5,
  },
  inputWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: 310,
    height: 40,
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: "#ccc",
  },
});
