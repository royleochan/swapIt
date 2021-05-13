import React from "react";
import { View, Image, StyleSheet } from "react-native";

import DefaultText from "components/DefaultText";

const SwipeProduct = (props) => {
  const { item } = props;

  return (
    <View activeOpacity={1} style={styles.card}>
      <Image style={styles.image} source={{ uri: item.imageUrl }} />
      <View style={styles.photoDescriptionContainer}>
        <DefaultText style={styles.text}>{item.title}</DefaultText>
        <DefaultText style={styles.text}>${item.price}</DefaultText>
        <DefaultText style={styles.description}>{item.description}</DefaultText>
      </View>
    </View>
  );
};

export default SwipeProduct;

const styles = StyleSheet.create({
  card: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  photoDescriptionContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "column",
    height: "100%",
    position: "absolute",
    left: 10,
    bottom: 10,
    padding: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  description: {
    textAlign: "left",
    fontSize: 14,
    color: "white",
    flexShrink: 1,
  },
});
