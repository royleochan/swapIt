import React from "react";
import { Platform, StyleSheet } from "react-native";
// import { SearchBar } from "react-native-elements";

const CustomSearchBar = (props) => {
  const { query, handleSearch } = props;

  return (
    <SearchBar
      placeholder="Search"
      onChangeText={(queryText) => handleSearch(queryText)}
      value={query}
      platform={Platform.OS === "ios" ? "ios" : "android"}
      containerStyle={styles.searchBarContainer}
      inputContainerStyle={styles.inputContainerStyle}
    />
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    width: "90%",
    marginTop: 36,
  },
});
