import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector } from "react-redux";

import Colors from "constants/Colors";
import FollowScreen from "screens/FollowScreen";

const TopTab = createMaterialTopTabNavigator();

const FollowTabNavigator = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <TopTab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12, fontFamily: "lato" },
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.glass,
        indicatorStyle: { backgroundColor: Colors.primary },
      }}
    >
      <TopTab.Screen
        name="Followers"
        component={FollowScreen}
        initialParams={{ type: "followers" }}
        options={{ title: `Followers (${user.followers.length})` }}
      />
      <TopTab.Screen
        name="Following"
        component={FollowScreen}
        initialParams={{ type: "following" }}
        options={{ title: `Following (${user.following.length})` }}
      />
    </TopTab.Navigator>
  );
};

export default FollowTabNavigator;
