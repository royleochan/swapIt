import React from "react";
import { StyleSheet, View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const ProductBoxSkeleton = () => {
  return (
    <SkeletonPlaceholder speed={1200}>
      <View style={styles.row}>
        <View style={styles.container}>
          <View style={styles.image}></View>
          <View style={styles.title}></View>
          <View style={styles.price}></View>
          <View style={styles.date}></View>
          <View style={styles.user}></View>
        </View>
        <View style={styles.container}>
          <View style={styles.image}></View>
          <View style={styles.title}></View>
          <View style={styles.price}></View>
          <View style={styles.date}></View>
          <View style={styles.user}></View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default ProductBoxSkeleton;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    width: 160,
    height: 180,
    borderRadius: 10,
  },
  title: {
    width: 120,
    marginTop: 10,
    height: 14,
  },
  price: {
    width: 50,
    marginTop: 4,
    height: 10,
  },
  date: {
    width: 70,
    marginTop: 4,
    height: 10,
  },
  user: {
    width: 80,
    marginTop: 4,
    height: 10,
  },
});
