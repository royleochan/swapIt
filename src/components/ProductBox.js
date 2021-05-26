import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import parseTimeAgo from "utils/parseTimeAgo";
import Colors from "constants/Colors";
import DefaultText from "components/DefaultText";

const ProductBox = (props) => {
  const { item, productCreator, navigate } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigate}>
        <Image style={styles.itemImage} source={{ uri: item.imageUrl }} />
      </TouchableOpacity>
      <View style={styles.titleLikeContainer}>
        <DefaultText style={styles.titleText}>{item.title}</DefaultText>
        <View style={styles.likesContainer}>
          <AntDesign
            name="hearto"
            size={16}
            color={Colors.accent}
            style={styles.heart}
          />
          <DefaultText style={styles.likesText}>
            {item.likes.length}
          </DefaultText>
        </View>
      </View>
      <DefaultText style={styles.priceText}>
        S${item.minPrice} - {item.maxPrice}
      </DefaultText>
      <View style={styles.clockTimeContainer}>
        <AntDesign
          name="clockcircleo"
          size={14}
          color={Colors.primary}
          style={styles.clock}
        />
        <DefaultText style={styles.timeText}>
          {parseTimeAgo(item.createdAt)}
        </DefaultText>
      </View>
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
    width: 160,
    height: 180,
    borderRadius: 10,
  },
  titleLikeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likesContainer: {
    flexDirection: "row",
    paddingTop: 5,
    alignItems: "center",
  },
  heart: {
    alignSelf: "flex-start",
    marginTop: 5,
  },
  likesText: {
    fontSize: 12,
    color: Colors.accent,
    marginLeft: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  titleText: {
    fontSize: 14,
    marginTop: 9,
    fontFamily: "latoBold",
    width: 120,
  },
  priceText: {
    marginTop: 5,
    fontFamily: "latoBold",
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
  timeText: {
    marginLeft: 5,
  },
  clockTimeContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
});
