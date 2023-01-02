import React, { useState } from "react";
import { View, Text, Image, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { ToDo } from "../../core/models/ToDo";
import { themedStyles } from "../../screens/welcome/Welcome.styles";
import { useDynamicStyleSheet } from "../../style/darkMode";
import { variables } from "../../style/variables";

export enum ToDoListFilter {
  All,
  Active,
  Completed,
}

const AddButton = <Image source={require("../../assets/add.png")} />;

export const ToDoListFooter = (props: {
  filter: ToDoListFilter;
  onFilterChange: (filter: ToDoListFilter) => void;
  onToDoCreated: (todo: ToDo) => void;
}) => {
  const styles = useDynamicStyleSheet(themedStyles);
  const [task, setTask] = useState("");
  const { filter, onFilterChange, onToDoCreated } = props;

  const [isActive, setIsActive] = useState(false);

  const id = Math.floor(Math.random() * 1000).toString();

  const item = {
    title: task.trim(),
    completed: false,
    id: id,
  };

  const HandlePress = () => {
    if (item.title.trim() === "") {
      return Alert.alert("Describe your task before adding it to the list!");
    } else {
      onToDoCreated(item);
      setTask("");
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.todoListFilter}>
        <TouchableOpacity
          style={
            filter === ToDoListFilter.All
              ? styles.footerButtonPress
              : styles.filterItem
          }
          onPress={() => {
            setIsActive(!isActive);
            onFilterChange(ToDoListFilter.All);
          }}
        >
          <Text
            style={
              filter === ToDoListFilter.All
                ? { color: variables.whiteColor }
                : styles.textFilter
            }
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            filter === ToDoListFilter.Active
              ? styles.footerButtonPress
              : styles.filterItem
          }
          onPress={() => onFilterChange(ToDoListFilter.Active)}
        >
          <Text
            style={
              filter === ToDoListFilter.Active
                ? {
                    color: variables.whiteColor,
                  }
                : styles.textFilter
            }
          >
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            filter === ToDoListFilter.Completed
              ? styles.footerButtonPress
              : styles.filterItem
          }
          onPress={() => onFilterChange(ToDoListFilter.Completed)}
        >
          <Text
            style={
              filter === ToDoListFilter.Completed
                ? {
                    color: variables.whiteColor,
                  }
                : styles.textFilter
            }
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <View style={styles.input}>
          <TextInput
            value={task}
            style={styles.inputText}
            placeholder="Write a task"
            onSubmitEditing={HandlePress}
            onChangeText={(text) => setTask(text)}
          />
        </View>
        <View>
          <TouchableOpacity onPress={HandlePress}>{AddButton}</TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
