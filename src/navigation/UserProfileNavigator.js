import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { DefaultNavOptions } from "navigation/options/DefaultNavOptions";
import { FollowOptions } from "navigation/options/FollowOptions";
import { ChatRoomOptions } from "navigation/options/ChatRoomOptions";
import FollowTabNavigator from "navigation/FollowTabNavigator";
import SettingsNavigator from "navigation/SettingsNavigator";
import ProfileScreen from "screens/profile/ProfileScreen";
import EditProductScreen from "screens/profile/EditProductScreen";
import ReviewsScreen from "screens/profile/ReviewsScreen";
import CreateReviewScreen from "screens/profile/CreateReviewScreen";
import VerifyOtpScreen from "screens/profile/VerifyOtpScreen";
import ProductDetailsScreen from "screens/ProductDetailsScreen";
import CategoryScreen from "screens/CategoryScreen";
import ChatsScreen from "screens/ChatsScreen";
import ChatRoomScreen from "screens/ChatRoomScreen";

const Stack = createStackNavigator();

const UserProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={DefaultNavOptions}
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
        name="CreateReview"
        component={CreateReviewScreen}
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
        component={SettingsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verify"
        component={VerifyOtpScreen}
        options={DefaultNavOptions}
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
    </Stack.Navigator>
  );
};

export default UserProfileNavigator;
