// React Imports //
import React, { useLayoutEffect, useContext, useCallback } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";

// RNE Imports //
import { Avatar } from "react-native-elements";

// Navigation Imports //
import { navigateToProfile } from "navigation/navigate/profile/index";
import { ParamsContext } from "navigation/context/ParamsContext";

// Redux Action Imports //
import { fetchFollowers } from "store/actions/followInfo";

// Custom Hook Imports //
import useFlatListRequest from "hooks/useFlatListRequest";

// Colors Import //
import Colors from "constants/Colors";

// Components Import //
import FollowSkeleton from "components/skeletons/FollowSkeleton";
import DefaultText from "components/DefaultText";
import FollowButton from "components/FollowButton";
import Empty from "components/Empty";
import ErrorSplash from "components/ErrorSplash";

// Main Component //
const FollowersScreen = (props) => {
  // Init //
  const { params } = useContext(ParamsContext);
  const { selectedUserId, username } = params;

  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const followers = useSelector((state) => state.followInfo.followers);
  const isLoggedInUser = loggedInUserId === selectedUserId;

  // FlatList Renderers //
  const renderFlatListItem = useCallback((itemData) => {
    const user = itemData.item;
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.avatarUsernameContainer}
          onPress={() => navigateToProfile(props, user.id)}
        >
          <Avatar
            rounded
            size={64}
            source={{
              uri: user.profilePic,
            }}
          />
          <View style={styles.textContainer}>
            <DefaultText style={styles.username}>@{user.username}</DefaultText>
            <DefaultText style={styles.name}>{user.name}</DefaultText>
          </View>
        </TouchableOpacity>
        {loggedInUserId !== user.id && (
          <FollowButton selectedUserId={user.id} />
        )}
      </View>
    );
  }, []);

  // Side Effects //
  const { isError, isRefreshing, isLoading, setIsRefreshing } =
    useFlatListRequest(() => dispatch(fetchFollowers(selectedUserId)));

  // set the username header in followers screen, don't have to do it in following screen
  useLayoutEffect(() => {
    const userProfileStackNavigator = props.navigation.dangerouslyGetParent();
    if (userProfileStackNavigator) {
      userProfileStackNavigator.setOptions({
        title: `@${username}`,
        headerTitleStyle: {
          color: Colors.primary,
          fontFamily: "latoBold",
          fontSize: 20,
        },
      });
    }

    props.navigation.setOptions({
      title: `Followers (${followers.length})`,
    });
  }, [props.navigation, username, followers]);

  // Render //
  if (isLoading) {
    return <FollowSkeleton />;
  }

  return (
    <View style={styles.screenContainer}>
      <FlatList
        onRefresh={() => setIsRefreshing(true)}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          isError ? (
            <ErrorSplash />
          ) : (
            <Empty
              message={
                isLoggedInUser
                  ? "You have no followers"
                  : "User has no followers"
              }
              width={128}
              height={128}
            />
          )
        }
        refreshing={isRefreshing}
        data={followers}
        horizontal={false}
        numColumns={1}
        keyExtractor={(item) => item.id}
        renderItem={renderFlatListItem}
      />
    </View>
  );
};

export default FollowersScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  avatarUsernameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    marginLeft: 16,
    marginTop: 4,
  },
  username: {
    fontFamily: "latoBold",
    fontSize: 14,
  },
  name: {
    color: Colors.glass,
    marginTop: 3,
  },
});
