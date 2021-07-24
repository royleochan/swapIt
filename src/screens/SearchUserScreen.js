// React Imports //
import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";

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
import useDidMountFlatListRequest from "hooks/useDidMountFlatListRequest";

// Components Imports //
import DefaultText from "components/DefaultText";
import CustomSearchBar from "components/CustomSearchBar";
import Empty from "components/Empty";
import ErrorSplash from "components/ErrorSplash";
import useDidMountEffect from "hooks/useDidMountEffect";

// Main Component //
const SearchUserScreen = (props) => {
  // Init //
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);

  const loggedInUserId = useSelector((state) => state.auth.user.id);

  // Functions //
  const handleSearch = (text) => {
    setQuery(text);
  };

  // Side Effects //
  const { data, isError, isRefreshing, setIsRefreshing, hasSentRequest } =
    useDidMountFlatListRequest(() =>
      request.get(`/api/users/search/${loggedInUserId}/?query=${query}`)
    );

  useDidMountEffect(() => {
    setIsRefreshing(true);
  }, [debouncedQuery]);

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
          debouncedQuery={debouncedQuery}
          handleSearch={handleSearch}
          style={styles.searchBar}
          onSubmit={() => setIsRefreshing(true)}
        />
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          onRefresh={() => setIsRefreshing(true)}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            isError ? (
              <ErrorSplash />
            ) : hasSentRequest && query.length > 0 && !isRefreshing ? (
              <Empty message="No results found" width={128} height={128} />
            ) : null
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
