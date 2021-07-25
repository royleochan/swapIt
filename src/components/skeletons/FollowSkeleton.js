import React from "react";
import { StyleSheet, View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const NUM_ROWS_TO_RENDER = 4;

const Row = () => {
  return (
    <SkeletonPlaceholder speed={1200}>
      <View style={styles.alertRow}>
        <View style={styles.avatarTextContainer}>
          <View style={styles.avatar} />
          <View style={{ marginLeft: 20 }}>
            <View
              style={{
                width: 70,
                height: 10,
              }}
            />
            <View
              style={{
                marginTop: 4,
                width: 160,
                height: 16,
              }}
            />
          </View>
        </View>
        <View
          style={{
            padding: 5,
            width: 66,
            height: 26,
            borderRadius: 16,
            marginRight: 10,
          }}
        ></View>
      </View>
    </SkeletonPlaceholder>
  );
};

const FollowSkeleton = () => {
  return [...Array(NUM_ROWS_TO_RENDER)].map((value, index) => (
    <Row key={index} />
  ));
};

export default FollowSkeleton;

const styles = StyleSheet.create({
  alertRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    height: 100,
  },
  avatarTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: { width: 60, height: 60, borderRadius: 50 },
});
