import React, { useState } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import BottomTabNavigator from "navigation/BottomTabNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    lato: require("assets/fonts/Lato-Regular.ttf"),
    latoBold: require("assets/fonts/Lato-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <NavigationContainer>
      <BottomTabNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
