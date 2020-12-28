import React from "react";
import { StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const Loader = (props) => {
  const { isLoading } = props;
  return (
    <AnimatedLoader
      visible={isLoading}
      overlayColor="rgba(255,255,255,0.75)"
      source={require("../../assets/loader/loader.json")}
      animationStyle={styles.lottie}
      speed={1}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
