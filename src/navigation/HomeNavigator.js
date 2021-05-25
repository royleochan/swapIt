import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import * as NavOptions from "navigation/options/DefaultNavOptions";
import UserProfileNavigator from "navigation/UserProfileNavigator";
import HomeScreen from "screens/HomeScreen";
import ProductDetailsScreen from "screens/ProductDetailsScreen";
import MessagesScreen from "screens/MessagesScreen";
import ChatScreen from "screens/ChatScreen";
import CategoryScreen from "screens/CategoryScreen";
import ResultsScreen from "screens/ResultsScreen";
import SearchUserScreen from "screens/SearchUserScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={NavOptions.DefaultNavOptions}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchUserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={UserProfileNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
