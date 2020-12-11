import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={require("assets/logo/original-on-transparent.png")}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logoContainer: {
    paddingTop: 15,
    width: "100%",
    height: 50,
  },
  logo: {
    width: 100,
    height: 27,
  },
});
