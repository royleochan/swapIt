import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useSelector } from "react-redux";

import parseTimeAgo from "utils/parseTimeAgo";
import request from "utils/request";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import IconButton from "components/IconButton";
import LikeButton from "components/LikeButton";
import Loader from "components/Loader";

const ProductDetailsScreen = (props) => {
  const { id, creatorId } = props.route.params;
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
          await request.delete(`/api/products/${id}`);
          props.navigation.goBack();
        } else if (buttonIndex === 1) {
          props.navigation.push("EditProduct", product);
        }
      }
    );
  };

  const navigateToCategory = (cat) => {
    props.navigation.push("Category", { label: cat });
  };

  const navigateToProfile = () => {
    props.navigation.push("ProfileScreen", {
      screen: "Profile",
      params: { userId: creatorId },
    });
  };

  const loadProduct = async () => {
    try {
      const response = await request.get(`/api/products/${id}`);
      const resData = response.data;

      setProduct(resData.product);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
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
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
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
              numLikes={product.likes.length}
              color={Colors.darkPink}
              buttonStyle={styles.likeButton}
              textStyle={styles.likesText}
              type="details"
              disabled={loggedInUser.id === product.creator.id}
              loggedInUser={loggedInUser}
            />
            <View style={styles.textContainer}>
              <DefaultText>In </DefaultText>
              <TouchableOpacity
                onPress={() => navigateToCategory(product.category)}
              >
                <DefaultText style={styles.highlight}>
                  {product.category}
                </DefaultText>
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              <DefaultText>{parseTimeAgo(product.createdAt)} by </DefaultText>
              <TouchableOpacity
                onPress={() => navigateToProfile(product.creator)}
              >
                <DefaultText style={styles.highlight}>
                  @{product.creator.username}
                </DefaultText>
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              <DefaultText>{product.description}</DefaultText>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  arrow: {
    zIndex: 10,
    position: "absolute",
    marginTop: 50,
    marginLeft: 10,
  },
  ellipsis: {
    zIndex: 10,
    position: "absolute",
    marginTop: 50,
    marginLeft: Dimensions.get("window").width - 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "latoBold",
  },
  subTitle: {
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageContainer: {
    height: "60%",
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: Colors.background,
    zIndex: 1,
  },
  detailsContainer: {
    paddingHorizontal: 18,
    paddingTop: 9,
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
  },
  likesText: {
    fontSize: 12,
    color: Colors.darkPink,
    marginLeft: 5,
    alignSelf: "flex-start",
  },
});
