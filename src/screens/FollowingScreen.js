import React, { useLayoutEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ParamsContext } from "navigation/context/ParamsContext";

const FollowingScreen = (props) => {
  const { params } = useContext(ParamsContext);
  const { selectedUser } = params;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `Following (${selectedUser.following.length})`,
    });
  }, [props.navigation]);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default FollowingScreen;

const styles = StyleSheet.create({});
