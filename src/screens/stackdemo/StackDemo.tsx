import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { CarouselComp } from "../../components/carousel/CarouselData";
import { ToDos } from "../../components/todos/ToDos";
import { Welcome } from "../welcome/Welcome";

const Stack = createStackNavigator();

export const StackDemo = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Page">
        <Stack.Screen name="Page" component={Welcome} />
        <Stack.Screen name="Page1" component={ToDos} />
        <Stack.Screen name="Page2" component={CarouselComp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
