import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { DefaultNavOptions } from "navigation/options/DefaultNavOptions";
import SettingsScreen from "screens/settings/SettingsScreen";
import EditProfileScreen from "screens/settings/EditProfileScreen";
import HelpAndSupportScreen from "screens/settings/HelpAndSupportScreen";
import ReportScreen from "screens/settings/ReportScreen";
import ChangePasswordScreen from "screens/settings/ChangePasswordScreen";

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
      <Stack.Screen
        name="HelpAndSupport"
        component={HelpAndSupportScreen}
        options={DefaultNavOptions}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={DefaultNavOptions}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={DefaultNavOptions}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
