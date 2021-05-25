import React from "react";
import { View, Text } from "react-native";

const FollowScreen = (props) => {
  const { type } = props.route.params;

  return (
    <View>
      <Text>Follow Screen</Text>
    </View>
  );
};

export default FollowScreen;
