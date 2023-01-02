import { DynamicStyleSheet, DynamicValue } from "../../style/darkMode";
import { variables } from "../../style/variables";

export const themedStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  container2: {
    marginLeft: 15,
    marginRight: 15,
    height: "100%",
    width: "90%",
  },
  textWhite: {
    color: "#fff",
    paddingLeft: 5,
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
  text: {
    fontSize: 40,
    fontWeight: "500",
    color: new DynamicValue(variables.blackColor, variables.whiteColor),
  },
  listItem: {
    width: "100%",
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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  todoListFilterWrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },
  todoListFilter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: 0.5,
    borderColor: "#ccc",
  },
  todoListItem: {
    width: "100%",
  },
  filterItem: {
    marginTop: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: new DynamicValue(variables.blackColor, variables.whiteColor),
  },
  input: {
    width: 310,
    height: 37,
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: "#ccc",
  },
  footer: {
    width: "100%",
    bottom: 0,
  },
  footerButtonPress: {
    backgroundColor: "#ED7303",
    borderRadius: 4,
    marginTop: 15,
    marginRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  completed: {
    fontFamily: "Arial",
    paddingLeft: 5,
    fontStyle: "italic",
    textDecorationLine: "line-through",
    color: new DynamicValue(variables.blackColor, variables.whiteColor),
  },
  notCompleted: {
    fontFamily: "Arial",
    paddingLeft: 5,
    color: new DynamicValue(variables.blackColor, variables.whiteColor),
  },
  textFilter: {
    color: new DynamicValue(variables.blackColor, variables.whiteColor),
  },
  inputText: {
    paddingLeft: 10,
    color: new DynamicValue(variables.blackColor, variables.whiteColor),
  },
});
