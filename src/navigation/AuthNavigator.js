// React Imports //
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screen Imports //
import SignupScreen from "screens/auth/SignupScreen";
import SignupScreenTwo from "screens/auth/SignupScreenTwo";
import LoginScreen from "screens/auth/LoginScreen";
import OnboardingScreen from "screens/onboarding/OnboardingScreen";
import ResetPasswordScreen from "screens/auth/ResetPasswordScreen";
import CreateNewPasswordScreen from "screens/auth/CreateNewPasswordScreen";
import VerifyOtpScreen from "screens/profile/VerifyOtpScreen";

// Init Stack Navigator //
const Stack = createStackNavigator();

// Main Component //
const AuthNavigator = () => {
  // Init //
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  // Side Effects: Handles 'already launched' state for onboarding screen logic //
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

  // Render //
  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <Stack.Navigator headerMode="none">
      {isFirstLaunch && (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SignupTwo" component={SignupScreenTwo} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPasswordScreen}
      />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
