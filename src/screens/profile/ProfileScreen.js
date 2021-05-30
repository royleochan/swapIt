import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigationState } from "@react-navigation/native";

import * as authActions from "store/actions/auth";
import request from "utils/request";
import Colors from "constants/Colors";
import UserHeader from "components/UserHeader";
import ProductBox from "components/ProductBox";
import IconButton from "components/IconButton";

const ProfileScreen = (props) => {
  const stackIndex = useNavigationState((state) => state.index);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const dispatch = useDispatch();

  // user is either the logged in user (default) or other users that the logged in user is visiting
  const loggedInUser = useSelector((state) => state.auth.user);
  let selectedUser;
  if (props.route.params) {
    selectedUser = props.route.params.user;
  } else {
    selectedUser = loggedInUser;
  }

  const navigateToProductDetails = (productData) => {
    props.navigation.push("Product", {
      id: productData.id,
      creator: productData.creator,
    });
  };

  const navigateToReviews = () => {
    props.navigation.push("Reviews", selectedUser);
  };

  const navigateToFollowing = () => {
    props.navigation.push("Follow", {
      screen: "Following",
      params: { selectedUser: selectedUser },
    });
  };

  const navigateToFollowers = () => {
    props.navigation.push("Follow", {
      screen: "Followers",
      params: { selectedUser: selectedUser },
    });
  };

  const navigateToSettings = () => {
    props.navigation.push("Settings", {
      screen: "Settings",
      params: { selectedUser: selectedUser },
    });
  };

  const loadUserData = async () => {
    setIsRefreshing(true);
    try {
      const response = await request
        .get(`/api/users/${selectedUser._id}`)
        .catch((error) => {
          throw new Error(error.response.data.message);
        });
      setUserProducts(response.data.user.products);
      if (loggedInUser.id === response.data.user.id) {
        dispatch(authActions.refreshUser(response.data.user));
      }
      setIsRefreshing(false);
    } catch (err) {
      setUserProducts([]);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  // header back button if is not logged in user, else render header settings button
  useLayoutEffect(() => {
    if (stackIndex === 0 && loggedInUser.id === selectedUser.id) {
      props.navigation.setOptions({
        headerLeft: () => <View></View>,
        headerRight: () => (
          <IconButton
            style={{ marginRight: 10 }}
            size={26}
            color={Colors.primary}
            name="setting"
            onPress={() => navigateToSettings()}
          />
        ),
      });
    }
  }, [props.navigation]);

  return (
    <View style={styles.screenContainer}>
      <FlatList
        ListHeaderComponent={
          <UserHeader
            selectedUser={selectedUser}
            navigateToReviews={navigateToReviews}
            navigateToFollowers={navigateToFollowers}
            navigateToFollowing={navigateToFollowing}
          />
        }
        onRefresh={loadUserData}
        refreshing={isRefreshing}
        columnWrapperStyle={styles.list}
        data={userProducts}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductBox
            productCreator={selectedUser}
            item={itemData.item}
            navigate={() => navigateToProductDetails(itemData.item)}
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
