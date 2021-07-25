import React from "react";
import { StyleSheet, View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const ReviewSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.header}>
        <View style={styles.rating}></View>
        <View style={styles.stars}></View>
        <View style={styles.description}></View>
      </View>
      <View style={styles.reviewRow}>
        <View style={styles.avatarTextContainer}>
          <View style={styles.avatar} />
          <View style={{ marginLeft: 20 }}>
            <View
              style={{
                width: 70,
                height: 14,
              }}
            />
            <View
              style={{
                marginTop: 4,
                width: 90,
                height: 16,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: 80,
            height: 14,
            marginRight: 10,
            marginTop: 10,
          }}
        ></View>
      </View>
      <View
        style={{
          width: 250,
          height: 14,
          marginLeft: 14,
        }}
      ></View>
      <View style={styles.reviewRow}>
        <View style={styles.avatarTextContainer}>
          <View style={styles.avatar} />
          <View style={{ marginLeft: 20 }}>
            <View
              style={{
                width: 70,
                height: 14,
              }}
            />
            <View
              style={{
                marginTop: 4,
                width: 90,
                height: 16,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: 80,
            height: 14,
            marginRight: 10,
            marginTop: 10,
          }}
        ></View>
      </View>
      <View
        style={{
          width: 250,
          height: 14,
          marginLeft: 14,
        }}
      ></View>
    </SkeletonPlaceholder>
  );
};

export default ReviewSkeleton;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    paddingBottom: 18,
  },
  rating: {
    alignSelf: "center",
    marginTop: 30,
    width: 32,
    height: 36,
    borderRadius: 4,
  },
  stars: {
    alignSelf: "center",
    width: 90,
    marginTop: 20,
    height: 16,
  },
  description: {
    alignSelf: "center",
    width: 80,
    height: 12,
    marginTop: 10,
  },
  reviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    height: 100,
  },
  avatarTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
});
