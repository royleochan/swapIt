import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignupScreen from "screens/auth/SignupScreen";
import LoginScreen from "screens/auth/LoginScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
