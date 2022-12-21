import {DrawerNavigationProp} from "@react-navigation/drawer/src/types";
import {observer} from "mobx-react-lite";
import * as React from "react";
import {TouchableOpacity} from "react-native-gesture-handler";

import Hamburger from "../../assets/hamburger.svg";
import {useDynamicStyleSheet} from "../../style/darkMode";
import {themedStyles} from "./HamburgerButton.styles";

export type HamburgerButtonProps = {
  navigation: DrawerNavigationProp<any>;
};

export const HamburgerButton: React.FC<HamburgerButtonProps> = observer((props) => {
  const styles = useDynamicStyleSheet(themedStyles);

  return (
    <TouchableOpacity style={styles.hamburgerContainer} onPress={props.navigation.openDrawer}>
      <Hamburger style={styles.hamburgerIcon} />
    </TouchableOpacity>
  );
});
