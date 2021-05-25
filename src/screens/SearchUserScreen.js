import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import Colors from "constants/Colors";
import request from "utils/request";
import useDidMountEffect from "hooks/useDidMountEffect";
import DefaultText from "components/DefaultText";
import CustomSearchBar from "components/CustomSearchBar";

const SearchUserScreen = (props) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const loggedInUserId = useSelector((state) => state.auth.user.id);

  const handleSearch = (text) => {
    setQuery(text);
  };

  const searchHandler = async () => {
    try {
      const response = await request.get(
        `/api/users/search/${query}/${loggedInUserId}`
      );
      setSearchedUsers(response.data.users);
      setIsLoading(false);
    } catch (err) {
      setSearchedUsers([]);
      setIsLoading(false);
    }
  };

  useDidMountEffect(() => {
    setIsLoading(true);
    // Executes searchHandler after 1000ms, returns a positive integer which uniquely identifies the timer created
    const timer = setTimeout(() => searchHandler(query), 1000);

    // Cancels the timer given the timer id
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.goBack}
        >
          <AntDesign name={"arrowleft"} size={23} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <DefaultText style={styles.title}>Search For Users</DefaultText>
        </View>
        <CustomSearchBar
          placeholder="Search by username"
          query={query}
          handleSearch={handleSearch}
          style={styles.searchBar}
          onSubmit={() => searchHandler(query)}
        />
      </View>
      <View style={styles.mainContainer}>
        {isLoading && (
          <ActivityIndicator size={30} style={styles.loadingSpinner} />
        )}
        {searchedUsers.map((user) => {
          return (
            <TouchableHighlight
              key={user.username}
              activeOpacity={0.9}
              underlayColor={"#F6F4F4"}
              onPress={() =>
                props.navigation.push("ProfileScreen", {
                  screen: "Profile",
                  params: { user: user },
                })
              }
            >
              <View style={styles.userRow}>
                <View style={styles.avatarTextContainer}>
                  <Avatar
                    rounded
                    size={64}
                    source={{
                      uri: user.profilePic,
                    }}
                  />
                  <DefaultText style={styles.username}>
                    {user.username}
                  </DefaultText>
                </View>
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
    </View>
  );
};

export default SearchUserScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "column",
  },
  goBack: {
    marginTop: 50,
    marginLeft: 20,
  },
  titleContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "latoBold",
  },
  searchBar: {
    marginTop: 10,
    width: "95%",
    alignSelf: "center",
  },
  mainContainer: {
    marginTop: 18,
  },
  userRow: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  avatarTextContainer: {
    flexDirection: "row",
  },
  username: {
    fontFamily: "latoBold",
    fontSize: 16,
    marginLeft: 14,
  },
});
