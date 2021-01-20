import React from "react";
import { Platform, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";

import Colors from "constants/Colors";

const CustomSearchBar = (props) => {
  const { query, handleSearch, style } = props;

  return (
    <SearchBar
      placeholder="Search"
      onChangeText={(queryText) => handleSearch(queryText)}
      value={query}
      platform={Platform.OS === "ios" ? "ios" : "android"}
      containerStyle={style}
      inputContainerStyle={styles.inputContainerStyle}
      inputStyle={styles.inputStyle}
      style={{ fontSize: 14 }}
      cancelButtonProps={{
        buttonTextStyle: { color: Colors.darkPink, fontSize: 14 },
      }}
    />
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  inputContainerStyle: {
    height: 20,
    backgroundColor: Colors.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});