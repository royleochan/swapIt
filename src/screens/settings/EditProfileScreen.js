import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EditUserScreen = (props) => {
  const { loggedInUser } = props.route.params;

  return (
    <View>
      <Text>Edit User screen</Text>
    </View>
  );
};

export default EditUserScreen;

const styles = StyleSheet.create({});
