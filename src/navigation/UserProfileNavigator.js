import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "components/Header";
import { DefaultNavOptions } from "navigation/options/DefaultNavOptions";
import { FollowOptions } from "navigation/options/FollowOptions";
import FollowTabNavigator from "navigation/FollowTabNavigator";
import ProfileScreen from "screens/ProfileScreen";
import ProductDetailsScreen from "screens/ProductDetailsScreen";
import EditProductScreen from "screens/EditProductScreen";
import ReviewsScreen from "screens/ReviewsScreen";
import CategoryScreen from "screens/CategoryScreen";
import SettingsScreen from "screens/SettingsScreen";

const Stack = createStackNavigator();

const UserProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: () => <Header /> }}
      />
      <Stack.Screen
        name="Product"
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={DefaultNavOptions}
      />
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={DefaultNavOptions}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={DefaultNavOptions}
      />
      <Stack.Screen
        name="Follow"
        component={FollowTabNavigator}
        options={FollowOptions}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={DefaultNavOptions}
      />
    </Stack.Navigator>
  );
};

export default UserProfileNavigator;
