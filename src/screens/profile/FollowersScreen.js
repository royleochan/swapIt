import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-elements";

import { ParamsContext } from "navigation/context/ParamsContext";
import Colors from "constants/Colors";
import request from "utils/request";
import DefaultText from "components/DefaultText";
import FollowButton from "components/FollowButton";

const FollowersScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [users, setUsers] = useState([]);
  const { params } = useContext(ParamsContext);

  const { selectedUser } = params;
  const loggedInUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.jwtToken);

  const navigateToProfile = (user) => {
    props.navigation.push("Profile", { user: user });
  };

  const loadUsers = async () => {
    try {
      const response = await request.get(
        `/api/users/followers/${selectedUser._id}`
      );

      setUsers(response.data.users.followers);
      setIsRefreshing(false);
    } catch (err) {
      setUsers([]);
      setIsRefreshing(false);
    }
  };

  // set the username header in followers screen, don't have to do it in following screen
  useLayoutEffect(() => {
    const userProfileStackNavigator = props.navigation.dangerouslyGetParent();
    if (userProfileStackNavigator) {
      userProfileStackNavigator.setOptions({
        title: `@${selectedUser.username}`,
        headerTitleStyle: {
          color: Colors.primary,
          fontFamily: "latoBold",
          fontSize: 20,
        },
      });
    }
    props.navigation.setOptions({
      title: `Followers (${selectedUser.followers.length})`,
    });
  }, [props.navigation]);

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <FlatList
        onRefresh={loadUsers}
        refreshing={isRefreshing}
        data={users}
        horizontal={false}
        numColumns={1}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          const user = itemData.item;
          return (
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.avatarUsernameContainer}
                onPress={() => navigateToProfile(user)}
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
              {loggedInUser.id !== user.id && (
                <FollowButton
                  selectedUser={user}
                  loggedInUser={loggedInUser}
                  token={token}
                />
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
