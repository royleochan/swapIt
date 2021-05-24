import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import request from "utils/request";
import Colors from "constants/Colors";
import UserHeader from "components/UserHeader";
import ProductBox from "components/ProductBox";
import IconButton from "components/IconButton";

const ProfileScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userProducts, setUserProducts] = useState([]);

  // user is either the logged in user (default) or other users that the logged in user is visiting
  const user = props.route.params.user;
  const loggedInUser = useSelector((state) => state.auth.user);

  const navigateToProductDetails = (productData) => {
    props.navigation.push("Product", productData);
  };

  const navigateToReviews = (user) => {
    props.navigation.push("Reviews", user);
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

  // header back button if is not logged in user, else render header settings button
  useLayoutEffect(() => {
    if (user.id !== loggedInUser.id) {
      props.navigation.setOptions({
        headerLeft: () => (
          <IconButton
            style={{ marginLeft: 10 }}
            size={23}
            color={Colors.primary}
            name="arrowleft"
            onPress={() => props.navigation.goBack()}
          />
        ),
      });
    } else {
      props.navigation.setOptions({
        headerRight: () => (
          <IconButton
            style={{ marginRight: 10 }}
            size={26}
            color={Colors.primary}
            name="setting"
            onPress={() => console.log("Go to settings")}
          />
        ),
      });
    }
  }, [props.navigation]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      loadProducts();
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={styles.screenContainer}>
      <UserHeader
        selectedUser={user.id === loggedInUser.id ? loggedInUser : user}
        navigateToReviews={navigateToReviews}
      />
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
    backgroundColor: Colors.background,
  },
  list: {
    justifyContent: "center",
  },
});
