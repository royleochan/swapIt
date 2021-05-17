import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Stars from "react-native-stars";
import AntDesign from "react-native-vector-icons/AntDesign";

import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import UserStatistic from "components/UserStatistic";

const UserHeader = (props) => {
  const { selectedUser } = props;
  const {
    profilePic,
    products,
    followers,
    following,
    username,
    location,
    description,
  } = selectedUser;
  const dummyRating = 3.75;

  return (
    <View style={styles.container}>
      <View style={styles.statisticsContainer}>
        <Image source={{ uri: profilePic }} style={styles.profilePicture} />
        <UserStatistic value={products.length}> Listings</UserStatistic>
        <UserStatistic value={followers.length}> Followers</UserStatistic>
        <UserStatistic value={following.length}> Following</UserStatistic>
      </View>
      <View style={styles.userDetailsContainer}>
        <View style={styles.userInformationContainer}>
          <DefaultText style={styles.username}>@{username}</DefaultText>
          <DefaultText style={styles.location}>{location}</DefaultText>
        </View>
        <View style={styles.ratingContainer}>
          <Stars
            display={dummyRating}
            count={5}
            fullStar={
              <AntDesign name="star" style={styles.filledStar} size={16} />
            }
            emptyStar={
              <AntDesign name="staro" style={styles.emptyStar} size={16} />
            }
          />
          <DefaultText style={styles.rating}>
            {"   "}
            {dummyRating} / 5
          </DefaultText>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <DefaultText>{description}</DefaultText>
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
    paddingHorizontal: "10%",
    justifyContent: "flex-start",
  },
  statisticsContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
  },
  profilePicture: {
    width: 75,
    height: 75,
    borderRadius: 35,
  },
  userDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInformationContainer: {
    flexDirection: "column",
    paddingTop: 10,
  },
  username: {
    fontFamily: "latoBold",
    fontSize: 18,
    paddingBottom: 5,
  },
  location: {
    paddingBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    paddingBottom: 10,
    alignItems: "center",
  },
  filledStar: {
    color: "#F4A91B",
  },
  emptyStar: {
    color: "gray",
  },
  rating: {
    fontSize: 12,
    fontWeight: "bold",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
});
