import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import DefaultText from "components/DefaultText";
import Colors from "constants/Colors";
import AlertsScreen from "screens/AlertsScreen";
import HomeNavigator from "navigation/HomeNavigator";
import UploadNavigator from "navigation/UploadNavigator";
import UserProfileNavigator from "navigation/UserProfileNavigator";
import ExploreScreen from "screens/ExploreScreen";

// Icons for the bottom tab navigator
const DefaultIcon = (props) => {
  const { name, focused } = props;
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
              <DefaultText style={focused ? styles.activeLabel : null}>
                Explore
              </DefaultText>
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
          <DefaultText style={focused ? styles.activeLabel : null}>
            {name}
          </DefaultText>
          <Entypo name="dot-single" size={16} color={Colors.primary} />
        </>
      )}
    </View>
  );
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const unreadNotifications = useSelector(
    (state) => state.notifications.notifications
  ).filter((notification) => !notification.isRead);

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
      <BottomTab.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{
          tabBarBadge:
            unreadNotifications.length > 0 ? unreadNotifications.length : null,
        }}
      />
      <BottomTab.Screen name="Profile" component={UserProfileNavigator} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  activeIconContainer: {
    paddingTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  activeLabel: {
    fontFamily: "latoBold",
    width: "100%",
    fontSize: 12,
  },
});
