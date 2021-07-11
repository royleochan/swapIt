import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfileNavigator from "navigation/UserProfileNavigator";
import AlertsScreen from "screens/AlertsScreen";
import ProductDetailsScreen from "screens/ProductDetailsScreen";

const Stack = createStackNavigator();

const AlertsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={UserProfileNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AlertsNavigator;
