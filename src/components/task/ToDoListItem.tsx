import * as React from "react";
import {Image, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

import {themedStyles} from "../../screens/welcome/Welcome.styles";
import {useDynamicStyleSheet} from "../../style/darkMode";

const ToDoListItem = (props: any) => {
  const styles = useDynamicStyleSheet(themedStyles);
  const [taskCompleted, setTaskCompleted] = React.useState(false);

  const HandleCheckmark = () => {
    setTaskCompleted(!taskCompleted);
  };

  if (taskCompleted === false) {
    return (
      <>
        <View style={styles.listItem}>
          <TouchableOpacity onPress={HandleCheckmark}>
            <Image source={require("../../assets/circle.png")} />
          </TouchableOpacity>
          <Text style={{fontFamily: "Arial", paddingLeft: 5}}>{props.ToDo}</Text>
        </View>
        <View style={{borderBottomColor: "#ccc", borderBottomWidth: 1, width: "100%", height: 1, paddingTop: 15}} />
      </>
    );
  } else {
    return (
      <>
        <View style={styles.listItem}>
          <TouchableOpacity onPress={HandleCheckmark}>
            <Image source={require("../../assets/checkmark.png")} />
          </TouchableOpacity>
          <Text style={{fontFamily: "Arial", fontStyle: "italic", textDecorationLine: "line-through", paddingLeft: 5}}>{props.ToDo}</Text>
        </View>
        <View style={{borderBottomColor: "#ccc", borderBottomWidth: 1, width: "100%", height: 1, paddingTop: 15}} />
      </>
    );
  }
};

// return (
//     <View>
//         {/* <IsCompleted value={taskCompleted}/> */}
//     </View>
export default ToDoListItem;
