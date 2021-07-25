import React from "react";
import { StyleSheet, View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const NUM_ROWS_TO_RENDER = 3;

const Row = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.userRow}>
        <View style={styles.avatar} />
        <View style={{ marginLeft: 20 }}>
          <View
            style={{
              marginTop: 4,
              width: 180,
              height: 20,
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const SearchUserSkeleton = () => {
  return [...Array(NUM_ROWS_TO_RENDER)].map((value, index) => (
    <Row key={index} />
  ));
};

export default SearchUserSkeleton;

const styles = StyleSheet.create({
  userRow: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: "row",
  },
  avatar: { width: 60, height: 60, borderRadius: 50 },
});
