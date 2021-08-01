import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native-elements";

import { parseTimeAgo } from "utils/date";
import Colors from "constants/Colors";
import LikeButton from "components/LikeButton";
import DefaultText from "components/DefaultText";

const ProductBox = (props) => {
  const { item, productCreator, navigate } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigate}>
        {item.isSwapped ? (
          <ImageBackground
            source={{ uri: item.imageUrl }}
            style={styles.swappedImage}
          >
            <View style={styles.innerImageContainer}>
              <DefaultText style={styles.swapped}>SWAPPED</DefaultText>
            </View>
          </ImageBackground>
        ) : (
          <Image style={styles.itemImage} source={{ uri: item.imageUrl }} />
        )}
      </TouchableOpacity>
      <View style={styles.titleLikeContainer}>
        <DefaultText style={styles.titleText}>{item.title}</DefaultText>
        <LikeButton
          productId={item.id}
          size={14}
          productLikes={item.likes}
          color={Colors.accent}
          buttonStyle={styles.likeButton}
          textStyle={styles.likesText}
          creatorId={productCreator.id}
          type="box"
        />
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
  innerImageContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.2)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  swappedImage: {
    width: 160,
    height: 180,
    borderRadius: 10,
  },
  itemImage: {
    width: 160,
    height: 180,
    borderRadius: 10,
  },
  swapped: {
    fontSize: 18,
    color: "white",
    opacity: 0.75,
    fontFamily: "latoBold",
  },
  titleLikeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeButton: {
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
