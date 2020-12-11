import React from "react";
import { View, Text, StyleSheet } from "react-native";

import UserHeader from "components/UserHeader";

const ProfileScreen = (props) => {
  const user = {
    username: "DestineeOw32",
    following: 1,
    followers: 22,
    listings: 30,
    rating: 4,
    description:
      "Remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    profilePicture:
      "https://res.cloudinary.com/dey8rgnvh/image/upload/v1597938408/qtdgn69johypeadagidn.jpg",
    location: "Bedok North Avenue 7"
  };
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
    paddingTop: 20,
  },
});
