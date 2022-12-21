import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {DrawerContentComponentProps, DrawerNavigationProp} from "@react-navigation/drawer/src/types";
import {observer} from "mobx-react-lite";
import * as React from "react";

import {NavigationHelper} from "../../navigation/NavigationHelper";
import {UIHelper} from "../../utils/UIHelper";

export type DrawerContentProps = DrawerContentComponentProps & {
  navigation: DrawerNavigationProp<any>;
};

export const DrawerContent: React.FC<DrawerContentProps> = observer((props) => {
  const {navigation} = props;

  const handleNavigationHome = React.useCallback(() => {
    NavigationHelper.navigateTo({
      screen: "Main",
      params: {
        // TODO: Review Navigator's stacks
        screen: "HomeStack" as any,
      },
    });
  }, [navigation]);

  const handleNavigationAbout = React.useCallback(() => {
    NavigationHelper.navigateTo({
      screen: "Main",
      params: {
        screen: "AboutStack" as any,
      },
    });
  }, [navigation]);

  const handleNavigationProfile = React.useCallback(() => {
    NavigationHelper.navigateTo({
      screen: "Main",
      params: {
        screen: "ProfileStack" as any,
      },
    });
  }, [navigation]);

  const handleNavigationSettings = React.useCallback(() => {
    navigation.navigate("SettingsStack");
  }, [navigation]);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={UIHelper.formatMessage("DrawerContent-home")} onPress={handleNavigationHome} />
      <DrawerItem label={UIHelper.formatMessage("DrawerContent-profile")} onPress={handleNavigationProfile} />
      <DrawerItem label={UIHelper.formatMessage("DrawerContent-about")} onPress={handleNavigationAbout} />
      <DrawerItem label={UIHelper.formatMessage("DrawerContent-settings")} onPress={handleNavigationSettings} />
    </DrawerContentScrollView>
  );
});
