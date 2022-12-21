import {NavigatorScreenParams} from "@react-navigation/core";
import React from "react";

import {AuthCheck} from "../screens/authcheck/AuthCheck";
import {createSwitchNavigator} from "./createSwitchNavigator";
import {Main, MainStackParamList} from "./Main";
import {Public, PublicStackParamList} from "./Public";

export type ScreensStackParamList = {
  AuthCheck?: undefined;
  Public?: NavigatorScreenParams<PublicStackParamList>;
  Main?: NavigatorScreenParams<MainStackParamList>;
};

export const ScreensSwitch = createSwitchNavigator<ScreensStackParamList>();

export const Screens: React.FC = () => (
  <ScreensSwitch.Navigator>
    <ScreensSwitch.Group screenOptions={{headerShown: false}}>
      <ScreensSwitch.Screen name="AuthCheck" component={AuthCheck} />
      <ScreensSwitch.Screen name="Public" component={Public} />
      <ScreensSwitch.Screen name="Main" component={Main} />
    </ScreensSwitch.Group>
  </ScreensSwitch.Navigator>
);
