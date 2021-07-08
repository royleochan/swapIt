import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-elements";

import { ParamsContext } from "navigation/context/ParamsContext";
import Colors from "constants/Colors";
import request from "utils/request";
import Loader from "components/Loader";
import DefaultText from "components/DefaultText";
import FollowButton from "components/FollowButton";

const FollowersScreen = (props) => {
  // Init //
  const { params } = useContext(ParamsContext);
  const { selectedUserId } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [username, setUsername] = useState("");

  const loggedInUserId = useSelector((state) => state.auth.user);

  // Navigation Function //
  const navigateToProfile = (userId) => {
    props.navigation.push("Profile", { userId });
  };

  // Other Functions //
  const loadFollowers = async () => {
    try {
      setIsRefreshing(true);
      const response = await request.get(
        `/api/users/followers/${selectedUserId}`
      );

      setFollowers(response.data.result.followers);
      setUsername(response.data.result.username);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  // Side Effects //
  useEffect(() => {
    loadFollowers();
  }, []);

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
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.screenContainer}>
      <FlatList
        onRefresh={loadFollowers}
        refreshing={isRefreshing}
        data={followers}
        horizontal={false}
        numColumns={1}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          const user = itemData.item;
          return (
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.avatarUsernameContainer}
                onPress={() => navigateToProfile(user.id)}
              >
                <Avatar
                  rounded
                  size={64}
                  source={{
                    uri: user.profilePic,
                  }}
                />
                <View style={styles.textContainer}>
                  <DefaultText style={styles.username}>
                    @{user.username}
                  </DefaultText>
                  <DefaultText style={styles.name}>{user.name}</DefaultText>
                </View>
              </TouchableOpacity>
              {loggedInUserId !== user.id && (
                <FollowButton selectedUserId={user.id} />
              )}
            </View>
          );
        }}
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
