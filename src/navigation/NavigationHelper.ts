import {NavigationContainerRef} from "@react-navigation/core";
import {StackActionType} from "@react-navigation/native";
import * as React from "react";

import {RootSwitchParamList} from "./Root";
import {ScreensStackParamList} from "./Screens";

export class NavigationHelper {
  static appContainerRef = React.createRef<NavigationContainerRef<ScreensStackParamList>>();

  static navigateTo<TKey extends keyof ScreensStackParamList>(options: {screen: TKey} & (undefined extends ScreensStackParamList[TKey] ? {params?: ScreensStackParamList[TKey]} : {params: ScreensStackParamList[TKey]})): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.appContainerRef.current?.navigate(options.screen, options.params);
  }

  static showModal<TKey extends keyof Omit<RootSwitchParamList, "Screens">>(options: {screen: TKey} & (undefined extends RootSwitchParamList[TKey] ? {params?: RootSwitchParamList[TKey]} : {params: RootSwitchParamList[TKey]})): void {
    const action: StackActionType = {
      type: "PUSH",
      payload: {
        name: options.screen,
        params: options.params,
      },
    };

    this.appContainerRef.current?.dispatch(action);
  }
}
