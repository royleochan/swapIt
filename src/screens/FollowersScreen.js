import React, { useLayoutEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "constants/Colors";
import { ParamsContext } from "navigation/context/ParamsContext";

const FollowersScreen = (props) => {
  const { params } = useContext(ParamsContext);
  const { selectedUser } = params;

  // set the username header in followers screen, don't have to do it in following screen
  useLayoutEffect(() => {
    const userProfileStackNavigator = props.navigation.dangerouslyGetParent();
    if (userProfileStackNavigator) {
      userProfileStackNavigator.setOptions({
        title: `@${selectedUser.username}`,
        headerTitleStyle: {
          color: Colors.primary,
          fontFamily: "latoBold",
          fontSize: 20,
        },
      });
    }
    props.navigation.setOptions({
      title: `Followers (${selectedUser.followers.length})`,
    });
  }, [props.navigation]);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default FollowersScreen;

const styles = StyleSheet.create({});
