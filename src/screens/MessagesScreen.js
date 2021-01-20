import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import request from "utils/request";
import CustomSearchBar from "components/CustomSearchBar";

const MessagesScreen = (props) => {
  const [query, setQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    searchHandler();
  };

  const searchHandler = async () => {
    try {
      const response = await request.get(`/api/users/search/${query}`);
      setSearchedUsers(response.data.users);
    } catch (err) {
      setSearchedUsers([]);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <CustomSearchBar
        query={query}
        handleSearch={handleSearch}
        style={styles.searchBar}
      />
      {searchedUsers.map((user) => {
        return <Text>{user.username}</Text>;
      })}
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBar: {
    marginTop: 10,
  },
});
