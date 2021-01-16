import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import Colors from "constants/Colors";
import AlertsScreen from "screens/AlertsScreen";
import HomeNavigator from "navigation/HomeNavigator";
import UploadNavigator from "navigation/UploadNavigator";
import UserProfileNavigator from "navigation/UserProfileNavigator";
import ExploreScreen from "screens/ExploreScreen";

// Icons for the bottom tab navigator
const DefaultIcon = (props) => {
  const { name, color, focused } = props;
  let iconName;
  switch (name) {
    case "Home":
      iconName = "home";
      break;
    case "Explore":
      return (
        <View style={focused ? styles.activeIconContainer : null}>
          {!focused && (
            <MaterialCommunityIcons
              name="compass-outline"
              size={23}
              color={Colors.primary}
            />
          )}
          {focused && (
            <>
              <Text style={focused ? styles.activeLabel : null}>Explore</Text>
              <Entypo name="dot-single" size={16} color={Colors.primary} />
            </>
          )}
        </View>
      );
    case "Upload":
      iconName = "plus";
      break;
    case "Alerts":
      iconName = "bells";
      break;
    case "Profile":
      iconName = "user";
      break;
  }
  return (
    <View style={focused ? styles.activeIconContainer : null}>
      {!focused && (
        <AntDesign name={iconName} size={23} color={Colors.primary} />
      )}
      {focused && (
        <>
          <Text style={focused ? styles.activeLabel : null}>{name}</Text>
          <Entypo name="dot-single" size={16} color={Colors.primary} />
        </>
      )}
    </View>
  );
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          return (
            <DefaultIcon name={route.name} color={color} focused={focused} />
          );
        },
      })}
    >
      <BottomTab.Screen name="Home" component={HomeNavigator} />
      <BottomTab.Screen name="Explore" component={ExploreScreen} />
      <BottomTab.Screen name="Upload" component={UploadNavigator} />
      <BottomTab.Screen name="Alerts" component={AlertsScreen} />
      <BottomTab.Screen name="Profile" component={UserProfileNavigator} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  activeIconContainer: {
    paddingTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  activeLabel: {
    color: Colors.primary,
    fontFamily: "latoBold",
    padding: 0,
  },
});
