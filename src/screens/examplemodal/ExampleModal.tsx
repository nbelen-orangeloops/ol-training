import {StackScreenProps} from "@react-navigation/stack";
import {observer} from "mobx-react-lite";
import * as React from "react";
import {Button, View} from "react-native";

import {NavigationHelper} from "../../navigation/NavigationHelper";
import {RootSwitchParamList} from "../../navigation/Root";
import {useDynamicStyleSheet} from "../../style/darkMode";
import {themedStyles} from "./ExampleModal.styles";

export type ExampleModalProps = StackScreenProps<RootSwitchParamList, "ExampleModal">;

export const ExampleModal: React.FC<ExampleModalProps> = observer((props) => {
  const styles = useDynamicStyleSheet(themedStyles);

  return (
    <View style={styles.container}>
      <Button title="Test" onPress={() => NavigationHelper.showModal({screen: "ExampleModal"})} />
    </View>
  );
});
