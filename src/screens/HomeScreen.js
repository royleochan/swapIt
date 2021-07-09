import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import {
  navigateToProductDetails,
  navigateToProfileNavigator,
  navigateToSearchUser,
  navigateToCategory,
  navigateToResults,
  navigateToMessagesScreen,
} from "navigation/navigate/common/index";
import { fetchNotifications } from "store/actions/notifications";
import { updateProducts } from "store/actions/products";
import { refreshUser } from "store/actions/auth";
import followingIcon from "assets/categories/following.png";
import request from "utils/request";
import registerForPushNotificationsAsync from "utils/notification";
import Colors from "constants/Colors";
import MaleCategories from "constants/MaleCategories";
import FemaleCategories from "constants/FemaleCategories";
import CustomSearchBar from "components/CustomSearchBar";
import DefaultText from "components/DefaultText";
import ProductBox from "components/ProductBox";
import IconButton from "components/IconButton";

const HomeScreen = (props) => {
  // Init //
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFocusSearch, setIsFocusSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const trendingProducts = useSelector((state) => state.products);

  // Update redux user after getting push token //
  const getPushToken = async () => {
    const updatedUser = await registerForPushNotificationsAsync(
      user.id,
      jwtToken
    );
    dispatch(refreshUser(updatedUser));
  };

  // Need to change to trending products //
  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await request.get(`/api/products/all/${user.id}`);
      const resData = response.data.products;
      dispatch(updateProducts(resData));
    } catch (err) {
      setIsRefreshing(false);
      dispatch(updateProducts([]));
      Alert.alert("Request failed", `${err.response.data.message}`, [
        { text: "Okay" },
      ]);
    }
    setIsRefreshing(false);
  }, [setIsRefreshing]);

  // Need to change to recommended users //
  const loadRecommendedUsers = useCallback(async () => {
    try {
      const response = await request.get(`/api/users/${user.id}`);
      const resData = response.data;
      setRecommendedUsers([resData.user]);
    } catch (err) {
      throw new Error(err);
    }
  }, [setRecommendedUsers]);

  // Run side effects //
  useEffect(() => {
    getPushToken();
    loadProducts();
    loadRecommendedUsers();
    dispatch(fetchNotifications());
  }, []);

  // Other functions //
  const handleSearch = (text) => {
    setQuery(text);
  };

  const handleSubmit = () => {
    const searchQuery = query;
    setQuery("");
    navigateToResults(props, searchQuery);
  };

  // List Header Component //
  const ListHeader = (props) => {
    console.log(props);
    return (
      <>
        <View style={styles.section}>
          <DefaultText style={styles.subheader}>Categories</DefaultText>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.avatarsContainer}
          >
            <TouchableOpacity
              style={styles.avatarContainer}
              key="Following"
              onPress={() => navigateToCategory(props, { label: "Following" })}
            >
              <Image style={styles.categoryImage} source={followingIcon} />
              <DefaultText style={styles.categoryLabel}>Following</DefaultText>
            </TouchableOpacity>
            {MaleCategories.map((category) => {
              if (category.label == "Others") {
                return;
              } else {
                return (
                  <TouchableOpacity
                    style={styles.avatarContainer}
                    key={category.label}
                    onPress={() => navigateToCategory(props, category)}
                  >
                    <Image
                      style={styles.categoryImage}
                      source={category.icon}
                    />
                    <DefaultText style={styles.categoryLabel}>
                      {category.label}
                    </DefaultText>
                  </TouchableOpacity>
                );
              }
            })}
            {FemaleCategories.map((category) => {
              return (
                <TouchableOpacity
                  style={styles.avatarContainer}
                  key={category.label}
                  onPress={() => navigateToCategory(props, category)}
                >
                  <Image style={styles.categoryImage} source={category.icon} />
                  <DefaultText style={styles.categoryLabel}>
                    {category.label}
                  </DefaultText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <DefaultText style={styles.subheader}>Recommended Users</DefaultText>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.recUsersContainer}
          >
            {recommendedUsers.map((user) => {
              return (
                <TouchableOpacity
                  onPress={() => navigateToProfileNavigator(props, user._id)}
                  style={styles.avatarContainer}
                  key={user.username}
                >
                  <Avatar
                    rounded
                    size={96}
                    source={{
                      uri: user.profilePic,
                    }}
                  />
                  <DefaultText style={styles.categoryLabel}>
                    @{user.username}
                  </DefaultText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <DefaultText style={styles.subheader}>Trending Now</DefaultText>
        </View>
      </>
    );
  };

  // Main Component //
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <CustomSearchBar
          placeholder="Search for items"
          query={query}
          handleSearch={handleSearch}
          style={styles.searchBar}
          onSubmit={handleSubmit}
          handleFocus={() => setIsFocusSearch(true)}
          handleBlur={() => setIsFocusSearch(false)}
        />
        <IconButton
          style={styles.messageIcon}
          size={23}
          color={Colors.primary}
          name="message1"
          onPress={() => navigateToMessagesScreen(props)}
        />
      </View>
      {isFocusSearch && (
        <TouchableOpacity onPress={() => navigateToSearchUser(props)}>
          <View style={styles.searchUserContainer}>
            <DefaultText style={styles.searchUserContainer}>
              Search for users instead
            </DefaultText>
            <AntDesign name="user" size={23} color={Colors.primary} />
          </View>
        </TouchableOpacity>
      )}
      {!isFocusSearch && (
        <FlatList
          ListHeaderComponent={<ListHeader navigation={props.navigation} />}
          onRefresh={loadProducts}
          refreshing={isRefreshing}
          columnWrapperStyle={styles.list}
          data={trendingProducts}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => {
            return (
              <ProductBox
                item={itemData.item}
                productCreator={itemData.item.creator}
                loggedInUser={user}
                navigate={() =>
                  navigateToProductDetails(props, itemData.item._id)
                }
              />
            );
          }}
        ></FlatList>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    marginTop: 46,
    width: "90%",
  },
  messageIcon: {
    marginTop: 40,
    marginLeft: 5,
  },
  section: {
    marginVertical: 12,
  },
  subheader: {
    marginLeft: 14,
    fontFamily: "latoBold",
    fontSize: 24,
  },
  avatarsContainer: {
    marginTop: 14,
    flexDirection: "row",
    flexGrow: 1,
  },
  avatarContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: 115,
  },
  categoryImage: {
    width: 66,
    height: 66,
  },
  categoryLabel: {
    marginTop: 10,
  },
  list: {
    justifyContent: "center",
  },
  searchUserContainer: {
    flexDirection: "row",
    fontSize: 16,
    margin: 8,
    alignItems: "center",
  },
  recUsersContainer: {
    marginTop: 14,
    flexDirection: "row",
    flexGrow: 1,
    marginLeft: 16,
  },
});
