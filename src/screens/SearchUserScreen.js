// React Imports //
import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";

// RNE Imports //
import { Avatar } from "react-native-elements";

// Antd Icon Imports //
import { AntDesign } from "@expo/vector-icons";

// Navigation Imports //
import { navigateToProfileNavigator } from "navigation/navigate/common/index";

// Colors Import //
import Colors from "constants/Colors";

// Utils Imports //
import request from "utils/request";

// Custom Hooks Imports //
import useDidMountEffect from "hooks/useDidMountEffect";
import useFlatListRequest from "hooks/useFlatListRequest";

// Components Imports //
import DefaultText from "components/DefaultText";
import CustomSearchBar from "components/CustomSearchBar";
import Empty from "components/Empty";
import ErrorSplash from "components/ErrorSplash";

// Main Component //
const SearchUserScreen = (props) => {
  // Init //
  const [query, setQuery] = useState("");
  const loggedInUserId = useSelector((state) => state.auth.user.id);

  // Functions //
  const handleSearch = (text) => {
    setQuery(text);
  };

  // Side Effects //
  const {
    data,
    isError,
    isRefreshing,
    isLoading,
    setIsRefreshing,
  } = useFlatListRequest(() =>
    request.get(`/api/users/search/${query}/${loggedInUserId}`)
  );

  // Side Effects //
  useDidMountEffect(() => {
    // Executes searchHandler after 1000ms, returns a positive integer which uniquely identifies the timer created
    const timer = setTimeout(() => setIsRefreshing(true), 1000);

    // Cancels the timer given the timer id
    return () => clearTimeout(timer);
  }, [query]);

  // Render //
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
          onSubmit={() => setIsRefreshing(true)}
        />
      </View>
      <View style={styles.mainContainer}>
        {isLoading ? (
          <ActivityIndicator size={30} style={styles.loadingSpinner} />
        ) : (
          <FlatList
            onRefresh={() => setIsRefreshing(true)}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={
              isError ? (
                <ErrorSplash />
              ) : (
                <Empty message="No results found" width={128} height={128} />
              )
            }
            refreshing={isRefreshing}
            data={isError ? [] : data.users}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => {
              const user = itemData.item;

              return (
                <TouchableHighlight
                  key={user.username}
                  activeOpacity={0.9}
                  underlayColor={"#F6F4F4"}
                  onPress={() => navigateToProfileNavigator(props, user._id)}
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
            }}
          ></FlatList>
        )}
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
    flex: 1,
  },
  list: {
    justifyContent: "center",
    marginTop: 10,
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
