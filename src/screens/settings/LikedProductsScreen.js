// React Imports //
import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector } from "react-redux";

// Custom Hook Imports //
import useFlatListRequest from "hooks/useFlatListRequest";

// Navigation Imports //
import { navigateToProductDetails } from "navigation/navigate/common/index";

// Util Imports //
import request from "utils/request";

// Colors Import //
import Colors from "constants/Colors";

// Components Import //
import DefaultText from "components/DefaultText";
import ProductBox from "components/ProductBox";
import Empty from "components/Empty";
import ErrorSplash from "components/ErrorSplash";
import ProductBoxSkeleton from "components/skeletons/ProductBoxSkeleton";

// Main Component //
const LikedProductsScreen = (props) => {
  // Init //
  const loggedInUserId = useSelector((state) => state.auth.user.id);

  // Side Effects //
  const { data, isError, isRefreshing, isLoading, setIsRefreshing } =
    useFlatListRequest(() =>
      request.get(`/api/products/likedProducts/${loggedInUserId}`)
    );

  // Render //
  const likedProductsInfo = isError || isLoading ? [] : data.data;

  return (
    <View style={styles.screenContainer}>
      <DefaultText style={styles.headerText}>Products You've Liked</DefaultText>
      {isLoading ? (
        <ProductBoxSkeleton />
      ) : (
        <FlatList
          onRefresh={() => setIsRefreshing(true)}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            isError ? (
              <ErrorSplash />
            ) : (
              <Empty
                message="You have no liked products"
                width={128}
                height={128}
              />
            )
          }
          refreshing={isRefreshing}
          columnWrapperStyle={styles.list}
          data={likedProductsInfo}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={(itemData) => (
            <ProductBox
              productCreator={itemData.item.creator}
              item={itemData.item}
              navigate={() =>
                navigateToProductDetails(props, itemData.item._id)
              }
            />
          )}
        />
      )}
    </View>
  );
};

export default LikedProductsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "latoBold",
    padding: 20,
  },
  list: {
    justifyContent: "center",
  },
});
