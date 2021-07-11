// React Imports //
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, AppState } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

// Redux Action Imports //
import { fetchNotifications } from "store/actions/notifications";

// Navigator Imports //
import AlertsNavigator from "navigation/AlertsNavigator";
import HomeNavigator from "navigation/HomeNavigator";
import UploadNavigator from "navigation/UploadNavigator";
import UserProfileNavigator from "navigation/UserProfileNavigator";

// Colors Imports //
import Colors from "constants/Colors";

// Component Imports //
import DefaultText from "components/DefaultText";

// Screen Imports //
import ExploreScreen from "screens/ExploreScreen";

// Icons for the bottom tab navigator //
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

// Init Bottom Tab Navigator //
const BottomTab = createBottomTabNavigator();

// Main Component //
const BottomTabNavigator = (props) => {
  // Init //
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const unreadNotifications = useSelector(
    (state) => state.notifications.notifications
  ).filter((notification) => !notification.isRead);

  // Side Effects //
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange); // This listener is fired whenever the app state changes (active, foreground, background)

    const subscription =
      Notifications.addNotificationReceivedListener(_handleNotification); // This listener is fired whenever a notification is received while the app is foregrounded

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
      subscription.remove();
    };
  }, []);

  // Functions //
  // Fetches notifications if app state transitions into active
  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      dispatch(fetchNotifications());
    }

    appState.current = nextAppState;
  };

  // Fetches notifications if a new notification is received while app is foregrounded
  const _handleNotification = () => {
    console.log("New notification");
    dispatch(fetchNotifications());
  };

  // Render //
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
        component={AlertsNavigator}
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
