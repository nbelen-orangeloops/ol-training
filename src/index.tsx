import "./sideEffects";

import * as React from "react";
import {AppRegistry, LogBox} from "react-native";
import DeviceInfo from "react-native-device-info";
import {enableScreens} from "react-native-screens";

import {App} from "./App";
import {GraphQLAPIClient} from "./core/apiclient/graphql/GraphQLAPIClient";

enableScreens();

LogBox.ignoreLogs([
  "Remote debugger", //
  "Can't perform a React state update",
  "-[RCTRootView cancelTouches]` is deprecated",
  "measureLayoutRelativeToContainingList threw an error ",
  "You should only render",
  "You are trying to add",
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

if (!process.env.APP_NAME) throw new Error("Env variable APP_NAME is not defined.");

AppRegistry.registerComponent(process.env.APP_NAME, () => () => {
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useState(async () => {
    GraphQLAPIClient.configureClient({
      userAgent: await DeviceInfo.getUserAgent(),
      shouldRefreshToken: () => false,
      onRefreshToken: (accessToken) => {
        // TODO-JS
      },
    });

    setShouldRender(true);
  });

  return shouldRender ? <App /> : null;
});
