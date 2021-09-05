// React Imports //
import React, { useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigationState } from "@react-navigation/native";

// Navigation Imports //
import {
  navigateToReviews,
  navigateToFollowers,
  navigateToFollowing,
  navigateToSettings,
  navigateToVerifyScreen,
} from "navigation/navigate/profile/index";
import { navigateToProductDetails } from "navigation/navigate/common/index";

// Custom Hook Imports //
import useFlatListRequest from "hooks/useFlatListRequest";

// Redux Action Imports //
import { refreshUser } from "store/actions/auth";

// Util Imports //
import request from "utils/request";

// Colors Imports //
import Colors from "constants/Colors";

// Components Imports //
import Loader from "components/Loader";
import UserHeader from "components/UserHeader";
import ProductBox from "components/ProductBox";
import IconButton from "components/IconButton";
import Empty from "components/Empty";
import ErrorSplash from "components/ErrorSplash";

// Main Component //
const ProfileScreen = (props) => {
  // Init //
  const stackIndex = useNavigationState((state) => state.index);
  const dispatch = useDispatch();

  // user is either the logged in user (default) or other users that the logged in user is visiting obtained from route params
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  let selectedUserId;
  if (props.route.params) {
    selectedUserId = props.route.params.userId;
  } else {
    selectedUserId = loggedInUserId;
  }

  const isLoggedInUser = loggedInUserId === selectedUserId;

  // Side Effects //
  const { data, isError, isRefreshing, isLoading, setIsRefreshing } =
    useFlatListRequest(() => request.get(`/api/users/${selectedUserId}`));

  useEffect(() => {
    if (!isLoading && loggedInUserId === data.user.id) {
      dispatch(refreshUser(data.user));
    }
  }, [data]);

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
            onPress={() => navigateToSettings(props)}
          />
        ),
      });
    }
  }, [props.navigation]);

  // Render //
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  } else {
    const userData = isError ? null : data.user;

    // FlatList Renderers //
    const renderFlatListItem = (itemData) => (
      <ProductBox
        productCreator={userData}
        item={itemData.item}
        navigate={() => navigateToProductDetails(props, itemData.item._id)}
      />
    );

    return (
      <View style={styles.screenContainer}>
        <FlatList
          ListHeaderComponent={
            !isError && (
              <UserHeader
                selectedUser={userData}
                navigateToVerify={() => navigateToVerifyScreen(props)}
                navigateToReviews={() =>
                  navigateToReviews(props, selectedUserId)
                }
                navigateToFollowers={() =>
                  navigateToFollowers(props, selectedUserId, userData.username)
                }
                navigateToFollowing={() =>
                  navigateToFollowing(props, selectedUserId, userData.username)
                }
              />
            )
          }
          onRefresh={() => setIsRefreshing(true)}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            isError ? (
              <ErrorSplash />
            ) : (
              <Empty
                message={
                  isLoggedInUser
                    ? "You have no listings"
                    : "User has no listings"
                }
                width={128}
                height={128}
              />
            )
          }
          refreshing={isRefreshing}
          columnWrapperStyle={styles.list}
          data={isError ? [] : userData.products}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={renderFlatListItem}
        />
      </View>
    );
  }
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
