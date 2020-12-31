import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
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

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <DefaultText style={styles.title}>{title}</DefaultText>
          <DefaultText>@{user.username}</DefaultText>
          <TouchableOpacity
            style={styles.iconTextContainer}
            onPress={() => console.log("blah")}
          >
            <Ionicons
              name={
                Platform.OS === "ios" ? "ios-heart-empty" : "md-heart-empty"
              }
              size={18}
            />
            <DefaultText>
              {likes.length} {likes.length === 1 ? "like" : "likes"}
            </DefaultText>
          </TouchableOpacity>
          <View style={styles.iconTextContainer}>
            <Feather name="dollar-sign" size={18} />
            <DefaultText>
              {minPrice} - {maxPrice}
            </DefaultText>
          </View>
          <DefaultText>{description}</DefaultText>
          <DefaultText>{category}</DefaultText>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: "latoBold",
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
  },
  imageContainer: {
    height: "60%",
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    backgroundColor: Colors.background,
    zIndex: 1,
  },
  detailsContainer: {
    padding: 24,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
