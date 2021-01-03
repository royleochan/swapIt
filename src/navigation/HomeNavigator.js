import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "screens/HomeScreen";
import DefaultNavOptions from "navigation/options/DefaultNavOptions";

const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={DefaultNavOptions}
        />
      </Stack.Navigator>
    );
  };

export default HomeNavigator
