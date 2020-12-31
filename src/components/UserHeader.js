import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import UserStatistic from "components/UserStatistic";

const UserHeader = (props) => {
  const { selectedUser } = props;

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: selectedUser.profilePic }}
          style={styles.profilePicture}
        />
      </View>
      <View style={styles.userStatisticsContainer}>
        <UserStatistic value={selectedUser.products.length}> Listings</UserStatistic>
        <UserStatistic value={selectedUser.followers.length}> Followers</UserStatistic>
        <UserStatistic value={selectedUser.following.length}> Following</UserStatistic>
      </View>
      <View style={styles.userInformationContainer}>
        <DefaultText style={styles.username}>
          @{selectedUser.username}
        </DefaultText>
        <DefaultText style={styles.location}>
          {selectedUser.location}
        </DefaultText>
        <DefaultText style={styles.rating}>{selectedUser.rating}/5</DefaultText>
      </View>
      <View style={styles.descriptionContainer}>
        <DefaultText style={styles.description}>
          {selectedUser.description}
        </DefaultText>
      </View>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E5E5",
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
  },
  profilePictureContainer: {
    alignItems: "center",
    padding: 15,
  },
  profilePicture: {
    width: 75,
    height: 75,
    borderRadius: 35,
  },
  userStatisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 15,
  },
  userStatistics: {
    fontSize: 10,
    color: Colors.primary,
  },
  userInformationContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 10,
  },
  username: {
    fontFamily: "latoBold",
    fontSize: 12,
    paddingBottom: 5,
  },
  location: {
    paddingBottom: 5,
  },
  rating: {
    color: Colors.accent,
    textDecorationLine: "underline",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    paddingHorizontal: 30,
    textAlign: "center",
  },
});
