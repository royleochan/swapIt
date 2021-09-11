import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const SwiperSkeleton = () => {
  const { height, width } = useWindowDimensions();

  return (
    <SkeletonPlaceholder speed={1200}>
      <View style={styles.swiperContainer}>
        <View
          style={{
            width: width * 0.9,
            height: height * 0.65,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export default SwiperSkeleton;

const styles = StyleSheet.create({
  swiperContainer: {
    paddingTop: 20,
    alignItems: "center",
  },
});
