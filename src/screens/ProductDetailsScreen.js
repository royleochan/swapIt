import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import InvertedCategories from "constants/InvertedCategories";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const ProductDetailsScreen = (props) => {
  const {
    title,
    imageUrl,
    description,
    likes,
    minPrice,
    maxPrice,
    category,
    user,
  } = props.route.params;

  const getCategory = (category) => {
    return InvertedCategories[parseInt(category, 10)];
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => props.navigation.goBack()}
        >
          <AntDesign name={"arrowleft"} size={24} color={Colors.primary} />
        </TouchableOpacity>
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
  arrow: {
    zIndex: 10,
    position: "absolute",
    marginTop: 50,
    marginLeft: 10,
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
