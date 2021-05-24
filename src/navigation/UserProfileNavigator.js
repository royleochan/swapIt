import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import ProfileScreen from "screens/ProfileScreen";
import ProductDetailsScreen from "screens/ProductDetailsScreen";
import EditProductScreen from "screens/EditProductScreen";
import ReviewsScreen from "screens/ReviewsScreen";
import CategoryScreen from "screens/CategoryScreen";
import DefaultNavOptions from "navigation/options/DefaultNavOptions";

const Stack = createStackNavigator();

const UserProfileNavigator = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={DefaultNavOptions}
        initialParams={{ user: user }}
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
    </Stack.Navigator>
  );
};

export default UserProfileNavigator;
