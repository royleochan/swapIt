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

const FollowingScreen = (props) => {
  // Init //
  const { params } = useContext(ParamsContext);
  const { selectedUserId } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [following, setFollowing] = useState([]);

  const loggedInUserId = useSelector((state) => state.auth.user.id);

  // Navigation Function //
  const navigateToProfile = (userId) => {
    props.navigation.push("Profile", { userId });
  };

  // Other Functions //
  const loadFollowing = async () => {
    try {
      setIsRefreshing(true);
      const response = await request.get(
        `/api/users/following/${selectedUserId}`
      );
      setFollowing(response.data.result.following);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Side Effects //
  useEffect(() => {
    loadFollowing();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `Following (${following.length})`,
    });
  }, [props.navigation, following]);

  // Render //
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.screenContainer}>
      <FlatList
        onRefresh={loadFollowing}
        refreshing={isRefreshing}
        data={following}
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

export default FollowingScreen;

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
  followButton: {
    backgroundColor: Colors.primary,
    padding: 5,
    width: 66,
    height: 26,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  followText: {
    color: Colors.background,
    alignSelf: "center",
  },
});
