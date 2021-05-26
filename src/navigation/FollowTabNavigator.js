import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Colors from "constants/Colors";
import FollowersScreen from "screens/FollowersScreen";
import FollowingScreen from "screens/FollowingScreen";
import { ParamsContext } from "navigation/context/ParamsContext";

const TopTab = createMaterialTopTabNavigator();

const FollowTabNavigator = (props) => {
  return (
    <ParamsContext.Provider value={props.route.params}>
      <TopTab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 12, fontFamily: "lato" },
          activeTintColor: Colors.primary,
          inactiveTintColor: Colors.glass,
          indicatorStyle: { backgroundColor: Colors.primary },
        }}
      >
        <TopTab.Screen name="Followers" component={FollowersScreen} />
        <TopTab.Screen name="Following" component={FollowingScreen} />
      </TopTab.Navigator>
    </ParamsContext.Provider>
  );
};

export default FollowTabNavigator;
