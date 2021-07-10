// React Imports //
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

// Redux Action Imports //
import { relogin } from "store/actions/auth";

// Navigators Imports //
import BottomTabNavigator from "navigation/BottomTabNavigator";
import AuthNavigator from "navigation/AuthNavigator";

// Main Component //
const AppNavigator = () => {
  // Init //
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuth);

  // Side Effects: Handles auto login //
  useEffect(() => {
    const initAuthToken = async () => {
      const authData = await AsyncStorage.getItem("authentication_data");
      if (authData && authData.token) {
        dispatch(relogin(authData.user, authData.token));
      }
    };
    initAuthToken();
  }, []);

  // Render //
  return (
    <NavigationContainer>
      {isAuthenticated && <BottomTabNavigator />}
      {!isAuthenticated && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
