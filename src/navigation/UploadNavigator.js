import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UploadScreen from "screens/UploadScreen";
import DefaultNavOptions from "navigation/options/DefaultNavOptions";

const Stack = createStackNavigator();

const UploadNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Upload"
        component={UploadScreen}
        options={DefaultNavOptions}
      />
    </Stack.Navigator>
  );
};

export default UploadNavigator;
