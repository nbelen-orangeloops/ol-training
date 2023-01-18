import * as React from "react";
import { View, Alert, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ToDoListItem from "../../components/task/ToDoListItem";
import {
  ToDoListFooter,
  ToDoListFilter,
} from "../../components/todolistfooter/ToDoListFooter";
import { ToDoListHeader } from "../../components/todolistheader/ToDoListHeader";
import { ToDo } from "../../core/models/ToDo";
import { themedStyles } from "../../screens/welcome/Welcome.styles";
import { useDynamicStyleSheet } from "../../style/darkMode";

export const ToDos = ({ navigation }: any) => {
  const styles = useDynamicStyleSheet(themedStyles);

  const [taskItems, setTaskItems] = React.useState<ToDo[]>([]);
  const [filterOn, setFilterOn] = React.useState(ToDoListFilter.All);

  const onCompletedChange = (completed: boolean, id: string) => {
    const newTaskItems = taskItems.map((item) => {
      if (item.id !== id) {
        return item;
      } else {
        item.completed = !item.completed;
        return item;
      }
    });
    setTaskItems(newTaskItems);
  };

  const onToDoCreated = (item: ToDo) => {
    let bool = false;
    taskItems.map((e) => {
      if (item.title === e.title) {
        bool = true;
      }
    });
    if (bool === false) {
      setTaskItems((prev) => [...prev, item]);
    } else {
      Alert.alert("This task it's already added");
    }
  };

  const onFilterChange = (filter: ToDoListFilter) => {
    filter === ToDoListFilter.All
      ? setFilterOn(ToDoListFilter.All)
      : filter === ToDoListFilter.Active
      ? setFilterOn(ToDoListFilter.Active)
      : setFilterOn(ToDoListFilter.Completed);
  };

  function onClean() {
    const newTaskItems = taskItems.filter((item) => !item.completed);
    setTaskItems(newTaskItems);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{ marginHorizontal: 15 }}>
          <ToDoListHeader
            itemsLeftCount={taskItems.filter((item) => !item.completed).length}
            onClean={() => onClean()}
            text={
              taskItems.filter((item) => !item.completed).length === 1
                ? "item"
                : "items"
            }
          />
          <Button
            onPress={() => navigation.navigate("Page2")}
            title="Go to Carousel"
          />
        </View>

        <View
          style={{ flex: 1, flexDirection: "column", marginHorizontal: 15 }}
        >
          <ScrollView>
            {filterOn === ToDoListFilter.All
              ? taskItems.map((item, index) => {
                  return (
                    <View key={index} style={styles.todoListItem}>
                      <ToDoListItem
                        todo={item}
                        onCompletedChange={onCompletedChange}
                      />
                    </View>
                  );
                })
              : filterOn === ToDoListFilter.Active
              ? taskItems
                  .filter((item) => !item.completed)
                  .map((item, index) => {
                    return (
                      <View key={index} style={styles.todoListItem}>
                        <ToDoListItem
                          todo={item}
                          onCompletedChange={onCompletedChange}
                        />
                      </View>
                    );
                  })
              : taskItems
                  .filter((item) => item.completed)
                  .map((item, index) => {
                    return (
                      <View key={index} style={styles.todoListItem}>
                        <ToDoListItem
                          todo={item}
                          onCompletedChange={onCompletedChange}
                        />
                      </View>
                    );
                  })}
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <ToDoListFooter
            filter={filterOn}
            onFilterChange={onFilterChange}
            onToDoCreated={onToDoCreated}
          />
        </View>
      </View>
    </>
  );
};
