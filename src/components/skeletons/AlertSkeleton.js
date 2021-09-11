import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const NUM_ROWS_TO_RENDER = 4;

const Row = () => {
  const { height, width } = useWindowDimensions();

  return (
    <SkeletonPlaceholder speed={1200}>
      <View style={styles.alertRow}>
        <View style={styles.avatar} />
        <View style={{ marginLeft: 20 }}>
          <View
            style={{
              marginTop: 4,
              width: width * 0.4,
              height: 10,
            }}
          />
          <View
            style={{
              marginTop: 4,
              width: width * 0.5,
              height: 20,
            }}
          />
          <View
            style={{
              marginTop: 4,
              width: width * 0.3,
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
    <View key={index} style={styles.alertContainer}>
      <Row />
    </View>
  ));
};

export default AlertSkeleton;

const styles = StyleSheet.create({
  alertContainer: {
    marginTop: 8,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 100,
  },
  avatar: { width: 60, height: 60, borderRadius: 50 },
});
