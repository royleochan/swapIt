import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={styles.screenContainer}>
      <View>
        <Text>Home Screen</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
