import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-elements";

import { ParamsContext } from "navigation/context/ParamsContext";
import Colors from "constants/Colors";
import request from "utils/request";
import DefaultText from "components/DefaultText";
import FollowButton from "components/FollowButton";

const FollowingScreen = (props) => {
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
        `/api/users/following/${selectedUser._id}`
      );

      setUsers(response.data.users.following);
      setIsRefreshing(false);
    } catch (err) {
      setUsers([]);
      setIsRefreshing(false);
    }
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `Following (${selectedUser.following.length})`,
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
              <FollowButton
                selectedUser={user}
                loggedInUser={loggedInUser}
                token={token}
              />
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
