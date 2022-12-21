import {createDrawerNavigator, DrawerContentComponentProps} from "@react-navigation/drawer";
import {DrawerNavigationProp} from "@react-navigation/drawer/src/types";
import {createStackNavigator} from "@react-navigation/stack";
import React from "react";

import {DrawerContent} from "../components/contentdrawer/DrawerContent";
import {HamburgerButton} from "../components/hamburgerbutton/HamburgerButton";
import {About} from "../screens/about/About";
import {Home} from "../screens/home/Home";
import {Profile} from "../screens/profile/Profile";
import {Settings} from "../screens/settings/Settings";

export type MainStackParamList = {
  Home?: undefined;
  Profile?: undefined;
  About?: undefined;
  Settings?: undefined;
};

const Drawer = createDrawerNavigator();

const DrawerStack = (props: {navigation: DrawerNavigationProp<any>; name: keyof MainStackParamList; component: React.ComponentType<any>}) => {
  const [Stack] = React.useState(() => createStackNavigator<MainStackParamList>());

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={props.name}
        component={props.component}
        options={{
          headerShown: false,
          headerLeft: () => {
            return <HamburgerButton navigation={props.navigation} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

const HomeStack = (props: {navigation: DrawerNavigationProp<any>}) => {
  return <DrawerStack navigation={props.navigation} name="Home" component={Home} />;
};

const AboutStack = (props: {navigation: DrawerNavigationProp<any>}) => {
  return <DrawerStack navigation={props.navigation} name="About" component={About} />;
};

const ProfileStack = (props: {navigation: DrawerNavigationProp<any>}) => {
  return <DrawerStack navigation={props.navigation} name="Profile" component={Profile} />;
};

const SettingsStack = (props: {navigation: DrawerNavigationProp<any>}) => {
  return <DrawerStack navigation={props.navigation} name="Settings" component={Settings} />;
};

export const Main: React.FC = () => {
  const handleDrawerContent = React.useCallback((props: DrawerContentComponentProps) => {
    return <DrawerContent {...(props as any)} />;
  }, []);

  return (
    <Drawer.Navigator drawerContent={handleDrawerContent} initialRouteName={"Home"}>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="AboutStack" component={AboutStack} />
      <Drawer.Screen name="ProfileStack" component={ProfileStack} />
      <Drawer.Screen name="SettingsStack" component={SettingsStack} />
    </Drawer.Navigator>
  );
};
