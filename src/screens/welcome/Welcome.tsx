import * as React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDynamicStyleSheet } from "../../style/darkMode";
import { themedStyles } from "./Welcome.styles";

export const Welcome = ({ navigation }: any) => {
  const styles = useDynamicStyleSheet(themedStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.todoListFilterWrapper}>
        <Text style={{ fontSize: 50, fontWeight: "700", marginBottom: 50 }}>
          Welcome!
        </Text>
        <View>
          <Button
            onPress={() => navigation.navigate("Page1")}
            title="Go to To-Do-List App"
          />
        </View>
        <View>
          <Button
            onPress={() => navigation.navigate("Page2")}
            title="Go to Carousel"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
