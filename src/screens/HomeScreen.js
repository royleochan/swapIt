import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";

import request from "utils/request";
import Colors from "constants/Colors";
import MaleCategories from "constants/MaleCategories";
import FemaleCategories from "constants/FemaleCategories";
import CustomSearchBar from "components/CustomSearchBar";
import DefaultText from "components/DefaultText";
import ProductBox from "components/ProductBox";

const HomeScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  let user = useSelector((state) => state.auth.user);

  const handleSearch = (text) => {
    setQuery(text);
  };

  const navigateToProductDetails = (productData) => {
    props.navigation.navigate("Product", productData);
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
              return (
                <View style={styles.avatarContainer} key={category.label}>
                  <Avatar
                    rounded
                    size={64}
                    source={{
                      uri:
                        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                    }}
                  />
                  <DefaultText style={styles.categoryLabel}>
                    {category.label}
                  </DefaultText>
                </View>
              );
            })}
            {FemaleCategories.map((category) => {
              return (
                <View style={styles.avatarContainer} key={category.label}>
                  <Avatar
                    rounded
                    size={64}
                    source={{
                      uri:
                        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                    }}
                  />
                  <DefaultText style={styles.categoryLabel}>
                    {category.label}
                  </DefaultText>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <DefaultText style={styles.subheader}>Recommended Users</DefaultText>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.avatarsContainer}
          >
            {recommendedUsers.map((user) => (
              <View style={styles.avatarContainer} key={user.username}>
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
              </View>
            ))}
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
          query={query}
          handleSearch={handleSearch}
          style={styles.searchBar}
        />
        <TouchableOpacity onPress={() => props.navigation.navigate("Messages")}>
          <AntDesign
            style={styles.messageIcon}
            name="message1"
            size={23}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>

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
    marginLeft: 16,
    marginVertical: 12,
  },
  subheader: {
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
    width: 100,
  },
  categoryLabel: {
    marginTop: 10,
  },
  list: {
    justifyContent: "center",
    marginTop: 10,
  },
});
