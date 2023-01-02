import React from "react";
import { Text, View, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import TrashCan from "../../assets/trashCan.svg";
import { themedStyles } from "../../screens/welcome/Welcome.styles";
import { useDynamicStyleSheet } from "../../style/darkMode";
import { variables } from "../../style/variables";

export const ToDoListHeader = (props: {
  itemsLeftCount: number;
  onClean: () => void;
  text: string;
}) => {
  const styles = useDynamicStyleSheet(themedStyles);
  const colorScheme = useColorScheme();

  const { itemsLeftCount, onClean, text } = props;

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.text}>Tasks</Text>
        <TouchableOpacity style={styles.cleanButton} onPress={onClean}>
          <TrashCan />
          <Text style={styles.textWhite}>Clean</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text
          style={{
            fontFamily: "Arial",
            fontStyle: "italic",
            color:
              colorScheme === "dark"
                ? variables.whiteColor
                : variables.blackColor,
          }}
        >
          {itemsLeftCount} {text} left
        </Text>
      </View>
    </View>
  );
};
