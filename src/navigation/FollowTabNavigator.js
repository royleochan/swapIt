import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FollowScreen from "screens/FollowScreen";

const TopTab = createMaterialTopTabNavigator();

const FollowTabNavigator = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen
        name="Followers"
        component={FollowScreen}
        initialParams={{ type: "followers" }}
      />
      <TopTab.Screen
        name="Following"
        component={FollowScreen}
        initialParams={{ type: "following" }}
      />
    </TopTab.Navigator>
  );
};

export default FollowTabNavigator;
