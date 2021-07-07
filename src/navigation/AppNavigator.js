import React, { useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import * as authActions from "../store/actions/auth";
import * as notificationActions from "store/actions/notifications";
import BottomTabNavigator from "navigation/BottomTabNavigator";
import AuthNavigator from "navigation/AuthNavigator";

const AppNavigator = () => {
  // Init //
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const appState = useRef(AppState.currentState);

  // Handles auto-login //
  useEffect(() => {
    const initAuthToken = async () => {
      const authData = await AsyncStorage.getItem("authentication_data");
      if (authData && authData.token) {
        dispatch(authActions.relogin(authData.user, authData.token));
      }
    };
    initAuthToken();
  }, []);

  // Handles fetching notifications when the app comes into the foreground (app has 3 states: foreground, background and closed) //
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active" &&
      isAuthenticated
    ) {
      console.log("App has come to the foreground!");
      dispatch(notificationActions.fetchNotifications(loggedInUserId));
    }

    appState.current = nextAppState;
  };

  // Main Component //
  return (
    <NavigationContainer>
      {isAuthenticated && <BottomTabNavigator />}
      {!isAuthenticated && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
