import * as React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Circle from "../../assets/circle.svg";
import CircleMarked from "../../assets/circleMarked.svg";
import { ToDo } from "../../core/models/ToDo";
import { themedStyles } from "../../screens/welcome/Welcome.styles";
import { useDynamicStyleSheet, DynamicValue } from "../../style/darkMode";
import { variables } from "../../style/variables";

const ToDoCompletedIcon = <CircleMarked />;
const ToDoNotCompletedIcon = <Circle />;

const ToDoListItem = (props: {
  todo: ToDo;
  onCompletedChange: (completed: boolean, id: string) => void;
}) => {
  const styles = useDynamicStyleSheet(themedStyles);
  const { todo, onCompletedChange } = props;

  const { title, completed, id } = todo;

  const HandlePress = () => {
    onCompletedChange(completed, id);
  };

  return (
    <View style={styles.todoListFilterWrapper}>
      <View style={styles.listItem}>
        <TouchableOpacity onPress={HandlePress}>
          {completed ? ToDoCompletedIcon : ToDoNotCompletedIcon}
        </TouchableOpacity>
        <Text style={completed ? styles.completed : styles.notCompleted}>
          {title}
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          width: "100%",
          height: 1,
          paddingTop: 15,
        }}
      />
    </View>
  );
};

export default ToDoListItem;
