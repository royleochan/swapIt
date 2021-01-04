import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import request from "utils/request";
import InvertedCategories from "constants/InvertedCategories";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const ProductDetailsScreen = (props) => {
  const {
    _id,
    title,
    imageUrl,
    description,
    likes,
    minPrice,
    maxPrice,
    category,
    user,
  } = props.route.params;

  const { showActionSheetWithOptions } = useActionSheet();
  const loggedInUser = useSelector((state) => state.auth.user);

  const getCategory = (category) => {
    return InvertedCategories[category];
  };

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
          await request.delete(`/api/products/${_id}`);
          props.navigation.goBack();
        } else if (buttonIndex === 1) {
          props.navigation.navigate("EditProduct", props.route.params);
        }
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => props.navigation.goBack()}
        >
          <AntDesign
            name={"arrowleft"}
            size={24}
            color={Colors.background}
            style={styles.icon}
          />
        </TouchableOpacity>
        {loggedInUser._id == user._id && (
          <TouchableOpacity style={styles.ellipsis} onPress={showActionSheet}>
            <AntDesign
              name={"ellipsis1"}
              size={24}
              color={Colors.background}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <View style={styles.textContainer}>
            <DefaultText style={styles.title}>{title}</DefaultText>
          </View>
          <View style={styles.textContainer}>
            <DefaultText>@{user.username}</DefaultText>
          </View>
          <View style={styles.textContainer}>
            <DefaultText>Category: {getCategory(category)}</DefaultText>
          </View>
          <TouchableOpacity
            style={styles.iconTextContainer}
            onPress={() => console.log("Show users who liked item")}
          >
            <Ionicons
              name={
                Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"
              }
              size={16}
            />
            <DefaultText>
              {likes.length} {likes.length === 1 ? "like" : "likes"}
            </DefaultText>
          </TouchableOpacity>
          <View style={styles.iconTextContainer}>
            <Feather name="dollar-sign" size={16} />
            <DefaultText>
              {minPrice} - {maxPrice}
            </DefaultText>
          </View>
          <View style={styles.textContainer}>
            <DefaultText>{description}</DefaultText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  icon: {
    opacity: 0.5,
  },
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
    fontSize: 16,
    fontFamily: "latoBold",
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  imageContainer: {
    height: "60%",
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: Colors.background,
    zIndex: 1,
  },
  detailsContainer: {
    padding: 24,
  },
  textContainer: {
    marginVertical: 3,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "14%",
    marginVertical: 3,
  },
});
