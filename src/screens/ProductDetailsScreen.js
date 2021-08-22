// React Imports //
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Image } from "react-native-elements";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useSelector } from "react-redux";

// Navigation Imports //
import {
  navigateToProductDetails,
  navigateToCategory,
  navigateToProfileNavigator,
} from "navigation/navigate/common/index";
import {
  navigateToCreateReview,
  navigateToReviews,
} from "navigation/navigate/profile";

// Custom Hook Imports //
import useFlatListRequest from "hooks/useFlatListRequest";

// Utils Imports //
import { parseTimeAgo } from "utils/date";
import request from "utils/request";

// Colors Imports //
import Colors from "constants/Colors";

// Components Imports //
import DefaultText from "components/DefaultText";
import IconButton from "components/IconButton";
import LikeButton from "components/LikeButton";
import Loader from "components/Loader";
import MatchRow from "components/MatchRow";
import Empty from "components/Empty";
import ErrorSplash from "components/ErrorSplash";

// Details Component //
const DetailsComponent = (props) => {
  // Init //
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { product, loggedInUserId, jwtToken } = props;
  const { showActionSheetWithOptions } = useActionSheet();
  const windowHeight = Dimensions.get("window").height;

  // Functions //
  const showActionSheet = () => {
    const options = !product.isSwapped
      ? ["Delete Listing", "Edit Listing", "Cancel"]
      : ["Delete Listing", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        tintColor: Colors.primary,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          setIsDeleteLoading(true);
          await request.delete(`/api/products/${product._id}`, jwtToken);
          setIsDeleteLoading(false);

          props.navigation.reset({
            index: 0,
            routes: [{ name: "Profile" }],
          });
        } else if (buttonIndex === 1 && !product.isSwapped) {
          props.navigation.push("EditProduct", product);
        }
      }
    );
  };

  // Render //
  return (
    <View>
      {isDeleteLoading && <Loader isLoading={isDeleteLoading} />}
      <IconButton
        style={styles.arrow}
        size={23}
        color={Colors.primary}
        name="arrowleft"
        onPress={() => props.navigation.goBack()}
      />
      {loggedInUserId === product.creator.id && (
        <IconButton
          style={styles.ellipsis}
          size={23}
          color={Colors.background}
          name="ellipsis1"
          onPress={showActionSheet}
        />
      )}
      <Image
        source={{ uri: product.imageUrl }}
        style={{ width: "100%", height: windowHeight / 2 }}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <DefaultText style={styles.title}>{product.title}</DefaultText>
        </View>
        <View style={styles.textContainer}>
          <DefaultText style={styles.subTitle}>
            S${product.minPrice} - {product.maxPrice}
          </DefaultText>
        </View>
        <LikeButton
          productId={product._id}
          size={14}
          productLikes={product.likes}
          color={Colors.darkPink}
          buttonStyle={styles.likeButton}
          textStyle={styles.likesText}
          type="details"
          creatorId={product.creator.id}
        />
        <View style={styles.textContainer}>
          <DefaultText>In </DefaultText>
          <TouchableOpacity
            onPress={() =>
              navigateToCategory(props, { label: product.category })
            }
          >
            <DefaultText style={styles.highlight}>
              {product.category}
            </DefaultText>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <DefaultText>{parseTimeAgo(product.createdAt)} by </DefaultText>
          <TouchableOpacity
            onPress={() => {
              if (loggedInUserId !== product.creator._id) {
                navigateToProfileNavigator(props, product.creator._id);
              }
            }}
          >
            <DefaultText style={styles.highlight}>
              @{product.creator.username}
            </DefaultText>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <DefaultText>{product.description}</DefaultText>
        </View>
        {loggedInUserId === product.creator.id && (
          <View style={styles.matchesTitle}>
            <DefaultText style={styles.title}>Matches</DefaultText>
          </View>
        )}
      </View>
    </View>
  );
};

// Main Component //
const ProductDetailsScreen = (props) => {
  // Init //
  const { productId } = props.route.params;
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const jwtToken = useSelector((state) => state.auth.jwtToken);

  // Side Effects //
  const {
    data,
    isError,
    isRefreshing,
    isLoading,
    setIsRefreshing,
  } = useFlatListRequest(() => request.get(`/api/products/${productId}`));

  // Render //
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  } else {
    const product = isError ? null : data.product;
    const { isDeleted } = product;

    if (isDeleted) {
      return (
        <ErrorSplash message="Oops, item has been deleted and is no longer here." />
      );
    }

    return (
      <FlatList
        ListHeaderComponent={
          !isError && (
            <DetailsComponent
              navigation={props.navigation}
              product={product}
              loggedInUserId={loggedInUserId}
              jwtToken={jwtToken}
            />
          )
        }
        onRefresh={() => setIsRefreshing(true)}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          loggedInUserId === product.creator.id ? (
            isError ? (
              <ErrorSplash />
            ) : (
              <Empty
                message="No matches found"
                width={100}
                height={100}
                fontSize={12}
              />
            )
          ) : null
        }
        refreshing={isRefreshing}
        data={isError ? [] : product.matches}
        horizontal={false}
        numColumns={1}
        keyExtractor={(item) => item.id}
        scrollIndicatorInsets={{ right: 1 }}
        renderItem={(itemData) => {
          if (loggedInUserId === product.creator.id) {
            return (
              <MatchRow
                ownProduct={product.id}
                product={itemData.item.product}
                match={itemData.item.match}
                navigateToProductDetails={() => {
                  navigateToProductDetails(props, itemData.item.product.id);
                }}
                navigateToCreateReview={() =>
                  navigateToCreateReview(
                    props,
                    productId,
                    itemData.item.match.id,
                    itemData.item.product.creator.id,
                    itemData.item.product.creator.username
                  )
                }
                navigateToReviews={() =>
                  navigateToReviews(props, itemData.item.product.creator.id)
                }
              />
            );
          } else {
            return <View></View>;
          }
        }}
      />
    );
  }
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  arrow: {
    zIndex: 1,
    position: "absolute",
    left: 20,
    top: 40,
  },
  ellipsis: {
    zIndex: 1,
    position: "absolute",
    top: 40,
    right: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "latoBold",
  },
  subTitle: {
    fontSize: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textContainer: {
    marginVertical: 4,
    flexDirection: "row",
  },
  highlight: {
    color: Colors.darkPink,
  },
  likeButton: {
    alignSelf: "flex-start",
    marginVertical: 5,
  },
  likesText: {
    fontSize: 12,
    marginLeft: 5,
    alignSelf: "flex-start",
    marginVertical: 5,
  },
  matchesTitle: {
    marginTop: 20,
    marginBottom: 20,
  },
});
