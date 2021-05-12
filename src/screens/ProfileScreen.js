import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import request from "utils/request";
import UserHeader from "components/UserHeader";
import ProductBox from "components/ProductBox";

const ProfileScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userProducts, setUserProducts] = useState([]);

  // user is either the logged in user (default) or other users that the logged in user is visiting
  const user = props.route.params.user;

  const navigateToProductDetails = (productData) => {
    props.navigation.navigate("Product", productData);
  };

  const loadProducts = async () => {
    setIsRefreshing(true);
    try {
      const response = await request
        .get(`/api/products/user/${user._id}`)
        .catch((error) => {
          throw new Error(error.response.data.message);
        });
      const resData = response.data.products;
      setUserProducts(resData);
      setIsRefreshing(false);
    } catch (err) {
      setUserProducts([]);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      loadProducts();
    });
    return unsubscribe;
  }, [props.navigation]);

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
          <ProductBox
            productCreator={user}
            item={itemData.item}
            navigate={() =>
              navigateToProductDetails({ ...itemData.item, user: user })
            }
          />
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
