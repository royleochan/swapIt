import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import UserHeader from "components/UserHeader";

const ProfileScreen = (props) => {
  let user = useSelector((state) => state.auth.user);
  user.listings = user.products.length;

  // temporary (remove once data is fixed)
  user.followers = 22;
  user.following = 1;
  user.rating = 4;

  return (
    <View style={styles.screenContainer}>
      <UserHeader selectedUser={user} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
