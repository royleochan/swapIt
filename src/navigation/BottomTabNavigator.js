import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import Colors from "constants/Colors";
import AlertsScreen from "screens/AlertsScreen";
import HomeNavigator from "navigation/HomeNavigator";
import UploadNavigator from "navigation/UploadNavigator";
import UserProfileNavigator from "navigation/UserProfileNavigator";

// Icons for the bottom tab navigator
const DefaultIcon = (props) => {
  const { name, color, focused } = props;
  let iconName;
  switch (name) {
    case "Home":
      iconName = "home";
      break;
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
      <AntDesign
        name={iconName}
        size={23}
        color={focused ? Colors.background : color}
      />
      {focused && (
        <Text style={focused ? styles.activeLabel : null}>{name}</Text>
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
      <BottomTab.Screen name="Upload" component={UploadNavigator} />
      <BottomTab.Screen name="Alerts" component={AlertsScreen} />
      <BottomTab.Screen name="Profile" component={UserProfileNavigator} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  activeIconContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activeLabel: {
    color: Colors.background,
    paddingLeft: 6,
  },
});
