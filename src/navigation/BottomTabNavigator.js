import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "screens/HomeScreen";
import UploadScreen from "screens/UploadScreen";
import NotificationsScreen from "screens/NotificationsScreen";
import ProfileScreen from "screens/ProfileScreen";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Upload" component={UploadScreen} />
      <BottomTab.Screen name="Notifications" component={NotificationsScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
