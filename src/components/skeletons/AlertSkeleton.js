import React from "react";
import { StyleSheet, View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const NUM_ROWS_TO_RENDER = 4;

const Row = () => {
  return (
    <SkeletonPlaceholder speed={1200}>
      <View style={styles.alertRow}>
        <View style={styles.avatar} />
        <View style={{ marginLeft: 20 }}>
          <View
            style={{
              marginTop: 4,
              width: 70,
              height: 10,
            }}
          />
          <View
            style={{
              marginTop: 4,
              width: 160,
              height: 20,
            }}
          />
          <View
            style={{
              marginTop: 4,
              width: 50,
              height: 10,
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const AlertSkeleton = () => {
  return [...Array(NUM_ROWS_TO_RENDER)].map((value, index) => (
    <Row key={index} />
  ));
};

export default AlertSkeleton;

const styles = StyleSheet.create({
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    height: 100,
  },
  avatar: { width: 60, height: 60, borderRadius: 50 },
});
