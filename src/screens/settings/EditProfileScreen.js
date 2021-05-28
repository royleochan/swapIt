import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EditProfileScreen = (props) => {
  const { loggedInUser } = props.route.params;

  return (
    <View>
      <Text>Edit Profile screen</Text>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
