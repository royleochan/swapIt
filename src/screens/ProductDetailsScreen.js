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
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";

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
    props.navigation.push("ProfileScreen", { user: user });
  };

  return (
    <View style={styles.screen}>
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
            <MaterialCommunity
              name={"heart-outline"}
              size={15}
              color={Colors.primary}
            />
            <DefaultText>
              {" "}
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
            <DefaultText>5 days ago by </DefaultText>
            <TouchableOpacity onPress={() => navigateToProfile(user)}>
              <DefaultText style={styles.highlight}>
                @{user.username}
              </DefaultText>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <DefaultText style={styles.greyText}>Description </DefaultText>
            <DefaultText style={styles.text}>{description}</DefaultText>
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
  icon: {
    opacity: 0.5,
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
  textContainer: {
    marginVertical: 3,
    flexDirection: "row",
    paddingBottom: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "latoBold",
  },
  smallerGreyText: {
    fontSize: 10,
    color: Colors.glass,
  },
  greyText: {
    fontSize: 14,
    color: Colors.glass,
  },
  text: {
    fontSize: 14,
  },
});
