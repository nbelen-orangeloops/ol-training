import * as React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ToDos } from "../../components/todos/ToDos";
import { useDynamicStyleSheet } from "../../style/darkMode";
import { themedStyles } from "./Welcome.styles";

export const Welcome = ({ navigation }: any) => {
  const styles = useDynamicStyleSheet(themedStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.todoListFilterWrapper}>
        <ToDos navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};
