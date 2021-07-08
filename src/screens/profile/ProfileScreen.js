import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigationState } from "@react-navigation/native";

import * as authActions from "store/actions/auth";
import request from "utils/request";
import Colors from "constants/Colors";
import Loader from "components/Loader";
import UserHeader from "components/UserHeader";
import ProductBox from "components/ProductBox";
import IconButton from "components/IconButton";

const ProfileScreen = (props) => {
  // Init //
  const stackIndex = useNavigationState((state) => state.index);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();

  // user is either the logged in user (default) or other users that the logged in user is visiting obtained from route params
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  let selectedUserId;
  if (props.route.params) {
    selectedUserId = props.route.params.userId;
  } else {
    selectedUserId = loggedInUserId;
  }

  // Navigation Functions //
  const navigateToProductDetails = (productData) => {
    props.navigation.push("Product", {
      id: productData.id,
      creator: productData.creator, //TODO use id instead
    });
  };

  const navigateToReviews = () => {
    props.navigation.push("Reviews", { selectedUserId });
  };

  const navigateToFollowing = () => {
    props.navigation.push("Follow", {
      screen: "Following",
      params: {
        selectedUserId,
      },
    });
  };

  const navigateToFollowers = () => {
    props.navigation.push("Follow", {
      screen: "Followers",
      params: {
        selectedUserId,
      },
    });
  };

  const navigateToSettings = () => {
    props.navigation.push("Settings");
  };

  // Other Functions //
  const loadUserData = async () => {
    setIsRefreshing(true);
    try {
      const response = await request
        .get(`/api/users/${selectedUserId}`)
        .catch((error) => {
          throw new Error(error.response.data.message);
        });
      setUserData(response.data.user);
      if (loggedInUserId === response.data.user.id) {
        dispatch(authActions.refreshUser(response.data.user));
      }
    } catch (err) {
      setUserProducts([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Side Effects //
  useEffect(() => {
    loadUserData();
  }, []);

  // if isLoggedInUser, render settings button in the header
  useLayoutEffect(() => {
    if (stackIndex === 0 && loggedInUserId === selectedUserId) {
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

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={styles.screenContainer}>
      <FlatList
        ListHeaderComponent={
          <UserHeader
            selectedUser={userData}
            navigateToReviews={navigateToReviews}
            navigateToFollowers={navigateToFollowers}
            navigateToFollowing={navigateToFollowing}
          />
        }
        onRefresh={loadUserData}
        refreshing={isRefreshing}
        columnWrapperStyle={styles.list}
        data={userData.products}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => (
          <ProductBox
            productCreator={userData}
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
