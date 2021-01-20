import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";

import request from "utils/request";
import Colors from "constants/Colors";
import UserHeader from "components/UserHeader";
import ProductBox from "components/ProductBox";

const ProfileScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userProducts, setUserProducts] = useState([]);

  const loggedInUser = useSelector((state) => state.auth.user);

  const navigateToProductDetails = (productData) => {
    props.navigation.navigate("Product", productData);
  };

  const loadProducts = async () => {
    setIsRefreshing(true);
    try {
      const response = await request
        .get(`/api/products/user/${loggedInUser.id}`)
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

  // settings icon
  props.navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{ paddingRight: 16 }}
        onPress={() => {props.navigation.navigate("Settings")}}
      >
        <Feather name="settings" size={22} color={Colors.primary} />
      </TouchableOpacity>
    ),
  });

  return (
    <View style={styles.screenContainer}>
      <UserHeader selectedUser={loggedInUser} />
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
            productCreator={loggedInUser}
            item={itemData.item}
            navigate={() =>
              navigateToProductDetails({ ...itemData.item, user: loggedInUser })
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
