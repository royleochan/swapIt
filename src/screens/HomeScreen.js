import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import request from "utils/request";
import WomenTop from "assets/svg/WomenTop";
import MenTop from "assets/svg/MenTop";
import Colors from "constants/Colors";
import MaleCategories from "constants/MaleCategories";
import FemaleCategories from "constants/FemaleCategories";
import CustomSearchBar from "components/CustomSearchBar";
import DefaultText from "components/DefaultText";
import ProductBox from "components/ProductBox";
import IconButton from "components/IconButton";

const HomeScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFocusSearch, setIsFocusSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  const user = useSelector((state) => state.auth.user);

  const handleSearch = (text) => {
    setQuery(text);
  };

  const handleSubmit = () => {
    const searchQuery = query;
    setQuery("");
    props.navigation.push("Results", searchQuery);
  };

  const navigateToProductDetails = (productData) => {
    props.navigation.push("Product", productData);
  };

  const navigateToCategory = (category) => {
    props.navigation.push("Category", category);
  };

  const navigateToProfile = (userData) => {
    props.navigation.push("ProfileScreen", {
      user: userData,
    });
  };

  const navigateToSearchUser = () => {
    props.navigation.push("Search");
  };

  // Need to change to trending products
  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await request.get(`/api/products/user/all/${user.id}`);
      const resData = response.data.products;
      setTrendingProducts(resData);
    } catch (err) {
      throw new Error(err);
    }
    setIsRefreshing(false);
  }, [setIsRefreshing, setTrendingProducts]);

  // Need to change to recommended users
  const loadRecommendedUsers = useCallback(async () => {
    try {
      const response = await request.get(`/api/users/${user.id}`);
      const resData = response.data;
      setRecommendedUsers([resData.user]);
    } catch (err) {
      throw new Error(err);
    }
  }, [setRecommendedUsers]);

  useEffect(() => {
    loadProducts();
    loadRecommendedUsers();
  }, []);

  // List Header Component //
  const ListHeader = () => {
    return (
      <>
        <View style={styles.section}>
          <DefaultText style={styles.subheader}>Categories</DefaultText>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.avatarsContainer}
          >
            {MaleCategories.map((category) => {
              if (category.label == "Others") {
                return;
              } else {
                return (
                  <TouchableOpacity
                    style={styles.avatarContainer}
                    key={category.label}
                    onPress={() => navigateToCategory(category)}
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
                  onPress={() => navigateToCategory(category)}
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
                  onPress={() => navigateToProfile(user)}
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
          onPress={() => props.navigation.push("Messages")}
        />
      </View>
      {isFocusSearch && (
        <TouchableOpacity onPress={() => navigateToSearchUser()}>
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
          ListHeaderComponent={<ListHeader />}
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
                navigate={() =>
                  navigateToProductDetails({
                    ...itemData.item,
                    user: itemData.item.creator,
                  })
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
    width: 70,
    height: 70,
  },
  categoryLabel: {
    marginTop: 10,
  },
  list: {
    justifyContent: "center",
    marginTop: 10,
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
