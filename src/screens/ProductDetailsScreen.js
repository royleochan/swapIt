import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import parseTimeAgo from "utils/parseTimeAgo";
import request from "utils/request";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";
import IconButton from "components/IconButton";

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
    createdAt,
  } = props.route.params;

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
          await request.delete(`/api/products/${_id}`);
          props.navigation.goBack();
        } else if (buttonIndex === 1) {
          props.navigation.push("EditProduct", props.route.params);
        }
      }
    );
  };

  const navigateToCategory = (cat) => {
    props.navigation.push("Category", { label: cat });
  };

  const navigateToProfile = (user) => {
    props.navigation.push("ProfileScreen", {
      screen: "Profile",
      params: { user: user },
    });
  };

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
        {loggedInUser._id == user._id && (
          <IconButton
            style={styles.ellipsis}
            size={23}
            color={Colors.background}
            name="ellipsis1"
            onPress={showActionSheet}
          />
        )}
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <View style={styles.textContainer}>
            <DefaultText style={styles.title}>{title}</DefaultText>
          </View>
          <View style={styles.textContainer}>
            <DefaultText style={styles.subTitle}>
              S${minPrice} - {maxPrice}
            </DefaultText>
          </View>
          <TouchableOpacity
            style={styles.iconTextContainer}
            onPress={() => console.log("Show users who liked item")}
          >
            <AntDesign name={"hearto"} size={14} color={Colors.primary} />
            <DefaultText>
              {likes.length} {likes.length === 1 ? "like" : "likes"}
            </DefaultText>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <DefaultText>In </DefaultText>
            <TouchableOpacity onPress={() => navigateToCategory(category)}>
              <DefaultText style={styles.highlight}>{category}</DefaultText>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <DefaultText>{parseTimeAgo(createdAt)} by </DefaultText>
            <TouchableOpacity onPress={() => navigateToProfile(user)}>
              <DefaultText style={styles.highlight}>
                @{user.username}
              </DefaultText>
            </TouchableOpacity>
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
    justifyContent: "space-between",
    width: "15%",
    marginVertical: 4,
  },
  highlight: {
    color: Colors.darkPink,
  },
});
