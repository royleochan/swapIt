import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { DefaultNavOptions } from "navigation/options/DefaultNavOptions";
import { ChatRoomOptions } from "navigation/options/ChatRoomOptions";
import UserProfileNavigator from "navigation/UserProfileNavigator";
import HomeScreen from "screens/HomeScreen";
import ProductDetailsScreen from "screens/ProductDetailsScreen";
import ChatsScreen from "screens/ChatsScreen";
import ChatRoomScreen from "screens/ChatRoomScreen";
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
        name="Chats"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={ChatRoomOptions}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={DefaultNavOptions}
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
