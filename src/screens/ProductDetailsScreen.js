// React Imports //
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// RNE Imports //
import { Image } from "react-native-elements";

// Expo Action Sheet Imports //
import { useActionSheet } from "@expo/react-native-action-sheet";

// Redux Action Imports //
import { findRoom } from "store/actions/chatscreen";

// Navigation Imports //
import {
  navigateToProductDetails,
  navigateToCategory,
  navigateToProfileNavigator,
  navigateToChatRoom,
} from "navigation/navigate/common/index";
import {
  navigateToCreateReview,
  navigateToReviews,
} from "navigation/navigate/profile";

// Custom Hook Imports //
import useFlatListRequest from "hooks/useFlatListRequest";

// Utils Imports //
import { parseTimeAgo } from "utils/date";
import showAlert from "utils/showAlert";
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
import MainButton from "components/MainButton";

// Details Component //
const DetailsComponent = (props) => {
  // Init //
  const [isLoading, setIsLoading] = useState(false);
  const { product, loggedInUserId, jwtToken } = props;
  const { showActionSheetWithOptions } = useActionSheet();
  const windowHeight = Dimensions.get("window").height;
  const isCreator = loggedInUserId === product.creator.id;

  const dispatch = useDispatch();

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
          setIsLoading(true);
          await request.delete(`/api/products/${product._id}`, jwtToken);
          setIsLoading(false);

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

  const onPressChatHandler = async () => {
    try {
      setIsLoading(true);
      const chat = await dispatch(
        findRoom(product._id, loggedInUserId, product.creator.id)
      );
      setIsLoading(false);
      navigateToChatRoom(props, chat);
    } catch (err) {
      showAlert("Failed to create chat", "Please try again", () =>
        setIsLoading(false)
      );
    }
  };

  // Render //
  return (
    <View>
      {isLoading && <Loader isLoading={isLoading} />}
      <IconButton
        style={styles.arrow}
        size={23}
        color={Colors.primary}
        name="arrowleft"
        onPress={() => props.navigation.goBack()}
      />
      {isCreator && (
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
        {!isCreator && (
          <MainButton style={styles.chatButton} onPress={onPressChatHandler}>
            Chat
          </MainButton>
        )}
        {isCreator && (
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
  const [isChatLoading, setIsChatLoading] = useState(false);
  const loggedInUserId = useSelector((state) => state.auth.user.id);
  const jwtToken = useSelector((state) => state.auth.jwtToken);

  const dispatch = useDispatch();

  // Side Effects //
  const { data, isError, isRefreshing, isLoading, setIsRefreshing } =
    useFlatListRequest(() => request.get(`/api/products/${productId}`));

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

    // FlatList Renderers //
    const renderFlatListItem = (itemData) => {
      if (loggedInUserId === product.creator.id) {
        return (
          <MatchRow
            ownProduct={product.id}
            setIsChatLoading={setIsChatLoading}
            product={itemData.item.product}
            match={itemData.item.match}
            findChatHandler={async () =>
              await dispatch(
                findRoom(
                  itemData.item.product.id,
                  loggedInUserId,
                  itemData.item.product.creator.id
                )
              )
            }
            navigateToChatRoom={(chat) => navigateToChatRoom(props, chat)}
            navigateToProductDetails={() =>
              navigateToProductDetails(props, itemData.item.product.id)
            }
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
    };

    return (
      <>
        {isChatLoading && <Loader isLoading={isChatLoading} />}
        <FlatList
          ListHeaderComponent={
            !isError && (
              <DetailsComponent
                props
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
          renderItem={renderFlatListItem}
        />
      </>
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
  chatButton: {
    width: 140,
    height: 40,
    marginTop: 16,
  },
  matchesTitle: {
    marginTop: 20,
    marginBottom: 20,
  },
});
