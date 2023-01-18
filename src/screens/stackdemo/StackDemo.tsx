import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { CarouselComp } from "../../components/carousel/CarouselData";
import { Welcome } from "../welcome/Welcome";

const Stack = createStackNavigator();

export const StackDemo = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Page1">
        <Stack.Screen name="Page1" component={Welcome} />
        <Stack.Screen name="Page2" component={CarouselComp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
