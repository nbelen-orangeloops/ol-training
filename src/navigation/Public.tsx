import {HeaderBackButton, HeaderBackButtonProps} from "@react-navigation/elements";
import {createStackNavigator} from "@react-navigation/stack";
import React from "react";

import {ForgotPassword} from "../screens/forgotpassword/ForgotPassword";
import {SignIn} from "../screens/signin/SignIn";
import {SignUp} from "../screens/signup/SignUp";
import {Welcome} from "../screens/welcome/Welcome";
import {DynamicStyleSheet, useDynamicStyleSheet} from "../style/darkMode";
import {variables} from "../style/variables";
import {UIHelper} from "../utils/UIHelper";

export type PublicStackParamList = {
  Welcome?: undefined;
  SignIn?: undefined;
  SignUp?: undefined;
  ForgotPassword?: undefined;
};

export const Stack = createStackNavigator<PublicStackParamList>();

export const Public: React.FC = () => {
  const screenOptions: React.ComponentProps<typeof Stack.Navigator>["screenOptions"] = React.useCallback(() => {
    const result: React.ComponentProps<typeof Stack.Navigator>["screenOptions"] = {
      headerBackTitle: null as unknown as string,
      headerTitle: null as unknown as string,
      headerTransparent: true,
      headerMode: "screen" as const,
      headerLeft: UIHelper.renderObserverComponent((props: HeaderBackButtonProps) => {
        const themedStyles = React.useMemo(
          () =>
            new DynamicStyleSheet({
              label: {
                ...variables.link,
              },
            }),
          []
        );
        const styles = useDynamicStyleSheet(themedStyles);

        return props.canGoBack ? <HeaderBackButton {...props} labelStyle={styles.label} /> : null;
      }),
    };
    return result;
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
