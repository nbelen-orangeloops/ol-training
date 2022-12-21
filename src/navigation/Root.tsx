import {DarkTheme, DefaultTheme, NavigationContainer, NavigatorScreenParams} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {observer} from "mobx-react-lite";
import React from "react";
import {Platform} from "react-native";

import {StatusBar} from "../components/statusbar/StatusBar";
import {ExampleModal} from "../screens/examplemodal/ExampleModal";
import {ModalSectionData, SectionModal} from "../screens/sectionmodal/SectionModal";
import {useDarkMode} from "../style/darkMode";
import {variables} from "../style/variables";
import {NavigationHelper} from "./NavigationHelper";
import {Screens, ScreensStackParamList} from "./Screens";

export type RootSwitchParamList = {
  Screens?: NavigatorScreenParams<ScreensStackParamList>;
  ExampleModal?: undefined;
  SectionModal: {
    data: ModalSectionData[];
    selected?: ModalSectionData;
    onSelect: (value: ModalSectionData) => void;
    onClose?: () => void;
  };
};

const RootStack = createStackNavigator<RootSwitchParamList>();

const darkTheme: typeof DarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: variables.secondaryColor.dark,
  },
};

const lightTheme: typeof DarkTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: variables.secondaryColor.light,
  },
};

export const Root = observer(() => {
  const {appContainerRef} = NavigationHelper;

  const isDark = useDarkMode();

  const modalOptions = React.useMemo<React.ComponentProps<typeof RootStack.Screen>["options"]>(
    () => ({
      cardStyle: {
        backgroundColor: "transparent",
      },
      cardShadowEnabled: true,
    }),
    []
  );

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} translucent={true} backgroundColor={Platform.OS === "android" && Platform.Version < 23 ? "rgba(0,0,0,.4)" : "transparent"} />

      <NavigationContainer ref={appContainerRef} theme={isDark ? darkTheme : lightTheme}>
        <RootStack.Navigator>
          <RootStack.Screen name="Screens" component={Screens} options={{headerShown: false}} />

          <RootStack.Group screenOptions={{presentation: "modal"}}>
            <RootStack.Screen name="ExampleModal" component={ExampleModal} options={modalOptions} />
            <RootStack.Screen name="SectionModal" component={SectionModal} options={modalOptions} />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
});
