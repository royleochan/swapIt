import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useSelector } from "react-redux";

import {
  navigateToCategory,
  navigateToProfileNavigator,
} from "navigation/navigate/common/index";
import parseTimeAgo from "utils/parseTimeAgo";
import request from "utils/request";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import IconButton from "components/IconButton";
import LikeButton from "components/LikeButton";
import Loader from "components/Loader";
import MatchRow from "components/MatchRow";

const ProductDetailsScreen = (props) => {
  const windowHeight = Dimensions.get("window").height;
  const { productId } = props.route.params;
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loggedInUser = useSelector((state) => state.auth.user);

  const { showActionSheetWithOptions } = useActionSheet();

  // action sheet handler
  const showActionSheet = () => {
    const options = ["Delete Listing", "Edit Listing", "Cancel"];
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
          await request.delete(`/api/products/${productId}`);
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Profile" }],
          });
        } else if (buttonIndex === 1) {
          props.navigation.push("EditProduct", product);
        }
      }
    );
  };

  const navigateToCreateReview = (pid, matchId, reviewed) => {
    props.navigation.push("CreateReview", { pid, matchId, reviewed });
  };

  const navigateToCompletedReview = (matchId) => {
    props.navigation.push("CompletedReview", { matchId });
  };

  const loadProduct = async () => {
    setIsRefreshing(true);
    try {
      const response = await request.get(`/api/products/${productId}`);
      const resData = response.data;
      setProduct(resData.product);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const DetailsComponent = (props) => {
    return (
      <View>
        <IconButton
          style={styles.arrow}
          size={23}
          color={Colors.primary}
          name="arrowleft"
          onPress={() => props.navigation.goBack()}
        />
        {loggedInUser.id === product.creator.id && (
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
            productId={id}
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
              onPress={() =>
                navigateToProfileNavigator(props, product.creator._id)
              }
            >
              <DefaultText style={styles.highlight}>
                @{product.creator.username}
              </DefaultText>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <DefaultText>{product.description}</DefaultText>
          </View>
          {loggedInUser.id === product.creator.id && (
            <View style={styles.matchesTitle}>
              <DefaultText style={styles.title}>Matches</DefaultText>
            </View>
          )}
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  } else {
    return (
      <FlatList
        ListHeaderComponent={<DetailsComponent navigation={props.navigation} />}
        onRefresh={loadProduct}
        refreshing={isRefreshing}
        data={product.matches}
        horizontal={false}
        numColumns={1}
        keyExtractor={(item) => item.id}
        scrollIndicatorInsets={{ right: 1 }}
        renderItem={(itemData) => {
          if (loggedInUser.id === product.creator.id) {
            return (
              <MatchRow
                ownProduct={product.id}
                product={itemData.item.product}
                match={itemData.item.match}
                navigateToCreateReview={navigateToCreateReview}
                navigateToCompletedReview={navigateToCompletedReview}
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
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
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
