import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "screens/ProfileScreen";
import DefaultNavOptions from "navigation/options/DefaultNavOptions";

const Stack = createStackNavigator();

const UserProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={DefaultNavOptions}
      />
    </Stack.Navigator>
  );
};

export default UserProfileNavigator;
