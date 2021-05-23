import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "react-native-elements";
import { EvilIcons } from "@expo/vector-icons";

import * as authActions from "store/actions/auth";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import UserStatistic from "components/UserStatistic";

const UserHeader = (props) => {
  const { selectedUser, navigateToReviews } = props;
  const [isFollowing, setIsFollowing] = useState(false);

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.jwtToken);

  const followUser = () => {
    setIsFollowing(true);
    dispatch(
      authActions.updateUserFollowing(
        loggedInUser.id,
        selectedUser.id,
        token,
        true
      )
    );
  };

  const unfollowUser = () => {
    setIsFollowing(false);
    dispatch(
      authActions.updateUserFollowing(
        loggedInUser.id,
        selectedUser.id,
        token,
        false
      )
    );
  };

  return (
    <View style={styles.container}>
      {loggedInUser.id !== selectedUser.id && (
        <View style={{ zIndex: 1 }}>
          {(!loggedInUser.following.includes(selectedUser.id) ||
            !isFollowing) && (
            <TouchableOpacity style={styles.followButton} onPress={followUser}>
              <DefaultText style={styles.followText}>Follow</DefaultText>
            </TouchableOpacity>
          )}
          {(loggedInUser.following.includes(selectedUser.id) ||
            isFollowing) && (
            <TouchableOpacity
              style={styles.followButton}
              onPress={unfollowUser}
            >
              <DefaultText style={styles.followText}>Unfollow</DefaultText>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={styles.topHeaderContainer}>
        <Image
          source={{ uri: selectedUser.profilePic }}
          style={styles.profilePicture}
        />
        <View style={styles.userStatisticsContainer}>
          <UserStatistic value={selectedUser.products.length}>
            Listings
          </UserStatistic>
          <UserStatistic value={selectedUser.followers.length}>
            Followers
          </UserStatistic>
          <UserStatistic value={selectedUser.following.length}>
            Following
          </UserStatistic>
        </View>
      </View>
      <View style={styles.usernameReviewContainer}>
        <DefaultText style={styles.username}>
          @{selectedUser.username}
        </DefaultText>
        <TouchableOpacity
          style={styles.ratingContainer}
          onPress={() => navigateToReviews(selectedUser)}
        >
          <Rating
            type="custom"
            readonly
            imageSize={20}
            tintColor={Colors.gray}
            ratingBackgroundColor={Colors.background}
            ratingColor={Colors.star}
            fractions={1}
            startingValue={3.5}
          />
          <DefaultText style={styles.rating}>
            {selectedUser.rating}(0)
          </DefaultText>
        </TouchableOpacity>
      </View>
      <View style={styles.locationContainer}>
        <EvilIcons name="location" size={20} color={Colors.primary} />
        <DefaultText style={styles.location}>
          {selectedUser.location}
        </DefaultText>
      </View>
      <DefaultText style={styles.description}>
        {selectedUser.description}
      </DefaultText>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
  },
  followButton: {
    backgroundColor: Colors.primary,
    padding: 5,
    width: 66,
    height: 26,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    marginTop: 14,
    marginRight: 18,
  },
  followText: {
    color: Colors.background,
    alignSelf: "center",
  },
  topHeaderContainer: {
    flexDirection: "row",
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userStatisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginRight: "15%",
    marginTop: 14,
  },
  userStatistics: {
    fontSize: 10,
    color: Colors.primary,
  },
  usernameReviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 24,
    marginTop: 12,
  },
  username: {
    fontFamily: "latoBold",
    fontSize: 18,
  },
  rating: {
    marginRight: 24,
    marginLeft: 6,
  },
  locationContainer: {
    marginLeft: 20,
    marginTop: 8,
    flexDirection: "row",
  },
  location: {
    fontSize: 10,
    marginTop: 2,
  },
  description: {
    marginLeft: 25,
    marginTop: 8,
    fontSize: 10,
    marginBottom: 24,
    color: "black",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
