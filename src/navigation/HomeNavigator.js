import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "screens/HomeScreen";
import ProductDetailsScreen from "screens/ProductDetailsScreen";
import MessagesScreen from "screens/MessagesScreen";
import ChatScreen from "screens/ChatScreen";

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
    </Stack.Navigator>
  );
};

export default HomeNavigator;
