import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import request from "utils/request";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import CustomSearchBar from "components/CustomSearchBar";

const MessagesScreen = (props) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    searchHandler();
  };

  const searchHandler = async () => {
    try {
      setIsLoading(true);
      const response = await request.get(`/api/users/search/${query}`);
      setSearchedUsers(response.data.users);
      setIsLoading(false);
    } catch (err) {
      setSearchedUsers([]);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <AntDesign name={"arrowleft"} size={23} color={Colors.primary} />
        </TouchableOpacity>
        <CustomSearchBar
          query={query}
          handleSearch={handleSearch}
          style={styles.searchBar}
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
              onPress={() => props.navigation.navigate("Chat")}
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

export default MessagesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  searchBar: {
    width: "80%",
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
