import * as React from "react";
import {View, Image, Text, TextInput} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";

import ToDoListItem from "../../components/task/ToDoListItem";
import {useDynamicStyleSheet} from "../../style/darkMode";
import {themedStyles} from "./Welcome.styles";

export const Welcome = () => {
  const styles = useDynamicStyleSheet(themedStyles);

  const [task, setTask] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [taskItems, setTaskItems] = React.useState<string[]>([]);

  const HandleAdd = () => {
    <ToDoListItem ToDo={task} />;
    setTaskItems([...taskItems, task]);
    setTask("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Tasks</Text>
        <TouchableOpacity style={styles.cleanButton}>
          <Image source={require("../../assets/trashCan.png")} />
          <Text style={styles.textWhite}>Clean</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{fontFamily: "Arial", fontStyle: "italic"}}>3 items left</Text>
      </View>

      <View>
        {taskItems.map((item) => {
          return <ToDoListItem ToDo={item} />;
        })}
      </View>

      <View style={styles.inputWrapper}>
        <TextInput style={styles.input} placeholder="Write a task" value={task} onChangeText={(text) => setTask(text)} />
        <TouchableOpacity onPress={() => HandleAdd()}>
          <Image source={require("../../assets/add.png")} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
