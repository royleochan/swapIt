import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";

import DefaultText from "./DefaultText";

const ProductBox = (props) => {
  const { item, productCreator, navigate } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigate}>
        <Image style={styles.itemImage} source={{ uri: item.imageUrl }} />
      </TouchableOpacity>
      <View style={styles.likesContainer}>
        <MaterialCommunity name={"heart-outline"} size={14} color={"#d50101"} />
        <DefaultText style={styles.likesText}>
          {item.likes.length} likes
        </DefaultText>
      </View>
      <DefaultText style={styles.titleText}>{item.title}</DefaultText>
      <DefaultText style={styles.priceText}>
        $: {item.minPrice} - {item.maxPrice}
      </DefaultText>
      <View style={styles.userDetailsContainer}>
        <Image
          style={styles.profilePicture}
          source={{ uri: productCreator.profilePic }}
        />
        <DefaultText style={styles.username}>
          @{productCreator.username}
        </DefaultText>
      </View>
    </View>
  );
};

export default ProductBox;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  itemImage: {
    width: 150,
    height: 200,
  },
  likesContainer: {
    flexDirection: "row",
    paddingTop: 5,
    alignItems: "center",
  },
  likesText: {
    fontSize: 12,
    color: "#d50101",
    marginLeft: 5,
  },
  titleText: {
    fontSize: 12,
    paddingTop: 5,
  },
  priceText: {
    paddingTop: 5,
    fontWeight: "bold",
  },
  usernameText: {
    paddingTop: 5,
  },
  userDetailsContainer: {
    flexDirection: "row",
    paddingTop: 5,
    alignItems: "center",
  },
  profilePicture: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
});
