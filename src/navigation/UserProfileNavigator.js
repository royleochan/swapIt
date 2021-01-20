import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "screens/ProfileScreen";
import ProductDetailsScreen from "screens/ProductDetailsScreen";
import EditProductScreen from "screens/EditProductScreen";
import SettingsScreen from "screens/SettingsScreen";
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
      <Stack.Screen
        name="Product"
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={DefaultNavOptions}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default UserProfileNavigator;
