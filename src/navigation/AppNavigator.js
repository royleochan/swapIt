import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import * as authActions from "../store/actions/auth";
import BottomTabNavigator from "navigation/BottomTabNavigator";
import AuthNavigator from "navigation/AuthNavigator";

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const initAuthToken = async () => {
      const authData = await AsyncStorage.getItem("authentication_data");
      if (authData && authData.token) {
        dispatch(authActions.relogin(authData.user, authData.token));
      }
    };
    initAuthToken();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated && <BottomTabNavigator />}
      {!isAuthenticated && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
