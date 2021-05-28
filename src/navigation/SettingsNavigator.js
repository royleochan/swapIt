import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { DefaultNavOptions } from "navigation/options/DefaultNavOptions";
import SettingsScreen from "screens/settings/SettingsScreen";
import EditProfileScreen from "screens/settings/EditProfileScreen";

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={DefaultNavOptions}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={DefaultNavOptions}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
