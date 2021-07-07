import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";

import SignupScreen from "screens/auth/SignupScreen";
import SignupScreenTwo from "screens/auth/SignupScreenTwo";
import LoginScreen from "screens/auth/LoginScreen";
import OnboardingScreen from "screens/onboarding/OnboardingScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  // Init //
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // Handles setting already launched state for conditionally rendering onboarding screen //
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  // Main Component //
  return (
    <Stack.Navigator headerMode="none">
      {isFirstLaunch && (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SignupTwo" component={SignupScreenTwo} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
