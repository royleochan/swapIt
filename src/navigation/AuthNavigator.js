import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignupScreen from "screens/auth/SignupScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
