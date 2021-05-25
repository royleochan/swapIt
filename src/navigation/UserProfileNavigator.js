import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import Colors from "constants/Colors";
import * as NavOptions from "navigation/options/DefaultNavOptions";
import FollowTabNavigator from "navigation/FollowTabNavigator";
import IconButton from "components/IconButton";
import Header from "components/Header";
import ProfileScreen from "screens/ProfileScreen";
import ProductDetailsScreen from "screens/ProductDetailsScreen";
import EditProductScreen from "screens/EditProductScreen";
import ReviewsScreen from "screens/ReviewsScreen";
import CategoryScreen from "screens/CategoryScreen";

const Stack = createStackNavigator();

const UserProfileNavigator = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: () => <Header /> }}
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
        options={NavOptions.DefaultNavOptions}
      />
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={NavOptions.DefaultNavOptions}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={NavOptions.DefaultNavOptions}
      />
      <Stack.Screen
        name="Follow"
        component={FollowTabNavigator}
        options={({ navigation }) => ({
          title: "@" + user.username,
          headerLeft: () => (
            <IconButton
              style={{ marginLeft: 10 }}
              size={23}
              color={Colors.primary}
              name="arrowleft"
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default UserProfileNavigator;
