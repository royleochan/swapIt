import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
// import { SearchBar } from "react-native-elements";
import { Avatar } from "react-native-elements";

import CustomSearchBar from "components/CustomSearchBar";

const HomeScreen = (props) => {
  const [query, setQuery] = useState("");

  let user = useSelector((state) => state.auth.user);

  const handleSearch = (text) => {
    setQuery(text);
  };

  const navigateToProductDetails = (productData) => {
    props.navigation.navigate("Product", productData);
  };

  return (
    <View style={styles.screenContainer}>
      {/* <CustomSearchBar query={query} handleSearch={handleSearch} /> */}
      <Avatar
        rounded
        source={{
          uri:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBarContainer: {
    width: "90%",
    marginTop: 36,
  },
});
