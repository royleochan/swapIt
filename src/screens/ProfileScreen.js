import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import request from "utils/request";
import UserHeader from "components/UserHeader";
import ProductBox from "components/ProductBox";

const ProfileScreen = (props) => {
  let user = useSelector((state) => state.auth.user);
  user.listings = user.products.length;

  // temporary (remove once data is fixed)
  user.followers = 22;
  user.following = 1;
  user.rating = 4;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userProducts, setUserProducts] = useState([]);

  const loadProducts = async () => {
    setIsRefreshing(true);
    try {
      const response = await request
        .get(`/api/products/user/${user.id}`)
        .catch((error) => {
          throw new Error(error.response.data.message);
        });
      console.log("blah");
      console.log(response);
      const res = response.data;
      const resData = res.products;
      setUserProducts(resData);
      setIsRefreshing(false);
    } catch (err) {
      setUserProducts([]);
      setIsRefreshing(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <UserHeader selectedUser={user} />
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        columnWrapperStyle={styles.list}
        data={userProducts}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductBox productCreator={user} item={itemData.item} />
        )}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  list: {
    justifyContent: "center",
  },
});
